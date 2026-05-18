const path = require('path');
const express = require('express');

const indexRoutes = require('./routes/indexRoutes');
const toolRoutes = require('./routes/toolRoutes');
const mediaRoutes = require('./routes/mediaRoutes');
const searchRoutes = require('./routes/searchRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// 配置 EJS 模板引擎与模板目录
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 配置静态资源目录
// 禁止对 /images 等目录自动重定向，避免与 /images 资源页路由发生冲突。
app.use(express.static(path.join(__dirname, 'public'), { redirect: false }));

// 解析表单与 JSON 数据
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 注入全站公共信息，供 header / footer 等模板复用
app.use((req, res, next) => {
  res.locals.siteTitle = '时间之器·中国古代计时工具沉浸式图文站';
  res.locals.navItems = [
    { label: '首页', href: '/' },
    { label: '时之脉', href: '/timeline' },
    { label: '器之格', href: '/qizhige' },
    { label: '余韵', href: '/yuyun' },
    { label: '搜索', href: '/search' }
  ];
  res.locals.currentPath = req.path;
  next();
});

// 挂载业务路由
app.use('/', indexRoutes);
app.use('/', toolRoutes);
app.use('/', mediaRoutes);
app.use('/', searchRoutes);
app.use('/', adminRoutes);

// 统一处理未匹配路由
app.use((req, res) => {
  res.status(404).render('error', {
    pageTitle: '页面未找到',
    errorTitle: '你访问的页面不存在',
    errorMessage: '该页面可能已移动、尚未完成，或链接地址有误。',
    backLink: '/',
    backText: '返回首页'
  });
});

// 启动服务
app.listen(PORT, () => {
  console.log(`时间之器项目已启动：http://localhost:${PORT}`);
});
