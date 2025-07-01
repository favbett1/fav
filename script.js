const API_KEY = "15687e1fc75dff9890d58aa512214463";
const LIQPAY_PUBLIC_KEY = "sandbox_i123456789"; // Замінити на реальний ключ LiqPay
const LIQPAY_PRIVATE_KEY = "sandbox_abc123"; // Замінити на реальний ключ
const TWITCH_CLIENT_ID = "your_twitch_client_id"; // Замінити на реальний Client ID
let balance = parseFloat(localStorage.getItem('balance')) || 0;
let points = parseInt(localStorage.getItem('points')) || 0;
let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
let betHistory = JSON.parse(localStorage.getItem('betHistory')) || [];
let favoriteMatches = JSON.parse(localStorage.getItem('favoriteMatches')) || [];
let requisites = JSON.parse(localStorage.getItem('requisites')) || { cardNumber: '', cardHolder: '' };
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
const matchesContainer = document.getElementById('matches');
const casinoList = document.getElementById('casino-list');
const tournamentList = document.getElementById('tournament-list');
const leaderboardList = document.getElementById('leaderboard-list');
const slotCanvas = document.getElementById('slot-canvas');
const slotSpinBtn = document.getElementById('slot-spin-btn');
const slotBetInput = document.getElementById('slot-bet');
const slotResult = document.getElementById('slot-result');
const particlesCanvas = document.getElementById('particles-canvas');
const rouletteCanvas = document.getElementById('roulette-canvas');
const rouletteSpinBtn = document.getElementById('roulette-spin-btn');
const rouletteBetInput = document.getElementById('roulette-bet');
const rouletteResult = document.getElementById('roulette-result');
const arRouletteBtn = document.getElementById('ar-roulette-btn');
const blackjackCanvas = document.getElementById('blackjack-canvas');
const blackjackDealBtn = document.getElementById('blackjack-deal-btn');
const blackjackHitBtn = document.getElementById('blackjack-hit-btn');
const blackjackStandBtn = document.getElementById('blackjack-stand-btn');
const blackjackBetInput = document.getElementById('blackjack-bet');
const blackjackResult = document.getElementById('blackjack-result');
const pokerCanvas = document.getElementById('poker-canvas');
const pokerDealBtn = document.getElementById('poker-deal-btn');
const pokerFoldBtn = document.getElementById('poker-fold-btn');
const pokerCallBtn = document.getElementById('poker-call-btn');
const pokerBetInput = document.getElementById('poker-bet');
const pokerResult = document.getElementById('poker-result');
const crashCanvas = document.getElementById('crash-canvas');
const crashBetBtn = document.getElementById('crash-bet-btn');
const crashCashoutBtn = document.getElementById('crash-cashout-btn');
const crashBetInput = document.getElementById('crash-bet');
const crashResult = document.getElementById('crash-result');
const plinkoCanvas = document.createElement('canvas');
plinkoCanvas.id = 'plinko-canvas';
plinkoCanvas.width = 400;
plinkoCanvas.height = 400;
const plinkoBetInput = document.createElement('input');
plinkoBetInput.type = 'number';
plinkoBetInput.id = 'plinko-bet';
plinkoBetInput.min = 10;
plinkoBetInput.max = 1000;
plinkoBetInput.value = 10;
const plinkoDropBtn = document.createElement('button');
plinkoDropBtn.id = 'plinko-drop-btn';
plinkoDropBtn.className = 'btn-action';
plinkoDropBtn.textContent = 'Drop Ball';
const plinkoResult = document.createElement('div');
plinkoResult.id = 'plinko-result';
plinkoResult.className = 'slot-result';
const liveDealerVideo = document.getElementById('live-dealer-video');
const balanceBox = document.getElementById('balance');
const pointsBox = document.getElementById('points');
const btnReplenish = document.getElementById('btn-replenish');
const btnWithdraw = document.getElementById('btn-withdraw');
const requisitesForm = document.getElementById('requisites-form');
const streamModal = document.getElementById('stream-modal');
const streamVideo = document.getElementById('stream-video');
const streamTitle = document.getElementById('stream-title');
const streamSubtitles = document.getElementById('stream-subtitles');
const modalClose = document.querySelector('.modal-close');
const chatSupport = document.getElementById('chat-support');
const chatToggleBtn = document.getElementById('chat-toggle-btn');
const chatCloseBtn = document.getElementById('chat-close-btn');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const chatSendBtn = document.getElementById('chat-send-btn');
const welcomePage = document.getElementById('welcome-page');
const welcomeBtn = document.getElementById('welcome-btn');
const mainContent = document.getElementById('main-content');
const themeToggleBtn = document.getElementById('theme-toggle');
const themeSelect = document.getElementById('theme-select');
const languageSelect = document.getElementById('language-select');
const sportFilter = document.getElementById('sport-filter');
const leagueFilter = document.getElementById('league-filter');
const dateFilter = document.getElementById('date-filter');
const sortPopularityBtn = document.getElementById('sort-popularity');
const statsCanvas = document.getElementById('stats-canvas');
const heatmapCanvas = document.getElementById('heatmap-canvas');
const notificationsCheckbox = document.getElementById('notifications');
const avatarInput = document.getElementById('avatar-input');
const avatarPreview = document.getElementById('avatar-preview');
const calcBtn = document.getElementById('calc-btn');
const calcAmount = document.getElementById('calc-amount');
const calcCoef = document.getElementById('calc-coef');
const calcResult = document.getElementById('calc-result');
const streamChatMessages = document.createElement('div');
streamChatMessages.id = 'stream-chat-messages';
streamChatMessages.style.height = '100px';
streamChatMessages.style.overflowY = 'auto';
const streamChatInput = document.createElement('input');
streamChatInput.id = 'stream-chat-input';
streamChatInput.type = 'text';
streamChatInput.placeholder = 'Chat during stream...';
const streamChatSendBtn = document.createElement('button');
streamChatSendBtn.id = 'stream-chat-send-btn';
streamChatSendBtn.textContent = 'Send';
streamChatSendBtn.className = 'btn-action';
const referralBtn = document.createElement('button');
referralBtn.id = 'referral-btn';
referralBtn.className = 'btn-action';
referralBtn.textContent = 'Share Referral Link';

