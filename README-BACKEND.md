```markdown
# GovBet Demo Backend

This is a small demo backend for GovBet front-end. It provides:
- demo auth (email only)
- sessions via cookie (express-session)
- demo wallet and deposit endpoint
- demo games list and /runtime demo slot pages
- demo game result endpoint that updates wallet balance

NOT FOR PRODUCTION: this demo uses in-memory / file persistence and is intended only for local testing / demo.

Quick start (local)
1. Ensure Node 18+ installed.
2. Place files in your repo root: server.js, package.json, games.json, Dockerfile, .env.example
3. Install deps:
   ```
   npm ci
   ```
4. Start server:
   ```
   npm start
   ```
   or for development:
   ```
   npm run dev
   ```
5. Open http://localhost:3000
   - API endpoints:
     - POST /api/auth/demo-login  { "email": "you@example.com" }  -> logs in and sets cookie
     - GET  /api/profile -> user + wallet
     - GET  /api/games -> list games
     - GET  /api/launch?gameId=prag-001 -> returns runtimeUrl
     - GET  /runtime/:gameId?t=TOKEN -> opens demo slot iframe
     - POST /api/wallet/deposit { amount } -> increase demo balance (requires session)
     - POST /api/game/result { gameId, bet, win, token } -> updates wallet balance (demo)

Docker
1. Build:
   ```
   docker build -t govbet-demo-backend .
   ```
2. Run:
   ```
   docker run -p 3000:3000 --env-file .env.example govbet-demo-backend
   ```

How to connect with frontend
- Frontend should call /api/auth/demo-login to create session (set cookie), then call /api/launch?gameId= to get runtimeUrl and open iframe.
- The runtime pages call POST /api/game/result to update wallet.

Security notes
- For production use a real DB (Postgres), persistent session store (Redis), secure cookies (Secure, SameSite), TLS, CSP, secrets manager.
- Never put provider API keys in frontend. Use backend to request signed runtime URLs or proxy requests.

If you want, I can:
- provide a docker-compose for backend + Postgres,
- add JWT-based auth instead of session,
- add sample provider integration stubs (Pragmatic / NetEnt) using sandbox docs.
```
