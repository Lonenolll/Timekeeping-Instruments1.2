const express = require('express');
const db = require('../db/db');

const router = express.Router();

const fallbackVideoLinks = {
  1: 'https://tv.cctv.com/2017/06/12/VIDEYKBN5fzfgGTGAs9o7Psi170612.shtml',
  2: 'https://tv.cctv.com/2025/07/23/VIDEOHsxNXlIJxjUiiy3DuzY250723.shtml',
  3: 'https://tv.cctv.com/2019/07/07/VIDE0AZkH0m4vPbJ1TG3GGwZ190707.shtml',
  4: 'https://tv.cctv.com/2025/07/26/VIDEkd6D3mEId0UPo0cNQlpf250726.shtml',
  5: 'https://tv.cctv.com/2025/07/24/VIDE9jwud1eSjvHbk5Nrq7nA250724.shtml',
  6: 'https://tv.cctv.com/2021/12/15/VIDEnOxVaJWm5X71HedEWf8b211215.shtml',
  7: 'https://tv.cctv.com/2015/01/04/VIDE1420336291615853.shtml',
  8: 'https://tv.cctv.com/2025/05/03/VIDEFcPLbs7uM0X793DDd3jm250503.shtml',
  9: 'https://tv.cctv.com/2024/11/02/VIDE4AKapqikUvbUZMvTYxqV241102.shtml',
  10: 'https://tv.cctv.com/2012/02/27/VIDE1361429360249860.shtml'
};

// 改为使用 http:// 协议或主流媒体的频道/首页地址，
// 以避免部分子域名因 HTTPS 证书问题导致浏览器报“你的连接不是专用连接”。
const fallbackArticleLinks = {
  1: 'http://news.cctv.com/2019/09/27/ARTIkxB8Pg3k6U6COkTDgyoP190927.shtml',
  2: 'http://paper.people.com.cn/rmrb/pc/content/202501/02/content_30049424.html',
  3: 'http://news.cctv.com/2019/09/27/ARTIkxB8Pg3k6U6COkTDgyoP190927.shtml',
  4: 'http://www.people.com.cn/',
  5: 'http://www.news.cn/',
  6: 'http://www.cctv.com/',
  7: 'http://culture.people.com.cn/n1/2021/0120/c1013-32006030.html',
  8: 'http://travel.people.com.cn/n1/2017/0920/c41570-29546780.html',
  9: 'http://culture.people.com.cn/n1/2019/0726/c1013-31257663-2.html',
  10: 'http://world.people.com.cn/n1/2024/0202/c1002-40171878.html'
};

function withResolvedVideoLinks(rows) {
  return rows.map((row) => {
    const rawUrl = row.video_url || '';
    const resolvedUrl =
      rawUrl.includes('example.com') && fallbackVideoLinks[row.id]
        ? fallbackVideoLinks[row.id]
        : rawUrl;

    return {
      ...row,
      video_url: resolvedUrl,
      play_url: resolvedUrl
    };
  });
}

function withResolvedArticleLinks(rows) {
  return rows.map((row) => {
    const rawUrl = row.article_url || '';
    const resolvedUrl =
      rawUrl.includes('example.com') && fallbackArticleLinks[row.id]
        ? fallbackArticleLinks[row.id]
        : rawUrl;

    return {
      ...row,
      article_url: resolvedUrl
    };
  });
}

// 将 db.all 封装成 Promise，便于在路由中使用 async/await。
// 这个方法适合返回“多条记录”的查询场景，例如时间轴页、资源列表页。
function queryAll(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(rows);
    });
  });
}

// 将 db.get 封装成 Promise，适合“只查一条记录”的场景。
// 例如根据 id 查单个计时工具详情。
function queryGet(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(row);
    });
  });
}

// 定义朝代排序规则。
// 目的：
// 1. 满足“先秦、汉、唐、宋、元、明、清”的固定展示顺序
// 2. 避免数据库按字符串字面顺序排序，导致历史顺序混乱
function getSafeReturnPath(rawReturnTo) {
  if (typeof rawReturnTo !== 'string' || !rawReturnTo.startsWith('/')) {
    return '/timeline';
  }

  if (rawReturnTo.startsWith('//') || rawReturnTo.includes('\\')) {
    return '/timeline';
  }

  return rawReturnTo;
}

const dynastyOrderSql = `
  CASE
    WHEN dynasty = '先秦' THEN 1
    WHEN dynasty = '汉' THEN 2
    WHEN dynasty = '唐' THEN 3
    WHEN dynasty = '宋' THEN 4
    WHEN dynasty = '元' THEN 5
    WHEN dynasty = '明' THEN 6
    WHEN dynasty = '清' THEN 7
    WHEN dynasty = '明清' THEN 6
    ELSE 99
  END
`;

