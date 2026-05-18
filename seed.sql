-- =========================================================
-- 时间之器·中国古代计时工具沉浸式图文站
-- SQLite 示例数据脚本
-- 文件名：seed.sql
-- 说明：
-- 1. 先插入主表 timing_tools
-- 2. 再插入 videos / articles / images
-- 3. 数据为课程项目演示用示例内容，可按需扩展或替换
-- =========================================================

BEGIN TRANSACTION;

-- ---------------------------------------------------------
-- 1. timing_tools
-- 至少 10 条中国古代计时工具示例数据
-- ---------------------------------------------------------
INSERT INTO timing_tools (
    name_zh, name_en, pinyin, dynasty, era, category, invention_period,
    introduction, structure_feature, working_principle,
    cultural_significance, image_cover
) VALUES
(
    '日晷', 'Sundial', 'rigui', '汉', '两汉', '日影计时', '先秦萌芽，汉代广泛应用',
    '日晷借天光投影辨识时刻，是中国古代最具象征性的计时工具之一，兼具实用价值与礼制意味。',
    '通常由晷盘与晷针组成，盘面刻有时辰线，材质多为石质或铜质，适合露天安置。',
    '通过太阳照射形成的影子在晷盘上的位置变化来判断时刻，不同季节需结合天文知识校正。',
    '它体现了古人“观天而作、顺时而行”的时间观，既是科学器具，也是传统秩序与宇宙意识的物化表达。',
    '/images/tools/sundial-cover.jpg'
),
(
    '铜壶滴漏', 'Bronze Clepsydra', 'tonghudilou', '汉', '东汉', '漏刻计时', '战国形成，汉代成熟',
    '铜壶滴漏以稳定水流计时，在昼夜皆可使用的条件下，成为古代宫廷与官署中极为重要的计时装置。',
    '常由多级铜壶、导流孔与浮箭构成，器形庄重，兼具礼器气质与技术巧思。',
    '通过壶内水位升降或泄水速度变化，配合刻度与浮箭显示时间，形成较为连续的计时方式。',
    '它见证了古代国家治理对精准授时的需求，也折射出礼制文明与工艺文明的深度结合。',
    '/images/tools/bronze-clepsydra-cover.jpg'
),
(
    '漏刻', 'Water Clock', 'louke', '唐', '盛唐', '漏刻计时', '先秦肇始，隋唐制度化',
    '漏刻是中国古代夜间与阴雨天常用的计时方法，在官方报时、天文观测与社会生活中影响深远。',
    '多采用受水壶、泄水壶、浮箭与刻度标识相配合的组合结构，体系完整。',
    '依靠匀速滴水带来的水位变化记录时间，再以浮箭或标尺读出具体时刻。',
    '漏刻使时间从自然经验转向制度化测定，是古代社会日常秩序、礼仪安排与王朝治理的重要基础。',
    '/images/tools/water-clock-cover.jpg'
),
(
    '圭表', 'Gnomon', 'guibiao', '先秦', '夏商周', '观象授时', '夏商周时期逐渐形成',
    '圭表是以立杆测影来观测节气和时序的早期天文计时工具，是中国古代历法文明的重要起点。',
    '一般由直立的表与平置的圭组成，结构看似简朴，却蕴含高度抽象的天文观测思想。',
    '通过测量日影长短及方向变化，判断冬至、夏至等关键时点，并辅助制定历法。',
    '圭表所承载的“观象授时”观念深刻影响了农耕社会的生产节律，也奠定了中国古代时空认知的基础。',
    '/images/tools/gnomon-cover.jpg'
),
(
    '水运仪象台', 'Water-powered Astronomical Clock Tower', 'shuiyunyixiangtai', '宋', '北宋', '机械天文仪', '北宋元祐年间',
    '水运仪象台汇集天文观测、机械传动与自动报时功能于一体，是中国古代机械工程与天文学结合的巅峰代表。',
    '其结构由漏壶驱动系统、天文观测装置、报时机构和木构高台共同组成，体量宏大而层次复杂。',
    '借助水力驱动擒纵与轮系，使观象与报时联动运行，展现了高度精密的机械设计思想。',
    '它不仅是技术史上的杰作，也象征着宋代知识体系对“天、时、政”关系的系统整合。',
    '/images/tools/astronomical-clock-tower-cover.jpg'
),
(
    '香篆钟', 'Incense Seal Clock', 'xiangzhuanzhong', '明', '明代', '燃香计时', '唐宋流行，明清雅用',
    '香篆钟以线香燃烧的过程计量时间，常见于书房、寺院与文人空间，兼具计时与审美功能。',
    '器具常配香盘、香模与承灰装置，香纹可盘旋成篆，形制雅致。',
    '通过控制香料配比、香道长度与燃烧速度来估算时间，部分器具还会在特定节点触发小铃提醒。',
    '它让时间带上香气与仪式感，体现了中国传统生活中科学、工艺与审美交融的独特气质。',
    '/images/tools/incense-clock-cover.jpg'
),
(
    '火钟', 'Fire Clock', 'huozhong', '明', '明清', '燃烧计时', '唐宋以来逐渐发展',
    '火钟利用燃线、香绳或烛火有规律的燃烧进行计时，是一种兼具民间智慧与生活实用性的工具。',
    '常见结构包括刻度香绳、悬挂重物、金属珠与报时托盘，形制因用途而异。',
    '依靠燃烧速度相对稳定的材料推进时间，燃至刻度点时可触发落珠、鸣器或视觉提示。',
    '火钟体现了古人把自然过程转化为日常秩序的能力，也折射出时间在民间生活中的细密分配。',
    '/images/tools/fire-clock-cover.jpg'
),
(
    '更鼓', 'Night Watch Drum', 'genggu', '明', '明清', '报更计时', '汉唐渐成，明清定型',
    '更鼓是古代城市夜间报时与巡夜制度的重要组成部分，以击鼓、鸣锣等方式向公众传递时段信息。',
    '通常设置于城楼、更楼或衙署，由鼓、锣、值守空间及巡更制度共同构成。',
    '按夜间时段划分更次，由值守人员在约定时间击鼓报更，以声音覆盖城市空间。',
    '它不仅是计时方式，更是社会治理与城市秩序的声音制度，让“时间”成为可被共同感知的公共存在。',
    '/images/tools/night-watch-drum-cover.jpg'
),
(
    '浑天仪', 'Armillary Sphere', 'huntianyi', '汉', '东汉', '天文仪器', '西汉至东汉发展成熟',
    '浑天仪主要用于模拟天体运行与天文观测，虽不以日常报时为主，却深刻参与古代授时体系的建构。',
    '其结构由多重环圈、天轴与支架构成，各环对应天球赤道、黄道等空间关系。',
    '通过环圈转动模拟日月星辰运行轨迹，辅助观测和校正历法，从而为授时提供依据。',
    '它体现了中国古代宇宙模型的系统化表达，是时间知识背后的天文学根基。',
    '/images/tools/armillary-sphere-cover.jpg'
),
(
    '天文钟', 'Astronomical Clock', 'tianwenzhong', '清', '清代', '机械报时', '明末清初吸收发展',
    '天文钟在中外技术交流背景下进入宫廷视野，成为中国古代晚期机械计时文化的重要见证。',
    '常以齿轮、钟摆、钟面与装饰性机芯构成，兼具报时、演示与陈设功能。',
    '依靠机械传动系统持续驱动指针或报时装置，实现较为精准的连续计时。',
    '它记录了中国传统时间文明在近世转型中的新形态，也见证了技术交流与审美趣味的双重变迁。',
    '/images/tools/astronomical-clock-cover.jpg'
);

