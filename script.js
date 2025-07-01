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
const welcomeCanvas = document.getElementById('welcome-canvas');
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

const casinoGames = [
  { name: "Sweet Bonanza", provider: "Pragmatic Play", i18n: "game_sweet_bonanza", img: "https://images.unsplash.com/photo-1613336026275-53b3b4e5c6e6" },
  { name: "Wolf Gold", provider: "Pragmatic Play", i18n: "game_wolf_gold", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
  { name: "Gates of Olympus", provider: "Pragmatic Play", i18n: "game_gates_olympus", img: "https://images.unsplash.com/photo-1613336026275-53b3b4e5c6e6" },
  { name: "SpaceX Adventure", provider: "teXbet", i18n: "game_spacex", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" }
];

const mockMatches = [
  { id: 1, sport_id: 1, league: "УПЛ", home: "Динамо Київ", away: "Шахтар Донецьк", time: Math.floor(Date.now() / 1000), bookmakers: [{ markets: [{ outcomes: [{ name: "1", price: 2.1 }, { name: "X", price: 3.2 }, { name: "2", price: 2.8 }] }] }], stats: "Володіння м'ячем: 55%-45%", popularity: 100, video: "https://player.vimeo.com/external/577768319.hd.mp4?s=1f0d8b0e6b6b4b7b9c4b7e0b1e6d4f3b5c6d7e8&profile_id=174" },
  { id: 2, sport_id: 2, league: "NBA", home: "Лейкерс", away: "Бостон Селтікс", time: Math.floor(Date.now() / 1000), bookmakers: [{ markets: [{ outcomes: [{ name: "1", price: 1.9 }, { name: "2", price: 2.4 }] }] }], stats: "Очки: 110-108", popularity: 90, video: "https://player.vimeo.com/external/577768319.hd.mp4?s=1f0d8b0e6b6b4b7b9c4b7e0b1e6d4f3b5c6d7e8&profile_id=174" },
  { id: 3, sport_id: 3, league: "ATP", home: "Новак Джокович", away: "Рафаель Надаль", time: Math.floor(Date.now() / 1000), bookmakers: [{ markets: [{ outcomes: [{ name: "1", price: 1.7 }, { name: "2", price: 2.1 }] }] }], stats: "Ейси: 5-3", popularity: 80, video: "https://player.vimeo.com/external/577768319.hd.mp4?s=1f0d8b0e6b6b4b7b9c4b7e0b1e6d4f3b5c6d7e8&profile_id=174" },
  { id: 4, sport_id: 4, league: "ESL", home: "NaVi", away: "Team Spirit", time: Math.floor(Date.now() / 1000), bookmakers: [{ markets: [{ outcomes: [{ name: "1", price: 1.8 }, { name: "2", price: 2.0 }] }] }], stats: "Кількість вбивств: 20-18", popularity: 85, video: "https://player.vimeo.com/external/577768319.hd.mp4?s=1f0d8b0e6b6b4b7b9c4b7e0b1e6d4f3b5c6d7e8&profile_id=174" }
];

const mockNews = [
  { title: "teXbet запускає HD-трансляції!", content: "Дивіться матчі у високій якості 1080p!", date: "2025-07-01" },
  { title: "Кіберспорт на підйомі", content: "NaVi виграють ESL Pro League 2025.", date: "2025-06-30" }
];

const mockTournaments = [
  { name: "teXbet Slot Championship", i18n: "tournament_slots", prize: "5000 грн" },
  { name: "Poker Masters", i18n: "tournament_poker", prize: "10000 грн" }
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
        withdraw_request: "Запит на виведення: {{amount}} грн на карту {{card}}",
        support_unavailable: "AI-підтримка тимчасово недоступна.",
        hello: "Вітаємо в teXbet! Як допомогти?",
        replenish_info: "Поповніть баланс через LiqPay, кошти надійдуть на карту адміністратора.",
        casino_info: "Казино: реальні ставки в слотах, рулетці, блекджеку, покері та Crash!",
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
        calc_result: "Потенційний виграш: {{amount}} грн"
      }
    },
    en: {
      translation: {
        welcome_subtitle: "The Ultimate Betting Site",
        click_to_enter: "Click to enter",
        live: "Live",
        casino: "Casino",
        news: "News",
        tournaments: "Tournaments",
        profile: "Profile",
        admin: "Admin",
        light_theme: "Light Theme",
        dark_theme: "Dark Theme",
        live_matches: "🚀 Live Matches",
        casino: "🎰 Casino",
        roulette: "🎡 Roulette",
        blackjack_title: "🃏 Blackjack",
        poker_title: "♠ Poker",
        crash_title: "💥 Crash",
        live_dealer_title: "🎥 Live Dealer",
        slot_title: "🎰 Slot Machine",
        latest_news: "📰 Latest News",
        balance: "Balance: {{amount}} UAH",
        points: "Points: {{amount}}",
        replenish_balance: "Top Up Balance",
        withdraw_balance: "Withdraw Funds",
        save_requisites: "Save",
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
        crash_bet: "Place Bet",
        crash_cashout: "Cash Out",
        all_sports: "All Sports",
        all_leagues: "All Leagues",
        all_dates: "All Dates",
        sort_popularity: "Sort by Popularity",
        football: "Football",
        basketball: "Basketball",
        tennis: "Tennis",
        esports: "Esports",
        game_sweet_bonanza: "Sweet Bonanza",
        game_wolf_gold: "Wolf Gold",
        game_gates_olympus: "Gates of Olympus",
        game_spacex: "SpaceX Adventure",
        tournament_slots: "teXbet Slot Championship",
        tournament_poker: "Poker Masters",
        time: "Time",
        place_bet: "Place Bet",
        quick_bet: "Quick Bet",
        live_stream: "Live Stream",
        add_favorite: "Add to Favorites",
        remove_favorite: "Remove from Favorites",
        stats: "Stats",
        heatmap: "Heatmap",
        insufficient_balance: "Insufficient balance!",
        bet_placed: "Bet of {{amount}} UAH on match {{home}} - {{away}}",
        quick_bet_placed: "Quick bet of {{amount}} UAH on match {{home}} - {{away}}",
        win: "Win! +{{amount}} UAH 🚀",
        try_again: "Try again!",
        enter_amount: "Enter amount to top up (UAH):",
        invalid_amount: "Enter an amount between 10 and 10000 UAH!",
        withdraw_request: "Withdrawal request: {{amount}} UAH to card {{card}}",
        support_unavailable: "AI support temporarily unavailable.",
        hello: "Welcome to teXbet! How can we help?",
        replenish_info: "Top up your balance via LiqPay, funds go to the admin's card.",
        casino_info: "Casino: real bets in slots, roulette, blackjack, poker, and Crash!",
        match_info: "Live matches with HD streams update every 60 seconds.",
        stream_info: "Watch live streams in high quality!",
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
        welcome_subtitle: "Лучший букмекерский сайт",
        click_to_enter: "Нажмите, чтобы войти",
        live: "Live",
        casino: "Казино",
        news: "Новости",
        tournaments: "Турниры",
        profile: "Кабинет",
        admin: "Админ",
        light_theme: "Светлая тема",
        dark_theme: "Темная тема",
        live_matches: "🚀 Live-матчи",
        casino: "🎰 Казино",
        roulette: "🎡 Рулетка",
        blackjack_title: "🃏 Блэкджек",
        poker_title: "♠ Покер",
        crash_title: "💥 Crash",
        live_dealer_title: "🎥 Live Dealer",
        slot_title: "🎰 Слот-машина",
        latest_news: "📰 Последние новости",
        balance: "Баланс: {{amount}} грн",
        points: "Баллы: {{amount}}",
        replenish_balance: "Пополнить баланс",
        withdraw_balance: "Вывести средства",
        save_requisites: "Сохранить",
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
        crash_bet: "Сделать ставку",
        crash_cashout: "Вывести",
        all_sports: "Все виды спорта",
        all_leagues: "Все лиги",
        all_dates: "Все даты",
        sort_popularity: "Сортировать по популярности",
        football: "Футбол",
        basketball: "Баскетбол",
        tennis: "Теннис",
        esports: "Киберспорт",
        game_sweet_bonanza: "Sweet Bonanza",
        game_wolf_gold: "Wolf Gold",
        game_gates_olympus: "Gates of Olympus",
        game_spacex: "SpaceX Adventure",
        tournament_slots: "teXbet Slot Championship",
        tournament_poker: "Poker Masters",
        time: "Время",
        place_bet: "Сделать ставку",
        quick_bet: "Быстрая ставка",
        live_stream: "Прямая трансляция",
        add_favorite: "Добавить в избранное",
        remove_favorite: "Удалить из избранного",
        stats: "Статистика",
        heatmap: "Тепловая карта",
        insufficient_balance: "Недостаточно средств на балансе!",
        bet_placed: "Ставка {{amount}} грн на матч {{home}} - {{away}}",
        quick_bet_placed: "Быстрая ставка {{amount}} грн на матч {{home}} - {{away}}",
        win: "Выигрыш! +{{amount}} грн 🚀",
        try_again: "Попробуйте еще раз!",
        enter_amount: "Введите сумму для пополнения (грн):",
        invalid_amount: "Введите сумму от 10 до 10000 грн!",
        withdraw_request: "Запрос на вывод: {{amount}} грн на карту {{card}}",
        support_unavailable: "ИИ-поддержка временно недоступна.",
        hello: "Добро пожаловать в teXbet! Чем можем помочь?",
        replenish_info: "Пополните баланс через LiqPay, средства поступят на карту администратора.",
        casino_info: "Казино: реальные ставки в слотах, рулетке, блэкджеке, покере и Crash!",
        match_info: "Live-матчи с HD-трансляциями обновляются каждые 60 секунд.",
        stream_info: "Смотрите прямые трансляции в высоком качестве!",
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
        welcome_subtitle: "Najlepsza strona bukmacherska",
        click_to_enter: "Kliknij, aby wejść",
        live: "Na żywo",
        casino: "Kasyno",
        news: "Wiadomości",
        tournaments: "Turnieje",
        profile: "Profil",
        admin: "Admin",
        light_theme: "Jasny motyw",
        dark_theme: "Ciemny motyw",
        live_matches: "🚀 Mecze na żywo",
        casino: "🎰 Kasyno",
        roulette: "🎡 Ruletka",
        blackjack_title: "🃏 Blackjack",
        poker_title: "♠ Poker",
        crash_title: "💥 Crash",
        live_dealer_title: "🎥 Live Dealer",
        slot_title: "🎰 Automat",
        latest_news: "📰 Najnowsze wiadomości",
        balance: "Saldo: {{amount}} PLN",
        points: "Punkty: {{amount}}",
        replenish_balance: "Doładuj saldo",
        withdraw_balance: "Wypłać środki",
        save_requisites: "Zapisz",
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
        crash_bet: "Postaw zakład",
        crash_cashout: "Wypłać",
        all_sports: "Wszystkie sporty",
        all_leagues: "Wszystkie ligi",
        all_dates: "Wszystkie daty",
        sort_popularity: "Sortuj według popularności",
        football: "Piłka nożna",
        basketball: "Koszykówka",
        tennis: "Tenis",
        esports: "Esport",
        game_sweet_bonanza: "Sweet Bonanza",
        game_wolf_gold: "Wolf Gold",
        game_gates_olympus: "Gates of Olympus",
        game_spacex: "SpaceX Adventure",
        tournament_slots: "teXbet Slot Championship",
        tournament_poker: "Poker Masters",
        time: "Czas",
        place_bet: "Postaw zakład",
        quick_bet: "Szybki zakład",
        live_stream: "Transmisja na żywo",
        add_favorite: "Dodaj do ulubionych",
        remove_favorite: "Usuń z ulubionych",
        stats: "Statystyki",
        heatmap: "Mapa ciepła",
        insufficient_balance: "Niewystarczające saldo!",
        bet_placed: "Zakład {{amount}} PLN na mecz {{home}} - {{away}}",
        quick_bet_placed: "Szybki zakład {{amount}} PLN na mecz {{home}} - {{away}}",
        win: "Wygrana! +{{amount}} PLN 🚀",
        try_again: "Spróbuj ponownie!",
        enter_amount: "Wprowadź kwotę do doładowania (PLN):",
        invalid_amount: "Wprowadź kwotę od 10 do 10000 PLN!",
        withdraw_request: "Wniosek o wypłatę: {{amount}} PLN na kartę {{card}}",
        support_unavailable: "Wsparcie AI chwilowo niedostępne.",
        hello: "Witamy w teXbet! Jak możemy pomóc?",
        replenish_info: "Doładuj saldo za pomocą LiqPay, środki trafią na kartę administratora.",
        casino_info: "Kasyno: prawdziwe zakłady w automatach, ruletce, blackjacku, pokerze i Crash!",
        match_info: "Mecze na żywo z transmisjami HD aktualizują się co 60 sekund.",
        stream_info: "Oglądaj transmisje na żywo w wysokiej jakości!",
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
    localStorage.set