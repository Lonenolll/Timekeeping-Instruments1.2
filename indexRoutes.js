const express = require('express');
const db = require('../db/db');
const {
  extraQizhigeArticles,
  extraQizhigeVideos
} = require('../data/qizhigeExtraResources');

const router = express.Router();

const fallbackVideoLinks = {
  1: 'https://tv.cctv.com/2017/06/12/VIDEYKBN5fzfgGTGAs9o7Psi170612.shtml',
  2: 'https://tv.cctv.com/2025/07/23/VIDEOHsxNXlIJxjUiiy3DuzY250723.shtml',
  3: 'https://tv.cctv.com/2019/07/07/VIDE0AZkH0m4vPbJ1TG3GGwZ190707.shtml',
  4: 'https://www.bilibili.com/video/BV1Wd4y1b7ic/?spm_id_from=333.337.search-card.all.click',
  5: 'https://tv.cctv.com/2025/07/24/VIDE9jwud1eSjvHbk5Nrq7nA250724.shtml',
  6: 'https://tv.cctv.com/2021/12/15/VIDEnOxVaJWm5X71HedEWf8b211215.shtml',
  7: 'https://tv.cctv.com/2015/01/04/VIDE1420336291615853.shtml',
  8: 'https://tv.cctv.com/2025/05/03/VIDEFcPLbs7uM0X793DDd3jm250503.shtml',
  9: 'https://tv.cctv.com/2023/03/09/ARTI3t41NaGrt9nHVgb4sdbE230309.shtml',
  10: 'https://tv.cctv.com/2012/02/27/VIDE1361429360249860.shtml'
};

// 改为使用 http:// 协议或主流媒体的频道/首页地址，
// 以避免部分子域名因 HTTPS 证书问题导致浏览器报“你的连接不是专用连接”。
const fallbackArticleLinks = {
  1: 'http://news.cctv.com/2019/09/27/ARTIkxB8Pg3k6U6COkTDgyoP190927.shtml',
  2: 'http://paper.people.com.cn/rmrb/pc/content/202501/02/content_30049424.html',
  3: 'http://news.cctv.com/2019/09/27/ARTIkxB8Pg3k6U6COkTDgyoP190927.shtml',
  4: 'http://gs.people.com.cn/n2/2025/1224/c183357-41452384.html',
  5: 'https://www.news.cn/politics/20250620/79eddf5bff894c6282600fc4445eac83/c.html',
  6: 'https://culture-travel.cctv.com/2022/09/02/ARTI8s1TojqajCcfTl9OE8tK220902.shtml',
  7: 'http://culture.people.com.cn/n1/2021/0120/c1013-32006030.html',
  8: 'http://travel.people.com.cn/n1/2017/0920/c41570-29546780.html',
  9: 'http://culture.people.com.cn/n1/2019/0726/c1013-31257663-2.html',
  10: 'http://world.people.com.cn/n1/2024/0202/c1002-40171878.html'
};

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

function withResolvedVideoLinks(rows) {
  return rows.map((row) => ({
    ...row,
    video_url:
      (row.video_url || '').includes('example.com') && fallbackVideoLinks[row.id]
        ? fallbackVideoLinks[row.id]
        : row.video_url,
    play_url:
      (row.video_url || '').includes('example.com') && fallbackVideoLinks[row.id]
        ? fallbackVideoLinks[row.id]
        : row.video_url
  }));
}

function withResolvedArticleLinks(rows) {
  return rows.map((row) => ({
    ...row,
    article_url:
      (row.article_url || '').includes('example.com') && fallbackArticleLinks[row.id]
        ? fallbackArticleLinks[row.id]
        : row.article_url
  }));
}

async function loadHomeResources() {
  const featuredToolsSql = `
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
    ORDER BY id ASC
    LIMIT 6
  `;

  const featuredVideosSql = `
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
    ORDER BY v.id ASC
    LIMIT 4
  `;

  const featuredArticlesSql = `
    SELECT
      a.id,
      a.timing_tool_id,
      a.title,
      a.source,
      a.publish_date,
      a.article_url,
      a.summary,
      a.cover_image,
      t.name_zh AS tool_name_zh,
      t.name_en AS tool_name_en
    FROM articles a
    LEFT JOIN timing_tools t
      ON a.timing_tool_id = t.id
    ORDER BY a.publish_date DESC, a.id DESC
    LIMIT 4
  `;

  const featuredImagesSql = `
    SELECT
      i.id,
      i.timing_tool_id,
      i.title,
      i.image_url,
      i.caption,
      i.source,
      i.copyright_note,
      t.name_zh AS tool_name_zh,
      t.name_en AS tool_name_en
    FROM images i
    LEFT JOIN timing_tools t
      ON i.timing_tool_id = t.id
    ORDER BY i.id ASC
    LIMIT 6
  `;

  const [featuredTools, videoRows, articleRows, featuredImages] = await Promise.all([
    queryAll(featuredToolsSql),
    queryAll(featuredVideosSql),
    queryAll(featuredArticlesSql),
    queryAll(featuredImagesSql)
  ]);

  return {
    featuredTools,
    featuredVideos: withResolvedVideoLinks(videoRows),
    featuredArticles: withResolvedArticleLinks(articleRows),
    featuredImages
  };
}