// ---------------------------------------------------------
// 1. GET /timeline
// 查询全部计时工具，并支持通过 query 参数按 dynasty 筛选
// ---------------------------------------------------------
router.get('/timeline', async (req, res) => {
  // 读取查询参数中的朝代筛选条件，例如：
  // /timeline?dynasty=汉
  const selectedDynasty = (req.query.dynasty || '').trim();

  try {
    // 查询目的：
    // 1. 获取时间轴页面需要展示的全部计时工具
    // 2. 若用户选择了朝代，则只返回该朝代的工具
    // 3. 按固定的历史朝代顺序排序，再按 id 排序，保证页面展示稳定
    let timelineSql = `
      SELECT
        id,
        name_zh,
        name_en,
        pinyin,
        dynasty,
        era,
        category,
        invention_period,
        introduction,
        structure_feature,
        working_principle,
        cultural_significance,
        image_cover
      FROM timing_tools
    `;

    const params = [];

    // 如果前端传入了 dynasty 参数，则增加筛选条件。
    // 这样可以支持“按朝代筛选”的页面需求。
    if (selectedDynasty) {
      timelineSql += ` WHERE dynasty = ? `;
      params.push(selectedDynasty);
    }

    timelineSql += `
      ORDER BY ${dynastyOrderSql}, id ASC
    `;

    const tools = await queryAll(timelineSql, params);

    // 全站无器物数据时仍返回 404；仅按朝代筛选为空时照常渲染，由页面展示该朝代的文献导读与“待补充器物”提示。
    if (!tools.length && !selectedDynasty) {
      return res.status(404).render('error', {
        pageTitle: '内容未找到',
        errorTitle: '未找到对应的时间轴内容',
        errorMessage: '暂时没有可展示的计时工具数据，请稍后再试。',
        backLink: returnPath,
        backText: '返回时间轴页面'
      });
    }

    // 查询成功后渲染 timeline.ejs。
    res.render('timeline', {
      pageTitle: '时之脉',
      tools,
      selectedDynasty
    });
  } catch (error) {
    // 数据库查询失败时，记录详细错误并返回友好页面。
    console.error('时间轴数据读取失败:', error.message);

    res.status(500).render('error', {
      pageTitle: '加载失败',
      errorTitle: '时间轴页面加载失败',
      errorMessage: '读取计时工具发展数据时出现问题，请稍后重试。',
      backLink: '/',
      backText: '返回首页'
    });
  }
});

// ---------------------------------------------------------
// 2. GET /tools/:id
// 根据 id 查询单个计时工具，以及它关联的视频、文章、图片
// ---------------------------------------------------------
router.get('/tools/:id', async (req, res) => {
  const toolId = Number(req.params.id);
  const returnPath = getSafeReturnPath(req.query.returnTo);

  // 如果 id 不是合法数字，直接返回友好提示页面。
  if (!Number.isInteger(toolId) || toolId <= 0) {
    return res.status(400).render('error', {
      pageTitle: '参数错误',
      errorTitle: '计时工具编号无效',
      errorMessage: '你访问的计时工具编号格式不正确，请从时间轴或首页重新进入。',
      backLink: returnPath,
      backText: '返回时间轴页面'
    });
  }

  try {
    // 查询目的 1：
    // 根据主键 id 获取单个计时工具的完整详情信息，
    // 用于详情页展示名称、拼音、朝代、类别、简介、结构与文化意义等内容。
    const toolSql = `
      SELECT
        id,
        name_zh,
        name_en,
        pinyin,
        dynasty,
        era,
        category,
        invention_period,
        introduction,
        structure_feature,
        working_principle,
        cultural_significance,
        image_cover
      FROM timing_tools
      WHERE id = ?
    `;

    // 查询目的 2：
    // 获取与该计时工具关联的视频资源，
    // 用于详情页“相关视频”模块展示中英文视频内容。
    const videosSql = `
      SELECT
        id,
        timing_tool_id,
        title_zh,
        title_en,
        language,
        video_url,
        duration,
        description,
        thumbnail
      FROM videos
      WHERE timing_tool_id = ?
      ORDER BY id ASC
    `;

    // 查询目的 3：
    // 获取与该计时工具关联的文章资源，
    // 用于详情页“相关文章”模块展示标题、来源、日期、摘要和原文链接。
    const articlesSql = `
      SELECT
        id,
        timing_tool_id,
        title,
        source,
        publish_date,
        article_url,
        summary,
        cover_image
      FROM articles
      WHERE timing_tool_id = ?
      ORDER BY publish_date DESC, id DESC
    `;

    // 查询目的 4：
    // 获取与该计时工具关联的图片资源，
    // 用于详情页“图片展示区”展示器物图、结构图、复原图等内容。
    const imagesSql = `
      SELECT
        id,
        timing_tool_id,
        title,
        image_url,
        caption,
        source,
        copyright_note,
        official_page_url,
        image_kind
      FROM images
      WHERE timing_tool_id = ?
      ORDER BY
        CASE COALESCE(image_kind, '')
          WHEN '实拍图' THEN 1
          WHEN '结构说明图' THEN 2
          WHEN '模型复原图' THEN 3
          WHEN '馆藏与展览' THEN 4
          WHEN '新闻报道配图' THEN 5
          ELSE 99
        END,
        id ASC
    `;

    const [tool, videoRows, articleRows, relatedImages] = await Promise.all([
      queryGet(toolSql, [toolId]),
      queryAll(videosSql, [toolId]),
      queryAll(articlesSql, [toolId]),
      queryAll(imagesSql, [toolId])
    ]);

    const relatedVideos = withResolvedVideoLinks(videoRows);
    const relatedArticles = withResolvedArticleLinks(articleRows);

    // 如果主表中查不到该器物，直接返回友好提示页面。
    if (!tool) {
      return res.status(404).render('error', {
        pageTitle: '内容未找到',
        errorTitle: '未找到对应的计时工具',
        errorMessage: '该计时工具可能尚未录入数据库，或访问链接已失效。',
        backLink: '/timeline',
        backText: '返回时间轴页面'
      });
    }

    // 查询成功后渲染详情页模板。
    res.render('tool-detail', {
      pageTitle: `${tool.name_zh} | 器之格`,
      tool,
      relatedVideos,
      relatedArticles,
      relatedImages,
      returnPath
    });
  } catch (error) {
    console.error('计时工具详情读取失败:', error.message);

    res.status(500).render('error', {
      pageTitle: '加载失败',
      errorTitle: '计时工具详情加载失败',
      errorMessage: '读取该计时工具的相关资料时出现问题，请稍后重试。',
      backLink: returnPath,
      backText: '返回时间轴页面'
    });
  }
});

module.exports = router;
