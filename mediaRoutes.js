const express = require('express');
const db = require('../db/db');

const router = express.Router();

// 为示例数据中的占位链接提供真实内容映射。
// 说明：
// 1. 当前数据库里仍有部分 example.com 占位地址
// 2. 为避免用户点击后跳到 Example Domain，这里在路由层统一替换
// 3. 视频优先替换为央视网对应内容页，文章优先替换为央视网 / 人民网 / 新华网真实报道
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

// 将 sqlite3 的查询封装为 Promise，便于使用 async/await。
// 这里使用 db.all，是因为视频、文章、图片页都属于“列表型数据页面”。
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

// 查询全部计时工具名称。
// 目的：
// 1. 为 videos.ejs / articles.ejs / images.ejs 的筛选下拉框提供数据
// 2. 保证三个资源页都能统一按计时工具筛选
const allToolsSql = `
  SELECT
    id,
    name_zh,
    name_en,
    category
  FROM timing_tools
  ORDER BY category COLLATE NOCASE, name_zh COLLATE NOCASE
`;

// ---------------------------------------------------------
// 1. GET /videos
// 查询全部视频，并支持按工具、按语言筛选
// ---------------------------------------------------------
router.get('/videos', async (req, res) => {
  const toolId = (req.query.toolId || '').trim();
  const language = (req.query.language || '').trim();

  try {
    // 查询目的：
    // 1. 获取视频资源列表
    // 2. 联表查询所属计时工具的中文名和英文名
    // 3. 根据 query 参数支持按工具、按语言过滤结果
    let videosSql = `
      SELECT
        v.id,
        v.timing_tool_id,
        v.title_zh,
        v.title_en,
        v.language,
        v.video_url,
        v.duration,
        v.description,
        v.thumbnail,
        t.name_zh AS tool_name_zh,
        t.name_en AS tool_name_en
      FROM videos v
      LEFT JOIN timing_tools t
        ON v.timing_tool_id = t.id
      WHERE 1 = 1
    `;

    const videoParams = [];

    // 如果传入了 toolId，则只查询某个计时工具下的视频。
    if (toolId) {
      videosSql += ` AND v.timing_tool_id = ? `;
      videoParams.push(toolId);
    }

    // 如果传入了 language，则按语言筛选。
    // 这里使用 LIKE 而不是完全匹配，便于兼容“中文 / English”“中英双语”这类值。
    if (language) {
      videosSql += ` AND v.language LIKE ? `;
      videoParams.push(`%${language}%`);
    }

    videosSql += ` ORDER BY v.id ASC `;

    // 同时查询工具列表，供页面筛选下拉框使用。
    const [videoRows, tools] = await Promise.all([
      queryAll(videosSql, videoParams),
      queryAll(allToolsSql)
    ]);

    const videos = withResolvedVideoLinks(videoRows);

    res.render('videos', {
      pageTitle: '视频资源',
      videos,
      tools,
      selectedToolId: toolId,
      selectedLanguage: language
    });
  } catch (error) {
    console.error('视频资源读取失败:', error.message);

    res.status(500).render('error', {
      pageTitle: '加载失败',
      errorTitle: '视频资源页面加载失败',
      errorMessage: '读取视频资源时出现问题，请稍后重试。',
      backLink: '/',
      backText: '返回首页'
    });
  }
});