async function loadQizhigeResources(toolId = null, language = null) {
  let videosWhereClause = '';
  let articlesWhereClause = '';
  const params = [];

  if (toolId) {
    videosWhereClause += ' AND v.timing_tool_id = ?';
    articlesWhereClause += ' AND a.timing_tool_id = ?';
    params.push(toolId);
  }

  if (language) {
    videosWhereClause += ' AND v.language = ?';
    articlesWhereClause += ' AND a.language = ?';
    params.push(language);
  }

  const videosSql = `
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
    WHERE 1=1${videosWhereClause}
    ORDER BY v.id ASC
  `;

  const articlesSql = `
    SELECT
      a.id,
      a.timing_tool_id,
      a.title,
      a.source,
      a.publish_date,
      a.article_url,
      a.summary,
      a.cover_image,
      t.name_zh AS tool_name_zh,
      t.name_en AS tool_name_en
    FROM articles a
    LEFT JOIN timing_tools t
      ON a.timing_tool_id = t.id
    WHERE 1=1${articlesWhereClause}
    ORDER BY a.publish_date DESC, a.id DESC
  `;

  const [videoRows, articleRows] = await Promise.all([
    queryAll(videosSql, params),
    queryAll(articlesSql, params)
  ]);

  const selectedToolId = toolId ? String(toolId) : '';
  const selectedLanguage = language ? String(language) : '';
  const extraVideos = extraQizhigeVideos.filter((video) => {
    const matchesTool = !selectedToolId || String(video.timing_tool_id) === selectedToolId;
    const matchesLanguage = !selectedLanguage || String(video.language) === selectedLanguage;
    return matchesTool && matchesLanguage;
  });
  const extraArticles = extraQizhigeArticles.filter((article) => {
    return !selectedToolId || String(article.timing_tool_id) === selectedToolId;
  });

  return {
    featuredVideos: withResolvedVideoLinks(videoRows).concat(extraVideos),
    featuredArticles: withResolvedArticleLinks(articleRows).concat(extraArticles)
  };
}

router.get('/', async (req, res) => {
  try {
    const resources = await loadHomeResources();

    res.render('index', {
      pageTitle: '首页',
      ...resources,
      dynasties: ['先秦', '汉', '唐', '宋', '元', '明', '清']
    });
  } catch (error) {
    console.error('首页数据读取失败:', error.message);

    res.status(500).render('index', {
      pageTitle: '首页',
      featuredTools: [],
      featuredVideos: [],
      featuredArticles: [],
      featuredImages: [],
      dynasties: ['先秦', '汉', '唐', '宋', '元', '明', '清'],
      errorMessage: '首页内容加载失败，请稍后重试。'
    });
  }
});

router.get('/qizhige', async (req, res) => {
  try {
    const { toolId, language } = req.query;
    const resources = await loadQizhigeResources(toolId, language);

    // 加载工具列表用于筛选表单
    const toolsSql = `
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
      ORDER BY id ASC
    `;
    const tools = await queryAll(toolsSql);

    res.render('qizhige', {
      pageTitle: '器之格',
      ...resources,
      tools,
      qizhigeReturnPath: req.originalUrl || '/qizhige',
      selectedToolId: toolId,
      selectedLanguage: language
    });
  } catch (error) {
    console.error('器之格页面数据读取失败:', error.message);

    res.status(500).render('qizhige', {
      pageTitle: '器之格',
      featuredVideos: [],
      featuredArticles: [],
      tools: [],
      selectedToolId: null,
      selectedLanguage: null,
      errorMessage: '器之格内容加载失败，请稍后重试。'
    });
  }
});

router.get('/yuyun', (req, res) => {
  res.render('yuyun', {
    pageTitle: '余韵'
  });
});

module.exports = router;
