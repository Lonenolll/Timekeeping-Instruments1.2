const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const projectRoot = path.join(__dirname, '..');
const dbDir = path.join(projectRoot, 'db');
const dbPath = path.join(dbDir, 'timing.db');
const schemaPath = path.join(projectRoot, 'schema.sql');
const seedPath = path.join(projectRoot, 'seed.sql');

/**
 * 读取 SQL 文件内容。
 */
function readSqlFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

/**
 * 一次性执行整段 SQL（可含多条语句）。比逐条 run + 手写事务更不易出现 COMMIT/ROLLBACK 竞态。
 */
function runExec(db, sqlContent, label) {
  return new Promise((resolve, reject) => {
    db.exec(sqlContent, (err) => {
      if (err) {
        reject(new Error(`${label} 执行失败: ${err.message}`));
        return;
      }

      resolve();
    });
  });
}

/**
 * 按分号切分 SQL 语句并逐条执行（保留给仅需简单脚本时使用）。
 */
function runStatements(db, sqlContent, label) {
  return new Promise((resolve, reject) => {
    const statements = sqlContent
      .split(/;\s*(?:\r?\n|$)/)
      .map((statement) => statement.trim())
      .filter(Boolean);

    db.serialize(() => {
      db.run('BEGIN TRANSACTION');

      let hasError = false;

      statements.forEach((statement) => {
        if (hasError) {
          return;
        }

        db.run(statement, (err) => {
          if (err) {
            hasError = true;
            db.run('ROLLBACK');
            reject(new Error(`${label} 执行失败: ${err.message}`));
          }
        });
      });

      db.run('COMMIT', (err) => {
        if (hasError) {
          return;
        }

        if (err) {
          reject(new Error(`${label} 提交失败: ${err.message}`));
          return;
        }

        resolve();
      });
    });
  });
}

async function main() {
  try {
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }

    if (!fs.existsSync(schemaPath)) {
      throw new Error(`未找到 schema.sql: ${schemaPath}`);
    }

    if (!fs.existsSync(seedPath)) {
      throw new Error(`未找到 seed.sql: ${seedPath}`);
    }

    const schemaSql = readSqlFile(schemaPath);
    const seedSql = readSqlFile(seedPath);

    const db = new sqlite3.Database(dbPath);

    await new Promise((resolve, reject) => {
      db.run('PRAGMA foreign_keys = OFF;', (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });

    // 初始化时先删除旧表，避免重复导入导致主键和数据堆叠。
    await runExec(
      db,
      `
      DROP TABLE IF EXISTS videos;
      DROP TABLE IF EXISTS articles;
      DROP TABLE IF EXISTS images;
      DROP TABLE IF EXISTS timing_tools;
      `,
      '旧表清理'
    );

    await runExec(db, schemaSql, '数据表结构初始化');
    await runExec(db, seedSql, '示例数据导入');

    await new Promise((resolve, reject) => {
      db.run('PRAGMA foreign_keys = ON;', (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });

    db.close((err) => {
      if (err) {
        console.error('数据库关闭失败:', err.message);
        process.exit(1);
        return;
      }

      console.log('数据库初始化完成');
      console.log(`数据库文件: ${dbPath}`);
      console.log('已完成: 建表 + 示例数据导入');
    });
  } catch (error) {
    console.error('数据库初始化失败:', error.message);
    process.exit(1);
  }
}

main();