// Локалізація
i18next.init({
  lng: localStorage.getItem('language') || 'uk',
  resources: {
    uk: {
      translation: {
        welcome_subtitle: "Найкращий букмекерський сайт",
        click_to_enter: "Натисніть, щоб увійти",
        live: "Live",
        casino: "Казино",
        news: "Новини",
        tournaments: "Турніри",
        profile: "Кабінет",
        admin: "Адмін",
        light_theme: "Світла тема",
        dark_theme: "Темна тема",
        live_matches: "🚀 Live-матчі",
        casino: "🎰 Казино",
        roulette: "🎡 Рулетка",
        blackjack_title: "🃏 Блекджек",
        poker_title: "♠ Покер",
        crash_title: "💥 Crash",
        plinko_title: "🎲 Plinko",
        live_dealer_title: "🎥 Live Dealer",
        slot_title: "🎰 Слот-машина",
        latest_news: "📰 Останні новини",
        balance: "Баланс: {{amount}} грн",
        points: "Бали: {{amount}}",
        replenish_balance: "Поповнити баланс",
        withdraw_balance: "Вивести кошти",
        save_requisites: "Зберегти",
        support: "AI-Підтримка",
        chat_placeholder: "Напишіть повідомлення...",
        spin_slot: "Запустити слот",
        spin_roulette: "Запустити рулетку",
        blackjack_deal: "Роздача",
        blackjack_hit: "Взяти",
        blackjack_stand: "Стоп",
        poker_deal: "Роздача",
        poker_fold: "Скинути",
        poker_call: "Колл",
        crash_bet: "Зробити ставку",
        crash_cashout: "Вивести",
        plinko_drop: "Скинути кульку",
        all_sports: "Усі види спорту",
        all_leagues: "Усі ліги",
        all_dates: "Усі дати",
        sort_popularity: "Сортувати за популярністю",
        football: "Футбол",
        basketball: "Баскетбол",
        tennis: "Теніс",
        esports: "Кіберспорт",
        game_sweet_bonanza: "Sweet Bonanza",
        game_wolf_gold: "Wolf Gold",
        game_gates_olympus: "Gates of Olympus",
        game_spacex: "SpaceX Adventure",
        game_plinko: "Plinko",
        tournament_slots: "teXbet Slot Championship",
        tournament_poker: "Poker Masters",
        time: "Час",
        place_bet: "Зробити ставку",
        quick_bet: "Швидка ставка",
        live_stream: "Пряма трансляція",
        add_favorite: "Додати в обране",
        remove_favorite: "Видалити з обраного",
        stats: "Статистика",
        heatmap: "Теплова карта",
        insufficient_balance: "Недостатньо коштів на балансі!",
        bet_placed: "Ставка {{amount}} грн на матч {{home}} - {{away}}",
        quick_bet_placed: "Швидка ставка {{amount}} грн на матч {{home}} - {{away}}",
        win: "Виграш! +{{amount}} грн 🚀",
        try_again: "Спробуйте ще раз!",
        enter_amount: "Введіть суму для поповнення (грн):",
        invalid_amount: "Введіть суму від 10 до 10000 грн!",
        invalid_card: "Неправильний номер карти!",
        withdraw_request: "Запит на виведення: {{amount}} грн на карту {{card}}",
        support_unavailable: "AI-підтримка тимчасово недоступна.",
        hello: "Вітаємо в teXbet! Як допомогти?",
        replenish_info: "Поповніть баланс через LiqPay або криптовалюту.",
        casino_info: "Казино: реальні ставки в слотах, рулетці, блекджеку, покері, Crash та Plinko!",
        match_info: "Live-матчі з HD-трансляціями оновлюються кожні 60 секунд.",
        stream_info: "Дивіться прямі трансляції у високій якості!",
        ar_mode: "AR-режим",
        requisites: "Реквізити",
        bet_history: "Історія ставок",
        stats_title: "Статистика активності",
        leaderboard: "Таблиця лідерів",
        settings: "Налаштування",
        enable_notifications: "Увімкнути сповіщення",
        avatar: "Аватар",
        bet_calculator: "Калькулятор ставок",
        calculate: "Розрахувати",
        calc_result: "Потенційний виграш: {{amount}} грн",
        ai_prediction: "AI-прогноз: {{prediction}}",
        referral_share: "Поділитися реферальним посиланням",
        task_complete: "Завдання виконано! +{{points}} балів"
      }
    }
  }
}, () => {
  updateTranslations();
});

