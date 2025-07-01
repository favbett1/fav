const API_KEY = "15687e1fc75dff9890d58aa512214463";
let balance = parseFloat(localStorage.getItem('balance')) || 1000;
let points = parseInt(localStorage.getItem('points')) || 0;
let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
let betHistory = JSON.parse(localStorage.getItem('betHistory')) || [];
let favoriteMatches = JSON.parse(localStorage.getItem('favoriteMatches')) || [];
let requisites = JSON.parse(localStorage.getItem('requisites')) || { cardNumber: '', cardHolder: '' };
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
const balanceBox = document.getElementById('balance');
const pointsBox = document.getElementById('points');
const btnReplenish = document.getElementById('btn-replenish');
const requisitesForm = document.getElementById('requisites-form');
const streamModal = document.getElementById('stream-modal');
const streamVideo = document.getElementById('stream-video');
const streamTitle = document.getElementById('stream-title');
const modalClose = document.querySelector('.modal-close');
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
const themeSelect = document.getElementById('theme-select');
const languageSelect = document.getElementById('language-select');
const sportFilter = document.getElementById('sport-filter');
const leagueFilter = document.getElementById('league-filter');
const dateFilter = document.getElementById('date-filter');
const sortPopularityBtn = document.getElementById('sort-popularity');
const statsCanvas = document.getElementById('stats-canvas');
const notificationsCheckbox = document.getElementById('notifications');
const avatarInput = document.getElementById('avatar-input');
const avatarPreview = document.getElementById('avatar-preview');
const calcBtn = document.getElementById('calc-btn');
const calcAmount = document.getElementById('calc-amount');
const calcCoef = document.getElementById('calc-coef');
const calcResult = document.getElementById('calc-result');

