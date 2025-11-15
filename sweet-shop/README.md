# Sweet Shop Management System - Full Stack (Scaffold)

This repository contains a complete scaffold for the Sweet Shop Management System:
- Backend: Node.js + Express + PostgreSQL
- Frontend: React + Vite + Tailwind (scaffold included)
- Docker Compose to run PostgreSQL
- Tests (Jest + Supertest) for backend

## How to run locally (cloud-friendly, works on macOS using Codespaces/Gitpod)

1. Start PostgreSQL with Docker:
   ```
   docker-compose up -d
   ```
2. Backend:
   ```
   cd backend
   cp .env.example .env
   npm install
   node src/init_db.js
   npm run dev
   ```
3. Frontend:
   ```
   cd frontend
   npm install
   npm run dev
   ```

## My AI Usage (Template)
- Tools used: ChatGPT (to scaffold project structure and generate code snippets).
- How used: Generated initial backend and frontend scaffolding, sample tests, and README content.
- Reflection: Used AI to accelerate bootstrapping; manually reviewed and adjusted logic, ensuring tests and authentication meet requirements.

