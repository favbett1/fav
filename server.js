/**
 * GovBet Demo Backend (server.js)
 * - demo auth (email only)
 * - sessions via cookie (express-session, in-memory store) — OK for demo only
 * - demo users stored in data.json
 * - endpoints:
 *   POST /api/auth/demo-login  { email }
 *   GET  /api/profile
 *   GET  /api/games?provider=...
 *   GET  /api/launch?gameId=...
 *   POST /api/wallet/deposit  { amount }
 *   POST /api/game/result { gameId, result: { bet, win } }
 * - runtime pages served under /runtime/:gameId (simple demo slot UI)
 *
 * NOTE: For production use: use persistent DB (Postgres), secure session store, HTTPS, CSP, secrets manager.
 */
const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const session = require('express-session');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const DATA_FILE = path.join(__dirname, 'data.json');
const GAMES_FILE = path.join(__dirname, 'games.json');
const JWT_SECRET = process.env.JWT_SECRET || 'demo_secret_change_me';
const PORT = process.env.PORT || 3000;

// Load or initialize data store
let store = { users: {}, wallets: {}, sessions: {} };
if (fs.existsSync(DATA_FILE)) {
  try { store = JSON.parse(fs.readFileSync(DATA_FILE)); } catch (e) { console.error('Failed to parse data.json, starting fresh.'); }
}

// Auto persist every 5s (simple)
function persist() {
  try { fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2)); } catch (e) { console.error('Persist error', e); }
}
setInterval(persist, 5000);

const app = express();
app.use(bodyParser.json());
app.use(session({
  name: 'govbet_demo_sid',
  secret: process.env.SESSION_SECRET || 'demo_session_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24*60*60*1000 } // 1 day
}));

// CORS helper for local frontend (if hosted elsewhere)
app.use((req, res, next) => {
  // adjust origin in production
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// Utility
function saveNow(){ try { fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2)); } catch(e){console.error(e);} }
function uid(prefix='id'){ return prefix + '_' + crypto.randomBytes(6).toString('hex'); }
function requireAuth(req,res,next){
  if(req.session && req.session.userId && store.users[req.session.userId]) return next();
  return res.status(401).json({ error: 'unauthenticated' });
}

// Load games (fallback to minimal set if not present)
let GAMES = [];
if (fs.existsSync(GAMES_FILE)){
  try { GAMES = JSON.parse(fs.readFileSync(GAMES_FILE)); } catch(e){ console.warn('Invalid games.json, fallback'); }
}
if (!GAMES || !GAMES.length) {
  // minimal fallback
  GAMES = [
    { id:'prag-001', name:'Pragmatic Hot', provider:'pragmatic', type:'slots', runtimeUrl:'/runtime/prag-001' },
    { id:'net-001', name:'Star Spin', provider:'netent', type:'slots', runtimeUrl:'/runtime/net-001' },
    { id:'jack-001', name:'Mega Jackpot', provider:'progressive', type:'jackpot', runtimeUrl:'/runtime/jack-001' },
    { id:'live-01', name:'Royal Roulette', provider:'liveprovider', type:'live', runtimeUrl:'/runtime/live-01' }
  ];
}

// --- Auth endpoints (demo) ---
app.post('/api/auth/demo-login', (req,res)=>{
  const { email } = req.body || {};
  if(!email) return res.status(400).json({ error:'email_required' });
  // simple user creation if not exists
  let user = Object.values(store.users).find(u => u.email === email);
  if(!user){
    const id = uid('user');
    user = { id, email, createdAt: new Date().toISOString(), dob: null, kyc: 'none' };
    store.users[id] = user;
    // create wallet
    store.wallets[id] = { userId:id, balance: 0.0, currency: 'DEMO' };
    saveNow();
  }
  req.session.userId = user.id;
  res.json({ ok:true, user, token: jwt.sign({ uid:user.id }, JWT_SECRET, { expiresIn: '7d' }) });
});

// logout
app.post('/api/auth/logout', (req,res)=>{
  req.session.destroy(()=>{ res.json({ ok:true }); });
});

