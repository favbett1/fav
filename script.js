const API_KEY = "15687e1fc75dff9890d58aa512214463";
let balance = parseFloat(localStorage.getItem('balance')) || 1000;
let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
const matchesContainer = document.getElementById('matches');
const casinoList = document.getElementById('casino-list');
const slotReels = document.getElementById('slot-reels');
const slotSpinBtn = document.getElementById('slot-spin-btn');
const slotResult = document.getElementById('slot-result');
const rouletteWheel = document.getElementById('roulette-wheel');
const rouletteSpinBtn = document.getElementById('roulette-spin-btn');
const rouletteResult = document.getElementById('roulette-result');
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

const casinoGames = [
  { name: "Crazy Time (демо)", provider: "Evolution", i18n: "game_crazy_time" },
  { name: "Aviator (демо)", provider: "Spribe", i18n: "game_aviator" },
  { name: "Sweet Bonanza (демо)", provider: "Pragmatic Play", i18n: "game_sweet_bonanza" },
  { name: "Book of Ra (демо)", provider: "Novomatic", i18n: "game_book_of_ra" }
];

const mockMatches = [
  { id: 1, sport_id: 1, home: "Динамо Київ", away: "Шахтар Донецьк", time: Math.floor(Date.now() / 1000), bookmakers: [{ markets: [{ outcomes: [{ name: "1", price: 2.1 }, { name: "X", price: 3.2 }, { name: "2", price: 2.8 }] }] }] },
  { id: 2, sport_id: 2, home: "Лейкерс", away: "Бостон Селтікс", time: Math.floor(Date.now() / 1000), bookmakers: [{ markets: [{ outcomes: [{ name: "1", price: 1.9 }, { name: "2", price: 2.4 }] }] }] }
];