// Валідація номера карти (алгоритм Луна)
function validateCardNumber(cardNumber) {
  const cleaned = cardNumber.replace(/\D/g, '');
  if (cleaned.length !== 16) return false;
  let sum = 0;
  let even = false;
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i]);
    if (even) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    even = !even;
  }
  return sum % 10 === 0;
}

// Обробка кнопки "Натисніть, щоб увійти"
welcomeBtn.addEventListener('click', () => {
  if (localStorage.getItem('authToken')) {
    welcomePage.style.opacity = '0';
    setTimeout(() => {
      welcomePage.style.display = 'none';
      mainContent.style.display = 'block';
      mainContent.style.opacity = '1';
    }, 500);
  } else {
    localStorage.setItem('authToken', 'mock-token'); // Імітація авторизації
    welcomePage.style.opacity = '0';
    setTimeout(() => {
      welcomePage.style.display = 'none';
      mainContent.style.display = 'block';
      mainContent.style.opacity = '1';
    }, 500);
  }
});

// Додавання Plinko до казино
casinoList.appendChild((() => {
  const plinkoDiv = document.createElement('div');
  plinkoDiv.className = 'plinko-game';
  plinkoDiv.setAttribute('aria-label', 'Plinko');
  plinkoDiv.setAttribute('role', 'region');
  plinkoDiv.setAttribute('aria-live', 'polite');
  plinkoDiv.innerHTML = `<h3 data-i18n="plinko_title">🎲 Plinko</h3>`;
  plinkoDiv.appendChild(plinkoCanvas);
  const plinkoControls = document.createElement('div');
  plinkoControls.className = 'plinko-controls';
  plinkoControls.appendChild(plinkoBetInput);
  plinkoControls.appendChild(plinkoDropBtn);
  plinkoDiv.appendChild(plinkoControls);
  plinkoDiv.appendChild(plinkoResult);
  return plinkoDiv;
})());

// Додавання реферального посилання
document.getElementById('profile').appendChild(referralBtn);
referralBtn.addEventListener('click', () => {
  if (navigator.share) {
    navigator.share({
      title: 'teXbet',
      text: 'Приєднуйся до teXbet і отримай бонуси!',
      url: 'https://favbett1.github.io/fav/?ref=user123'
    }).catch(err => console.error('Share error:', err));
  } else {
    alert('Реферальне посилання: https://favbett1.github.io/fav/?ref=user123');
  }
});

