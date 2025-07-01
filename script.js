const API_KEY = "15687e1fc75dff9890d58aa512214463";
let balance = parseFloat(localStorage.getItem('balance')) || 1000;
let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
let betHistory = JSON.parse(localStorage.getItem('betHistory')) || [];
const matchesContainer = document.getElementById('matches');
const casinoList = document.getElementById('casino-list');
const slotReels = document.getElementById('slot-reels');
const slotSpinBtn = document.getElementById('slot-spin-btn');
const slotBetInput = document.getElementById('slot-bet');
const slotResult = document.getElementById('slot-result');
const rouletteWheel = document.getElementById('roulette-wheel');
const rouletteSpinBtn = document.getElementById('roulette-spin-btn');
const rouletteBetInput = document.getElementById('roulette-bet');
const rouletteResult = document.getElementById('roulette-result');
const blackjackTable = document.getElementById('blackjack-table');
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
const themeToggleBtn = document.getElementById('theme-toggle');
const languageSelect = document.getElementById('language-select');
const sportFilter = document.getElementById('sport-filter');
const leagueFilter = document.getElementById('league-filter');

const casinoGames = [
  { name: "Sweet Bonanza (Demo)", provider: "Pragmatic Play", i18n: "game_sweet_bonanza", img: "https://via.placeholder.com/200x120?text=Sweet+Bonanza" },
  { name: "Wolf Gold (Demo)", provider: "Pragmatic Play", i18n: "game_wolf_gold", img: "https://via.placeholder.com/200x120?text=Wolf+Gold" },
  { name: "Gates of Olympus (Demo)", provider: "Pragmatic Play", i18n: "game_gates_olympus", img: "https://via.placeholder.com/200x120?text=Gates+of+Olympus" },
  { name: "The Dog House (Demo)", provider: "Pragmatic Play", i18n: "game_dog_house", img: "https://via.placeholder.com/200x120?text=The+Dog+House" }
];

const mockMatches = [
  { id: 1, sport_id: 1, league: "УПЛ", home: "Динамо Київ", away: "Шахтар Донецьк", time: Math.floor(Date.now() / 1000), bookmakers: [{ markets: [{ outcomes: [{ name: "1", price: 2.1 }, { name: "X", price: 3.2 }, { name: "2", price: 2.8 }] }] }] },
  { id: 2, sport_id: 2, league: "NBA", home: "Лейкерс", away: "Бостон Селтікс", time: Math.floor(Date.now() / 1000), bookmakers: [{ markets: [{ outcomes: [{ name: "1", price: 1.9 }, { name: "2", price: 2.4 }] }] }] },
  { id: 3, sport_id: 3, league: "ATP", home: "Новак Джокович", away: "Рафаель Надаль", time: Math.floor(Date.now() / 1000), bookmakers: [{ markets: [{ outcomes: [{ name: "1", price: 1.7 }, { name: "2", price: 2.1 }] }] }] }
];

const mockNews = [
  { title: "Динамо перемагає в УПЛ!", content: "Динамо Київ здобуло перемогу над Шахтарем із рахунком 2:1.", date: "2025-07-01" },
  { title: "Новий рекорд НБА", content: "Лейкерс встановили новий рекорд за кількістю очок за гру.", date: "2025-06-30" }
];