// profile
app.get('/api/profile', (req,res)=>{
  const userId = req.session.userId;
  if(!userId || !store.users[userId]) return res.json({ user: null });
  const user = store.users[userId];
  const wallet = store.wallets[userId] || { balance:0, currency:'DEMO' };
  res.json({ user, wallet });
});

// --- Games API ---
app.get('/api/games', (req,res)=>{
  const { provider } = req.query;
  let list = GAMES.slice();
  if(provider && provider !== 'all') list = list.filter(g => (g.provider||'').toLowerCase() === (provider||'').toLowerCase());
  res.json(list);
});

// --- Launch game (returns runtime URL or signed token) ---
app.get('/api/launch', requireAuth, (req,res)=>{
  const { gameId } = req.query;
  const userId = req.session.userId;
  const g = GAMES.find(x => x.id === gameId);
  if(!g) return res.status(404).json({ error:'game_not_found' });

  // Demo logic: ensure user has non-negative balance (demo allows play even with 0)
  // Create short-lived token for runtime (to avoid scraping)
  const payload = {
    userId, gameId, exp: Math.floor(Date.now()/1000) + 60*60 // 1h
  };
  const token = jwt.sign(payload, JWT_SECRET);
  // Return runtime URL (client will open in iframe)
  // runtimeUrl can be provider runtime in real integration; here we point to our runtime route with token
  const runtimeUrl = `${req.protocol}://${req.get('host')}/runtime/${encodeURIComponent(gameId)}?t=${token}`;
  res.json({ runtimeUrl, expiresIn:3600 });
});

// --- Runtime pages (demo slots) ---
// Serve small interactive runtime HTML for each game id
app.get('/runtime/:gameId', (req,res)=>{
  const gameId = req.params.gameId;
  const token = req.query.t || '';
  // Validate token for demo: optional. If missing, still show demo but mark as "unverified"
  let userId = null;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    userId = decoded.userId;
  } catch(e) {
    // ignore
  }
  const g = GAMES.find(x=>x.id===gameId) || { id:gameId, name:gameId, provider:'demo', type:'slots' };
  // serve simple HTML with JS to spin (demo)
  res.setHeader('Content-Type','text/html; charset=utf-8');
  res.send(`<!doctype html>
  <html>
  <head>
    <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Runtime - ${escapeHtml(g.name)}</title>
    <style>
      body{background:#041226;color:#fff;font-family:Inter,system-ui, -apple-system;padding:20px;display:flex;flex-direction:column;gap:12px;align-items:center}
      .box{background:linear-gradient(180deg,#0c2340,#071029);padding:16px;border-radius:10px;width:100%;max-width:520px}
      .reel{display:flex;gap:8px;justify-content:center;margin:12px 0}
      .cell{width:70px;height:70px;border-radius:8px;background:#0f294e;display:grid;place-items:center;font-size:18px;font-weight:700}
      .controls{display:flex;gap:8px;justify-content:center;margin-top:10px}
      button{padding:10px 14px;border-radius:8px;border:0;cursor:pointer}
      .btn-play{background:#ffd24a;color:#071029;font-weight:800}
      .muted{color:#9fb0d6;font-size:13px}
    </style>
  </head>
  <body>
    <div class="box">
      <h2>${escapeHtml(g.name)} (DEMO)</h2>
      <div class="muted">Provider: ${escapeHtml(g.provider)} · Type: ${escapeHtml(g.type)}</div>
      <div class="reel" id="reel">
        <div class="cell">♠</div><div class="cell">♥</div><div class="cell">♦</div>
      </div>
      <div class="controls">
        <label class="muted">Bet:</label>
        <select id="bet">
          <option value="1">1</option><option value="5">5</option><option value="10" selected>10</option>
        </select>
        <button class="btn-play" id="spin">SPIN</button>
      </div>
      <div style="margin-top:10px;text-align:center">
        <div id="result" class="muted">Spin to play. Demo funds will be updated on server.</div>
      </div>
    </div>
    <script>
      const symbols = ['♠','♥','♦','♣','★','7','🍒'];
      const reel = document.getElementById('reel');
      const spinBtn = document.getElementById('spin');
      const resultEl = document.getElementById('result');
      const betEl = document.getElementById('bet');
      const token = ${JSON.stringify(token)};
      const userVerified = ${JSON.stringify(Boolean(userId))};

      function randSym(){ return symbols[Math.floor(Math.random()*symbols.length)]; }
      function sleep(ms){ return new Promise(r=>setTimeout(r,ms)); }

      async function spin(){
        spinBtn.disabled = true;
        resultEl.textContent = 'Spinning...';
        // animate reels
        for(let i=0;i<20;i++){
          reel.querySelectorAll('.cell').forEach(c=> c.textContent = randSym());
          await sleep(35 + i*5);
        }
        // final result
        const final = [randSym(), randSym(), randSym()];
        reel.querySelectorAll('.cell').forEach((c,i)=> c.textContent = final[i]);
        // simple win logic: if all three equal -> win 10x, two equal -> win 2x
        let bet = parseFloat(betEl.value||1);
        let win = 0;
        if(final[0] === final[1] && final[1] === final[2]) win = bet * 10;
        else if(final[0] === final[1] || final[1] === final[2] || final[0] === final[2]) win = bet * 2;
        // send result to server if token (authorized) or still allow demo with anonymous update option
        try {
          const payload = { gameId: ${JSON.stringify(gameId)}, bet, win, token };
          const resp = await fetch('/api/game/result', {
            method:'POST',
            headers:{ 'Content-Type':'application/json' },
            body: JSON.stringify(payload),
            credentials: 'include'
          });
          const data = await resp.json();
          if(resp.ok){
            resultEl.textContent = 'Result: ' + (win>0 ? ('WIN ' + win) : 'LOSE') + ' · Balance: ' + (data.wallet && data.wallet.balance !== undefined ? data.wallet.balance.toFixed(2) : 'N/A');
          } else {
            resultEl.textContent = 'Result processed locally. WIN ' + win;
          }
        } catch(e){
          console.warn(e);
          resultEl.textContent = 'Result processed locally. WIN ' + win;
        }
        spinBtn.disabled = false;
      }

      spinBtn.addEventListener('click', spin);
    </script>
  </body>
  </html>`);
});