const casinoGames = [
  { name: "Sweet Bonanza (Demo)", provider: "Pragmatic Play", i18n: "game_sweet_bonanza", img: "https://images.unsplash.com/photo-1613336026275-53b3b4e5c6e6" },
  { name: "Wolf Gold (Demo)", provider: "Pragmatic Play", i18n: "game_wolf_gold", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
  { name: "Gates of Olympus (Demo)", provider: "Pragmatic Play", i18n: "game_gates_olympus", img: "https://images.unsplash.com/photo-1613336026275-53b3b4e5c6e6" },
  { name: "The Dog House (Demo)", provider: "Pragmatic Play", i18n: "game_dog_house", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" }
];

const mockMatches = [
  { id: 1, sport_id: 1, league: "УПЛ", home: "Динамо Київ", away: "Шахтар Донецьк", time: Math.floor(Date.now() / 1000), bookmakers: [{ markets: [{ outcomes: [{ name: "1", price: 2.1 }, { name: "X", price: 3.2 }, { name: "2", price: 2.8 }] }] }], stats: "Володіння м'ячем: 55%-45%", popularity: 100, video: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { id: 2, sport_id: 2, league: "NBA", home: "Лейкерс", away: "Бостон Селтікс", time: Math.floor(Date.now() / 1000), bookmakers: [{ markets: [{ outcomes: [{ name: "1", price: 1.9 }, { name: "2", price: 2.4 }] }] }], stats: "Очки: 110-108", popularity: 90, video: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { id: 3, sport_id: 3, league: "ATP", home: "Новак Джокович", away: "Рафаель Надаль", time: Math.floor(Date.now() / 1000), bookmakers: [{ markets: [{ outcomes: [{ name: "1", price: 1.7 }, { name: "2", price: 2.1 }] }] }], stats: "Ейси: 5-3", popularity: 80, video: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { id: 4, sport_id: 4, league: "ESL", home: "NaVi", away: "Team Spirit", time: Math.floor(Date.now() / 1000), bookmakers: [{ markets: [{ outcomes: [{ name: "1", price: 1.8 }, { name: "2", price: 2.0 }] }] }], stats: "Кількість вбивств: 20-18", popularity: 85, video: "https://www.w3schools.com/html/mov_bbb.mp4" }
];

const mockNews = [
  { title: "Революція в ставках від teXbet!", content: "teXbet запускає прямі трансляції та турніри!", date: "2025-07-01" },
  { title: "Кіберспорт на підйомі", content: "NaVi виграють ESL Pro League 2025.", date: "2025-06-30" }
];

const mockTournaments = [
  { name: "teXbet Slot Championship", i18n: "tournament_slots", prize: "5000 демо-грн" },
  { name: "Poker Masters", i18n: "tournament_poker", prize: "10000 демо-грн" }
];

const mockLeaderboard = [
  { name: "Player1", points: 1500 },
  { name: "Player2", points: 1200 },
  { name: "Player3", points: 900 }
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
        tournaments: "Турніри",
        profile: "Кабінет",
        light_theme: "Світла тема",
        dark_theme: "Темна тема",
        live_matches: "🚀 Live-матчі",
        casino_demo: "🎰 Казино (Демо)",
        roulette_demo: "🎡 Демо рулетка",
        blackjack_title: "🃏 Демо блекджек",
        poker_title: "♠ Демо покер",
        slot_title: "🎰 Слот-машина (Демо)",
        latest_news: "📰 Останні новини",
        balance: "Баланс: {{amount}} грн",
        points: "Бали: {{amount}}",
        replenish_balance: "Поповнити демо баланс",
        save_requisites: "Зберегти",
        login: "Увійти",
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
        all_sports: "Усі види спорту",
        all_leagues: "Усі ліги",
        all_dates: "Усі дати",
        sort_popularity: "Сортувати за популярністю",
        football: "Футбол",
        basketball: "Баскетбол",
        tennis: "Теніс",
        esports: "Кіберспорт",
        game_sweet_bonanza: "Sweet Bonanza (Демо)",
        game_wolf_gold: "Wolf Gold (Демо)",
        game_gates_olympus: "Gates of Olympus (Демо)",
        game_dog_house: "The Dog House (Демо)",
        tournament_slots: "teXbet Slot Championship",
        tournament_poker: "Poker Masters",
        time: "Час",
        place_bet: "Зробити ставку",
        quick_bet: "Швидка ставка",
        live_stream: "Пряма трансляція",
        add_favorite: "Додати в обране",
        remove_favorite: "Видалити з обраного",
        stats: "Статистика",
        insufficient_balance: "Недостатньо коштів на балансі!",
        bet_placed: "Ставка {{amount}} грн на матч {{home}} - {{away}}",
        quick_bet_placed: "Швидка ставка {{amount}} грн на матч {{home}} - {{away}}",
        win: "Виграш! +{{amount}} грн 🚀",
        try_again: "Спробуйте ще раз!",
        enter_amount: "Введіть суму для поповнення (грн):",
        invalid_amount: "Введіть суму від 1 до 10000 грн!",
        login_unavailable: "Вхід недоступний (демо-режим)",
        support_unavailable: "AI-підтримка тимчасово недоступна.",
        hello: "Вітаємо в teXbet! Як допомогти?",
        replenish_info: "Поповніть демо-баланс через кнопку 'Поповнити демо баланс'.",
        casino_info: "Казино в демо-режимі: слоти, рулетка, блекджек, покер!",
        match_info: "Live-матчі оновлюються кожні 60 секунд. Фільтруйте за спортом, лігою, датою.",
        stream_info: "Дивіться прямі трансляції матчів у демо-режимі!",
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
        calc_result: "Потенційний виграш: {{amount}} грн"
      }
    },
    en: {
      translation: {
        welcome_subtitle: "The Ultimate Betting Site by Elon Musk",
        click_to_enter: "Click to enter the future of betting",
        live: "Live",
        casino: "Casino",
        news: "News",
        tournaments: "Tournaments",
        profile: "Profile",
        light_theme: "Light Theme",
        dark_theme: "Dark Theme",
        live_matches: "🚀 Live Matches",
        casino_demo: "🎰 Casino (Demo)",
        roulette_demo: "🎡 Demo Roulette",
        blackjack_title: "🃏 Demo Blackjack",
        poker_title: "♠ Demo Poker",
        slot_title: "🎰 Slot Machine (Demo)",
        latest_news: "📰 Latest News",
        balance: "Balance: {{amount}} UAH",
        points: "Points: {{amount}}",
        replenish_balance: "Top Up Demo Balance",
        save_requisites: "Save",
        login: "Log In",
        support: "AI Support",
        chat_placeholder: "Type a message...",
        spin_slot: "Spin Slot",
        spin_roulette: "Spin Roulette",
        blackjack_deal: "Deal",
        blackjack_hit: "Hit",
        blackjack_stand: "Stand",
        poker_deal: "Deal",
        poker_fold: "Fold",
        poker_call: "Call",
        all_sports: "All Sports",
        all_leagues: "All Leagues",
        all_dates: "All Dates",
        sort_popularity: "Sort by Popularity",
        football: "Football",
        basketball: "Basketball",
        tennis: "Tennis",
        esports: "Esports",
        game_sweet_bonanza: "Sweet Bonanza (Demo)",
        game_wolf_gold: "Wolf Gold (Demo)",
        game_gates_olympus: "Gates of Olympus (Demo)",
        game_dog_house: "The Dog House (Demo)",
        tournament_slots: "teXbet Slot Championship",
        tournament_poker: "Poker Masters",
        time: "Time",
        place_bet: "Place Bet",
        quick_bet: "Quick Bet",
        live_stream: "Live Stream",
        add_favorite: "Add to Favorites",
        remove_favorite: "Remove from Favorites",
        stats: "Stats",
        insufficient_balance: "Insufficient balance!",
        bet_placed: "Bet of {{amount}} UAH on match {{home}} - {{away}}",
        quick_bet_placed: "Quick bet of {{amount}} UAH on match {{home}} - {{away}}",
        win: "Win! +{{amount}} UAH 🚀",
        try_again: "Try again!",
        enter_amount: "Enter amount to top up (UAH):",
        invalid_amount: "Enter an amount between 1 and 10000 UAH!",
        login_unavailable: "Login unavailable (demo mode)",
        support_unavailable: "AI support temporarily unavailable.",
        hello: "Welcome to teXbet! How can we help?",
        replenish_info: "Top up your demo balance using the 'Top Up Demo Balance' button.",
        casino_info: "Casino in demo mode: slots, roulette, blackjack, poker!",
        match_info: "Live matches update every 60 seconds. Filter by sport, league, date.",
        stream_info: "Watch live streams of matches in demo mode!",
        ar_mode: "AR Mode",
        requisites: "Requisites",
        bet_history: "Bet History",
        stats_title: "Activity Stats",
        leaderboard: "Leaderboard",
        settings: "Settings",
        enable_notifications: "Enable Notifications",
        avatar: "Avatar",
        bet_calculator: "Bet Calculator",
        calculate: "Calculate",
        calc_result: "Potential winnings: {{amount}} UAH"
      }
    },
    ru: {
      translation: {
        welcome_subtitle: "Лучший букмекерский сайт от Илона Маска",
        click_to_enter: "Нажмите, чтобы войти в будущее ставок",
        live: "Live",
        casino: "Казино",
        news: "Новости",
        tournaments: "Турниры",
        profile: "Кабинет",
        light_theme: "Светлая тема",
        dark_theme: "Темная тема",
        live_matches: "🚀 Live-матчи",
        casino_demo: "🎰 Казино (Демо)",
        roulette_demo: "🎡 Демо рулетка",
        blackjack_title: "🃏 Демо блэкджек",
        poker_title: "♠ Демо покер",
        slot_title: "🎰 Слот-машина (Демо)",
        latest_news: "📰 Последние новости",
        balance: "Баланс: {{amount}} грн",
        points: "Баллы: {{amount}}",
        replenish_balance: "Пополнить демо баланс",
        save_requisites: "Сохранить",
        login: "Войти",
        support: "ИИ-Поддержка",
        chat_placeholder: "Напишите сообщение...",
        spin_slot: "Запустить слот",
        spin_roulette: "Запустить рулетку",
        blackjack_deal: "Раздача",
        blackjack_hit: "Взять",
        blackjack_stand: "Стоп",
        poker_deal: "Раздача",
        poker_fold: "Сбросить",
        poker_call: "Колл",
        all_sports: "Все виды спорта",
        all_leagues: "Все лиги",
        all_dates: "Все даты",
        sort_popularity: "Сортировать по популярности",
        football: "Футбол",
        basketball: "Баскетбол",
        tennis: "Теннис",
        esports: "Киберспорт",
        game_sweet_bonanza: "Sweet Bonanza (Демо)",
        game_wolf_gold: "Wolf Gold (Демо)",
        game_gates_olympus: "Gates of Olympus (Демо)",
        game_dog_house: "The Dog House (Демо)",
        tournament_slots: "teXbet Slot Championship",
        tournament_poker: "Poker Masters",
        time: "Время",
        place_bet: "Сделать ставку",
        quick_bet: "Быстрая ставка",
        live_stream: "Прямая трансляция",
        add_favorite: "Добавить в избранное",
        remove_favorite: "Удалить из избранного",
        stats: "Статистика",
        insufficient_balance: "Недостаточно средств на балансе!",
        bet_placed: "Ставка {{amount}} грн на матч {{home}} - {{away}}",
        quick_bet_placed: "Быстрая ставка {{amount}} грн на матч {{home}} - {{away}}",
        win: "Выигрыш! +{{amount}} грн 🚀",
        try_again: "Попробуйте еще раз!",
        enter_amount: "Введите сумму для пополнения (грн):",
        invalid_amount: "Введите сумму от 1 до 10000 грн!",
        login_unavailable: "Вход недоступен (демо-режим)",
        support_unavailable: "ИИ-поддержка временно недоступна.",
        hello: "Добро пожаловать в teXbet! Чем можем помочь?",
        replenish_info: "Пополните демо-баланс через кнопку 'Пополнить демо баланс'.",
        casino_info: "Казино в демо-режиме: слоты, рулетка, блэкджек, покер!",
        match_info: "Live-матчи обновляются каждые 60 секунд. Фильтруйте по спорту, лиге, дате.",
        stream_info: "Смотрите прямые трансляции матчей в демо-режиме!",
        ar_mode: "AR-режим",
        requisites: "Реквизиты",
        bet_history: "История ставок",
        stats_title: "Статистика активности",
        leaderboard: "Таблица лидеров",
        settings: "Настройки",
        enable_notifications: "Включить уведомления",
        avatar: "Аватар",
        bet_calculator: "Калькулятор ставок",
        calculate: "Рассчитать",
        calc_result: "Потенциальный выигрыш: {{amount}} грн"
      }
    },
    pl: {
      translation: {
        welcome_subtitle: "Najlepsza strona bukmacherska od Elona Muska",
        click_to_enter: "Kliknij, aby wejść w przyszłość zakładów",
        live: "Na żywo",
        casino: "Kasyno",
        news: "Wiadomości",
        tournaments: "Turnieje",
        profile: "Profil",
        light_theme: "Jasny motyw",
        dark_theme: "Ciemny motyw",
        live_matches: "🚀 Mecze na żywo",
        casino_demo: "🎰 Kasyno (Demo)",
        roulette_demo: "🎡 Demo Ruletka",
        blackjack_title: "🃏 Demo Blackjack",
        poker_title: "♠ Demo Poker",
        slot_title: "🎰 Automat (Demo)",
        latest_news: "📰 Najnowsze wiadomości",
        balance: "Saldo: {{amount}} PLN",
        points: "Punkty: {{amount}}",
        replenish_balance: "Doładuj saldo demo",
        save_requisites: "Zapisz",
        login: "Zaloguj się",
        support: "Wsparcie AI",
        chat_placeholder: "Napisz wiadomość...",
        spin_slot: "Zakręć automatem",
        spin_roulette: "Zakręć ruletką",
        blackjack_deal: "Rozdanie",
        blackjack_hit: "Dobierz",
        blackjack_stand: "Pas",
        poker_deal: "Rozdanie",
        poker_fold: "Fold",
        poker_call: "Call",
        all_sports: "Wszystkie sporty",
        all_leagues: "Wszystkie ligi",
        all_dates: "Wszystkie daty",
        sort_popularity: "Sortuj według popularności",
        football: "Piłka nożna",
        basketball: "Koszykówka",
        tennis: "Tenis",
        esports: "Esport",
        game_sweet_bonanza: "Sweet Bonanza (Demo)",
        game_wolf_gold: "Wolf Gold (Demo)",
        game_gates_olympus: "Gates of Olympus (Demo)",
        game_dog_house: "The Dog House (Demo)",
        tournament_slots: "teXbet Slot Championship",
        tournament_poker: "Poker Masters",
        time: "Czas",
        place_bet: "Postaw zakład",
        quick_bet: "Szybki zakład",
        live_stream: "Transmisja na żywo",
        add_favorite: "Dodaj do ulubionych",
        remove_favorite: "Usuń z ulubionych",
        stats: "Statystyki",
        insufficient_balance: "Niewystarczające saldo!",
        bet_placed: "Zakład {{amount}} PLN na mecz {{home}} - {{away}}",
        quick_bet_placed: "Szybki zakład {{amount}} PLN na mecz {{home}} - {{away}}",
        win: "Wygrana! +{{amount}} PLN 🚀",
        try_again: "Spróbuj ponownie!",
        enter_amount: "Wprowadź kwotę do doładowania (PLN):",
        invalid_amount: "Wprowadź kwotę od 1 do 10000 PLN!",
        login_unavailable: "Logowanie niedostępne (tryb demo)",
        support_unavailable: "Wsparcie AI chwilowo niedostępne.",
        hello: "Witamy w teXbet! Jak możemy pomóc?",
        replenish_info: "Doładuj saldo demo za pomocą przycisku 'Doładuj saldo demo'.",
        casino_info: "Kasyno w trybie demo: automaty, ruletka, blackjack, poker!",
        match_info: "Mecze na żywo aktualizują się co 60 sekund. Filtruj według sportu, ligi, daty.",
        stream_info: "Oglądaj transmisje meczów na żywo w trybie demo!",
        ar_mode: "Tryb AR",
        requisites: "Dane do płatności",
        bet_history: "Historia zakładów",
        stats_title: "Statystyki aktywności",
        leaderboard: "Tabela liderów",
        settings: "Ustawienia",
        enable_notifications: "Włącz powiadomienia",
        avatar: "Awatar",
        bet_calculator: "Kalkulator zakładów",
        calculate: "Oblicz",
        calc_result: "Potencjalna wygrana: {{amount}} PLN"
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
    renderCasinoGames();
    renderBetHistory();
    renderStats();
    renderTournaments();
    renderLeaderboard();
  });
});

// Титульна сторінка з GSAP
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
  gsap.to(welcomePage, { opacity: 0, duration: 1, onComplete: () => welcomePage.style.display = 'none' });
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
    tabs.forEach(tab => {
      tab.hidden = true;
      gsap.to(tab, { opacity: 0, y: 20, duration: 0.3 });
    });
    const activeTab = document.getElementById(link.getAttribute('data-tab'));
    activeTab.hidden = false;
    gsap.to(activeTab, { opacity: 1, y: 0, duration: 0.5 });
  });
});

