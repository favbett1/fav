const API_KEY = "15687e1fc75dff9890d58aa512214463";
let balance = parseFloat(localStorage.getItem('balance')) || 1000;
let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
let betHistory = JSON.parse(localStorage.getItem('betHistory')) || [];
const matchesContainer = document.getElementById('matches');
const casinoList = document.getElementById('casino-list');
const slotCanvas = document.getElementById('slot-canvas');
const slotSpinBtn = document.getElementById('slot-spin-btn');
const slotBetInput = document.getElementById('slot-bet');
const slotResult = document.getElementById('slot-result');
const rouletteCanvas = document.getElementById('roulette-canvas');
const rouletteSpinBtn = document.getElementById('roulette-spin-btn');
const rouletteBetInput = document.getElementById('roulette-bet');
const rouletteResult = document.getElementById('roulette-result');
const blackjackCanvas = document.getElementById('blackjack-canvas');
const blackjackDealBtn = document.getElementById('blackjack-deal-btn');
const blackjackHitBtn = document.getElementById('blackjack-hit-btn');
const blackjackStandBtn = document.getElementById('blackjack-stand-btn');
const blackjackBetInput = document.getElementById('blackjack-bet');
const blackjackResult = document.getElementById('blackjack-result');
const balanceBox = document.getElementById('balance');
const btnReplenish = document.getElementById('btn-replenish');
const loginForm = document.getElementById('login-form');
const chatSupport = document.getElementById('chat-support');
const chatToggleBtn = document.getElementById('chat-toggle-btn');
const chatCloseBtn = document.getElementById('chat-close-btn');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const chatSendBtn = document.getElementById('chat-send-btn');
const welcomePage = document.getElementById('welcome-page');
const welcomeCanvas = document.getElementById('welcome-canvas');
const themeToggleBtn = document.getElementById('theme-toggle');
const languageSelect = document.getElementById('language-select');
const sportFilter = document.getElementById('sport-filter');
const leagueFilter = document.getElementById('league-filter');
const statsCanvas = document.getElementById('stats-canvas');

const casinoGames = [
  { name: "Sweet Bonanza (Demo)", provider: "Pragmatic Play", i18n: "game_sweet_bonanza", img: "https://via.placeholder.com/220x140?text=Sweet+Bonanza" },
  { name: "Wolf Gold (Demo)", provider: "Pragmatic Play", i18n: "game_wolf_gold", img: "https://via.placeholder.com/220x140?text=Wolf+Gold" },
  { name: "Gates of Olympus (Demo)", provider: "Pragmatic Play", i18n: "game_gates_olympus", img: "https://via.placeholder.com/220x140?text=Gates+of+Olympus" },
  { name: "The Dog House (Demo)", provider: "Pragmatic Play", i18n: "game_dog_house", img: "https://via.placeholder.com/220x140?text=The+Dog+House" }
];

const mockMatches = [
  { id: 1, sport_id: 1, league: "УПЛ", home: "Динамо Київ", away: "Шахтар Донецьк", time: Math.floor(Date.now() / 1000), bookmakers: [{ markets: [{ outcomes: [{ name: "1", price: 2.1 }, { name: "X", price: 3.2 }, { name: "2", price: 2.8 }] }] }], stats: "Володіння м'ячем: 55%-45%" },
  { id: 2, sport_id: 2, league: "NBA", home: "Лейкерс", away: "Бостон Селтікс", time: Math.floor(Date.now() / 1000), bookmakers: [{ markets: [{ outcomes: [{ name: "1", price: 1.9 }, { name: "2", price: 2.4 }] }] }], stats: "Очки: 110-108" },
  { id: 3, sport_id: 3, league: "ATP", home: "Новак Джокович", away: "Рафаель Надаль", time: Math.floor(Date.now() / 1000), bookmakers: [{ markets: [{ outcomes: [{ name: "1", price: 1.7 }, { name: "2", price: 2.1 }] }] }], stats: "Ейси: 5-3" },
  { id: 4, sport_id: 4, league: "ESL", home: "NaVi", away: "Team Spirit", time: Math.floor(Date.now() / 1000), bookmakers: [{ markets: [{ outcomes: [{ name: "1", price: 1.8 }, { name: "2", price: 2.0 }] }] }], stats: "Кількість вбивств: 20-18" }
];