-- ---------------------------------------------------------
-- 2. videos
-- 至少 10 条视频数据
-- ---------------------------------------------------------
INSERT INTO videos (
    timing_tool_id, title_zh, title_en, language, video_url,
    duration, description, thumbnail
) VALUES
(
    1, '日晷：借影知时的古老智慧', 'Sundial: Reading Time Through Shadows', '中文',
    'https://example.com/videos/sundial-zh', '06:18',
    '从晷针与晷盘的关系出发，介绍日晷如何把太阳的轨迹转化为可感知的时间。',
    '/images/thumbnails/video-sundial-zh.jpg'
),
(
    1, 'Understanding the Chinese Sundial', 'Understanding the Chinese Sundial', 'English',
    'https://example.com/videos/sundial-en', '05:42',
    'An introductory video explaining how ancient Chinese sundials reflected both science and ritual order.',
    '/images/thumbnails/video-sundial-en.jpg'
),
(
    2, '铜壶滴漏的宫廷时刻', 'Court Timekeeping with the Bronze Clepsydra', '中文',
    'https://example.com/videos/bronze-clepsydra-zh', '07:05',
    '聚焦铜壶滴漏在宫廷授时与礼仪生活中的作用，展现器物背后的制度意义。',
    '/images/thumbnails/video-clepsydra-zh.jpg'
),
(
    3, '漏刻原理演示', 'How the Water Clock Works', '中文 / English',
    'https://example.com/videos/water-clock-bilingual', '04:56',
    '通过动画演示受水、泄水与浮箭变化，帮助观众理解漏刻计时的连续性。',
    '/images/thumbnails/video-water-clock.jpg'
),
(
    4, '圭表与观象授时', 'Gnomon and Seasonal Observation', '中文',
    'https://example.com/videos/gnomon-zh', '08:11',
    '讲述圭表如何帮助古人判定节气，并由此建立农时与历法的关系。',
    '/images/thumbnails/video-gnomon.jpg'
),
(
    5, '水运仪象台：宋代机械文明的高峰', 'The Su Song Clock Tower', '中文',
    'https://example.com/videos/clocktower-zh', '09:24',
    '介绍水运仪象台的机械构造、报时系统与其在世界科技史中的重要地位。',
    '/images/thumbnails/video-clocktower-zh.jpg'
),
(
    5, 'Water-Powered Astronomy in Song China', 'Water-Powered Astronomy in Song China', 'English',
    'https://example.com/videos/clocktower-en', '07:48',
    'A concise overview of the astronomical clock tower and its ingenious water-driven transmission system.',
    '/images/thumbnails/video-clocktower-en.jpg'
),
(
    6, '香篆钟里的书房时间', 'Time in the Scholar’s Studio: Incense Clocks', '中文',
    'https://example.com/videos/incense-clock-zh', '05:36',
    '从香道、文房与日常审美切入，展现香篆钟如何让时间拥有可闻可感的意境。',
    '/images/thumbnails/video-incense-clock.jpg'
),
(
    8, '更鼓与古代城市夜巡', 'Night Watch Drums in Ancient Cities', '中文',
    'https://example.com/videos/night-watch-drum-zh', '06:02',
    '借助城楼报更制度，说明声音如何在古代城市中承担公共计时功能。',
    '/images/thumbnails/video-night-watch.jpg'
),
(
    10, '天文钟与宫廷机械美学', 'Astronomical Clocks and Courtly Mechanics', '中文 / English',
    'https://example.com/videos/astronomical-clock-bi', '08:30',
    '呈现清代天文钟的机械结构、装饰语言与跨文化交流背景。',
    '/images/thumbnails/video-astronomical-clock.jpg'
);

