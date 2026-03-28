# FuncLexa

MERN SaaS workspace with:
- React + Tailwind frontend
- Node + Express backend
- MongoDB-ready config
- Reverse proxy paths under `/apps/*`
- Local mode and account mode routing

## Run

From project root:

```bash
npm run dev
```

This starts:
- Client: `http://localhost:5173`
- Server: `http://localhost:5000`

## Environment

Root `.env` is used by server config.

Required for local dev:
- `PORT`
- `CLIENT_URL`
- `MONGODB_URI` (or set `SKIP_DB=true`)
- `JWT_SECRET`

## Useful endpoints

- `GET /api/health`
- `GET /api/products`
- `GET /api/usage/summary`
- `GET /api/usage/recent`
- `POST /api/auth/mock-login`