// Локалізація
i18next.init({
  lng: localStorage.getItem('language') || 'uk',
  resources: {
    uk: {
      translation: {
        welcome_subtitle: "Найкращий букмекерський сайт",
        click_to_enter: "Натисніть, щоб розпочати",
        live: "Live",
        casino: "Казино",
        news: "Новини",
        profile: "Кабінет",
        light_theme: "Світла тема",
        dark_theme: "Темна тема",
        live_matches: "🎯 Live-матчі",
        casino_demo: "🎰 Казино (демо)",
        roulette_demo: "🎡 Демо рулетка",
        blackjack_title: "🃏 Демо блекджек",
        slot_title: "🎰 Слот-машина (демо)",
        latest_news: "📰 Останні новини",
        balance: "Баланс: {{amount}} грн",
        replenish_balance: "Поповнити демо баланс",
        login: "Увійти",
        support: "Підтримка",
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
        game_sweet_bonanza: "Sweet Bonanza (демо)",
        game_wolf_gold: "Wolf Gold (демо)",
        game_gates_olympus: "Gates of Olympus (демо)",
        game_dog_house: "The Dog House (демо)",
        time: "Час",
        place_bet: "Зробити ставку",
        insufficient_balance: "Недостатньо коштів на балансі!",
        bet_placed: "Ставка {{amount}} грн зроблена на матч {{home}} - {{away}}",
        win: "Виграш! +{{amount}} грн 🎉",
        try_again: "Спробуйте ще!",
        enter_amount: "Введіть суму для поповнення (грн):",
        invalid_amount: "Введіть суму від 1 до 10000 грн!",
        login_unavailable: "Вхід тимчасово недоступний (демо-режим)",
        support_unavailable: "Служба підтримки тимчасово недоступна.",
        hello: "Привіт! Як можемо допомогти?",
        replenish_info: "Для поповнення демо-балансу натисніть 'Поповнити демо баланс'.",
        casino_info: "Казино в демо-режимі. Спробуйте слоти, рулетку або блекджек!",
        match_info: "Live-матчі оновлюються кожні 2 хвилини. Фільтруйте за видом спорту або лігою.",
        bet_history: "Історія ставок"
      }
    },
    en: {
      translation: {
        welcome_subtitle: "The Best Betting Site",
        click_to_enter: "Click to start",
        live: "Live",
        casino: "Casino",
        news: "News",
        profile: "Profile",
        light_theme: "Light Theme",
        dark_theme: "Dark Theme",
        live_matches: "🎯 Live Matches",
        casino_demo: "🎰 Casino (Demo)",
        roulette_demo: "🎡 Demo Roulette",
        blackjack_title: "🃏 Demo Blackjack",
        slot_title: "🎰 Slot Machine (Demo)",
        latest_news: "📰 Latest News",
        balance: "Balance: {{amount}} UAH",
        replenish_balance: "Top Up Demo Balance",
        login: "Log In",
        support: "Support",
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
        game_sweet_bonanza: "Sweet Bonanza (Demo)",
        game_wolf_gold: "Wolf Gold (Demo)",
        game_gates_olympus: "Gates of Olympus (Demo)",
        game_dog_house: "The Dog House (Demo)",
        time: "Time",
        place_bet: "Place Bet",
        insufficient_balance: "Insufficient balance!",
        bet_placed: "Bet of {{amount}} UAH placed on match {{home}} - {{away}}",
        win: "Win! +{{amount}} UAH 🎉",
        try_again: "Try again!",
        enter_amount: "Enter amount to top up (UAH):",
        invalid_amount: "Enter an amount between 1 and 10000 UAH!",
        login_unavailable: "Login temporarily unavailable (demo mode)",
        support_unavailable: "Support is temporarily unavailable.",
        hello: "Hello! How can we help?",
        replenish_info: "To top up your demo balance, click 'Top Up Demo Balance'.",
        casino_info: "Casino in demo mode. Try slots, roulette, or blackjack!",
        match_info: "Live matches update every 2 minutes. Filter by sport or league.",
        bet_history: "Bet History"
      }
    },
    ru: {
      translation: {
        welcome_subtitle: "Лучший букмекерский сайт",
        click_to_enter: "Нажмите, чтобы начать",
        live: "Live",
        casino: "Казино",
        news: "Новости",
        profile: "Кабинет",
        light_theme: "Светлая тема",
        dark_theme: "Темная тема",
        live_matches: "🎯 Live-матчи",
        casino_demo: "🎰 Казино (демо)",
        roulette_demo: "🎡 Демо рулетка",
        blackjack_title: "🃏 Демо блэкджек",
        slot_title: "🎰 Слот-машина (демо)",
        latest_news: "📰 Последние новости",
        balance: "Баланс: {{amount}} грн",
        replenish_balance: "Пополнить демо баланс",
        login: "Войти",
        support: "Поддержка",
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
        game_sweet_bonanza: "Sweet Bonanza (демо)",
        game_wolf_gold: "Wolf Gold (демо)",
        game_gates_olympus: "Gates of Olympus (демо)",
        game_dog_house: "The Dog House (демо)",
        time: "Время",
        place_bet: "Сделать ставку",
        insufficient_balance: "Недостаточно средств на балансе!",
        bet_placed: "Ставка {{amount}} грн сделана на матч {{home}} - {{away}}",
        win: "Выигрыш! +{{amount}} грн 🎉",
        try_again: "Попробуйте еще!",
        enter_amount: "Введите сумму для пополнения (грн):",
        invalid_amount: "Введите сумму от 1 до 10000 грн!",
        login_unavailable: "Вход временно недоступен (демо-режим)",
        support_unavailable: "Служба поддержки временно недоступна.",
        hello: "Привет! Чем можем помочь?",
        replenish_info: "Для пополнения демо-баланса нажмите 'Пополнить демо баланс'.",
        casino_info: "Казино в демо-режиме. Попробуйте слоты, рулетку или блэкджек!",
        match_info: "Live-матчи обновляются каждые 2 минуты. Фильтруйте по виду спорта или лиге.",
        bet_history: "История ставок"
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
  });
});

// Титульна сторінка
welcomePage.addEventListener('click', () => {
  welcomePage.classList.add('fade-out');
  setTimeout(() => welcomePage.style.display = 'none', 800);
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
  console.log(`Fetching matches for sportId: ${sportId}, league: ${league}`);
  try {
    const url = `https://cors-anywhere.herokuapp.com/https://api.betsapi.com/v2/events/inplay?sport_id=${sportId === 'all' ? 1 : sportId}&token=${API_KEY}`;
    const response = await fetch(url, { headers: { 'X-Requested-With': 'XMLHttpRequest' } });
    console.log(`API Response Status: ${response.status}`);
    const data = await response.json();
    console.log('API Response Data:', data);
    if (data.success && data.results && data.results.length > 0) {
      const leagues = [...new Set(data.results.map(m => m.league?.name || 'Unknown'))];
      updateLeagueFilter(leagues);
      renderMatches(data.results.filter(m => league === 'all' || m.league?.name === league));
    } else {
      console.log('No API results, falling back to mock data');
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
    "'": '&apos;'
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
  alert(i18next.t('bet_placed', { home, away, amount: betAmount }));
}

sportFilter.addEventListener('change', () => fetchMatches(sportFilter.value, leagueFilter.value));
leagueFilter.addEventListener('change', () => fetchMatches(sportFilter.value, leagueFilter.value));
fetchMatches();
setInterval(() => fetchMatches(sportFilter.value, leagueFilter.value), 120000);

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

const slotSymbols = ['🍒', '🍋', '🍉', '🍇', '🍊', '⭐', '7️⃣'];
function spinSlot() {
  const betAmount = parseFloat(slotBetInput.value);
  if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
    slotResult.textContent = i18next.t('insufficient_balance');
    return;
  }
  balance -= betAmount;
  updateBalanceUI();
  slotSpinBtn.disabled = true;
  let spins = 12;
  const interval = setInterval(() => {
    slotReels.textContent = `${getRandomSymbol()} ${getRandomSymbol()} ${getRandomSymbol()}`;
    if (--spins <= 0) {
      clearInterval(interval);
      slotSpinBtn.disabled = false;
      const reels = slotReels.textContent.split(' ');
      if (reels[0] === reels[1] && reels[1] === reels[2]) {
        const winAmount = betAmount * 10;
        slotResult.textContent = i18next.t('win', { amount: winAmount });
        balance += winAmount;
        document.getElementById('slot-win-sound').play();
      } else {
        slotResult.textContent = i18next.t('try_again');
      }
      updateBalanceUI();
    }
  }, 100);
}
slotSpinBtn.addEventListener('click', spinSlot);

// Рулетка
const rouletteCtx = rouletteWheel.getContext('2d');
function drawRouletteWheel(angle = 0) {
  rouletteCtx.clearRect(0, 0, rouletteWheel.width, rouletteWheel.height);
  const sections = 37;
  const colors = ['#ff0000', '#000000'];
  for (let i = 0; i < sections; i++) {
    const startAngle = (i * 2 * Math.PI / sections) + angle;
    const endAngle = ((i + 1) * 2 * Math.PI / sections) + angle;
    rouletteCtx.beginPath();
    rouletteCtx.moveTo(150, 150);
    rouletteCtx.arc(150, 150, 140, startAngle, endAngle);
    rouletteCtx.fillStyle = colors[i % 2];
    rouletteCtx.fill();
    rouletteCtx.save();
    rouletteCtx.translate(150, 150);
    rouletteCtx.rotate(startAngle + Math.PI / sections);
    rouletteCtx.fillStyle = '#fff';
    rouletteCtx.font = '12px Poppins';
    rouletteCtx.fillText(i, 100, 0);
    rouletteCtx.restore();
  }
}
drawRouletteWheel();

function spinRoulette() {
  const betAmount = parseFloat(rouletteBetInput.value);
  if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
    rouletteResult.textContent = i18next.t('insufficient_balance');
    return;
  }
  balance -= betAmount;
  updateBalanceUI();
  rouletteSpinBtn.disabled = true;
  let angle = 0;
  const spins = 15;
  let currentSpin = 0;
  const interval = setInterval(() => {
    angle += 0.2;
    drawRouletteWheel(angle);
    if (++currentSpin >= spins) {
      clearInterval(interval);
      rouletteSpinBtn.disabled = false;
      const number = Math.floor(Math.random() * 37);
      drawRouletteWheel((number * 2 * Math.PI / 37));
      if (number % 2 === 0 && number !== 0) {
        const winAmount = betAmount * 2;
        rouletteResult.textContent = i18next.t('win', { amount: winAmount });
        balance += winAmount;
        document.getElementById('slot-win-sound').play();
      } else {
        rouletteResult.textContent = i18next.t('try_again');
      }
      updateBalanceUI();
    }
  }, 100);
}
rouletteSpinBtn.addEventListener('click', spinRoulette);

// Блекджек
let playerHand = [], dealerHand = [];
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
function renderBlackjackTable() {
  blackjackTable.innerHTML = `
    <div class="blackjack-hand">
      <h4>Дилер</h4>
      <p>${dealerHand[0]} [?]</p>
    </div>
    <div class="blackjack-hand">
      <h4>Гравець</h4>
      <p>${playerHand.join(' ')} (${calculateHand(playerHand)})</p>
    </div>
  `;
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
  blackjackTable.innerHTML = `
    <div class="blackjack-hand">
      <h4>Дилер</h4>
      <p>${dealerHand.join(' ')} (${dealerValue})</p>
    </div>
    <div class="blackjack-hand">
      <h4>Гравець</h4>
      <p>${playerHand.join(' ')} (${playerValue})</p>
    </div>
  `;
  blackjackResult.textContent = result;
  blackjackDealBtn.disabled = false;
  blackjackHitBtn.disabled = true;
  blackjackStandBtn.disabled = true;
  updateBalanceUI();
}
blackjackDealBtn.addEventListener('click', dealBlackjack);
blackjackHitBtn.addEventListener('click', () => {
  playerHand.push(drawCard());
  renderBlackjackTable();
  if (calculateHand(playerHand) > 21) endBlackjack();
});
blackjackStandBtn.addEventListener('click', () => {
  while (calculateHand(dealerHand) < 17) dealerHand.push(drawCard());
  endBlackjack();
});

// Баланс
function updateBalanceUI() {
  balanceBox.textContent = i18next.t('balance', { amount: balance.toFixed(2) });
  balanceBox.style.color = balance > 0 ? '#00bfff' : '#f55';
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

// Форма логіну (демо)
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  alert(i18next.t('login_unavailable'));
});

// Чат підтримки
function appendChatMessage(text, isUser = false) {
  const div = document.createElement('div');
  div.textContent = text;
  div.style.marginBottom = '8px';
  div.style.padding = '8px 12px';
  div.style.borderRadius = '8px';
  div.style.maxWidth = '80%';
  div.style.wordWrap = 'break-word';
  if (isUser) {
    div.style.backgroundColor = '#00bfff';
    div.style.color = '#0a1322';
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
  }, 800);
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