import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: 5432,
  user: process.env.DB_USER || "guestara",
  password: process.env.DB_PASSWORD || "guestara",
  database: process.env.DB_NAME || "guestara",
  max: 10,                // max connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