// Локалізація
i18next.init({
  lng: localStorage.getItem('language') || 'uk',
  resources: {
    uk: {
      translation: {
        welcome_subtitle: "Офіційний букмекерський сайт",
        click_to_enter: "Натисніть щоб увійти",
        live: "Live",
        casino: "Казино",
        news: "Новини",
        profile: "Кабінет",
        light_theme: "Світла тема",
        dark_theme: "Темна тема",
        live_matches: "🎯 Live-матчі",
        casino_demo: "🎰 Казино (демо)",
        roulette_demo: "🎡 Демо рулетка",
        latest_news: "📰 Останні новини",
        balance: "Баланс: {{amount}} грн",
        replenish_balance: "Поповнити демо баланс",
        login: "Увійти",
        support: "Підтримка",
        chat_placeholder: "Напишіть повідомлення...",
        spin_slot: "Запустити слот",
        spin_roulette: "Запустити рулетку",
        all_sports: "Усі види спорту",
        football: "Футбол",
        basketball: "Баскетбол",
        game_crazy_time: "Crazy Time (демо)",
        game_aviator: "Aviator (демо)",
        game_sweet_bonanza: "Sweet Bonanza (демо)",
        game_book_of_ra: "Book of Ra (демо)"
      }
    },
    en: {
      translation: {
        welcome_subtitle: "Official Betting Site",
        click_to_enter: "Click to enter",
        live: "Live",
        casino: "Casino",
        news: "News",
        profile: "Profile",
        light_theme: "Light Theme",
        dark_theme: "Dark Theme",
        live_matches: "🎯 Live Matches",
        casino_demo: "🎰 Casino (Demo)",
        roulette_demo: "🎡 Demo Roulette",
        latest_news: "📰 Latest News",
        balance: "Balance: {{amount}} UAH",
        replenish_balance: "Top Up Demo Balance",
        login: "Log In",
        support: "Support",
        chat_placeholder: "Type a message...",
        spin_slot: "Spin Slot",
        spin_roulette: "Spin Roulette",
        all_sports: "All Sports",
        football: "Football",
        basketball: "Basketball",
        game_crazy_time: "Crazy Time (Demo)",
        game_aviator: "Aviator (Demo)",
        game_sweet_bonanza: "Sweet Bonanza (Demo)",
        game_book_of_ra: "Book of Ra (Demo)"
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
async function fetchMatches(sportId = 'all') {
  matchesContainer.innerHTML = '<p>Loading matches...</p>';
  try {
    const url = `https://cors-anywhere.herokuapp.com/https://api.betsapi.com/v2/events/inplay?sport_id=${sportId === 'all' ? 1 : sportId}&token=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      renderMatches(data.results);
    } else {
      renderMatches(mockMatches.filter(m => sportId === 'all' || m.sport_id == sportId));
    }
  } catch (err) {
    console.error(err);
    matchesContainer.innerHTML = `<p style="color:#f55;">Error loading matches.</p>`;
    renderMatches(mockMatches.filter(m => sportId === 'all' || m.sport_id == sportId));
  }
}

function renderMatches(matches) {
  matchesContainer.innerHTML = '';
  matches.forEach(match => {
    const div = document.createElement('div');
    div.className = 'match-card fade-in';
    const home = escapeHTML(match.home || 'Team A');
    const away = escapeHTML(match.away || 'Team B');
    const time = new Date(match.time * 1000).toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
    let coefText = 'Coefficients unavailable';
    if (match.bookmakers && match.bookmakers.length > 0 && match.bookmakers[0].markets.length > 0) {
      coefText = match.bookmakers[0].markets[0].outcomes.map(o => `${escapeHTML(o.name)}: ${o.price}`).join(' / ');
    }
    div.innerHTML = `
      <div class="match-header">${home} vs ${away}</div>
      <div class="match-time">${i18next.t('time')}: ${time}</div>
      <div class="coef-list">${coefText}</div>
      <button class="btn-bet" onclick="makeBet('${home}', '${away}')">${i18next.t('place_bet')}</button>
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

function makeBet(home, away) {
  if (balance < 10) {
    alert(i18next.t('insufficient_balance'));
    return;
  }
  balance -= 10;
  updateBalanceUI();
  alert(i18next.t('bet_placed', { home, away }));
}

sportFilter.addEventListener('change', () => fetchMatches(sportFilter.value));
fetchMatches();
setInterval(() => fetchMatches(sportFilter.value), 120000);

// Казино
function renderCasinoGames() {
  casinoList.innerHTML = '';
  casinoGames.forEach(game => {
    const card = document.createElement('div');
    card.className = 'casino-card';
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.innerHTML = `🎮 ${i18next.t(game.i18n)}<br><small>${i18next.t('provider')}: ${game.provider}</small>`;
    casinoList.appendChild(card);
  });
}
renderCasinoGames();

const slotSymbols = ['🍒', '🍋', '🍉', '🍇', '🍊', '⭐', '7️⃣'];
function spinSlot() {
  slotSpinBtn.disabled = true;
  let spins = 10;
  const interval = setInterval(() => {
    slotReels.textContent = `${getRandomSymbol()} ${getRandomSymbol()} ${getRandomSymbol()}`;
    if (--spins <= 0) {
      clearInterval(interval);
      slotSpinBtn.disabled = false;
      const reels = slotReels.textContent.split(' ');
      if (reels[0] === reels[1] && reels[1] === reels[2]) {
        slotResult.textContent = i18next.t('win', { amount: 500 });
        balance += 500;
        document.getElementById('slot-win-sound').play();
      } else {
        slotResult.textContent = i18next.t('try_again');
      }
      updateBalanceUI();
    }
  }, 100);
}
slotSpinBtn.addEventListener('click', spinSlot);

const rouletteNumbers = Array.from({ length: 37 }, (_, i) => i);
function spinRoulette() {
  rouletteSpinBtn.disabled = true;
  let spins = 15;
  const interval = setInterval(() => {
    rouletteWheel.textContent = rouletteNumbers[Math.floor(Math.random() * rouletteNumbers.length)];
    if (--spins <= 0) {
      clearInterval(interval);
      rouletteSpinBtn.disabled = false;
      const number = parseInt(rouletteWheel.textContent);
      if (number % 2 === 0) {
        rouletteResult.textContent = i18next.t('win', { amount: 200 });
        balance += 200;
        document.getElementById('slot-win-sound').play();
      } else {
        rouletteResult.textContent = i18next.t('try_again');
      }
      updateBalanceUI();
    }
  }, 100);
}
rouletteSpinBtn.addEventListener('click', spinRoulette);

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
  div.style.borderRadius = '12px';
  div.style.maxWidth = '85%';
  div.style.wordWrap = 'break-word';
  div.style.userSelect = 'text';
  if (isUser) {
    div.style.backgroundColor = '#00bfff';
    div.style.color = '#14213d';
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

// Push-сповіщення
if ('Notification' in window && Notification.permission !== 'denied') {
  Notification.requestPermission();
}

function getRandomSymbol() {
  return slotSymbols[Math.floor(Math.random() * slotSymbols.length)];
}