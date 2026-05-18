/**
 * 为已存在的 timing.db 增加 images.official_page_url 与 images.image_kind 列。
 * 若列已存在则忽略错误。仅改表结构，不写入外链数据；完整数据请执行 npm run db:init 重新导入 seed。
 */
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.join(__dirname, '..', 'db', 'timing.db');
const db = new sqlite3.Database(dbPath);

function runIgnoreDupColumn(sql) {
  return new Promise((resolve) => {
    db.run(sql, (err) => {
      if (err && /duplicate column name/i.test(String(err.message))) {
        resolve();
        return;
      }
      if (err) {
        console.error(err.message);
      }
      resolve();
    });
  });
}

async function main() {
  await runIgnoreDupColumn('ALTER TABLE images ADD COLUMN official_page_url TEXT;');
  await runIgnoreDupColumn('ALTER TABLE images ADD COLUMN image_kind TEXT;');
  db.close(() => {
    console.log('images 表列迁移完成（若库为旧版结构）。完整示例数据请运行: npm run db:init');
  });
}

main();
