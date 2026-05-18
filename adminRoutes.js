const express = require('express');
const db = require('../db/db');

const router = express.Router();

// 将 db.all 封装成 Promise，便于使用 async/await 查询列表数据。
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

// 将 db.run 封装成 Promise，便于执行新增写库操作。
function runStatement(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function onRun(err) {
      if (err) {
        reject(err);
        return;
      }

      resolve({
        lastID: this.lastID,
        changes: this.changes
      });
    });
  });
}

// 查询所有计时工具。
// 目的：
// 1. 为“新增视频”表单中的所属工具下拉框提供选项
// 2. 保证视频录入时能正确绑定 timing_tool_id
const allToolsSql = `
  SELECT
    id,
    name_zh,
    name_en
  FROM timing_tools
  ORDER BY id ASC
`;

// GET /admin/videos/new
// 展示基础版“新增视频”表单页面。
router.get('/admin/videos/new', async (req, res) => {
  try {
    const tools = await queryAll(allToolsSql);

    res.render('admin/video-form', {
      pageTitle: '后台新增视频',
      tools,
      successMessage: req.query.success ? '视频新增成功。' : '',
      errorMessage: '',
      formData: {
        timing_tool_id: '',
        title_zh: '',
        title_en: '',
        language: '',
        video_url: '',
        duration: '',
        description: '',
        thumbnail: ''
      }
    });
  } catch (error) {
    console.error('加载新增视频页面失败:', error.message);

    res.status(500).render('error', {
      pageTitle: '加载失败',
      errorTitle: '新增视频页面加载失败',
      errorMessage: '读取计时工具数据时出现问题，请稍后重试。',
      backLink: '/',
      backText: '返回首页'
    });
  }
});

// POST /admin/videos/new
// 接收表单数据并写入 SQLite videos 表。
router.post('/admin/videos/new', async (req, res) => {
  const formData = {
    timing_tool_id: (req.body.timing_tool_id || '').trim(),
    title_zh: (req.body.title_zh || '').trim(),
    title_en: (req.body.title_en || '').trim(),
    language: (req.body.language || '').trim(),
    video_url: (req.body.video_url || '').trim(),
    duration: (req.body.duration || '').trim(),
    description: (req.body.description || '').trim(),
    thumbnail: (req.body.thumbnail || '').trim()
  };

  try {
    const tools = await queryAll(allToolsSql);

    // 基础校验：
    // 1. timing_tool_id、中文标题、英文标题、视频地址为本页面核心必填字段
    // 2. 若缺失则重新渲染表单并回显用户输入
    if (
      !formData.timing_tool_id ||
      !formData.title_zh ||
      !formData.title_en ||
      !formData.video_url
    ) {
      return res.status(400).render('admin/video-form', {
        pageTitle: '后台新增视频',
        tools,
        successMessage: '',
        errorMessage: '请完整填写所属计时工具、中文标题、英文标题和视频地址。',
        formData
      });
    }

    const insertVideoSql = `
      INSERT INTO videos (
        timing_tool_id,
        title_zh,
        title_en,
        language,
        video_url,
        duration,
        description,
        thumbnail
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await runStatement(insertVideoSql, [
      formData.timing_tool_id,
      formData.title_zh,
      formData.title_en,
      formData.language,
      formData.video_url,
      formData.duration,
      formData.description,
      formData.thumbnail
    ]);

    // 新增成功后重定向回表单页，并通过 query 参数显示成功提示。
    res.redirect('/admin/videos/new?success=1');
  } catch (error) {
    console.error('新增视频写入失败:', error.message);

    try {
      const tools = await queryAll(allToolsSql);

      res.status(500).render('admin/video-form', {
        pageTitle: '后台新增视频',
        tools,
        successMessage: '',
        errorMessage: '写入视频数据时出现问题，请检查输入内容或稍后重试。',
        formData
      });
    } catch (queryError) {
      console.error('回显新增视频表单失败:', queryError.message);

      res.status(500).render('error', {
        pageTitle: '写入失败',
        errorTitle: '视频新增失败',
        errorMessage: '系统在写入视频数据时发生错误，请稍后重试。',
        backLink: '/admin/videos/new',
        backText: '返回新增视频页面'
      });
    }
  }
});

module.exports = router;
