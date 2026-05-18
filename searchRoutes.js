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

// 将 sqlite3 查询封装为 Promise，便于使用 async/await。
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

// GET /search
// 使用 query 参数 q 执行全站基础搜索。
router.get('/search', async (req, res) => {
  const keyword = (req.query.q || '').trim();

  // 如果用户还没输入关键词，直接渲染空搜索页。
  if (!keyword) {
    return res.render('search', {
      pageTitle: '搜索',
      keyword: '',
      toolResults: [],
      videoResults: [],
      articleResults: [],
      imageResults: []
    });
  }

  try {
    const searchValue = `%${keyword}%`;

    // 查询 1：匹配计时工具
    // 目的：
    // 1. 搜索工具中文名和英文名
    // 2. 为结果页“计时工具”分区提供基础结果
    const toolsSql = `
      SELECT
        id,
        name_zh,
        name_en,
        dynasty,
        era,
        category,
        introduction,
        image_cover
      FROM timing_tools
      WHERE name_zh LIKE ? OR name_en LIKE ?
      ORDER BY id ASC
    `;

    // 查询 2：匹配视频
    // 目的：
    // 1. 搜索视频中文标题和英文标题
    // 2. 联表带出所属计时工具中文名，便于结果页展示归属
    const videosSql = `
      SELECT
        v.id,
        v.timing_tool_id,
        v.title_zh,
        v.title_en,
        v.language,
        v.video_url,
        v.description,
        v.thumbnail,
        t.name_zh AS tool_name_zh
      FROM videos v
      LEFT JOIN timing_tools t
        ON v.timing_tool_id = t.id
      WHERE v.title_zh LIKE ? OR v.title_en LIKE ?
      ORDER BY v.id ASC
    `;

    // 查询 3：匹配文章
    // 目的：
    // 1. 搜索文章标题
    // 2. 联表带出所属计时工具中文名
    // 3. 页面仅展示文章索引与外链
    const articlesSql = `
      SELECT
        a.id,
        a.timing_tool_id,
        a.title,
        a.source,
        a.publish_date,
        a.article_url,
        a.summary,
        t.name_zh AS tool_name_zh
      FROM articles a
      LEFT JOIN timing_tools t
        ON a.timing_tool_id = t.id
      WHERE a.title LIKE ?
      ORDER BY a.publish_date DESC, a.id DESC
    `;

    // 查询 4：匹配图片
    // 目的：
    // 1. 搜索图片标题
    // 2. 联表带出所属计时工具中文名，方便用户理解图片归属
    const imagesSql = `
      SELECT
        i.id,
        i.timing_tool_id,
        i.title,
        i.image_url,
        i.caption,
        i.source,
        i.official_page_url,
        i.image_kind,
        t.name_zh AS tool_name_zh
      FROM images i
      LEFT JOIN timing_tools t
        ON i.timing_tool_id = t.id
      WHERE i.title LIKE ?
      ORDER BY i.id ASC
    `;

    const [toolResults, videoRows, articleRows, imageResults] =
      await Promise.all([
        queryAll(toolsSql, [searchValue, searchValue]),
        queryAll(videosSql, [searchValue, searchValue]),
        queryAll(articlesSql, [searchValue]),
        queryAll(imagesSql, [searchValue])
      ]);

    const videoResults = withResolvedVideoLinks(videoRows);
    const articleResults = withResolvedArticleLinks(articleRows);

    res.render('search', {
      pageTitle: '搜索结果',
      keyword,
      toolResults,
      videoResults,
      articleResults,
      imageResults
    });
  } catch (error) {
    console.error('搜索数据读取失败:', error.message);

    res.status(500).render('error', {
      pageTitle: '搜索失败',
      errorTitle: '搜索结果加载失败',
      errorMessage: '检索站内内容时出现问题，请稍后重试。',
      backLink: '/',
      backText: '返回首页'
    });
  }
});

module.exports = router;
