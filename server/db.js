import pg from 'pg';
import 'dotenv/config';

// Return DATE columns as plain 'YYYY-MM-DD' strings instead of JS Date
// objects. This avoids time zone bugs where a date shows up one day off.
pg.types.setTypeParser(1082, (value) => value);

// A Pool keeps a few database connections open and reuses them,
// so you don't have to connect/disconnect for every request.
// The connection details come from your .env file.
const pool = new pg.Pool({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT) || 5432,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  // Fail after 10 seconds instead of hanging (usually means you're off Lehigh's network)
  connectionTimeoutMillis: 10000,
});

export default pool;