-- ---------------------------------------------------------
-- 3. articles
-- 至少 10 条文章数据
-- 文章来源限定：央视网 / 人民日报 / 新华社
-- ---------------------------------------------------------
INSERT INTO articles (
    timing_tool_id, title, source, publish_date,
    article_url, summary, cover_image
) VALUES
(
    1, '从日晷到时辰：中国古人如何把天空读成秩序', '人民日报', '2025-03-18',
    'https://example.com/articles/rmrb-sundial-order',
    '文章从日晷出发，讨论古代社会如何将天象观测、礼制安排与日常节律编织为一套有序的时间体系。',
    '/images/articles/article-sundial.jpg'
),
(
    2, '一滴一刻之间：铜壶滴漏中的制度文明', '新华社', '2024-11-02',
    'https://example.com/articles/xhs-clepsydra-civilization',
    '聚焦铜壶滴漏的工艺结构与宫廷应用，折射出古代国家对授时精度与公共秩序的重视。',
    '/images/articles/article-clepsydra.jpg'
),
(
    3, '漏刻为何能在中国古代长期延续', '央视网', '2025-01-09',
    'https://example.com/articles/cctv-water-clock',
    '文章结合天文观测与社会治理，分析漏刻在中国古代长期稳定使用的原因。',
    '/images/articles/article-water-clock.jpg'
),
(
    4, '圭表与节气：农耕文明中的时间基准', '人民日报', '2024-09-21',
    'https://example.com/articles/rmrb-gnomon-solar-terms',
    '从节气制度切入，梳理圭表在农耕社会中的观测价值与文化影响。',
    '/images/articles/article-gnomon.jpg'
),
(
    5, '水运仪象台何以成为科技史经典', '新华社', '2025-04-12',
    'https://example.com/articles/xhs-clocktower-history',
    '通过宋代科技成就的整体脉络，解读水运仪象台如何把机械、天文与报时整合为系统工程。',
    '/images/articles/article-clocktower.jpg'
),
(
    6, '香篆钟里的东方生活美学', '央视网', '2024-08-15',
    'https://example.com/articles/cctv-incense-clock-aesthetics',
    '从香文化与文人生活出发，呈现香篆钟在时间感知、空间氛围与审美经验中的独特位置。',
    '/images/articles/article-incense-clock.jpg'
),
(
    7, '火钟与民间工艺：燃烧中的分寸感', '人民日报', '2025-02-26',
    'https://example.com/articles/rmrb-fire-clock-craft',
    '文章关注火钟在民间生活中的使用场景，讨论传统工艺如何回应日常时间需求。',
    '/images/articles/article-fire-clock.jpg'
),
(
    8, '更鼓声里的古城夜色与公共时间', '新华社', '2024-12-30',
    'https://example.com/articles/xhs-night-watch-drum-city',
    '从夜巡、更楼和城市治理出发，书写更鼓如何让时间在城市空间中被共同听见。',
    '/images/articles/article-night-watch.jpg'
),
(
    9, '浑天仪背后的中国古代宇宙观', '央视网', '2025-03-03',
    'https://example.com/articles/cctv-armillary-cosmos',
    '围绕浑天仪的结构和观测功能，介绍中国古代关于天体运行与宇宙秩序的思想图景。',
    '/images/articles/article-armillary.jpg'
),
(
    10, '天文钟与中西技术交流的晚期回响', '人民日报', '2024-10-08',
    'https://example.com/articles/rmrb-astronomical-clock-exchange',
    '以宫廷收藏与机械制造为线索，讨论天文钟在中国近世时间文化中的新意义。',
    '/images/articles/article-astronomical-clock.jpg'
);