// Ініціалізація HLS для трансляцій
function initHLS(videoElement, src) {
  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(src);
    hls.attachMedia(videoElement);
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      videoElement.play().catch(err => console.error('Playback error:', err));
    });
  } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
    videoElement.src = src;
    videoElement.play().catch(err => console.error('Playback error:', err));
  } else {
    videoElement.src = src.replace('.m3u8', '.mp4');
    videoElement.play().catch(err => console.error('Playback error:', err));
  }
}

// Чат для трансляцій
streamModal.querySelector('.modal-content').appendChild(streamChatMessages);
streamModal.querySelector('.modal-content').appendChild(streamChatInput);
streamModal.querySelector('.modal-content').appendChild(streamChatSendBtn);
streamChatSendBtn.addEventListener('click', () => {
  const message = streamChatInput.value.trim();
  if (message && !/badword/i.test(message)) { // Простий фільтр
    const msgDiv = document.createElement('div');
    msgDiv.textContent = `User: ${message}`;
    streamChatMessages.appendChild(msgDiv);
    streamChatMessages.scrollTop = streamChatMessages.scrollHeight;
    streamChatInput.value = '';
  }
});

// AI-прогнози
function getAIPrediction(match) {
  const outcomes = match.bookmakers[0].markets[0].outcomes;
  const randomOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];
  return i18next.t('ai_prediction', { prediction: `${randomOutcome.name} (${randomOutcome.price})` });
}

// Plinko гра
const plinkoCtx = plinkoCanvas.getContext('2d');
function initPlinko() {
  plinkoCtx.fillStyle = '#1b263b';
  plinkoCtx.fillRect(0, 0, plinkoCanvas.width, plinkoCanvas.height);
  const pegs = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < i + 1; j++) {
      pegs.push({ x: 200 + (j - i / 2) * 40, y: 50 + i * 40 });
    }
  }
  pegs.forEach(peg => {
    plinkoCtx.beginPath();
    plinkoCtx.arc(peg.x, peg.y, 5, 0, Math.PI * 2);
    plinkoCtx.fillStyle = '#00d4ff';
    plinkoCtx.fill();
  });
}
initPlinko();

plinkoDropBtn.addEventListener('click', () => {
  const bet = parseFloat(plinkoBetInput.value);
  if (bet < 10 || bet > 1000 || isNaN(bet)) {
    plinkoResult.textContent = i18next.t('invalid_amount');
    return;
  }
  if (bet > balance) {
    plinkoResult.textContent = i18next.t('insufficient_balance');
    return;
  }
  balance -= bet;
  localStorage.setItem('balance', balance);
  updateTranslations();
  let x = 200, y = 0;
  const animateBall = () => {
    plinkoCtx.clearRect(0, 0, plinkoCanvas.width, plinkoCanvas.height);
    initPlinko();
    plinkoCtx.beginPath();
    plinkoCtx.arc(x, y, 10, 0, Math.PI * 2);
    plinkoCtx.fillStyle = '#ff00ff';
    plinkoCtx.fill();
    y += 5;
    x += (Math.random() - 0.5) * 20;
    if (y < plinkoCanvas.height - 50) {
      requestAnimationFrame(animateBall);
    } else {
      const multiplier = [0.5, 1, 2, 5, 10][Math.floor(Math.random() * 5)];
      const win = bet * multiplier;
      balance += win;
      localStorage.setItem('balance', balance);
      plinkoResult.textContent = i18next.t(multiplier > 1 ? 'win' : 'try_again', { amount: win.toFixed(2) });
      updateTranslations();
      if (multiplier > 1) {
        particlesJS('particles-canvas', {
          particles: { number: { value: 100 }, color: { value: '#00d4ff' }, size: { value: 3 }, move: { speed: 6 } },
          interactivity: { events: { onhover: { enable: false } } }
        });
        document.getElementById('slot-win-sound').play();
        points += 10; // Бали за виграш
        localStorage.setItem('points', points);
        updateTranslations();
      }
    }
  };
  requestAnimationFrame(animateBall);
});

// Статистика в профілі
function updateStats() {
  const ctx = statsCanvas.getContext('2d');
  ctx.fillStyle = '#1b263b';
  ctx.fillRect(0, 0, statsCanvas.width, statsCanvas.height);
  const wins = betHistory.filter(bet => bet.status === 'win').length;
  const losses = betHistory.filter(bet => bet.status === 'loss').length;
  new Chart(statsCanvas, {
    type: 'bar',
    data: {
      labels: ['Wins', 'Losses'],
      datasets: [{ label: 'Bets', data: [wins, losses], backgroundColor: ['#00d4ff', '#ff00ff'] }]
    },
    options: { scales: { y: { beginAtZero: true } } }
  });
}

