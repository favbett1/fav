// GovBet demo app.js - localization, age-gate, games loading, oauth mocks, player
(function(){
  // Basic state
  const state = {
    lang: localStorage.getItem('govbet_lang') || 'uk',
    ageVerified: localStorage.getItem('govbet_age_ok') === '1',
    user: null, // demo user object when "logged in"
    demoBalance: parseFloat(localStorage.getItem('govbet_balance') || '0'),
    games: [] // loaded games
  };

  // Demo game catalog - many entries to simulate large catalog
  const DEMO_GAMES = [
    // Pragmatic-like slots
    {id:'prag-001', name:'Pragmatic Hot', provider:'pragmatic', type:'slots', thumbnail:'', runtimeUrl:'player.html?name=Pragmatic%20Hot'},
    {id:'prag-002', name:'Pragmatic Gold', provider:'pragmatic', type:'slots', thumbnail:'', runtimeUrl:'player.html?name=Pragmatic%20Gold'},
    {id:'prag-003', name:'Pragmatic Spins', provider:'pragmatic', type:'slots', thumbnail:'', runtimeUrl:'player.html?name=Pragmatic%20Spins'},
    // NetEnt style
    {id:'net-001', name:'Star Spin', provider:'netent', type:'slots', runtimeUrl:'player.html?name=Star%20Spin'},
    {id:'net-002', name:'Neon Rush', provider:'netent', type:'slots', runtimeUrl:'player.html?name=Neon%20Rush'},
    // Play'n GO style
    {id:'pgo-001', name:'Book of Demo', provider:'playngo', type:'slots', runtimeUrl:'player.html?name=Book%20of%20Demo'},
    {id:'jack-001', name:'Mega Jackpot', provider:'progressive', type:'jackpot', runtimeUrl:'player.html?name=Mega%20Jackpot'},
    // Table games
    {id:'tb-001', name:'Royal Roulette', provider:'liveprovider', type:'live', runtimeUrl:'player.html?name=Royal%20Roulette'},
    {id:'tb-002', name:'Blackjack Pro', provider:'liveprovider', type:'table', runtimeUrl:'player.html?name=Blackjack%20Pro'},
    // Add many more to give real feel
  ];

  // Generate extra demo games to simulate large catalog
  (function genMore(){
    const providers = ['pragmatic','netent','playngo','yggdrasil','microgaming','quickspin','igt'];
    for(let i=10;i<=120;i++){
      const p = providers[i % providers.length];
      DEMO_GAMES.push({
        id: `${p}-${i}`,
        name: `${p.toUpperCase()} Slot ${i}`,
        provider: p,
        type: ['slots','table','live','jackpot'][i % 4],
        runtimeUrl: `player.html?name=${encodeURIComponent(p.toUpperCase()+ ' Slot ' + i)}`
      });
    }
  })();

  // Utilities
  function $q(sel, root=document) { return root.querySelector(sel); }
  function $qa(sel, root=document) { return Array.from(root.querySelectorAll(sel)); }

  // i18n minimal
  const i18n = {
    uk: {
      'hero.title':'GovBet — сучасне демо-казино',
      'hero.lead':'Мільйони фрі-спінів у деморежимі. Сотні слотів для презентації та інтеграцій.',
      'cta.play':'Перейти до ігор','cta.learn':'Детальніше',
      'panel.balance':'Мій баланс',
      'age.enter':'Введіть дату народження',
      'login.success':'Успіх: ви ввійшли (демо)',
      'deposit.success':'Демо-баланс поповнено на 5000 DEMO'
    },
    en: {
      'hero.title':'GovBet — modern demo casino',
      'hero.lead':'Millions of demo spins. Hundreds of slots for showcase and integrations.',
      'cta.play':'Go to games','cta.learn':'Learn more',
      'panel.balance':'My balance',
      'age.enter':'Enter date of birth',
      'login.success':'Success: logged in (demo)',
      'deposit.success':'Demo balance topped up by 5000 DEMO'
    }
  };

  function t(key){
    return (i18n[state.lang] && i18n[state.lang][key]) || key;
  }

  // Apply localization on simple elements (data-i18n)
  function applyI18n(){
    $qa('[data-i18n]').forEach(el=>{
      const k = el.getAttribute('data-i18n');
      const txt = t(k);
      if(txt) el.textContent = txt;
    });
  }

  // Init language UI
  function initLang(){
    $qa('.lang-btn').forEach(btn=>{
      btn.classList.toggle('active', btn.dataset.lang === state.lang);
      btn.addEventListener('click', ()=>{
        state.lang = btn.dataset.lang;
        localStorage.setItem('govbet_lang', state.lang);
        applyI18n();
        $qa('.lang-btn').forEach(b=>b.classList.toggle('active', b===btn));
      });
    });
  }

  // Age-gate
  function showAgeGateIfNeeded(){
    if(state.ageVerified) return;
    const modal = $q('#age-modal');
    if(!modal) return;
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden','false');
    // set max date to 18 years ago
    const dob = $q('#age-dob');
    const max = new Date(); max.setFullYear(max.getFullYear() - 18);
    dob.max = max.toISOString().split('T')[0];
    $q('#age-accept').addEventListener('click', ()=>{
      if(!dob.value){ alert(t('age.enter')); return; }
      const age = (new Date() - new Date(dob.value)) / (1000*60*60*24*365.25);
      if(age >= 18){
        state.ageVerified = true;
        localStorage.setItem('govbet_age_ok','1');
        modal.style.display = 'none';
      } else {
        alert('You must be 18+ / Потрібно бути 18+');
      }
    });
    $q('#age-decline').addEventListener('click', ()=> window.location.href = 'about:blank');
  }

  // Auth modal (mock)
  function initAuth(){
    const authOpenBtns = $qa('#btn-login, #btn-login-2, #btn-signup, #btn-register, #nav-login');
    authOpenBtns.forEach(b => b && b.addEventListener('click', openAuthModal));
    $q('#auth-cancel') && $q('#auth-cancel').addEventListener('click', closeAuthModal);
    $q('#auth-submit') && $q('#auth-submit').addEventListener('click', ()=> {
      state.user = {id:'demo-'+Date.now(), email: $q('#auth-email') ? $q('#auth-email').value : 'demo@govbet.test'};
      localStorage.setItem('govbet_user', JSON.stringify(state.user));
      closeAuthModal();
      showToast(t('login.success'));
      $qa('.hide-on-guest').forEach(el=>el.style.display='inline-block');
    });
    // OAuth mocks
    $q('#oauth-google') && $q('#oauth-google').addEventListener('click', ()=> openOAuth('google'));
    $q('#oauth-github') && $q('#oauth-github').addEventListener('click', ()=> openOAuth('github'));
  }
  function openAuthModal(){ const m = $q('#auth-modal'); if(!m) return; m.style.display='flex'; m.setAttribute('aria-hidden','false'); }
  function closeAuthModal(){ const m = $q('#auth-modal'); if(!m) return; m.style.display='none'; m.setAttribute('aria-hidden','true'); }

  function openOAuth(provider){
    // In production call your backend /auth/{provider} to start real flow
    const w = window.open(`/auth/${provider}`, 'oauth', 'width=600,height=700');
    if(!w){ alert('Popup blocked'); return; }
    const timer = setInterval(()=> {
      try {
        if(w.closed){
          clearInterval(timer);
          showToast(`${provider} auth finished (demo)`);
          state.user = {id:provider+'-demo', email:provider+'@demo.govern'};
          localStorage.setItem('govbet_user', JSON.stringify(state.user));
          $qa('.hide-on-guest').forEach(el=>el.style.display='inline-block');
        }
      } catch(e){}
    },500);
  }

  // Toast
  function showToast(msg){
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    Object.assign(t.style,{position:'fixed',left:'50%',transform:'translateX(-50%)',bottom:'24px',zIndex:9999,background:'#0b2038',padding:'10px 16px',borderRadius:'8px'});
    document.body.appendChild(t);
    setTimeout(()=> t.style.opacity='0',2400);
    setTimeout(()=> t.remove(),3000);
  }

  // Demo balance
  function initBalance(){
    const el = $q('#demo-balance');
    if(el) el.textContent = state.demoBalance.toFixed(2) + ' DEMO';
    $q('#btn-deposit-demo') && $q('#btn-deposit-demo').addEventListener('click', ()=>{
      state.demoBalance += 5000;
      localStorage.setItem('govbet_balance', state.demoBalance.toString());
      if(el) el.textContent = state.demoBalance.toFixed(2) + ' DEMO';
      showToast(t('deposit.success'));
    });
  }

  // Games rendering and loading
  function renderGames(list, targetSelector='#featured-games', limit=8){
    const target = $q(targetSelector);
    if(!target) return;
    target.innerHTML = '';
    const items = list.slice(0, limit);
    items.forEach(g=>{
      const card = document.createElement('div');
      card.className = 'game-card';
      card.tabIndex = 0;
      card.dataset.id = g.id;
      card.innerHTML = `
        <div class="game-thumb">${escapeHtml(g.name)}</div>
        <div class="gmeta">
          <div class="gname">${escapeHtml(g.name)}</div>
          <div class="muted">${escapeHtml(g.provider)}</div>
        </div>
        <div class="muted">Type: ${escapeHtml(g.type)}</div>
      `;
      card.addEventListener('click', ()=> openGamePlayer(g));
      target.appendChild(card);
    });
  }
  function escapeHtml(s){ return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

  // Load games from backend if available
  async function loadGames(provider='all'){
    try{
      const query = provider && provider !== 'all' ? `?provider=${encodeURIComponent(provider)}` : '';
      const res = await fetch(`/api/games${query}`, {headers:{accept:'application/json'}});
      if(!res.ok) throw new Error('no backend');
      const data = await res.json();
      state.games = Array.isArray(data) ? data : DEMO_GAMES.slice();
    }catch(err){
      console.warn('Using fallback demo games', err);
      state.games = DEMO_GAMES.slice();
    }
    renderGames(state.games, '#games-grid', 1000); // render many for games page
    renderGames(state.games, '#featured-games', 8);
  }

  // Game player: open in modal iframe. For real providers, backend must give signed runtime URL.
  function openGamePlayer(game){
    const playerModal = $q('#game-player') || $q('#player-backdrop') || $q('#player-backdrop-main');
    if(playerModal){
      const iframe = $q('#game-iframe') || $q('#player-iframe');
      if(iframe){
        // In production: use a signed runtimeUrl provided by backend to prevent clickjacking and for session.
        iframe.src = game.runtimeUrl || `player.html?name=${encodeURIComponent(game.name)}`;
      }
      playerModal.style.display = 'flex';
      playerModal.setAttribute('aria-hidden','false');
      document.body.style.overflow = 'hidden';
    } else {
      // fallback: open player page
      window.open(game.runtimeUrl || `player.html?name=${encodeURIComponent(game.name)}`, '_blank');
    }
  }
  function initPlayerModal(){
    const modal = $q('#game-player');
    if(!modal) return;
    modal.addEventListener('click', (e)=> { if(e.target === modal){ closePlayer(); } });
    $q('#player-close') && $q('#player-close').addEventListener('click', closePlayer);
    function closePlayer(){ modal.style.display = 'none'; document.body.style.overflow = ''; $q('#game-iframe') && ($q('#game-iframe').src='about:blank'); }
  }

  // Filters and search on games page
  function initGamePageControls(){
    $qa('.chip').forEach(chip=>{
      chip.addEventListener('click', ()=> {
        $qa('.chip').forEach(c=>c.classList.remove('active'));
        chip.classList.add('active');
        const f = chip.dataset.filter;
        $qa('#games-grid .game-card').forEach(gc=>{
          if(f === 'all' || gc.querySelector('.muted').textContent.includes(f) || gc.querySelector('.gname').textContent.toLowerCase().includes(f)) gc.style.display = '';
          else gc.style.display = 'none';
        });
      });
    });
    $q('#btn-load-games') && $q('#btn-load-games').addEventListener('click', ()=>{
      const prov = $q('#provider-filter').value;
      loadGames(prov);
    });
    $q('#search-games') && $q('#search-games').addEventListener('input', (e)=>{
      const q = e.target.value.toLowerCase();
      $qa('#games-grid .game-card').forEach(gc=>{
        const name = gc.querySelector('.gname').textContent.toLowerCase();
        gc.style.display = name.includes(q) ? '' : 'none';
      });
    });
  }

  // initial boot
  function boot(){
    // apply i18n to any elements marked; pages that include data-i18n keys will be translated
    if(document.readyState === 'loading'){
      document.addEventListener('DOMContentLoaded', run);
    } else run();
  }
  function run(){
    applyI18n();
    initLang();
    initAuth();
    initBalance();
    initPlayerModal();
    initGamePageControls();
    // show featured on home
    renderGames(DEMO_GAMES, '#featured-games', 8);

    // set year fields
    $qa('#year,#year-2').forEach(y=> y && (y.textContent = new Date().getFullYear()));

    // age-gate
    showAgeGateIfNeeded();

    // load games for games page automatically (try backend)
    if(location.pathname.endsWith('games.html')) loadGames('all');

    // featured games on home
    $q('#cta-play') && $q('#cta-play').addEventListener('click', ()=> window.location.href = 'games.html');

    // wire login buttons
    $qa('#btn-login,#btn-login-2').forEach(b=>b && b.addEventListener('click', openAuthModal));
    $qa('#btn-signup').forEach(b=>b && b.addEventListener('click', openAuthModal));

    // populate demo balance if null
    if(!localStorage.getItem('govbet_balance')){ localStorage.setItem('govbet_balance','0'); state.demoBalance = 0; }

    // Wire featured games click on home
    $q('#featured-games') && $q('#featured-games').addEventListener('click', (e)=> {
      const card = e.target.closest('.game-card');
      if(card){
        const id = card.dataset.id;
        const g = DEMO_GAMES.find(x=>x.id===id) || DEMO_GAMES[0];
        openGamePlayer(g);
      }
    });

    // Mobile menu toggle
    $q('#mobile-menu') && $q('#mobile-menu').addEventListener('click', ()=>{
      const nav = document.querySelector('.main-nav');
      if(nav) nav.style.display = (nav.style.display === 'flex' ? 'none' : 'flex');
    });
  }

  // Boot
  boot();

  // Expose some helpers for debugging in console
  window.GovBetDemo = {
    state, loadGames, openGamePlayer, DEMO_GAMES
  };
})();