-- ---------------------------------------------------------
-- 4. images
-- 每条可关联「官方媒体 / 百科」原页面，供用户跳转查看配图与版权说明；image_kind 用于站内排序。
-- ---------------------------------------------------------
INSERT INTO images (
    timing_tool_id, title, image_url, caption, source, copyright_note,
    official_page_url, image_kind
) VALUES
(
    1, '日晷·百度百科词条配图', '/images/resources/sundial-1.jpg',
    '词条内汇集日晷形制、考古与示意图，便于对照不同材质与安置方式。',
    '百度百科',
    '配图版权归原平台及原作者所有，本站仅提供索引链接。',
    'https://baike.baidu.com/item/%E6%97%A5%E6%99%B7',
    '实拍图'
),
(
    1, '日晷与漏刻·央视新闻图解', '/images/resources/sundial-1.jpg',
    '央视网对日影计时与漏刻原理的图文阐释，含示意与场景图。',
    '央视网',
    '请在原站阅读完整报道与版权声明。',
    'https://news.cctv.com/2019/09/27/ARTIkxB8Pg3k6U6COkTDgyoP190927.shtml',
    '结构说明图'
),
(
    1, '古代科技·新华社配图报道', '/images/resources/sundial-1.jpg',
    '新华社科技频道对古代天文与计时文明的综合报道，文内配图可放大查看。',
    '新华社',
    '外链跳转至新华网，请遵守其转载与使用规范。',
    'https://www.news.cn/science/20240927/4a8f4c18164f48a1b1e1336ac6f713ad/c.html',
    '新闻报道配图'
),
(
    2, '漏刻·百度百科', '/images/resources/bronze-clepsydra-1.jpg',
    '漏刻类器物在百科中的结构分解与历史沿革插图索引。',
    '百度百科',
    '配图版权归原作者与平台，本站不托管原图文件。',
    'https://baike.baidu.com/item/%E6%BC%8F%E5%88%BB',
    '结构说明图'
),
(
    2, '铜壶滴漏·人民网文化', '/images/resources/bronze-clepsydra-1.jpg',
    '人民网文化版对古代工艺与计时器物的图文介绍。',
    '人民网',
    '请在原页面查看高清配图与使用条款。',
    'https://culture.people.com.cn/n1/2021/0120/c1013-32006030.html',
    '实拍图'
),
(
    2, '漏刻计时·央视网报道', '/images/resources/bronze-clepsydra-1.jpg',
    '央视网新闻频道对古代漏刻计时原理的图解与说明。',
    '央视网',
    '外链至央视网，配图以原站展示为准。',
    'https://news.cctv.com/2019/09/27/ARTIkxB8Pg3k6U6COkTDgyoP190927.shtml',
    '新闻报道配图'
),
(
    3, '漏刻·百科与示意图', '/images/resources/water-clock-1.jpg',
    '受水型、泄水型漏刻示意与馆藏介绍入口。',
    '百度百科',
    '原站词条含多幅说明图。',
    'https://baike.baidu.com/item/%E6%BC%8F%E5%88%BB',
    '结构说明图'
),
(
    3, '漏刻·新华社科技', '/images/resources/water-clock-1.jpg',
    '主流媒体对古代连续计时与天文制度的图文阐释。',
    '新华社',
    '跳转新华网查看配图与署名信息。',
    'https://www.news.cn/science/20240927/4a8f4c18164f48a1b1e1336ac6f713ad/c.html',
    '新闻报道配图'
),
(
    3, '漏刻·央视网专题图', '/images/resources/water-clock-1.jpg',
    '央视网对日晷、漏刻并列介绍的专题配图页。',
    '央视网',
    '请在原站浏览完整图集。',
    'https://news.cctv.com/2019/09/27/ARTIkxB8Pg3k6U6COkTDgyoP190927.shtml',
    '实拍图'
),
(
    4, '圭表·百度百科', '/images/resources/gnomon-1.jpg',
    '圭表测影、节气与观象授时在百科中的图文说明。',
    '百度百科',
    '词条内插图版权归原平台。',
    'https://baike.baidu.com/item/%E5%9C%AD%E8%A1%A8',
    '结构说明图'
),
(
    4, '圭表与节气·人民日报报道', '/images/resources/gnomon-1.jpg',
    '人民日报客户端或网站对节气、圭表与农耕文明的配图报道（以原站为准）。',
    '人民日报',
    '请进入人民网系原页面查看配图与版权。',
    'https://society.people.com.cn/n1/2025/1224/c1008-40630824.html',
    '新闻报道配图'
),
(
    4, '观象授时·央视网', '/images/resources/gnomon-1.jpg',
    '央视网文化/科技类稿件中的天文仪器与测影示意。',
    '央视网',
    '外链跳转。',
    'https://news.cctv.com/2019/09/27/ARTIkxB8Pg3k6U6COkTDgyoP190927.shtml',
    '实拍图'
),
(
    5, '水运仪象台·百度百科', '/images/resources/clocktower-1.jpg',
    '北宋水运仪象台结构、复原模型与历史图片索引。',
    '百度百科',
    '百科词条配图索引。',
    'https://baike.baidu.com/item/%E6%B0%B4%E8%BF%90%E4%BB%AA%E8%B1%A1%E5%8F%B0',
    '模型复原图'
),
(
    5, '苏颂与水运仪象台·百科', '/images/resources/clocktower-1.jpg',
    '人物与仪器合条，含《新仪象法要》相关插图说明。',
    '百度百科',
    '外链至百度百科。',
    'https://baike.baidu.com/item/%E8%8B%8F%E9%A2%82%E4%B8%8E%E6%B0%B4%E8%BF%90%E4%BB%AA%E8%B1%A1%E5%8F%B0/15650854',
    '结构说明图'
),
(
    5, '水运仪象台·新华网科技', '/images/resources/clocktower-1.jpg',
    '主流媒体对中国古代天文机械成就的配图报道。',
    '新华社',
    '跳转新华网。',
    'https://www.news.cn/science/20240927/4a8f4c18164f48a1b1e1336ac6f713ad/c.html',
    '新闻报道配图'
),
(
    6, '香篆·百度百科', '/images/resources/incense-clock-1.jpg',
    '香道、燃香计时相关词条中的器物与纹样图。',
    '百度百科',
    '以原站展示为准。',
    'https://baike.baidu.com/item/%E9%A6%99%E7%82%AD',
    '实拍图'
),
(
    6, '香文化·人民网', '/images/resources/incense-clock-1.jpg',
    '人民网文化频道对传统香事、文房器物的图文介绍。',
    '人民网',
    '请在原站查看配图。',
    'https://culture.people.com.cn/n1/2021/0120/c1013-32006030.html',
    '新闻报道配图'
),
(
    6, '书房时间·央视网', '/images/resources/incense-clock-1.jpg',
    '央视网对古人时间观念与生活美学的影像与配图专题。',
    '央视网',
    '外链至央视网。',
    'https://caiyi.cctv.com/2025/01/10/ARTIKhuw3rClwamLzKNYkcgX250110.shtml',
    '结构说明图'
),
(
    7, '漏刻与民间计时·百科', '/images/resources/fire-clock-1.jpg',
    '漏刻、燃香等计时方式在百科中的综合说明与插图。',
    '百度百科',
    '百科索引。',
    'https://baike.baidu.com/item/%E6%BC%8F%E5%88%BB',
    '结构说明图'
),
(
    7, '传统工艺·人民网', '/images/resources/fire-clock-1.jpg',
    '人民网对传统工艺与民间器物的图文报道。',
    '人民网',
    '原站配图。',
    'https://culture.people.com.cn/n1/2021/0120/c1013-32006030.html',
    '实拍图'
),
(
    7, '燃烧计时·央视网', '/images/resources/fire-clock-1.jpg',
    '央视网科普类稿件中的示意与场景图。',
    '央视网',
    '外链。',
    'https://news.cctv.com/2019/09/27/ARTIkxB8Pg3k6U6COkTDgyoP190927.shtml',
    '新闻报道配图'
),
(
    8, '更鼓·百度百科', '/images/resources/night-watch-drum-1.jpg',
    '古代城市报更、更鼓制度与城楼图像索引。',
    '百度百科',
    '百科词条。',
    'https://baike.baidu.com/item/%E6%9B%B4%E9%BC%93',
    '实拍图'
),
(
    8, '古城夜色·新华社', '/images/resources/night-watch-drum-1.jpg',
    '新华社对城市历史与公共时间的图文报道（以原站为准）。',
    '新华社',
    '跳转新华网。',
    'https://www.news.cn/science/20240927/4a8f4c18164f48a1b1e1336ac6f713ad/c.html',
    '新闻报道配图'
),
(
    8, '夜巡与报更·央视网', '/images/resources/night-watch-drum-1.jpg',
    '央视网文化类报道中的配图与场景说明。',
    '央视网',
    '外链。',
    'https://news.cctv.com/2019/09/27/ARTIkxB8Pg3k6U6COkTDgyoP190927.shtml',
    '结构说明图'
),
(
    9, '浑天仪·百度百科', '/images/resources/armillary-1.jpg',
    '浑天仪结构、简仪沿革与天文示意插图。',
    '百度百科',
    '百科原图版权归原作者与平台。',
    'https://baike.baidu.com/item/%E6%B5%B8%E5%A4%A9%E4%BB%AA',
    '结构说明图'
),
(
    9, '中国古代天文·人民网', '/images/resources/armillary-1.jpg',
    '人民网对古代天文仪器与宇宙观的图文阐释。',
    '人民网',
    '原站查看。',
    'https://culture.people.com.cn/n1/2019/0726/c1013-31257663-2.html',
    '新闻报道配图'
),
(
    9, '浑象与观测·央视网', '/images/resources/armillary-1.jpg',
    '央视网相关报道中的仪器与示意图片。',
    '央视网',
    '外链。',
    'https://news.cctv.com/2019/09/27/ARTIkxB8Pg3k6U6COkTDgyoP190927.shtml',
    '实拍图'
),
(
    10, '自鸣钟·百度百科', '/images/resources/astronomical-clock-1.jpg',
    '机械钟、自鸣钟词条中的结构图与宫廷陈设图索引。',
    '百度百科',
    '百科配图索引。',
    'https://baike.baidu.com/item/%E8%87%AA%E9%B8%A3%E9%92%9F',
    '模型复原图'
),
(
    10, '清宫钟表·人民网', '/images/resources/astronomical-clock-1.jpg',
    '人民网对世界遗产、宫廷文物的图文报道（以原站为准）。',
    '人民网',
    '请在原站核对版权。',
    'https://world.people.com.cn/n1/2024/0202/c1002-40171878.html',
    '馆藏与展览'
),
(
    10, '天文钟·新华社', '/images/resources/astronomical-clock-1.jpg',
    '新华社对科技史与中西交流的配图报道。',
    '新华社',
    '跳转新华网。',
    'https://www.news.cn/science/20240927/4a8f4c18164f48a1b1e1336ac6f713ad/c.html',
    '新闻报道配图'
);

COMMIT;