const mockNews = [
  { title: "Революція в ставках від teXbet!", content: "teXbet запускає футуристичний букмекерський досвід.", date: "2025-07-01" },
  { title: "Кіберспорт на підйомі", content: "NaVi виграють ESL Pro League 2025.", date: "2025-06-30" }
];

// Локалізація
i18next.init({
  lng: localStorage.getItem('language') || 'uk',
  resources: {
    uk: {
      translation: {
        welcome_subtitle: "Найкращий букмекерський сайт від Ілона Маска",
        click_to_enter: "Натисніть, щоб увійти в майбутнє ставок",
        live: "Live",
        casino: "Казино",
        news: "Новини",
        profile: "Кабінет",
        light_theme: "Світла тема",
        dark_theme: "Темна тема",
        live_matches: "🚀 Live-матчі",
        casino_demo: "🎰 Казино (Демо)",
        roulette_demo: "🎡 Демо рулетка",
        blackjack_title: "🃏 Демо блекджек",
        slot_title: "🎰 Слот-машина (Демо)",
        latest_news: "📰 Останні новини",
        balance: "Баланс: {{amount}} грн",
        replenish_balance: "Поповнити демо баланс",
        login: "Увійти",
        support: "AI-Підтримка",
        chat_placeholder: "Напишіть повідомлення...",
        spin_slot: "Запустити слот",
        spin_roulette: "Запустити рулетку",
        blackjack_deal: "Роздача",
        blackjack_hit: "Взяти",
        blackjack_stand: "Стоп",
        all_sports: "Усі види спорту",
        all_leagues: "Усі ліги",
        football: "Футбол",
        basketball: "Баскетбол",
        tennis: "Теніс",
        esports: "Кіберспорт",
        game_sweet_bonanza: "Sweet Bonanza (Демо)",
        game_wolf_gold: "Wolf Gold (Демо)",
        game_gates_olympus: "Gates of Olympus (Демо)",
        game_dog_house: "The Dog House (Демо)",
        time: "Час",
        place_bet: "Зробити ставку",
        stats: "Статистика",
        insufficient_balance: "Недостатньо коштів на балансі!",
        bet_placed: "Ставка {{amount}} грн на матч {{home}} - {{away}}",
        win: "Виграш! +{{amount}} грн 🚀",
        try_again: "Спробуйте ще раз!",
        enter_amount: "Введіть суму для поповнення (грн):",
        invalid_amount: "Введіть суму від 1 до 10000 грн!",
        login_unavailable: "Вхід недоступний (демо-режим)",
        support_unavailable: "AI-підтримка тимчасово недоступна.",
        hello: "Вітаємо в teXbet! Як допомогти?",
        replenish_info: "Поповніть демо-баланс через кнопку 'Поповнити демо баланс'.",
        casino_info: "Казино в демо-режимі: слоти, рулетка, блекджек!",
        match_info: "Live-матчі оновлюються кожні 60 секунд. Фільтруйте за спортом і лігою.",
        bet_history: "Історія ставок",
        stats_title: "Статистика активності"
      }
    },
    en: {
      translation: {
        welcome_subtitle: "The Ultimate Betting Site by Elon Musk",
        click_to_enter: "Click to enter the future of betting",
        live: "Live",
        casino: "Casino",
        news: "News",
        profile: "Profile",
        light_theme: "Light Theme",
        dark_theme: "Dark Theme",
        live_matches: "🚀 Live Matches",
        casino_demo: "🎰 Casino (Demo)",
        roulette_demo: "🎡 Demo Roulette",
        blackjack_title: "🃏 Demo Blackjack",
        slot_title: "🎰 Slot Machine (Demo)",
        latest_news: "📰 Latest News",
        balance: "Balance: {{amount}} UAH",
        replenish_balance: "Top Up Demo Balance",
        login: "Log In",
        support: "AI Support",
        chat_placeholder: "Type a message...",
        spin_slot: "Spin Slot",
        spin_roulette: "Spin Roulette",
        blackjack_deal: "Deal",
        blackjack_hit: "Hit",
        blackjack_stand: "Stand",
        all_sports: "All Sports",
        all_leagues: "All Leagues",
        football: "Football",
        basketball: "Basketball",
        tennis: "Tennis",
        esports: "Esports",
        game_sweet_bonanza: "Sweet Bonanza (Demo)",
        game_wolf_gold: "Wolf Gold (Demo)",
        game_gates_olympus: "Gates of Olympus (Demo)",
        game_dog_house: "The Dog House (Demo)",
        time: "Time",
        place_bet: "Place Bet",
        stats: "Stats",
        insufficient_balance: "Insufficient balance!",
        bet_placed: "Bet of {{amount}} UAH on match {{home}} - {{away}}",
        win: "Win! +{{amount}} UAH 🚀",
        try_again: "Try again!",
        enter_amount: "Enter amount to top up (UAH):",
        invalid_amount: "Enter an amount between 1 and 10000 UAH!",
        login_unavailable: "Login unavailable (demo mode)",
        support_unavailable: "AI support temporarily unavailable.",
        hello: "Welcome to teXbet! How can we help?",
        replenish_info: "Top up your demo balance using the 'Top Up Demo Balance' button.",
        casino_info: "Casino in demo mode: slots, roulette, blackjack!",
        match_info: "Live matches update every 60 seconds. Filter by sport and league.",
        bet_history: "Bet History",
        stats_title: "Activity Stats"
      }
    },
    ru: {
      translation: {
        welcome_subtitle: "Лучший букмекерский сайт от Илона Маска",
        click_to_enter: "Нажмите, чтобы войти в будущее ставок",
        live: "Live",
        casino: "Казино",
        news: "Новости",
        profile: "Кабинет",
        light_theme: "Светлая тема",
        dark_theme: "Темная тема",
        live_matches: "🚀 Live-матчи",
        casino_demo: "🎰 Казино (Демо)",
        roulette_demo: "🎡 Демо рулетка",
        blackjack_title: "🃏 Демо блэкджек",
        slot_title: "🎰 Слот-машина (Демо)",
        latest_news: "📰 Последние новости",
        balance: "Баланс: {{amount}} грн",
        replenish_balance: "Пополнить демо баланс",
        login: "Войти",
        support: "ИИ-Поддержка",
        chat_placeholder: "Напишите сообщение...",
        spin_slot: "Запустить слот",
        spin_roulette: "Запустить рулетку",
        blackjack_deal: "Раздача",
        blackjack_hit: "Взять",
        blackjack_stand: "Стоп",
        all_sports: "Все виды спорта",
        all_leagues: "Все лиги",
        football: "Футбол",
        basketball: "Баскетбол",
        tennis: "Теннис",
        esports: "Киберспорт",
        game_sweet_bonanza: "Sweet Bonanza (Демо)",
        game_wolf_gold: "Wolf Gold (Демо)",
        game_gates_olympus: "Gates of Olympus (Демо)",
        game_dog_house: "The Dog House (Демо)",
        time: "Время",
        place_bet: "Сделать ставку",
        stats: "Статистика",
        insufficient_balance: "Недостаточно средств на балансе!",
        bet_placed: "Ставка {{amount}} грн на матч {{home}} - {{away}}",
        win: "Выигрыш! +{{amount}} грн 🚀",
        try_again: "Попробуйте еще раз!",
        enter_amount: "Введите сумму для пополнения (грн):",
        invalid_amount: "Введите сумму от 1 до 10000 грн!",
        login_unavailable: "Вход недоступен (демо-режим)",
        support_unavailable: "ИИ-поддержка временно недоступна.",
        hello: "Добро пожаловать в teXbet! Чем можем помочь?",
        replenish_info: "Пополните демо-баланс через кнопку 'Пополнить демо баланс'.",
        casino_info: "Казино в демо-режиме: слоты, рулетка, блэкджек!",
        match_info: "Live-матчи обновляются каждые 60 секунд. Фильтруйте по спорту и лиге.",
        bet_history: "История ставок",
        stats_title: "Статистика активности"
      }
    }
  }
}, () => {
  updateTranslations();
});

function updateTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key === 'balance') {
      el.textContent = i18next.t(key, { amount: balance.toFixed(2) });
    } else {
      el.textContent = i18next.t(key);
    }
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = i18next.t(el.getAttribute('data-i18n-placeholder'));
  });
}

languageSelect.addEventListener('change', () => {
  i18next.changeLanguage(languageSelect.value, () => {
    localStorage.setItem('language', languageSelect.value);
    updateTranslations();
    renderCasinoGames();
    renderBetHistory();
    renderStats();
  });
});

// Титульна сторінка з 3D-анімацією
const welcomeScene = new THREE.Scene();
const welcomeCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const welcomeRenderer = new THREE.WebGLRenderer({ canvas: welcomeCanvas, alpha: true });
welcomeRenderer.setSize(window.innerWidth, window.innerHeight);
const welcomeGeometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const welcomeMaterial = new THREE.MeshBasicMaterial({ color: 0x00d4ff, wireframe: true });
const welcomeTorusKnot = new THREE.Mesh(welcomeGeometry, welcomeMaterial);
welcomeScene.add(welcomeTorusKnot);
welcomeCamera.position.z = 30;
function animateWelcome() {
  requestAnimationFrame(animateWelcome);
  welcomeTorusKnot.rotation.x += 0.01;
  welcomeTorusKnot.rotation.y += 0.01;
  welcomeRenderer.render(welcomeScene, welcomeCamera);
}
animateWelcome();
welcomePage.addEventListener('click', () => {
  welcomePage.classList.add('fade-out');
  setTimeout(() => welcomePage.style.display = 'none', 1000);
});
welcomePage.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') welcomePage.click();
});

