const extraQizhigeVideos = [
  {
    timing_tool_id: 1,
    title_zh: '故宫100：光影时间',
    title_en: 'Sundial and Time in the Forbidden City',
    language: '中文',
    video_url: 'https://tv.cctv.com/2017/06/12/VIDEYKBN5fzfgGTGAs9o7Psi170612.shtml',
    duration: '',
    description: '以故宫语境中的光影与时间为线索，补充日晷作为日影计时器具的观看材料。',
    thumbnail: '/images/tools/sundial-cover.svg'
  },
  {
    timing_tool_id: 4,
    title_zh: '来了解一下古代的计时工具——圭表',
    title_en: 'Ancient Timekeeping Tool: Gnomon',
    language: '中文',
    video_url: 'https://tv.cctv.com/2023/02/01/VIDE2LwUiKmF5bCfmnEtcuF7230201.shtml',
    duration: '',
    description: '围绕圭表的观象授时功能展开，适合作为节气、影长与古代时间基准的入门视频。',
    thumbnail: '/images/tools/gnomon-cover.svg'
  },
  {
    timing_tool_id: 2,
    title_zh: '国宝档案：古代科技——元代铜壶滴漏',
    title_en: 'Yuan Dynasty Bronze Clepsydra',
    language: '中文',
    video_url: 'https://tv.cctv.com/2012/12/10/VIDA1355146982635611.shtml',
    duration: '',
    description: '聚焦铜壶滴漏这一水力计时器具，呈现其结构、制度用途与古代科技价值。',
    thumbnail: '/images/tools/bronze-clepsydra-cover.svg'
  },
  {
    timing_tool_id: 5,
    title_zh: '令李约瑟魂牵梦绕的仪器——水运仪象台',
    title_en: 'Water-powered Astronomical Clock Tower',
    language: '中文',
    video_url: 'https://tv.cctv.com/2021/12/15/VIDEnOxVaJWm5X71HedEWf8b211215.shtml',
    duration: '',
    description: '从科技史视角介绍水运仪象台，突出宋代机械、天文观测与报时系统的综合成就。',
    thumbnail: '/images/tools/astronomical-clock-tower-cover.svg'
  },
  {
    timing_tool_id: 5,
    title_zh: '创造科技的力量：通天神器（上）',
    title_en: 'Heavenly Instrument: Su Song’s Clock Tower',
    language: '中文',
    video_url: 'https://tv.cctv.com/2015/01/04/VIDE1420336291615853.shtml',
    duration: '',
    description: '以大型古代科技工程为叙事重点，补充水运仪象台的复原、结构与历史意义。',
    thumbnail: '/images/tools/astronomical-clock-tower-cover.svg'
  },
  {
    timing_tool_id: 10,
    title_zh: '故宫100：天地交泰',
    title_en: 'Imperial Mechanical Clocks in the Forbidden City',
    language: '中文',
    video_url: 'https://tv.cctv.com/2012/02/27/VIDE1361429360249860.shtml',
    duration: '',
    description: '从故宫宫廷陈设与机械报时器物切入，补充清代天文钟和自鸣钟的文化背景。',
    thumbnail: '/images/tools/astronomical-clock-cover.svg'
  },
  {
    timing_tool_id: 10,
    title_zh: '故宫知多少：自鸣钟悬案',
    title_en: 'The Mystery of the Zimingzhong',
    language: '中文',
    video_url: 'https://tv.cctv.com/2023/11/12/VIDEGiMvMaCmf3DtJfbMRcTP231112.shtml',
    duration: '',
    description: '以自鸣钟故事为入口，展示宫廷机械钟表背后的技术流动与收藏语境。',
    thumbnail: '/images/tools/astronomical-clock-cover.svg'
  },
  {
    timing_tool_id: 6,
    title_zh: '龙洋体验打香篆',
    title_en: 'Incense Seal Experience',
    language: '中文',
    video_url: 'https://tv.cctv.com/2025/05/03/VIDEFcPLbs7uM0X793DDd3jm250503.shtml',
    duration: '',
    description: '通过打香篆体验呈现香文化与时间感知，为香篆钟的生活美学提供影像补充。',
    thumbnail: '/images/tools/incense-clock-cover.svg'
  },
  {
    timing_tool_id: 9,
    title_zh: '中华考工记：航天工业篇',
    title_en: 'From Armillary Sphere to Aerospace',
    language: '中文',
    video_url: 'https://tv.cctv.com/2025/11/23/VIDE8rbaUgr3tjlwO7cw4gkR251123.shtml',
    duration: '',
    description: '从古代天文仪器到现代航天工业的知识脉络，适合作为浑天仪相关延伸观看。',
    thumbnail: '/images/tools/armillary-sphere-cover.svg'
  },
  {
    timing_tool_id: 2,
    title_zh: '我有传家宝：元代铜壶滴漏',
    title_en: 'Family Treasure: Yuan Dynasty Bronze Clepsydra',
    language: '中文',
    video_url: 'https://tv.cctv.com/2019/07/07/VIDE0AZkH0m4vPbJ1TG3GGwZ190707.shtml',
    duration: '',
    description: '以文物故事方式讲述铜壶滴漏，补充水力计时器在古代公共授时中的历史价值。',
    thumbnail: '/images/tools/bronze-clepsydra-cover.svg'
  },
  {
    timing_tool_id: 1,
    title_zh: '跟着书本去旅行：以影测时',
    title_en: 'Measuring Time by Shadow',
    language: '中文',
    video_url: 'https://www.bilibili.com/video/BV1SxyoYtEkh/?spm_id_from=333.337.search-card.all.click',
    duration: '',
    description: '从书本知识延伸到实地观察，解释日影变化与古代日晷计时之间的关系。',
    thumbnail: '/images/tools/sundial-cover.svg'
  },
  {
    timing_tool_id: 4,
    title_zh: '跟着书本去旅行：立竿见影',
    title_en: 'Seeing the Shadow: Gnomon and Solar Terms',
    language: '中文',
    video_url: 'https://tv.cctv.com/2025/07/24/VIDE9jwud1eSjvHbk5Nrq7nA250724.shtml',
    duration: '',
    description: '以“立竿见影”为线索，呈现圭表、影长观测和节气知识之间的联系。',
    thumbnail: '/images/tools/gnomon-cover.svg'
  },
  {
    timing_tool_id: 8,
    title_zh: '钟鼓楼：城市中轴线上的时间声音',
    title_en: 'Bell and Drum Towers: Time on the Central Axis',
    language: '中文',
    video_url: 'https://news.cctv.com/2024/11/02/ARTIXNXHL0vIEX0LiBUX6n2K241102.shtml',
    duration: '',
    description: '围绕钟鼓楼与城市时间展开，可作为更鼓、报更制度和城市公共时间的影像延伸。',
    thumbnail: '/images/tools/night-watch-drum-cover.svg'
  },
  {
    timing_tool_id: 10,
    title_zh: '如果国宝会说话：铜镀金写字人钟',
    title_en: 'Gilt Copper Automaton Clock',
    language: '中文',
    video_url: 'https://tv.cctv.com/2023/11/12/VIDEGiMvMaCmf3DtJfbMRcTP231112.shtml',
    duration: '',
    description: '通过清宫机械钟表文物介绍宫廷钟表的工艺、陈设和中西技术交流背景。',
    thumbnail: '/images/tools/astronomical-clock-cover.svg'
  },
  {
    timing_tool_id: 9,
    title_zh: '如果国宝会说话：浑天仪',
    title_en: 'If Treasures Could Talk: Armillary Sphere',
    language: '中文',
    video_url: 'https://www.bilibili.com/video/BV1hT4y1B7Kf/?spm_id_from=333.337.search-card.all.click',
    duration: '',
    description: '以短片形式介绍浑天仪的结构意象和古代天文观念，适合作为浑天仪卡片的延伸视频。',
    thumbnail: '/images/tools/armillary-sphere-cover.svg'
  },
  {
    timing_tool_id: 5,
    title_zh: '科技里的中国：苏颂水运仪象台',
    title_en: 'Ancient Mechanics and Astronomical Timekeeping',
    language: '中文',
    video_url: 'https://www.bilibili.com/video/BV1pGUVBaEt4/?spm_id_from=333.337.search-card.all.click',
    duration: '',
    description: '从古代机械创造力切入，补充水运仪象台作为机械天文系统的技术背景。',
    thumbnail: '/images/tools/astronomical-clock-tower-cover.svg'
  }
];

