# Backend - Sweet Shop

## Setup

1. Copy `.env.example` to `.env` and set DATABASE_URL and JWT_SECRET.
2. Start PostgreSQL (see docker-compose.yml at repo root).
3. Install dependencies:
   ```
   cd backend
   npm install
   ```
4. Initialize DB:
   ```
   node src/init_db.js
   ```
5. Start server:
   ```
   npm run dev
   ```

## Tests
```
npm test
```