// Навігація між вкладками
const navLinks = document.querySelectorAll('.nav-link');
const tabs = document.querySelectorAll('.tab-content');
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    navLinks.forEach(l => {
      l.classList.remove('active');
      l.setAttribute('aria-selected', 'false');
    });
    link.classList.add('active');
    link.setAttribute('aria-selected', 'true');
    tabs.forEach(tab => tab.hidden = tab.id !== link.getAttribute('data-tab'));
  });
});

// Темна/світла тема
themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
  themeToggleBtn.textContent = document.body.classList.contains('light') ?
    i18next.t('dark_theme') : i18next.t('light_theme');
});

// Live-матчі
async function fetchMatches(sportId = 'all', league = 'all') {
  matchesContainer.innerHTML = '<p>Loading matches...</p>';
  try {
    const url = `https://cors-anywhere.herokuapp.com/https://api.betsapi.com/v2/events/inplay?sport_id=${sportId === 'all' ? 1 : sportId}&token=${API_KEY}`;
    const response = await fetch(url, { headers: { 'X-Requested-With': 'XMLHttpRequest' } });
    const data = await response.json();
    if (data.success && data.results && data.results.length > 0) {
      const leagues = [...new Set(data.results.map(m => m.league?.name || 'Unknown'))];
      updateLeagueFilter(leagues);
      renderMatches(data.results.filter(m => league === 'all' || m.league?.name === league));
    } else {
      const leagues = [...new Set(mockMatches.map(m => m.league))];
      updateLeagueFilter(leagues);
      renderMatches(mockMatches.filter(m => (sportId === 'all' || m.sport_id == sportId) && (league === 'all' || m.league === league)));
    }
  } catch (err) {
    console.error('Fetch Error:', err);
    matchesContainer.innerHTML = `<p style="color:#f55;">Error loading matches: ${err.message}</p>`;
    const leagues = [...new Set(mockMatches.map(m => m.league))];
    updateLeagueFilter(leagues);
    renderMatches(mockMatches.filter(m => (sportId === 'all' || m.sport_id == sportId) && (league === 'all' || m.league === league)));
  }
}