// Оновлення матчів
const mockMatches = [
  { id: 1, sport_id: 1, league: "УПЛ", home: "Динамо Київ", away: "Шахтар Донецьк", time: Math.floor(Date.now() / 1000), bookmakers: [{ markets: [{ outcomes: [{ name: "1", price: 2.1 }, { name: "X", price: 3.2 }, { name: "2", price: 2.8 }] }] }], stats: "Володіння м'ячем: 55%-45%", popularity: 100, video: "https://player.vimeo.com/external/577768319.hd.mp4?s=1f0d8b0e6b6b4b7b9c4b7e0b1e6d4f3b5c6d7e8&profile_id=174", subtitles: "https://example.com/subtitles/football.vtt" },
  { id: 2, sport_id: 2, league: "NBA", home: "Лейкерс", away: "Бостон Селтікс", time: Math.floor(Date.now() / 1000), bookmakers: [{ markets: [{ outcomes: [{ name: "1", price: 1.9 }, { name: "2", price: 2.4 }] }] }], stats: "Очки: 110-108", popularity: 90, video: "https://player.vimeo.com/external/577768319.hd.mp4?s=1f0d8b0e6b6b4b7b9c4b7e0b1e6d4f3b5c6d7e8&profile_id=174", subtitles: "https://example.com/subtitles/basketball.vtt" },
  { id: 3, sport_id: 3, league: "ATP", home: "Новак Джокович", away: "Рафаель Надаль", time: Math.floor(Date.now() / 1000), bookmakers: [{ markets: [{ outcomes: [{ name: "1", price: 1.7 }, { name: "2", price: 2.1 }] }] }], stats: "Ейси: 5-3", popularity: 80, video: "https://player.vimeo.com/external/577768319.hd.mp4?s=1f0d8b0e6b6b4b7b9c4b7e0b1e6d4f3b5c6d7e8&profile_id=174", subtitles: "https://example.com/subtitles/tennis.vtt" },
  { id: 4, sport_id: 4, league: "ESL", home: "NaVi", away: "Team Spirit", time: Math.floor(Date.now() / 1000), bookmakers: [{ markets: [{ outcomes: [{ name: "1", price: 1.8 }, { name: "2", price: 2.0 }] }] }], stats: "Кількість вбивств: 20-18", popularity: 85, video: "https://player.vimeo.com/external/577768319.hd.mp4?s=1f0d8b0e6b6b4b7b9c4b7e0b1e6d4f3b5c6d7e8&profile_id=174", subtitles: "https://example.com/subtitles/esports.vtt" }
];

