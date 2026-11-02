// Creates the books table (with sample rows) in your own schema on the
// class database. Run it with:  npm run db:setup
// Running it again wipes your books and starts over.
import { readFile } from 'node:fs/promises';
import pool from '../db.js';

const schemaPath = new URL('./schema.sql', import.meta.url);

try {
  const sql = await readFile(schemaPath, 'utf8');
  await pool.query(sql);
  const { rows } = await pool.query(
    'SELECT current_schema() AS schema, COUNT(*)::int AS count FROM books'
  );
  console.log(`Created books in schema "${rows[0].schema}" with ${rows[0].count} sample rows.`);
} catch (err) {
  console.error('Database setup failed:', err.message);
  if (/timeout|ENOTFOUND|ECONNREFUSED|ETIMEDOUT/i.test(err.message)) {
    console.error("Can't reach the server. Are you on Lehigh's network or VPN?");
  } else if (/password|authentication/i.test(err.message)) {
    console.error('Check PGUSER and PGPASSWORD in your .env file.');
  }
  process.exitCode = 1;
} finally {
  await pool.end();
}
