const request = require('supertest');
const app = require('../index');
const db = require('../db');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

describe('Sweets APIs', () => {
  let adminToken;
  beforeAll(async ()=> {
    await db.query(`CREATE TABLE IF NOT EXISTS users (id VARCHAR(100) PRIMARY KEY, name TEXT, email TEXT UNIQUE, password TEXT, role TEXT)`);
    await db.query(`CREATE TABLE IF NOT EXISTS sweets (id VARCHAR(100) PRIMARY KEY, name TEXT, category TEXT, price NUMERIC, quantity INTEGER)`);
    await db.query('DELETE FROM users');
    await db.query('DELETE FROM sweets');
    const id = uuidv4();
    const hashed = await bcrypt.hash('adminpass',10);
    await db.query('INSERT INTO users(id,name,email,password,role) VALUES($1,$2,$3,$4,$5)', [id,'Admin','admin@x.com',hashed,'admin']);
    adminToken = jwt.sign({ id, role:'admin', name:'Admin' }, JWT_SECRET, { expiresIn: '1d' });
  });
  afterAll(async ()=> { await db.pool.end(); });

  test('create sweet by admin', async () => {
    const r = await request(app).post('/api/sweets').set('Authorization','Bearer '+adminToken).send({ name:'Ladoo', category:'Traditional', price:30, quantity:10 });
    expect(r.statusCode).toBe(201);
    expect(r.body.name).toBe('Ladoo');
  }, 10000);
});