// Теми
themeSelect.addEventListener('change', () => {
  document.body.className = themeSelect.value;
  updateTranslations();
});
themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
  themeToggleBtn.textContent = document.body.classList.contains('light') ?
    i18next.t('dark_theme') : i18next.t('light_theme');
});

// Live-матчі
async function fetchMatches(sportId = 'all', league = 'all', date = 'all') {
  matchesContainer.innerHTML = '<p>Loading matches...</p>';
  try {
    const url = `https://cors-anywhere.herokuapp.com/https://api.betsapi.com/v2/events/inplay?sport_id=${sportId === 'all' ? 1 : sportId}&token=${API_KEY}`;
    const response = await fetch(url, { headers: { 'X-Requested-With': 'XMLHttpRequest' } });
    const data = await response.json();
    let matches = data.success && data.results && data.results.length > 0 ? data.results : mockMatches;
    const leagues = [...new Set(matches.map(m => m.league?.name || 'Unknown'))];
    updateLeagueFilter(leagues);
    if (date !== 'all') {
      const today = new Date().toISOString().slice(0, 10);
      const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
      matches = matches.filter(m => {
        const matchDate = new Date(m.time * 1000).toISOString().slice(0, 10);
        return date === 'today' ? matchDate === today : matchDate === tomorrow;
      });
    }
    renderMatches(matches.filter(m => league === 'all' || m.league?.name === league));
  } catch (err) {
    console.error('Fetch Error:', err);
    matchesContainer.innerHTML = `<p style="color:#f55;">Error loading matches: ${err.message}</p>`;
    const leagues = [...new Set(mockMatches.map(m => m.league))];
    updateLeagueFilter(leagues);
    let matches = mockMatches.filter(m => (sportId === 'all' || m.sport_id == sportId) && (league === 'all' || m.league === league));
    if (date !== 'all') {
      const today = new Date().toISOString().slice(0, 10);
      const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
      matches = matches.filter(m => {
        const matchDate = new Date(m.time * 1000).toISOString().slice(0, 10);
        return date === 'today' ? matchDate === today : matchDate === tomorrow;
      });
    }
    renderMatches(matches);
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
  matches.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
  matches.forEach(match => {
    const div = document.createElement('div');
    div.className = 'match-card fade-in';
    const home = escapeHTML(match.home || 'Team A');
    const away = escapeHTML(match.away || 'Team B');
    const league = escapeHTML(match.league || 'Unknown');
    const time = new Date(match.time * 1000).toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
    let coefText = 'Coefficients unavailable';
    if (match.bookmakers && match.bookmakers.length > 0 && match.bookmakers[0].markets.length > 0) {
      coefText = match.bookmakers[0