function updateLeagueFilter(leagues) {
  leagueFilter.innerHTML = `<option value="all">${i18next.t('all_leagues')}</option>`;
  leagues.forEach(league => {
    const option = document.createElement('option');
    option.value = league;
    option.textContent = league;
    leagueFilter.appendChild(option);
  });
}

function renderMatches(matches) {
  matchesContainer.innerHTML = '';
  matches.forEach(match => {
    const div = document.createElement('div');
    div.className = 'match-card fade-in';
    const home = escapeHTML(match.home || 'Team A');
    const away = escapeHTML(match.away || 'Team B');
    const league = escapeHTML(match.league || 'Unknown');
    const time = new Date(match.time * 1000).toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
    let coefText = 'Coefficients unavailable';
    if (match.bookmakers && match.bookmakers.length > 0 && match.bookmakers[0].markets.length > 0) {
      coefText = match.bookmakers[0].markets[0].outcomes.map(o => `<span class="coef-item">${escapeHTML(o.name)}: ${o.price}</span>`).join('');
    }
    div.innerHTML = `
      <div class="match-header">${home} vs ${away}</div>
      <div class="match-league">${league}</div>
      <div class="match-time">${i18next.t('time')}: ${time}</div>
      <div class="match-stats" onclick="alert('${escapeHTML(match.stats || 'No stats available')}')">${i18next.t('stats')}</div>
      <div class="coef-list">${coefText}</div>
      <input type="number" class="bet-amount" min="1" max="1000" value="10" aria-label="Сума ставки" />
      <button class="btn-bet" onclick="makeBet('${home}', '${away}', this.previousElementSibling.value)">${i18next.t('place_bet')}</button>
    `;
    matchesContainer.appendChild(div);
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(`New match: ${home} vs ${away}`);
    }
  });
}

function escapeHTML(str) {
  return str.replace(/[&<>"']/g, match => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[match]);
}

function makeBet(home, away, amount) {
  const betAmount = parseFloat(amount);
  if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
    alert(i18next.t('insufficient_balance'));
    return;
  }
  balance -= betAmount;
  betHistory.push({ home, away, amount: betAmount, date: new Date().toISOString() });
  localStorage.setItem('betHistory', JSON.stringify(betHistory));
  updateBalanceUI();
  renderBetHistory();
  renderStats();
  alert(i18next.t('bet_placed', { home, away, amount: betAmount }));
  document.getElementById('slot-win-sound').play();
}

sportFilter.addEventListener('change', () => fetchMatches(sportFilter.value, leagueFilter.value));
leagueFilter.addEventListener('change', () => fetchMatches(sportFilter.value, leagueFilter.value));
fetchMatches();
setInterval(() => fetchMatches(sportFilter.value, leagueFilter.value), 60000);

// Казино
function renderCasinoGames() {
  casinoList.innerHTML = '';
  casinoGames.forEach(game => {
    const card = document.createElement('div');
    card.className = 'casino-card';
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.innerHTML = `
      <img src="${game.img}" alt="${i18next.t(game.i18n)}" />
      <div>${i18next.t(game.i18n)}</div>
      <small>${i18next.t('provider')}: ${game.provider}</small>
    `;
    casinoList.appendChild(card);
  });
}
renderCasinoGames();

// Слот-машина
const slotScene = new THREE.Scene();
const slotCamera = new THREE.PerspectiveCamera(75, slotCanvas.width / slotCanvas.height, 0.1, 1000);
const slotRenderer = new THREE.WebGLRenderer({ canvas: slotCanvas, alpha: true });
slotRenderer.setSize(slotCanvas.width, slotCanvas.height);
const slotSymbols = ['🍒', '🍋', '🍉', '🍇', '🍊', '⭐', '7️⃣'];
const slotCubes = [];
for (let i = 0; i < 3; i++) {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00d4ff, wireframe: true });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.x = (i - 1) * 1.5;
  slotCubes.push(cube);
  slotScene.add(cube);
}
slotCamera.position.z = 5;
function animateSlot(reels, callback) {
  let spins = 30;
  const interval = setInterval(() => {
    slotCubes.forEach((cube, i) => {
      cube.rotation.x += 0.1;
      cube.rotation.y += 0.1;
    });
    slotRenderer.render(slotScene, slotCamera);
    if (--spins <= 0) {
      clearInterval(interval);
      slotCubes.forEach((cube, i) => {
        cube.rotation.x = 0;
        cube.rotation.y = 0;
        cube.material.color.set(reels[i] === '7️⃣' ? 0xff0000 : 0x00d4ff);
      });
      slotRenderer.render(slotScene, slotCamera);
      callback();
    }
  }, 50);
}
function spinSlot() {
  const betAmount = parseFloat(slotBetInput.value);
  if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
    slotResult.textContent = i18next.t('insufficient_balance');
    return;
  }
  balance -= betAmount;
  updateBalanceUI();
  slotSpinBtn.disabled = true;
  const reels = [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()];
  animateSlot(reels, () => {
    slotSpinBtn.disabled = false;
    if (reels[0] === reels[1] && reels[1] === reels[2]) {
      const winAmount = betAmount * 20;
      slotResult.textContent = i18next.t('win', { amount: winAmount });
      balance += winAmount;
      document.getElementById('slot-win-sound').play();
    } else {
      slotResult.textContent = i18next.t('try_again');
    }
    updateBalanceUI();
  });
}
slotSpinBtn.addEventListener('click', spinSlot);