const extraQizhigeArticles = [
  {
    timing_tool_id: 2,
    title: '为“北京时间”读秒',
    source: '人民日报',
    publish_date: '2025-01-02',
    article_url: 'http://paper.people.com.cn/rmrb/pc/content/202501/02/content_30049424.html',
    summary: '从国家授时体系切入，串联古代计时器具与现代精准授时，适合作为铜壶滴漏、漏刻等水力计时传统的延伸阅读。',
    cover_image: '/images/tools/bronze-clepsydra-cover.svg'
  },
  {
    timing_tool_id: 1,
    title: '“十二时辰”简史',
    source: '人民网',
    publish_date: '2019-07-26',
    article_url: 'http://culture.people.com.cn/n1/2019/0726/c1013-31257663-2.html',
    summary: '梳理十二时辰的历史文化背景，可与日晷、漏刻等器具共同说明古人的日常时间秩序。',
    cover_image: '/images/tools/sundial-cover.svg'
  },
  {
    timing_tool_id: 3,
    title: '十二时辰：古人的时间之美',
    source: '人民网转载光明日报',
    publish_date: '2025-01-10',
    article_url: 'http://yn.people.com.cn/n2/2025/0110/c372453-41103609.html',
    summary: '从十二时辰和传统生活节律展开，补充漏刻、水钟等连续计时方式的文化语境。',
    cover_image: '/images/tools/water-clock-cover.svg'
  },
  {
    timing_tool_id: 1,
    title: '协日正时：我国古代的计时制度',
    source: '人民论坛',
    publish_date: '2025-04-17',
    article_url: 'http://paper.people.com.cn/rmlt/pc/content/202504/17/content_30080950.html',
    summary: '从制度层面介绍古代计时、授时与社会秩序，可作为日晷和漏刻类器物的理论延伸。',
    cover_image: '/images/tools/sundial-cover.svg'
  },
  {
    timing_tool_id: 8,
    title: '古人计时习惯：一夜分五更',
    source: '人民网转载解放日报',
    publish_date: '2014-11-21',
    article_url: 'http://culture.people.com.cn/n/2014/1121/c22219-26067475.html',
    summary: '解释五更、夜间分时与传统作息，适合补充更鼓和城市夜间公共时间的背景。',
    cover_image: '/images/tools/night-watch-drum-cover.svg'
  },
  {
    timing_tool_id: 4,
    title: '“一寸光阴”到底有多久？',
    source: '人民日报',
    publish_date: '2025-03-22',
    article_url: 'http://paper.people.com.cn/rmrb/pad/content/202503/22/content_30063540.html',
    summary: '从“一寸光阴”的说法展开，连接日影测量、圭表观象与传统时间观念。',
    cover_image: '/images/tools/gnomon-cover.svg'
  },
  {
    timing_tool_id: 5,
    title: '有人说达·芬奇是“西方的苏颂”，那么苏颂又是谁？',
    source: '新华网',
    publish_date: '2025-06-20',
    article_url: 'https://www.news.cn/politics/20250620/79eddf5bff894c6282600fc4445eac83/c.html',
    summary: '介绍苏颂及其科技成就，可作为水运仪象台和宋代机械天文传统的重要延伸资料。',
    cover_image: '/images/tools/astronomical-clock-tower-cover.svg'
  },
  {
    timing_tool_id: 10,
    title: '从日晷到原子钟，我们如何确定时间？',
    source: '新华网/科普中国',
    publish_date: '2024-09-23',
    article_url: 'https://www.news.cn/science/20240923/755968a7deee4c50807feedc944e9745/c.html',
    summary: '以时间测量技术演进为主线，从日晷、机械钟延伸到现代原子钟，适合作为天文钟的跨时代对照。',
    cover_image: '/images/tools/astronomical-clock-cover.svg'
  },
  {
    timing_tool_id: 8,
    title: '北京又出了一个600多岁的网红',
    source: '央视网',
    publish_date: '2023-03-09',
    article_url: 'https://tv.cctv.com/2023/03/09/ARTI3t41NaGrt9nHVgb4sdbE230309.shtml',
    summary: '围绕钟鼓楼与城市时间展开，补充更鼓、报更制度和古代城市公共生活的传播材料。',
    cover_image: '/images/tools/night-watch-drum-cover.svg'
  },
  {
    timing_tool_id: 10,
    title: 'Antique clocks from China’s Palace Museum on exhibition in London',
    source: '新华网英文',
    publish_date: '2024-02-02',
    article_url: 'https://english.news.cn/20240202/967555726c554c8b80f20222253e5fb8/c.html',
    summary: '英文报道故宫古钟表海外展览，可补充清宫机械钟表与跨文化传播背景。',
    cover_image: '/images/tools/astronomical-clock-cover.svg'
  },
  {
    timing_tool_id: 8,
    title: '新华走笔：时间的玫瑰',
    source: '新华网',
    publish_date: '2024-11-15',
    article_url: 'https://www.news.cn/20241115/ded03e8075da4460b1a738dfb5dfec5b/c.html',
    summary: '从钟鼓楼与城市记忆书写时间文化，适合作为更鼓和报时空间的文学化延伸阅读。',
    cover_image: '/images/tools/night-watch-drum-cover.svg'
  },
  {
    timing_tool_id: 8,
    title: '古朴钟鼓楼 文化新地标',
    source: '人民日报',
    publish_date: '2024-08-19',
    article_url: 'http://paper.people.com.cn/rmrb/html/2024-08/19/nw.D110000renmrb_20240819_1-12.htm',
    summary: '从北京钟鼓楼的历史空间和当代公共文化展开，补充更鼓、报时建筑和城市时间记忆。',
    cover_image: '/images/tools/night-watch-drum-cover.svg'
  },
  {
    timing_tool_id: 4,
    title: '立竿见影 知时节',
    source: '人民日报海外版',
    publish_date: '2025-12-05',
    article_url: 'https://paper.people.com.cn/rmrbhwb/pc/layout/202512/25/node_01.html',
    summary: '围绕“立竿见影”与节气知识展开，适合作为圭表、日影测量和观象授时的延伸阅读。',
    cover_image: '/images/tools/gnomon-cover.svg'
  },
  {
    timing_tool_id: 1,
    title: '日晷：看得见的时间',
    source: '人民日报海外版',
    publish_date: '2024-06-14',
    article_url: 'https://paper.people.com.cn/rmrbhwb/html/2024-06/14/node_870.htm',
    summary: '以日晷的形制和使用方式为核心，帮助读者理解古人如何把太阳运动转化为可读时间。',
    cover_image: '/images/tools/sundial-cover.svg'
  },
  {
    timing_tool_id: 9,
    title: '星空中的科技智慧',
    source: '中国城市报',
    publish_date: '2024-05-27',
    article_url: 'https://paper.people.com.cn/zgcsb/html/2024-05/27/node_2591.htm',
    summary: '从天文观测与科技文明角度展开，可作为浑天仪、古代宇宙观和观象传统的补充材料。',
    cover_image: '/images/tools/armillary-sphere-cover.svg'
  },
  {
    timing_tool_id: 5,
    title: '中国古代科技：机械天文传统的高峰',
    source: '新华网',
    publish_date: '2024-09-27',
    article_url: 'https://www.news.cn/science/20240927/4a8f4c18164f48a1b1e1336ac6f713ad/c.html',
    summary: '从中国古代科技文明的整体脉络切入，适合作为水运仪象台和机械天文仪器的背景阅读。',
    cover_image: '/images/tools/astronomical-clock-tower-cover.svg'
  },
  {
    timing_tool_id: 6,
    title: '香事雅集里的时间美学',
    source: '央视网',
    publish_date: '2025-01-10',
    article_url: 'https://caiyi.cctv.com/2025/01/10/ARTIKhuw3rClwamLzKNYkcgX250110.shtml',
    summary: '从传统生活美学与香文化切入，补充香篆钟在感知时间、空间氛围和文人生活中的位置。',
    cover_image: '/images/tools/incense-clock-cover.svg'
  },
  {
    timing_tool_id: 10,
    title: '故宫钟表：时间里的中西交流',
    source: '人民网',
    publish_date: '2024-02-02',
    article_url: 'http://world.people.com.cn/n1/2024/0202/c1002-40171878.html',
    summary: '围绕故宫古钟表展览和文化交流展开，可作为清代天文钟、机械钟表传播的外部材料。',
    cover_image: '/images/tools/astronomical-clock-cover.svg'
  },
  {
    timing_tool_id: 3,
    title: '日晷和漏刻的计时原理',
    source: '央视网',
    publish_date: '2019-09-27',
    article_url: 'https://news.cctv.com/2019/09/27/ARTIkxB8Pg3k6U6COkTDgyoP190927.shtml',
    summary: '解释日晷和漏刻两类基础计时方式的原理，可作为漏刻、水钟和日影计时的综合说明。',
    cover_image: '/images/tools/water-clock-cover.svg'
  }
];

module.exports = {
  extraQizhigeVideos,
  extraQizhigeArticles
};