// ---------------------------------------------------------
// 2. GET /articles
// 查询全部主流媒体文章，并支持按来源、按计时工具筛选
// ---------------------------------------------------------
router.get('/articles', async (req, res) => {
  const source = (req.query.source || '').trim();
  const toolId = (req.query.toolId || '').trim();

  try {
    // 查询目的：
    // 1. 获取主流媒体文章索引
    // 2. 联表查询所属计时工具中文名，方便页面展示
    // 3. 支持通过 source 和 toolId 进行组合筛选
    // 4. 页面只展示文章索引与外链，不返回全文内容
    let articlesSql = `
      SELECT
        a.id,
        a.timing_tool_id,
        a.title,
        a.source,
        a.publish_date,
        a.article_url,
        a.summary,
        a.cover_image,
        t.name_zh AS tool_name_zh
      FROM articles a
      LEFT JOIN timing_tools t
        ON a.timing_tool_id = t.id
      WHERE 1 = 1
    `;

    const articleParams = [];

    // 如果传入文章来源，则只保留对应来源的文章。
    if (source) {
      articlesSql += ` AND a.source = ? `;
      articleParams.push(source);
    }

    // 如果传入了计时工具 id，则只保留该工具关联的文章。
    if (toolId) {
      articlesSql += ` AND a.timing_tool_id = ? `;
      articleParams.push(toolId);
    }

    articlesSql += ` ORDER BY a.publish_date DESC, a.id DESC `;

    // 同时查询工具列表，供页面筛选表单使用。
    const [articleRows, tools] = await Promise.all([
      queryAll(articlesSql, articleParams),
      queryAll(allToolsSql)
    ]);

    const articles = withResolvedArticleLinks(articleRows);

    res.render('articles', {
      pageTitle: '主流媒体文章',
      articles,
      tools,
      selectedSource: source,
      selectedToolId: toolId
    });
  } catch (error) {
    console.error('文章资源读取失败:', error.message);

    res.status(500).render('error', {
      pageTitle: '加载失败',
      errorTitle: '文章资源页面加载失败',
      errorMessage: '读取主流媒体文章索引时出现问题，请稍后重试。',
      backLink: '/',
      backText: '返回首页'
    });
  }
});

// ---------------------------------------------------------
// 3. GET /images
// 查询全部图片，并支持按计时工具筛选
// ---------------------------------------------------------
router.get('/images', async (req, res) => {
  const rawToolId = (req.query.toolId || '').trim();
  const toolId = Number(rawToolId);
  const hasToolFilter = Number.isInteger(toolId) && toolId > 0;

  try {
    // 查询目的：
    // 1. 获取图片资源列表
    // 2. 联表查询所属计时工具名称，便于页面展示图像归属
    // 3. 支持通过 toolId 对图片资源进行筛选
    let imagesSql = `
      SELECT
        i.id,
        i.timing_tool_id,
        i.title,
        i.image_url,
        i.caption,
        i.source,
        i.copyright_note,
        i.official_page_url,
        i.image_kind,
        t.name_zh AS tool_name_zh,
        t.name_en AS tool_name_en,
        t.category AS tool_category
      FROM images i
      LEFT JOIN timing_tools t
        ON i.timing_tool_id = t.id
      WHERE 1 = 1
    `;

    const imageParams = [];

    // 如果传入了合法的计时工具 id，则只展示该工具关联的图片。
    if (hasToolFilter) {
      imagesSql += ` AND i.timing_tool_id = ? `;
      imageParams.push(toolId);
    }

    imagesSql += `
      ORDER BY
        t.category COLLATE NOCASE,
        t.name_zh COLLATE NOCASE,
        CASE COALESCE(i.image_kind, '')
          WHEN '实拍图' THEN 1
          WHEN '结构说明图' THEN 2
          WHEN '模型复原图' THEN 3
          WHEN '馆藏与展览' THEN 4
          WHEN '新闻报道配图' THEN 5
          ELSE 99
        END,
        i.id ASC
    `;

    // 同时查询工具列表，为筛选下拉框提供选项。
    const [images, tools, selectedToolMeta] = await Promise.all([
      queryAll(imagesSql, imageParams),
      queryAll(allToolsSql),
      hasToolFilter ? queryGet('SELECT name_zh, category, dynasty FROM timing_tools WHERE id = ?', [toolId]) : Promise.resolve(null)
    ]);

    res.render('images', {
      pageTitle: '图片资源',
      images,
      tools,
      selectedToolId: hasToolFilter ? String(toolId) : '',
      selectedToolMeta
    });
  } catch (error) {
    console.error('图片资源读取失败:', error.message);

    res.status(500).render('error', {
      pageTitle: '加载失败',
      errorTitle: '图片资源页面加载失败',
      errorMessage: '读取图片资源时出现问题，请稍后重试。',
      backLink: '/',
      backText: '返回首页'
    });
  }
});

module.exports = router;
