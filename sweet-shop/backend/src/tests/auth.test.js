const request = require('supertest');
const app = require('../index');
const db = require('../db');

describe('Auth flow', () => {
  beforeAll(async ()=> {
    // ensure tables exist
    await db.query(`CREATE TABLE IF NOT EXISTS users (id VARCHAR(100) PRIMARY KEY, name TEXT, email TEXT UNIQUE, password TEXT, role TEXT)`);
    await db.query('DELETE FROM users');
  });
  afterAll(async ()=> { await db.pool.end(); });

  test('register and login', async () => {
    const reg = await request(app).post('/api/auth/register').send({ name:'Test', email:'t1@example.com', password:'pass123' });
    expect(reg.statusCode).toBe(201);
    const login = await request(app).post('/api/auth/login').send({ email:'t1@example.com', password:'pass123' });
    expect(login.statusCode).toBe(200);
    expect(login.body.token).toBeDefined();
  }, 10000);
});
