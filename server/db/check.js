// Checks that your database login works for this project:  npm run db:check
//
// It connects with the details in your .env, makes sure your tables will be
// created in your own schema, then does a dry run of everything the app
// does (create the table, add, update, and delete a book) inside a
// transaction that is rolled back. Your real data is never changed.
import { readFile } from 'node:fs/promises';

const schemaSql = await readFile(new URL('./schema.sql', import.meta.url), 'utf8');

// Who am I, and where would `CREATE TABLE books` put the table?
export const WHOAMI_SQL = `
SELECT current_user                    AS username,
       current_database()              AS database,
       current_schema()                AS schema,
       current_setting('search_path')  AS search_path,
       n.oid IS NOT NULL               AS own_schema_exists,
       n.oid IS NOT NULL AND has_schema_privilege(n.oid, 'CREATE') AS can_create
FROM (SELECT 1) AS one
LEFT JOIN pg_namespace n ON n.nspname = current_user`;

// The dry run. ROLLBACK at the end undoes all of it.
export const DRY_RUN_SQL = `
BEGIN;
${schemaSql}
INSERT INTO books (title, author, status, date_added)
  VALUES ('db:check', 'db:check', 'Reading', CURRENT_DATE);
UPDATE books SET status = 'Finished', rating = 5 WHERE title = 'db:check';
DELETE FROM books WHERE title = 'db:check';
SELECT current_schema() AS created_in, COUNT(*)::int AS sample_rows FROM books;
ROLLBACK;`;

if (process.argv.includes('--print-sql')) {
  console.log(`${WHOAMI_SQL};\n${DRY_RUN_SQL}`);
  process.exit(0);
}

const { default: pool } = await import('../db.js');

function fail(message, hint) {
  console.error(`\nFAIL: ${message}`);
  if (hint) console.error(hint);
  process.exitCode = 1;
}

try {
  console.log(`Connecting to ${process.env.PGDATABASE} on ${process.env.PGHOST} as ${process.env.PGUSER}...`);
  const { rows: [me] } = await pool.query(WHOAMI_SQL);
  console.log(`Connected as "${me.username}". search_path: ${me.search_path}`);

  if (!me.own_schema_exists) {
    fail(
      `There is no schema named "${me.username}" in ${me.database}.`,
      'Send this output to your instructor; your account needs a schema.'
    );
  } else if (!me.can_create) {
    fail(
      `You can't create tables in your schema "${me.username}".`,
      'Send this output to your instructor; your account needs CREATE on its schema.'
    );
  } else if (me.schema !== me.username) {
    fail(
      `New tables would go in "${me.schema ?? '(nowhere)'}", not your own schema "${me.username}".`,
      'Send this output to your instructor; your search_path needs fixing.'
    );
  } else {
    const results = await pool.query(DRY_RUN_SQL);
    const summary = results.find((r) => r.command === 'SELECT').rows[0];
    console.log(
      `Dry run OK: created books in "${summary.created_in}" with ${summary.sample_rows} sample rows, ` +
        'then added, updated, and deleted a test book. Nothing was saved.'
    );
    console.log('\nPASS: your database is ready. Next: npm run db:setup');
  }
} catch (err) {
  if (/timeout|ENOTFOUND|ECONNREFUSED|ETIMEDOUT|EHOSTUNREACH/i.test(err.message)) {
    fail(`Can't reach the database server (${err.message}).`, "Are you on Lehigh's network or VPN?");
  } else if (/password|authentication/i.test(err.message)) {
    fail(`Login failed (${err.message}).`, 'Check PGUSER and PGPASSWORD in your .env file.');
  } else if (/permission denied for database|not have CONNECT/i.test(err.message)) {
    fail(`You don't have access to this database (${err.message}).`, 'Send this output to your instructor.');
  } else {
    fail(err.message, 'Send this output to your instructor.');
  }
} finally {
  await pool.end();
}