// Рулетка
const rouletteScene = new THREE.Scene();
const rouletteCamera = new THREE.PerspectiveCamera(75, rouletteCanvas.width / rouletteCanvas.height, 0.1, 1000);
const rouletteRenderer = new THREE.WebGLRenderer({ canvas: rouletteCanvas, alpha: true });
rouletteRenderer.setSize(rouletteCanvas.width, rouletteCanvas.height);
const rouletteGeometry = new THREE.CylinderGeometry(2, 2, 0.2, 32);
const rouletteMaterial = new THREE.MeshBasicMaterial({ color: 0x00d4ff, wireframe: true });
const rouletteWheel = new THREE.Mesh(rouletteGeometry, rouletteMaterial);
rouletteScene.add(rouletteWheel);
rouletteCamera.position.z = 5;
function animateRoulette(number, callback) {
  let angle = 0;
  const spins = 50;
  let currentSpin = 0;
  const interval = setInterval(() => {
    angle += 0.1;
    rouletteWheel.rotation.y = angle;
    rouletteRenderer.render(rouletteScene, rouletteCamera);
    if (++currentSpin >= spins) {
      clearInterval(interval);
      rouletteWheel.rotation.y = (number * 2 * Math.PI / 37);
      rouletteRenderer.render(rouletteScene, rouletteCamera);
      callback();
    }
  }, 50);
}
function spinRoulette() {
  const betAmount = parseFloat(rouletteBetInput.value);
  if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
    rouletteResult.textContent = i18next.t('insufficient_balance');
    return;
  }
  balance -= betAmount;
  updateBalanceUI();
  rouletteSpinBtn.disabled = true;
  const number = Math.floor(Math.random() * 37);
  animateRoulette(number, () => {
    rouletteSpinBtn.disabled = false;
    if (number % 2 === 0 && number !== 0) {
      const winAmount = betAmount * 2;
      rouletteResult.textContent = i18next.t('win', { amount: winAmount });
      balance += winAmount;
      document.getElementById('slot-win-sound').play();
    } else {
      rouletteResult.textContent = i18next.t('try_again');
    }
    updateBalanceUI();
  });
}
rouletteSpinBtn.addEventListener('click', spinRoulette);

