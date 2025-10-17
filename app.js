// GovBet — improved app.js (replace existing app.js)
// Changes: more robust fetch (credentials), clearer error handling, improved age-gate flow,
// safer openPlayer with validation, standardized toast, and minimal logging for testing.

(function(){
  /* ---------- state ---------- */
  const state = {
    lang: localStorage.getItem('govbet_lang') || 'uk',
    ageVerified: localStorage.getItem('govbet_age_ok') === '1',
    user: null,
    demoBalance: parseFloat(localStorage.getItem('govbet_balance') || '0'),
    games: []
  };

  /* ---------- i18n (minimal) ---------- */
  const i18n = {
    uk: { 'deposit.success':'Демо-баланс поповнено', 'login.success':'Ви ввійшли (демо)', 'age.enter':'Введіть дату' },
    en: { 'deposit.success':'Demo balance topped up', 'login.success':'Logged in (demo)', 'age.enter':'Enter date' }
  };
  function t(key){ return (i18n[state.lang] && i18n[state.lang][key]) || key; }

  /* ---------- helpers ---------- */
  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));
  function showToast(msg, timeout=3000){
    const el = document.createElement('div'); el.className='toast'; el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(()=> el.style.opacity='0', timeout-400);
    setTimeout(()=> el.remove(), timeout);
  }
  function safeFetch(url, opts = {}) {
    opts.credentials = 'include';
    opts.headers = opts.headers || {};
    return fetch(url, opts).then(async res => {
      const ct = res.headers.get('content-type') || '';
      const body = ct.includes('application/json') ? await res.json().catch(()=>null) : await res.text().catch(()=>null);
      if(!res.ok) {
        const err = body && body.error ? body.error : (body && body.message) || res.statusText;
        throw new Error(String(err));
      }
      return body;
    });
  }

  /* ---------- apply i18n UI placeholders ---------- */
  function applyI18nToDOM(){
    $$('[data-i18n]').forEach(el=>{
      const k = el.getAttribute('data-i18n');
      if(i18n[state.lang] && i18n[state.lang][k]) el.textContent = i18n[state.lang][k];
    });
  }

  /* ---------- language init ---------- */
  function initLang(){
    $$('.lang-btn').forEach(btn=>{
      btn.classList.toggle('active', btn.dataset.lang === state.lang);
      btn.addEventListener('click', ()=>{
        state.lang = btn.dataset.lang;
        localStorage.setItem('govbet_lang', state.lang);
        applyI18nToDOM();
        $$('.lang-btn').forEach(b=>b.classList.toggle('active', b===btn));
      });
    });
    applyI18nToDOM();
  }

  /* ---------- age gate ---------- */
  function showAgeGateIfNeeded(){
    if(state.ageVerified) return;
    const modal = $('#age-modal');
    if(!modal) return;
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden','false');
    const dob = $('#age-dob');
    const max = new Date(); max.setFullYear(max.getFullYear()-18);
    dob.max = max.toISOString().split('T')[0];
    $('#age-accept').onclick = () => {
      if(!dob.value){ alert(t('age.enter')); return; }
      const age = (new Date() - new Date(dob.value)) / (1000*60*60*24*365.25);
      if(age >= 18){ state.ageVerified = true; localStorage.setItem('govbet_age_ok','1'); modal.style.display='none'; }
      else alert('You must be 18+ / Потрібно бути 18+');
    };
    $('#age-decline').onclick = ()=> window.location.href='about:blank';
  }

  /* ---------- auth demo ---------- */
  async function demoLogin(email){
    try{
      const body = await safeFetch('/api/auth/demo-login', {
        method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email })
      });
      state.user = body.user;
      if(body && body.token) localStorage.setItem('govbet_demo_token', body.token);
      showToast(t('login.success'));
      await refreshProfile();
      updateUIForAuth();
    }catch(err){ console.error('login error', err); showToast('Login failed: ' + err.message); }
  }
  async function refreshProfile(){
    try{
      const data = await safeFetch('/api/profile');
      if(data && data.user){ state.user=data.user; if(data.wallet) state.demoBalance = data.wallet.balance || 0; localStorage.setItem('govbet_balance', String(state.demoBalance)); updateBalanceUI(); }
    }catch(e){ console.warn('profile fetch failed', e); }
  }
  function updateUIForAuth(){
    $$('.hide-on-guest').forEach(el=> el.style.display = state.user ? 'inline-block' : 'none');
  }

  /* ---------- balance ---------- */
  function updateBalanceUI(){
    $$('.balance').forEach(el=> el.textContent = (state.demoBalance || 0).toFixed(2) + ' DEMO');
  }

  /* ---------- games ---------- */
  async function loadGames(provider='all'){
    try{
      const url = provider && provider !== 'all' ? `/api/games?provider=${encodeURIComponent(provider)}` : '/api/games';
      const data = await safeFetch(url);
      state.games = Array.isArray(data) ? data : [];
    }catch(err){
      console.warn('loadGames fallback', err);
      // fallback: keep existing client demo list if any
      state.games = state.games.length ? state.games : [{
        id:'prag-001', name:'Pragmatic Hot', provider:'pragmatic', type:'slots', runtimeUrl:'/runtime/prag-001'
      }];
    }
    renderGames('#games-grid', state.games);
    renderGames('#featured-games', state.games.slice(0,8));
  }

  function renderGames(selector, list){
    const root = document.querySelector(selector);
    if(!root) return;
    root.innerHTML = '';
    list.forEach(g => {
      const node = document.createElement('div');
      node.className = 'game-card';
      node.tabIndex = 0;
      node.dataset.id = g.id;
      node.innerHTML = `
        <div class="game-thumb">${escapeHtml(g.name)}</div>
        <div class="gmeta"><div class="gname">${escapeHtml(g.name)}</div><div class="muted">${escapeHtml(g.provider||'Demo')}</div></div>
        <div class="muted">Type: ${escapeHtml(g.type||'slot')}</div>
      `;
      node.addEventListener('click', ()=> openGame(g));
      root.appendChild(node);
    });
  }

  function escapeHtml(s){ return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

  /* ---------- open player safely ---------- */
  async function openGame(game){
    try{
      // Ask backend for runtimeUrl (ensures auth check and signed URL)
      const resp = await safeFetch(`/api/launch?gameId=${encodeURIComponent(game.id)}`);
      const url = resp && resp.runtimeUrl ? resp.runtimeUrl : game.runtimeUrl;
      if(!url) throw new Error('No runtime URL');
      openPlayerModal(url);
    }catch(err){
      console.warn('launch failed, fallback to runtimeUrl', err);
      const url = game.runtimeUrl || `player.html?name=${encodeURIComponent(game.name)}`;
      openPlayerModal(url);
    }
  }
  function openPlayerModal(url){
    const modal = $('#game-player') || $('#player-backdrop') || $('#player-backdrop-main');
    if(modal){
      const iframe = modal.querySelector('iframe') || document.getElementById('player-iframe') || document.getElementById('game-iframe');
      if(iframe) iframe.src = url;
      modal.style.display = 'flex';
      modal.setAttribute('aria-hidden','false');
      document.body.style.overflow = 'hidden';
    } else {
      window.open(url, '_blank');
    }
  }
  function closePlayerModal(){
    const modal = $('#game-player') || $('#player-backdrop') || $('#player-backdrop-main');
    if(!modal) return;
    const iframe = modal.querySelector('iframe') || document.getElementById('player-iframe');
    if(iframe) iframe.src = 'about:blank';
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  /* ---------- init UI wiring ---------- */
  function initUI(){
    // auth
    $('#btn-login') && $('#btn-login').addEventListener('click', ()=> openAuthFlow());
    $('#btn-signup') && $('#btn-signup').addEventListener('click', ()=> openAuthFlow());
    $('#auth-submit') && $('#auth-submit').addEventListener('click', ()=> {
      const email = $('#auth-email') ? $('#auth-email').value : ('demo+'+Date.now()+'@demo.test');
      demoLogin(email);
      closeAuthModal();
    });
    // deposit demo
    $('#btn-deposit-demo') && $('#btn-deposit-demo').addEventListener('click', async ()=> {
      try {
        await safeFetch('/api/wallet/deposit', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ amount:5000 }) });
        await refreshProfile();
        showToast(t('deposit.success'));
      } catch(e){ console.warn(e); showToast('Deposit failed: '+e.message); }
    });

    // auth modal open/close
    $('#auth-cancel') && $('#auth-cancel').addEventListener('click', closeAuthModal);
    window.addEventListener('keydown', (e)=> { if(e.key === 'Escape'){ closeAuthModal(); closePlayerModal(); } });

    // player close
    $$('#player-close').forEach(btn => btn.addEventListener('click', closePlayerModal));
    // load games button
    $('#load-games') && $('#load-games').addEventListener('click', ()=> {
      const prov = $('#provider-select') ? $('#provider-select').value : 'all';
      loadGames(prov);
    });

    // chips filter (delegate)
    $$('.chip').forEach(ch => {
      ch.addEventListener('click', ()=>{
        $$('.chip').forEach(c=>c.classList.remove('active'));
        ch.classList.add('active');
        const f = ch.dataset.filter;
        $$('#games-grid .game-card').forEach(gc=>{
          if(f === 'all' || gc.querySelector('.muted').textContent.toLowerCase().includes(f)) gc.style.display = '';
          else gc.style.display = 'none';
        });
      });
    });

    // live count
    const liveEl = document.getElementById('live-count');
    if(liveEl) setInterval(()=> liveEl.textContent = (2000 + Math.floor(Math.random()*8000)).toLocaleString(), 3500);
  }

  /* ---------- modal helpers ---------- */
  function openAuthFlow(){ const modal = $('#auth-modal'); if(!modal) return; modal.style.display = 'flex'; modal.setAttribute('aria-hidden','false'); }
  function closeAuthModal(){ const modal = $('#auth-modal'); if(!modal) return; modal.style.display = 'none'; modal.setAttribute('aria-hidden','true'); }

  /* ---------- boot ---------- */
  async function boot(){
    initLang();
    initUI();
    // try refresh profile
    try { await refreshProfile(); } catch(e){}
    updateUIForAuth();
    updateBalanceUI();
    // load games
    await loadGames('all');
    // show age gate if needed
    showAgeGateIfNeeded();
    // wire play-now anchor if exists
    const cta = document.getElementById('cta-play');
    if(cta) cta.addEventListener('click', ()=> window.location.href = 'games.html');
  }

  // run
  document.addEventListener('DOMContentLoaded', boot);
  // expose for debugging
  window.GovBet = { state, loadGames, openGame, demoLogin, refreshProfile, closePlayerModal };
})();