// Game result endpoint (updates demo wallet)
app.post('/api/game/result', (req,res)=>{
  // Accepts { gameId, bet, win, token }
  const token = (req.body && req.body.token) || (req.query && req.query.t);
  let userId = null;
  try {
    if(token) {
      const decoded = jwt.verify(token, JWT_SECRET);
      userId = decoded.userId;
    }
  } catch(e){}
  // also accept session
  if(!userId && req.session && req.session.userId) userId = req.session.userId;

  const { gameId, bet = 0, win = 0 } = req.body || {};
  if(!userId || !store.wallets[userId]) {
    // not authenticated: return 200 but do not persist
    return res.status(200).json({ ok:true, note:'not_authenticated', wallet: null });
  }
  // update wallet
  const w = store.wallets[userId];
  // subtract bet, add win (demo allows negative? here we subtract then add)
  w.balance = (w.balance || 0) - Number(bet) + Number(win);
  // prevent negative beyond allowed (demo allows negative small)
  if(w.balance < -10000) w.balance = -10000;
  saveNow();
  res.json({ ok:true, wallet: w });
});

// Wallet deposit (demo)
app.post('/api/wallet/deposit', requireAuth, (req,res)=>{
  const { amount } = req.body || {};
  const uid = req.session.userId;
  if(!amount || Number(amount) <= 0) return res.status(400).json({ error:'invalid_amount' });
  store.wallets[uid].balance = (store.wallets[uid].balance || 0) + Number(amount);
  saveNow();
  res.json({ ok:true, wallet: store.wallets[uid] });
});

// Serve demo static frontend assets (optional)
app.use('/', express.static(path.join(__dirname, 'public')));

// Health
app.get('/health', (req,res)=> res.json({ ok:true }));

// Start
app.listen(PORT, () => {
  console.log(`GovBet demo backend running on http://localhost:${PORT} (NODE_ENV=${process.env.NODE_ENV||'development'})`);
});

// small helper
function escapeHtml(s){ return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