// Блекджек
let playerHand = [], dealerHand = [];
const blackjackScene = new THREE.Scene();
const blackjackCamera = new THREE.PerspectiveCamera(75, blackjackCanvas.width / blackjackCanvas.height, 0.1, 1000);
const blackjackRenderer = new THREE.WebGLRenderer({ canvas: blackjackCanvas, alpha: true });
blackjackRenderer.setSize(blackjackCanvas.width, blackjackCanvas.height);
const blackjackTableGeometry = new THREE.PlaneGeometry(4, 2);
const blackjackTableMaterial = new THREE.MeshBasicMaterial({ color: 0x1b263b });
const blackjackTableMesh = new THREE.Mesh(blackjackTableGeometry, blackjackTableMaterial);
blackjackScene.add(blackjackTableMesh);
blackjackCamera.position.z = 5;
function renderBlackjackTable() {
  blackjackRenderer.render(blackjackScene, blackjackCamera);
}
function dealBlackjack() {
  const betAmount = parseFloat(blackjackBetInput.value);
  if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
    blackjackResult.textContent = i18next.t('insufficient_balance');
    return;
  }
  balance -= betAmount;
  updateBalanceUI();
  playerHand = [drawCard(), drawCard()];
  dealerHand = [drawCard(), drawCard()];
  renderBlackjackTable();
  blackjackResult.textContent = `Гравець: ${playerHand.join(' ')} (${calculateHand(playerHand)}) | Дилер: ${dealerHand[0]} [?]`;
  blackjackDealBtn.disabled = true;
  blackjackHitBtn.disabled = false;
  blackjackStandBtn.disabled = false;
}
function drawCard() {
  const suits = ['♠', '♣', '♥', '♦'];
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  return `${values[Math.floor(Math.random() * values.length)]}${suits[Math.floor(Math.random() * suits.length)]}`;
}
function calculateHand(hand) {
  let value = 0, aces = 0;
  hand.forEach(card => {
    const val = card.slice(0, -1);
    if (val === 'A') {
      aces++;
      value += 11;
    } else if (['J', 'Q', 'K'].includes(val)) {
      value += 10;
    } else {
      value += parseInt(val);
    }
  });
  while (value > 21 && aces > 0) {
    value -= 10;
    aces--;
  }
  return value;
}
function endBlackjack() {
  const playerValue = calculateHand(playerHand);
  const dealerValue = calculateHand(dealerHand);
  let result = '';
  if (playerValue > 21) {
    result = i18next.t('try_again');
  } else if (dealerValue > 21 || playerValue > dealerValue) {
    const winAmount = parseFloat(blackjackBetInput.value) * 2;
    balance += winAmount;
    result = i18next.t('win', { amount: winAmount });
    document.getElementById('slot-win-sound').play();
  } else if (playerValue === dealerValue) {
    balance += parseFloat(blackjackBetInput.value);
    result = 'Нічия!';
  } else {
    result = i18next.t('try_again');
  }
  blackjackResult.textContent = `Гравець: ${playerHand.join(' ')} (${playerValue}) | Дилер: ${dealerHand.join(' ')} (${dealerValue}) | ${result}`;
  blackjackDealBtn.disabled = false;
  blackjackHitBtn.disabled = true;
  blackjackStandBtn.disabled = true;
  updateBalanceUI();
}
blackjackDealBtn.addEventListener('click', dealBlackjack);
blackjackHitBtn.addEventListener('click', () => {
  playerHand.push(drawCard());
  blackjackResult.textContent = `Гравець: ${playerHand.join(' ')} (${calculateHand(playerHand)}) | Дилер: ${dealerHand[0]} [?]`;
  if (calculateHand(playerHand) > 21) endBlackjack();
});
blackjackStandBtn.addEventListener('click', () => {
  while (calculateHand(dealerHand) < 17) dealerHand.push(drawCard());
  endBlackjack();
});

