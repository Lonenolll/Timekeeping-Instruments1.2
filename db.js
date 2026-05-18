const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// 指定 SQLite 数据库文件路径。
// 这里将数据库统一放在 db 目录下，文件名为 timing.db。
const dbPath = path.join(__dirname, 'timing.db');

// 创建数据库连接实例。
// 如果数据库文件不存在，SQLite 会自动创建该文件。
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('SQLite 数据库连接失败:', err.message);
    return;
  }

  console.log(`SQLite 数据库连接成功: ${dbPath}`);

  // 开启外键约束，确保 timing_tools 与 videos/articles/images 的关联关系有效。
  db.run('PRAGMA foreign_keys = ON;', (pragmaErr) => {
    if (pragmaErr) {
      console.error('外键约束开启失败:', pragmaErr.message);
      return;
    }

    console.log('SQLite 外键约束已开启');
  });
});

// 导出数据库实例，供路由、控制器或服务模块直接使用。
module.exports = db;
