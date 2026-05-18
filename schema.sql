-- =========================================================
-- 时间之器·中国古代计时工具沉浸式图文站
-- SQLite 数据库建表脚本
-- 文件名：schema.sql
-- 说明：
-- 1. timing_tools 为主表
-- 2. videos / articles / images 通过 timing_tool_id 关联主表
-- 3. 本脚本适用于 SQLite
-- =========================================================

-- 为了便于外键约束生效，建议在应用连接数据库后执行：
-- PRAGMA foreign_keys = ON;

-- ---------------------------------------------------------
-- 1. timing_tools
-- 主表：存储中国古代计时工具基础信息
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS timing_tools (
    -- 主键，自增 ID
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    -- 中文名称，如“日晷”“刻漏”
    name_zh TEXT NOT NULL,

    -- 英文名称，如 “Sundial”
    name_en TEXT NOT NULL,

    -- 拼音，便于搜索与排序
    pinyin TEXT,

    -- 朝代，如“汉”“唐”“宋”
    dynasty TEXT,

    -- 更细的时代描述，如“先秦”“北宋”“明代中后期”
    era TEXT,

    -- 分类，如“日影计时”“漏刻计时”“综合天文仪器”
    category TEXT,

    -- 发明或形成时期说明
    invention_period TEXT,

    -- 基础介绍
    introduction TEXT,

    -- 结构特征
    structure_feature TEXT,

    -- 工作原理
    working_principle TEXT,

    -- 文化意义
    cultural_significance TEXT,

    -- 封面图路径或 URL
    image_cover TEXT
);

-- ---------------------------------------------------------
-- 2. videos
-- 存储与计时工具相关的视频资源
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS videos (
    -- 主键，自增 ID
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    -- 关联的计时工具 ID
    timing_tool_id INTEGER NOT NULL,

    -- 视频中文标题
    title_zh TEXT NOT NULL,

    -- 视频英文标题
    title_en TEXT NOT NULL,

    -- 语言信息，如“中文”“英文”“中英双语”
    language TEXT,

    -- 视频地址，可以是本地路径或外部链接
    video_url TEXT NOT NULL,

    -- 时长，如“05:32”
    duration TEXT,

    -- 视频简介
    description TEXT,

    -- 缩略图路径或 URL
    thumbnail TEXT,

    -- 外键：关联 timing_tools 表
    FOREIGN KEY (timing_tool_id) REFERENCES timing_tools(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- ---------------------------------------------------------
-- 3. articles
-- 存储主流媒体文章资源
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS articles (
    -- 主键，自增 ID
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    -- 关联的计时工具 ID
    timing_tool_id INTEGER NOT NULL,

    -- 文章标题
    title TEXT NOT NULL,

    -- 来源，如“央视网”“人民日报”“新华社”
    source TEXT NOT NULL,

    -- 发布日期，建议保存为 ISO 格式：YYYY-MM-DD
    publish_date TEXT,

    -- 文章链接
    article_url TEXT NOT NULL,

    -- 摘要
    summary TEXT,

    -- 封面图路径或 URL
    cover_image TEXT,

    -- 外键：关联 timing_tools 表
    FOREIGN KEY (timing_tool_id) REFERENCES timing_tools(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- ---------------------------------------------------------
-- 4. images
-- 存储与计时工具相关的图片资源
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS images (
    -- 主键，自增 ID
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    -- 关联的计时工具 ID
    timing_tool_id INTEGER NOT NULL,

    -- 图片标题
    title TEXT,

    -- 图片地址，可以是本地路径或外部链接
    image_url TEXT NOT NULL,

    -- 图片说明文字
    caption TEXT,

    -- 图片来源
    source TEXT,

    -- 版权备注
    copyright_note TEXT,

    -- 官方媒体或百科、文博页面 URL（配图所在原文页面，便于跳转核对版权与上下文）
    official_page_url TEXT,

    -- 配图类型，用于列表排序：实拍图 / 结构说明图 / 模型复原图 / 馆藏与展览 / 新闻报道配图
    image_kind TEXT,

    -- 外键：关联 timing_tools 表
    FOREIGN KEY (timing_tool_id) REFERENCES timing_tools(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- =========================================================
-- 索引设计
-- 说明：
-- 1. 为常见筛选字段建立索引
-- 2. 为外键字段建立索引，提升联表与资源查询效率
-- =========================================================

-- timing_tools 常用筛选与搜索索引
CREATE INDEX IF NOT EXISTS idx_timing_tools_name_zh
ON timing_tools(name_zh);

CREATE INDEX IF NOT EXISTS idx_timing_tools_name_en
ON timing_tools(name_en);

CREATE INDEX IF NOT EXISTS idx_timing_tools_pinyin
ON timing_tools(pinyin);

CREATE INDEX IF NOT EXISTS idx_timing_tools_dynasty
ON timing_tools(dynasty);

CREATE INDEX IF NOT EXISTS idx_timing_tools_era
ON timing_tools(era);

CREATE INDEX IF NOT EXISTS idx_timing_tools_category
ON timing_tools(category);

-- videos 关联与筛选索引
CREATE INDEX IF NOT EXISTS idx_videos_timing_tool_id
ON videos(timing_tool_id);

CREATE INDEX IF NOT EXISTS idx_videos_language
ON videos(language);

-- articles 关联与来源、日期索引
CREATE INDEX IF NOT EXISTS idx_articles_timing_tool_id
ON articles(timing_tool_id);

CREATE INDEX IF NOT EXISTS idx_articles_source
ON articles(source);

CREATE INDEX IF NOT EXISTS idx_articles_publish_date
ON articles(publish_date);

-- images 关联与来源索引
CREATE INDEX IF NOT EXISTS idx_images_timing_tool_id
ON images(timing_tool_id);

CREATE INDEX IF NOT EXISTS idx_images_source
ON images(source);

-- =========================================================
-- 使用建议
-- 1. dynasty：
--    建议统一命名规则，例如固定使用“先秦、汉、唐、宋、元、明、清”，
--    不要混用“汉朝 / 西汉 / 两汉”这类不同粒度，除非你同时设计更细的 era 字段承接。
--
-- 2. category：
--    建议预先定义有限枚举，例如“日影计时、漏刻计时、机械天文仪、综合授时”，
--    这样前端筛选条件会更稳定，也更适合做导航分类。
--
-- 3. source：
--    建议统一文章来源与图片来源命名，如固定使用“央视网、人民日报、新华社”，
--    避免出现“人民网 / 人民日报客户端 / 人民日报”混杂，方便后续按来源筛选。
-- =========================================================