// Баланс
function updateBalanceUI() {
  balanceBox.textContent = i18next.t('balance', { amount: balance.toFixed(2) });
  balanceBox.style.color = balance > 0 ? '#00d4ff' : '#f55';
  localStorage.setItem('balance', balance);
}
btnReplenish.addEventListener('click', () => {
  const amountStr = prompt(i18next.t('enter_amount'), '100');
  if (amountStr === null) return;
  const amount = parseFloat(amountStr);
  if (isNaN(amount) || amount <= 0 || amount > 10000) {
    alert(i18next.t('invalid_amount'));
    return;
  }
  balance += amount;
  updateBalanceUI();
  renderStats();
});
updateBalanceUI();

// Історія ставок
function renderBetHistory() {
  const betHistoryList = document.getElementById('bet-history');
  betHistoryList.innerHTML = '';
  betHistory.forEach(bet => {
    const li = document.createElement('li');
    li.textContent = `${bet.date.slice(0, 10)}: ${i18next.t('bet_placed', { home: bet.home, away: bet.away, amount: bet.amount })}`;
    betHistoryList.appendChild(li);
  });
}
renderBetHistory();

// Статистика
function renderStats() {
  const ctx = statsCanvas.getContext('2d');
  ctx.clearRect(0, 0, statsCanvas.width, statsCanvas.height);
  const bets = betHistory.map(b => b.amount);
  const maxBet = Math.max(...bets, 100);
  ctx.beginPath();
  ctx.strokeStyle = '#00d4ff';
  ctx.lineWidth = 2;
  bets.forEach((bet, i) => {
    const x = (i / (bets.length - 1 || 1)) * statsCanvas.width;
    const y = statsCanvas.height - (bet / maxBet) * statsCanvas.height;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
}
renderStats();

// Чат підтримки
function appendChatMessage(text, isUser = false) {
  const div = document.createElement('div');
  div.textContent = text;
  div.style.marginBottom = '10px';
  div.style.padding = '10px 15px';
  div.style.borderRadius = '10px';
  div.style.maxWidth = '80%';
  div.style.wordWrap = 'break-word';
  if (isUser) {
    div.style.backgroundColor = '#00d4ff';
    div.style.color = '#0a0f24';
    div.style.marginLeft = 'auto';
  } else {
    div.style.backgroundColor = '#1b263b';
    div.style.color = '#00d4ff';
    div.style.marginRight = 'auto';
  }
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  if (isUser) {
    chatHistory.push({ text, isUser, timestamp: new Date().toISOString() });
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  }
}

chatHistory.forEach(msg => appendChatMessage(msg.text, msg.isUser));
chatToggleBtn.addEventListener('click', () => {
  chatSupport.classList.toggle('open');
  if (chatSupport.classList.contains('open')) chatInput.focus();
});
chatCloseBtn.addEventListener('click', () => {
  chatSupport.classList.remove('open');
  chatToggleBtn.focus();
});
chatSendBtn.addEventListener('click', () => {
  const text = chatInput.value.trim();
  if (!text) return;
  appendChatMessage(text, true);
  chatInput.value = '';
  setTimeout(() => {
    let reply = i18next.t('support_unavailable');
    if (/привіт|здравствуй|hello/i.test(text)) reply = i18next.t('hello');
    else if (/поповнити|баланс|balance/i.test(text)) reply = i18next.t('replenish_info');
    else if (/казино|casino/i.test(text)) reply = i18next.t('casino_info');
    else if (/матч|match/i.test(text)) reply = i18next.t('match_info');
    appendChatMessage(reply);
  }, 1000);
});
chatInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') chatSendBtn.click();
});

// Новини
function renderNews() {
  const newsList = document.getElementById('news-list');
  newsList.innerHTML = '';
  mockNews.forEach(news => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${news.title}</strong><br>${news.content}<br><small>${news.date}</small>`;
    newsList.appendChild(li);
  });
}
renderNews();

// Push-сповіщення
if ('Notification' in window && Notification.permission !== 'denied') {
  Notification.requestPermission();
}

function getRandomSymbol() {
  return slotSymbols[Math.floor(Math.random() * slotSymbols.length)];
}

// Фонова музика
document.getElementById('bg-music').play();