function updateMatches() {
  matchesContainer.innerHTML = '';
  mockMatches.forEach(match => {
    const matchCard = document.createElement('div');
    matchCard.className = 'match-card';
    matchCard.setAttribute('aria-label', `${match.home} vs ${match.away}`);
    matchCard.innerHTML = `
      <div class="match-header">${match.home} vs ${match.away}</div>
      <div class="match-league">${match.league}</div>
      <div class="match-time">${i18next.t('time')}: ${new Date(match.time * 1000).toLocaleString()}</div>
      <div class="match-stats">${i18next.t('stats')}: ${match.stats}</div>
      <div class="match-ai-prediction">${getAIPrediction(match)}</div>
      <div class="coef-list">${match.bookmakers[0].markets[0].outcomes.map(outcome => `<span class="coef-item" data-coef="${outcome.price}">${outcome.name}: ${outcome.price}</span>`).join('')}</div>
      <input type="number" class="bet-amount" min="10" max="1000" value="10" aria-label="Сума ставки" />
      <button class="btn-bet" data-i18n="place_bet">Зробити ставку</button>
      <button class="btn-quick-bet" data-i18n="quick_bet">Швидка ставка</button>
      <button class="btn-stream" data-video="${match.video}" data-subtitles="${match.subtitles}" data-i18n="live_stream">Пряма трансляція</button>
      <span class="match-favorite" data-id="${match.id}">${favoriteMatches.includes(match.id) ? i18next.t('remove_favorite') : i18next.t('add_favorite')}</span>
    `;
    matchesContainer.appendChild(matchCard);
  });
  document.querySelectorAll('.btn-bet').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const amount = parseFloat(e.target.previousElementSibling.value);
      if (amount < 10 || amount > 1000 || isNaN(amount)) {
        alert(i18next.t('invalid_amount'));
        return;
      }
      if (amount > balance) {
        alert(i18next.t('insufficient_balance'));
        return;
      }
      balance -= amount;
      localStorage.setItem('balance', balance);
      const matchCard = e.target.closest('.match-card');
      const home = matchCard.querySelector('.match-header').textContent.split(' vs ')[0];
      const away = matchCard.querySelector('.match-header').textContent.split(' vs ')[1];
      betHistory.push({ id: Date.now(), home, away, amount, status: Math.random() > 0.5 ? 'win' : 'loss' });
      localStorage.setItem('betHistory', JSON.stringify(betHistory));
      if (betHistory[betHistory.length - 1].status === 'win') {
        const winAmount = amount * parseFloat(matchCard.querySelector('.coef-item').dataset.coef);
        balance += winAmount;
        localStorage.setItem('balance', balance);
        alert(i18next.t('win', { amount: winAmount.toFixed(2) }));
        points += 5; // Бали за виграш
        localStorage.setItem('points', points);
      }
      updateTranslations();
      updateStats();
      transactions.push({ id: Date.now(), type: 'bet', amount, status: 'completed', timestamp: new Date().toISOString() });
      localStorage.setItem('transactions', JSON.stringify(transactions));
    });
  });
  document.querySelectorAll('.btn-quick-bet').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const amount = 50;
      if (amount > balance) {
        alert(i18next.t('insufficient_balance'));
        return;
      }
      balance -= amount;
      localStorage.setItem('balance', balance);
      const matchCard = e.target.closest('.match-card');
      const home = matchCard.querySelector('.match-header').textContent.split(' vs ')[0];
      const away = matchCard.querySelector('.match-header').textContent.split(' vs ')[1];
      betHistory.push({ id: Date.now(), home, away, amount, status: Math.random() > 0.5 ? 'win' : 'loss' });
      localStorage.setItem('betHistory', JSON.stringify(betHistory));
      if (betHistory[betHistory.length - 1].status === 'win') {
        const winAmount = amount * parseFloat(matchCard.querySelector('.coef-item').dataset.coef);
        balance += winAmount;
        localStorage.setItem('balance', balance);
        alert(i18next.t('quick_bet_placed', { amount, home, away }));
        alert(i18next.t('win', { amount: winAmount.toFixed(2) }));
        points += 3; // Бали за швидку ставку
        localStorage.setItem('points', points);
      }
      updateTranslations();
      updateStats();
      transactions.push({ id: Date.now(), type: 'quick_bet', amount, status: 'completed', timestamp: new Date().toISOString() });
      localStorage.setItem('transactions', JSON.stringify(transactions));
    });
  });
  document.querySelectorAll('.btn-stream').forEach(btn => {
    btn.addEventListener('click', (e) => {
      streamModal.style.display = 'flex';
      streamTitle.textContent = e.target.closest('.match-card').querySelector('.match-header').textContent;
      initHLS(streamVideo, e.target.dataset.video);
      streamSubtitles.src = e.target.dataset.subtitles;
    });
  });
  document.querySelectorAll('.match-favorite').forEach(fav => {
    fav.addEventListener('click', (e) => {
      const id = parseInt(e.target.dataset.id);
      if (favoriteMatches.includes(id)) {
        favoriteMatches = favoriteMatches.filter(f => f !== id);
        e.target.textContent = i18next.t('add_favorite');
      } else {
        favoriteMatches.push(id);
        e.target.textContent = i18next.t('remove_favorite');
      }
      localStorage.setItem('favoriteMatches', JSON.stringify(favoriteMatches));
    });
  });
}

// Ініціалізація
function init() {
  updateMatches();
  updateStats();
  if (localStorage.getItem('authToken')) {
    welcomePage.style.display = 'none';
    mainContent.style.display = 'block';
    mainContent.style.opacity = '1';
  }
  // Щоденні завдання
  if (!localStorage.getItem('lastTaskDate') || localStorage.getItem('lastTaskDate') !== new Date().toDateString()) {
    points += 10;
    localStorage.setItem('points', points);
    localStorage.setItem('lastTaskDate', new Date().toDateString());
    alert(i18next.t('task_complete', { points: 10 }));
  }
}
init();

function updateTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key === 'balance') {
      el.textContent = i18next.t(key, { amount: balance.toFixed(2) });
    } else if (key === 'points') {
      el.textContent = i18next.t(key, { amount: points });
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
    updateMatches();
  });
});

themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
  themeToggleBtn.textContent = document.body.classList.contains('light') ? i18next.t('dark_theme') : i18next.t('light_theme');
  localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
});

themeSelect.addEventListener('change', () => {
  document.body.className = themeSelect.value;
  localStorage.setItem('theme', themeSelect.value);
});

modalClose.addEventListener('click', () => {
  streamModal.style.display = 'none';
  streamVideo.pause();
});

chatToggleBtn.addEventListener('click', () => {
  chatSupport.classList.toggle('open');
});

chatCloseBtn.addEventListener('click', () => {
  chatSupport.classList.remove('open');
});

chatSendBtn.addEventListener('click', () => {
  const message = chatInput.value.trim();
  if (message && !/badword/i.test(message)) {
    chatHistory.push({ sender: 'user', message });
    chatMessages.innerHTML += `<div><strong>User:</strong> ${message}</div>`;
    chatMessages.scrollTop = chatMessages.scrollHeight;
    chatInput.value = '';
    setTimeout(() => {
      const responses = [
        i18next.t('hello'),
        i18next.t('replenish_info'),
        i18next.t('casino_info'),
        i18next.t('match_info')
      ];
      const response = responses[Math.floor(Math.random() * responses.length)];
      chatHistory.push({ sender: 'bot', message: response });
      chatMessages.innerHTML += `<div><strong>Bot:</strong> ${response}</div>`;
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  }
});

btnReplenish.addEventListener('click', () => {
  const amount = parseFloat(prompt(i18next.t('enter_amount')));
  if (amount < 10 || amount > 10000 || isNaN(amount)) {
    alert(i18next.t('invalid_amount'));
    return;
  }
  balance += amount;
  localStorage.setItem('balance', balance);
  updateTranslations();
  transactions.push({ id: Date.now(), type: 'replenish', amount, status: 'pending', card: '4149511026888354', timestamp: new Date().toISOString() });
  localStorage.setItem('transactions', JSON.stringify(transactions));
  alert(i18next.t('replenish_info'));
});

btnWithdraw.addEventListener('click', () => {
  const amount = parseFloat(prompt(i18next.t('enter_amount')));
  if (amount < 10 || amount > balance || isNaN(amount)) {
    alert(i18next.t('invalid_amount'));
    return;
  }
  if (!requisites.cardNumber || !validateCardNumber(requisites.cardNumber)) {
    alert(i18next.t('invalid_card'));
    return;
  }
  balance -= amount;
  localStorage.setItem('balance', balance);
  updateTranslations();
  chatHistory.push({ sender: 'user', message: i18next.t('withdraw_request', { amount, card: requisites.cardNumber }) });
  chatMessages.innerHTML += `<div><strong>User:</strong> ${i18next.t('withdraw_request', { amount, card: requisites.cardNumber })}</div>`;
  chatMessages.scrollTop = chatMessages.scrollHeight;
  localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  transactions.push({ id: Date.now(), type: 'withdraw', amount, status: 'pending', card: requisites.cardNumber, timestamp: new Date().toISOString() });
  localStorage.setItem('transactions', JSON.stringify(transactions));
});

requisitesForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const cardNumber = document.getElementById('card-number').value;
  if (!validateCardNumber(cardNumber)) {
    alert(i18next.t('invalid_card'));
    return;
  }
  requisites.cardNumber = cardNumber;
  requisites.cardHolder = document.getElementById('card-holder').value;
  localStorage.setItem('requisites', JSON.stringify(requisites));
  alert('Requisites saved!');
});

avatarInput.addEventListener('change', () => {
  const file = avatarInput.files[0];
  if (file) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

calcBtn.addEventListener('click', () => {
  const amount = parseFloat(calcAmount.value);
  const coef = parseFloat(calcCoef.value);
  if (isNaN(amount) || isNaN(coef) || amount < 0 || coef < 1) {
    calcResult.textContent = 'Invalid input!';
    return;
  }
  const result = amount * coef;
  calcResult.textContent = i18next.t('calc_result', { amount: result.toFixed(2) });
});

// Ініціалізація теми
if (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme')) {
  document.body.classList.add('dark');
  themeToggleBtn.textContent = i18next.t('light_theme');
}