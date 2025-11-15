/*
Run this script to create tables (requires DATABASE_URL set).
node src/init_db.js
*/
const db = require('./db');

async function run(){
  await db.query(`CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(100) PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user'
  )`);
  await db.query(`CREATE TABLE IF NOT EXISTS sweets (
    id VARCHAR(100) PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price NUMERIC NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0
  )`);
  console.log('OK');
  process.exit(0);
}

run().catch(e=>{ console.error(e); process.exit(1); });
