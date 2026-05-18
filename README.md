# 时间之器·中国古代计时工具沉浸式图文站

一个基于 "Node.js + Express + SQLite + EJS"搭建的文化数字化网站项目，用于展示中国古代时间观念、计时工具演变，以及相关视频、文章、图片资源。

项目主题聚焦：

- 中国古代计时工具基础信息
- 中英文视频资源
- 主流媒体文章索引
- 图像与视觉资料
- 朝代筛选与关键词搜索

---

## 1. 环境要求

建议使用以下环境：

- Node.js `16` 及以上
- npm `8` 及以上
- Windows / macOS / Linux 均可

可先检查本机环境：

```bash
node -v
npm -v
```

如果后续需要手动导入 `schema.sql` 和 `seed.sql`，还建议准备以下任一工具：

- `sqlite3` 命令行工具
- DB Browser for SQLite

---

## 2. 安装依赖

在项目根目录执行：

```bash
npm install
```

如果你是首次创建项目，也可以重新单独安装核心依赖：

```bash
npm install express ejs sqlite3
npm install -D nodemon
```

---

## 3. 数据库初始化方式

当前项目数据库连接文件为：

[`db/db.js`](./db/db.js)

默认数据库文件位置为：

```text
db/timing.db
```

当前项目中的 SQL 文件位置为：

- `schema.sql`
- `seed.sql`

### 方式一：使用 sqlite3 命令行初始化

如果你的电脑已经安装 `sqlite3`，可以在项目根目录执行：

```bash
sqlite3 db/timing.db < schema.sql
sqlite3 db/timing.db < seed.sql
```

作用说明：

- 第一条命令创建数据表结构
- 第二条命令插入示例数据

### 方式二：使用 SQLite 图形工具导入

如果你没有安装 `sqlite3` 命令行工具，可以使用 DB Browser for SQLite：

1. 新建或打开 `db/timing.db`
2. 执行 `schema.sql`
3. 再执行 `seed.sql`
4. 保存数据库

### 方式三：已存在数据库文件时直接使用

如果 `db/timing.db` 已经初始化完成，则不需要重复执行建表和插入命令，直接启动项目即可。

---

## 4. 启动命令

### 开发模式

```bash
npm run dev
```

说明：

- 使用 `nodemon`
- 修改 `server.js` 或路由文件后会自动重启

### 普通启动

```bash
npm start
```

---

## 5. 默认访问地址

项目启动成功后，默认访问地址为：

```text
http://localhost:3000
```

---

## 6. 项目目录结构说明

当前项目目录结构如下：

```text
timing test 2/
├─ server.js
├─ package.json
├─ package-lock.json
├─ schema.sql
├─ seed.sql
├─ README.md
├─ db/
│  ├─ db.js
│  └─ timing.db
├─ public/
│  ├─ css/
│  │  └─ style.css
│  └─ js/
│     └─ main.js
├─ routes/
│  ├─ indexRoutes.js
│  ├─ toolRoutes.js
│  ├─ mediaRoutes.js
│  └─ searchRoutes.js
└─ views/
   ├─ partials/
   │  ├─ header.ejs
   │  └─ footer.ejs
   ├─ index.ejs
   ├─ timeline.ejs
   ├─ tool-detail.ejs
   ├─ videos.ejs
   ├─ articles.ejs
   ├─ images.ejs
   ├─ search.ejs
   └─ error.ejs
```

### 主要文件说明

`server.js`

- 项目入口文件
- 配置 Express、EJS、静态资源目录
- 挂载首页、详情页、媒体页、搜索页路由

`db/db.js`

- SQLite 数据库连接模块
- 负责连接 `db/timing.db`
- 启用外键约束

`schema.sql`

- 数据表结构定义
- 包含 `timing_tools`、`videos`、`articles`、`images`

`seed.sql`

- 示例数据
- 用于插入计时工具、视频、文章、图片等测试内容

`routes/`

- 放置 Express 路由模块
- 根据页面职责拆分

`views/`

- EJS 模板目录
- 对应首页、时间轴、详情页、资源页和搜索页

`public/css/style.css`

- 全站样式文件
- 包含东方审美、沉浸式视觉、时间轴、卡片、搜索等样式

`public/js/main.js`

- 全站原生 JavaScript 交互文件
- 包含导航高亮、滚动淡入、时间轴节点动画、鼠标粒子效果等

---

## 7. 常见报错与解决方法

### 1. `EADDRINUSE: address already in use :::3000`

原因：

- `3000` 端口已被其他 Node 进程或旧服务占用

解决方法：

Windows 可先查找并结束占用进程：

```bash
netstat -ano | findstr :3000
taskkill /PID 进程号 /F
```

然后重新启动：

```bash
npm start
```

---

### 2. `SQLITE_ERROR: no such table: timing_tools`

原因：

- 数据库文件存在，但还没有执行 `schema.sql`
- 或者执行了建表，但没有导入正确数据库文件

解决方法：

重新初始化数据库：

```bash
sqlite3 db/timing.db < schema.sql
sqlite3 db/timing.db < seed.sql
```

如果你使用图形工具，请确认执行的是当前项目根目录下的 `schema.sql` 和 `seed.sql`。

---

### 3. `Cannot find module ...`

原因：

- 依赖没有安装完整
- `node_modules` 缺失

解决方法：

```bash
npm install
```

如果仍有问题，可以删除 `node_modules` 后重新安装。

---

### 4. 页面能打开，但没有数据

原因：

- `db/timing.db` 中没有插入示例数据
- 查询成功，但数据库表为空

解决方法：

执行：

```bash
sqlite3 db/timing.db < seed.sql
```

或者用 SQLite 图形工具检查 4 张表中是否有内容。

---

### 5. 页面样式或脚本没有生效

原因：

- `public` 目录未正确挂载
- 浏览器缓存旧文件

解决方法：

1. 确认 `server.js` 中已配置：

```js
app.use(express.static(path.join(__dirname, 'public')));
```

2. 强制刷新浏览器缓存：

- Windows：`Ctrl + F5`
- macOS：`Cmd + Shift + R`

---

### 6. 搜索没有结果

原因：

- 搜索词在数据库中不存在
- 当前只搜索以下字段：
  - 计时工具中文名
  - 计时工具英文名
  - 视频标题
  - 文章标题
  - 图片标题

解决方法：

- 尝试更简短关键词
- 优先使用器物中文名，如 `日晷`、`漏刻`
- 检查数据库是否已经导入示例数据

---

### 7. 中文显示乱码

原因：

- 终端或编辑器编码不是 UTF-8
- 某些 PowerShell 输出可能会出现控制台乱码，但文件本身不一定有问题

解决方法：

- 确保代码文件保存为 UTF-8
- 浏览器页面请确认使用：

```html
<meta charset="UTF-8">
```

- 如果只是终端显示乱码，但网页正常，一般不影响项目运行

---

## 补充说明

当前项目已经具备以下基础能力：

- 首页推荐内容展示
- 时间轴浏览
- 单个计时工具详情页
- 视频资源页
- 主流媒体文章页
- 图片资源页
- 站内关键词搜索

如果后续需要继续扩展，可以继续增加：

- 后台录入功能
- 多语言切换
- 管理端登录
- 图片上传
- 视频外链管理
- 精选推荐字段
- 更精细的朝代 / 类别筛选

