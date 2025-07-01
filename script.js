const API_KEY = "15687e1fc75dff9890d58aa512214463"; // Заглушка для SportRadar API
const LIQPAY_PUBLIC_KEY = "sandbox_i123456789"; // Замінити на реальний ключ LiqPay
let balance = parseFloat(localStorage.getItem('balance')) || 0;
let points = parseInt(localStorage.getItem('points')) || 0;
let jackpot = parseFloat(localStorage.getItem('jackpot')) || 1000;
let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
let betHistory = JSON.parse(localStorage.getItem('betHistory')) || [];
let favoriteMatches = JSON.parse(localStorage.getItem('favoriteMatches')) || [];
let requisites = JSON.parse(localStorage.getItem('requisites')) || { cardNumber: '', cardHolder: '' };
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
const matchesContainer = document.getElementById('matches');
const casinoList = document.getElementById('casino-list');
const tournamentList = document.getElementById('tournament-list');
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
const languageSelect = document.getElementById('language-select');
const sportFilter = document.getElementById('sport-filter');
const logoCanvas = document.getElementById('logo-canvas');
const welcomeCanvas = document.getElementById('welcome-canvas');
const notificationsCheckbox = document.getElementById('notifications');
const avatarInput = document.getElementById('avatar-input');
const avatarPreview = document.getElementById('avatar-preview');
const calcBtn = document.getElementById('calc-btn');
const calcAmount = document.getElementById('calc-amount');
const calcCoef = document.getElementById('calc-coef');
const calcResult = document.getElementById('calc-result');
const referralBtn = document.getElementById('referral-btn');
const taskNotification = document.getElementById('task-notification');
const plinkoCanvas = document.createElement('canvas');
plinkoCanvas.id = 'plinko-canvas';
plinkoCanvas.width = 600;
plinkoCanvas.height = 600;
const plinkoBetInput = document.createElement('input');
plinkoBetInput.type = 'number';
plinkoBetInput.id = 'plinko-bet';
plinkoBetInput.min = 10;
plinkoBetInput.max = 1000;
plinkoBetInput.value = 10;
plinkoBetInput.setAttribute('aria-label', 'Plinko bet amount');
const plinkoDropBtn = document.createElement('button');
plinkoDropBtn.id = 'plinko-drop-btn';
plinkoDropBtn.className = 'btn-action';
plinkoDropBtn.textContent = 'Drop Ball';
plinkoDropBtn.setAttribute('aria-label', 'Drop Plinko ball');
const plinkoResult = document.createElement('div');
plinkoResult.id = 'plinko-result';
plinkoResult.className = 'slot-result';
const streamChatMessages = document.createElement('div');
streamChatMessages.id = 'stream-chat-messages';
streamChatMessages.style.height = '120px';
streamChatMessages.style.overflowY = 'auto';
streamChatMessages.setAttribute('aria-label', 'Stream chat messages');
const streamChatInput = document.createElement('input');
streamChatInput.id = 'stream-chat-input';
streamChatInput.type = 'text';
streamChatInput.placeholder = 'Chat during stream...';
streamChatInput.setAttribute('aria-label', 'Stream chat input');
const streamChatSendBtn = document.createElement('button');
streamChatSendBtn.id = 'stream-chat-send-btn';
streamChatSendBtn.textContent = 'Send';
streamChatSendBtn.className = 'btn-action';
streamChatSendBtn.setAttribute('aria-label', 'Send stream chat message');

// Локалізація
i18next.init({
  lng: localStorage.getItem('language') || 'uk',
  resources: {
    uk: {
      translation: {
        welcome_subtitle: "Космічна платформа для ставок і азарту",
        click_to_enter: "Розпочати пригоди",
        live: "Live",
        casino: "Казино",
        tournaments: "Турніри",
        profile: "Кабінет",
        admin: "Адмін",
        light_theme: "Світла тема",
        dark_theme: "Темна тема",
        live_matches: "🚀 Live-матчі",
        casino: "🎰 Казино",
        plinko_title: "🎲 Plinko",
        balance: "Баланс: {{amount}} грн",
        points: "Бали: {{amount}}",
        jackpot: "Джекпот: {{amount}} грн",
        replenish_balance: "Поповнити",
        withdraw_balance: "Вивести",
        save_requisites: "Зберегти",
        support: "AI-Підтримка",
        chat_placeholder: "Напишіть повідомлення...",
        plinko_drop: "Скинути кульку",
        all_sports: "Усі види спорту",
        all_leagues: "Усі ліги",
        all_dates: "Усі дати",
        sort_popularity: "Популярність",
        football: "Футбол",
        basketball: "Баскетбол",
        tennis: "Теніс",
        esports: "Кіберспорт",
        time: "Час",
        place_bet: "Зробити ставку",
        quick_bet: "Швидка ставка",
        live_stream: "Пряма трансляція",
        add_favorite: "Додати в обране",
        remove_favorite: "Видалити з обраного",
        stats: "Статистика",
        insufficient_balance: "Недостатньо коштів!",
        bet_placed: "Ставка {{amount}} грн на матч {{home}} - {{away}}",
        quick_bet_placed: "Швидка ставка {{amount}} грн на матч {{home}} - {{away}}",
        win: "Виграш! +{{amount}} грн 🚀",
        try_again: "Спробуйте ще раз!",
        enter_amount: "Введіть суму (грн):",
        invalid_amount: "Сума від 10 до 10000 грн!",
        invalid_card: "Неправильний номер карти!",
        withdraw_request: "Запит на виведення: {{amount}} грн на карту {{card}}",
        hello: "Вітаємо в Xbet! Як допомогти?",
        replenish_info: "Поповнення через LiqPay або криптовалюту.",
        casino_info: "Казино: Plinko, слоти та більше!",
        match_info: "Live-матчі в HD!",
        ai_prediction: "AI-прогноз: {{prediction}}",
        referral_share: "Запросити друга",
        task_complete: "Завдання виконано! +{{points}} балів",
        send: "Відправити",
        calc_result: "Виграш: {{amount}} грн"
      }
    }
  }
}, (err) => {
  if (err) console.error('i18next init error:', err);
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

// 3D-логотип на привітальній сторінці
function initLogoAnimation() {
  if (!logoCanvas) return;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, logoCanvas.width / logoCanvas.height, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas: logoCanvas, alpha: true });
  renderer.setSize(logoCanvas.width, logoCanvas.height);
  const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
  const material = new THREE.MeshBasicMaterial({ color: 0x00f2ff, wireframe: true });
  const logo = new THREE.Mesh(geometry, material);
  scene.add(logo);
  camera.position.z = 5;
  const animate = () => {
    requestAnimationFrame(animate);
    logo.rotation.x += 0.01;
    logo.rotation.y += 0.01;
    renderer.render(scene, camera);
  };
  animate();
}

// Фон із частинками
function initParticles() {
  if (welcomeCanvas) {
    particlesJS('welcome-canvas', {
      particles: {
        number: { value: 150 },
        color: { value: ['#00f2ff', '#ff00ff', '#00ff88'] },
        shape: { type: 'star' },
        size: { value: 4, random: true },
        move: { speed: 3, direction: 'random' },
        line_linked: { enable: true, color: '#00f2ff', opacity: 0.3 }
      },
      interactivity: { events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } } }
    });
  }
}

// Обробка входу
function initWelcomeButton() {
  if (!welcomeBtn || !welcomePage || !mainContent) {
    console.error('Welcome elements not found:', { welcomeBtn, welcomePage, mainContent });
    return;
  }
  welcomeBtn.addEventListener('click', () => {
    gsap.to(welcomePage, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      onComplete: () => {
        welcomePage.style.display = 'none';
        mainContent.style.display = 'block';
        gsap.to(mainContent, { opacity: 1, duration: 0.8, ease: 'power2.in' });
        localStorage.setItem('authToken', 'mock-token-' + Date.now());
      }
    });
  });
  if (localStorage.getItem('authToken')) {
    welcomePage.style.display = 'none';
    mainContent.style.display = 'block';
    mainContent.style.opacity = '1';
  }
}

// Plinko з Three.js
function initPlinko() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, plinkoCanvas.width / plinkoCanvas.height, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas: plinkoCanvas, alpha: true });
  renderer.setSize(plinkoCanvas.width, plinkoCanvas.height);
  const pegs = [];
  for (let i = 0; i < 12; i++) {
    for (let j = 0; j < i + 1; j++) {
      const geometry = new THREE.SphereGeometry(0.2, 32, 32);
      const material = new THREE.MeshBasicMaterial({ color: 0x00f2ff });
      const peg = new THREE.Mesh(geometry, material);
      peg.position.set((j - i / 2) * 2, -i * 2, 0);
      scene.add(peg);
      pegs.push(peg);
    }
  }
  camera.position.z = 20;
  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };
  animate();
  return { scene, camera, renderer };
}

function animatePlinkoBall(scene, camera, renderer) {
  const geometry = new THREE.SphereGeometry(0.3, 32, 32);
  const material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
  const ball = new THREE.Mesh(geometry, material);
  scene.add(ball);
  let x = 0, y = 6;
  const animate = () => {
    y -= 0.1;
    x += (Math.random() - 0.5) * 0.5;
    ball.position.set(x, y, 0);
    if (y > -12) {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    } else {
      scene.remove(ball);
      return Math.floor(Math.random() * 5);
    }
  };
  requestAnimationFrame(animate);
}

// Додавання Plinko
casinoList?.appendChild((() => {
  const plinkoDiv = document.createElement('div');
  plinkoDiv.className = 'plinko-game';
  plinkoDiv.setAttribute('aria-label', 'Plinko game');
  plinkoDiv.setAttribute('role', 'region');
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
  updateJackpot(bet);
  updateTranslations();
  const { scene, camera, renderer } = initPlinko();
  const multiplierIndex = animatePlinkoBall(scene, camera, renderer);
  setTimeout(() => {
    const multiplier = [0.5, 1, 2, 5, 10][multiplierIndex];
    const win = bet * multiplier;
    balance += win;
    localStorage.setItem('balance', balance);
    plinkoResult.textContent = i18next.t(multiplier > 1 ? 'win' : 'try_again', { amount: win.toFixed(2) });
    updateTranslations();
    if (multiplier > 1) {
      particlesJS('particles-canvas', {
        particles: { number: { value: 300 }, color: { value: ['#00f2ff', '#ff00ff', '#00ff88'] }, size: { value: 5 }, move: { speed: 10 } },
        interactivity: { events: { onhover: { enable: false } } }
      });
      const audio = document.getElementById('win-sound');
      audio.play().catch(err => console.error('Audio error:', err));
      points += 15;
      localStorage.setItem('points', points);
      taskNotification.textContent = i18next.t('task_complete', { points: 15 });
      taskNotification.style.display = 'block';
      gsap.to(taskNotification, { opacity: 1, duration: 0.5, y: 0 });
      setTimeout(() => {
        gsap.to(taskNotification, { opacity: 0, duration: 0.5, y: -30, onComplete: () => {
          taskNotification.style.display = 'none';
        }});
      }, 4000);
    }
  }, 2500);
});

// Прогресивний джекпот
function updateJackpot(bet) {
  jackpot += bet * 0.03;
  localStorage.setItem('jackpot', jackpot);
  document.querySelectorAll('.jackpot-display').forEach(el => {
    el.textContent = i18next.t('jackpot', { amount: jackpot.toFixed(2) });
  });
}

// HLS для трансляцій
function initHLS(videoElement, src) {
  if (!videoElement) {
    console.error('Video element not found');
    return;
  }
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
if (streamModal) {
  streamModal.querySelector('.modal-content')?.appendChild(streamChatMessages);
  streamModal.querySelector('.modal-content')?.appendChild(streamChatInput);
  streamModal.querySelector('.modal-content')?.appendChild(streamChatSendBtn);
  streamChatSendBtn.addEventListener('click', () => {
    const message = streamChatInput.value.trim();
    if (message && !/badword/i.test(message)) {
      const msgDiv = document.createElement('div');
      msgDiv.textContent = `User: ${message}`;
      msgDiv.style.color = '#00f2ff';
      streamChatMessages.appendChild(msgDiv);
      streamChatMessages.scrollTop = streamChatMessages.scrollHeight;
      streamChatInput.value = '';
      gsap.from(msgDiv, { opacity: 0, y: 20, duration: 0.5 });
    }
  });
  streamChatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') streamChatSendBtn.click();
  });
}

// AI-прогнози
function getAIPrediction(match) {
  const outcomes = match.bookmakers[0].markets[0].outcomes;
  const randomOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];
  return i18next.t('ai_prediction', { prediction: `${randomOutcome.name} (${randomOutcome.price})` });
}

// Статистика
function updateStats() {
  if (!statsCanvas) return;
  const ctx = statsCanvas.getContext('2d');
  ctx.fillStyle = '#0d1b2a';
  ctx.fillRect(0, 0, statsCanvas.width, statsCanvas.height);
  const wins = betHistory.filter(bet => bet.status === 'win').length;
  const losses = betHistory.filter(bet => bet.status === 'loss').length;
  new Chart(statsCanvas, {
    type: 'bar',
    data: {
      labels: ['Виграші', 'Програші'],
      datasets: [{ label: 'Ставки', data: [wins, losses], backgroundColor: ['#00f2ff', '#ff00ff'] }]
    },
    options: { scales: { y: { beginAtZero: true } } }
  });
}

// Оновлення матчів
const mockMatches = [
  { id: 1, sport_id: 1, league: "УПЛ", home: "Динамо Київ", away: "Шахтар Донецьк", time: Math.floor(Date.now() / 1000), bookmakers: [{ markets: [{ outcomes: [{ name: "1", price: 2.1 }, { name: "X", price: 3.2 }, { name: "2", price: 2.8 }] }] }], stats: "Володіння м'ячем: 55%-45%", popularity: 100, video: "https://player.vimeo.com/external/577768319.hd.mp4?s=1f0d8b0e6b6b4b7b9c4b7e0b1e6d4f3b5c6d7e8&profile_id=174", subtitles: "subtitles/football.vtt" },
  { id: 2, sport_id: 2, league: "NBA", home: "Лейкерс", away: "Бостон Селтікс", time: Math.floor(Date.now() / 1000), bookmakers: [{ markets: [{ outcomes: [{ name: "1", price: 1.9 }, { name: "2", price: 2.4 }] }] }], stats: "Очки: 110-108", popularity: 90, video: "https://player.vimeo.com/external/577768319.hd.mp4?s=1f0d8b0e6b6b4b7b9c4b7e0b1e6d4f3b5c6d7e8&profile_id=174", subtitles: "subtitles/basketball.vtt" }
];

function updateMatches() {
  if (!matchesContainer) return;
  matchesContainer.innerHTML = '';
  mockMatches.forEach(match => {
    const matchCard = document.createElement('div');
    matchCard.className = 'match-card';
    matchCard.setAttribute('aria-label', `${match.home} vs ${match.away}`);
    matchCard.setAttribute('role', 'article');
    matchCard.innerHTML = `
      <div class="match-header">${match.home} vs ${match.away}</div>
      <div class="match-league">${match.league}</div>
      <div class="match-time">${i18next.t('time')}: ${new Date(match.time * 1000).toLocaleString()}</div>
      <div class="match-stats">${i18next.t('stats')}: ${match.stats}</div>
      <div class="match-ai-prediction">${getAIPrediction(match)}</div>
      <div class="coef-list">${match.bookmakers[0].markets[0].outcomes.map(outcome => `<span class="coef-item" data-coef="${outcome.price}" role="button" tabindex="0">${outcome.name}: ${outcome.price}</span>`).join('')}</div>
      <input type="number" class="bet-amount" min="10" max="1000" value="10" aria-label="Сума ставки" />
      <button class="btn-bet" data-i18n="place_bet" aria-label="Зробити ставку">Зробити ставку</button>
      <button class="btn-quick-bet" data-i18n="quick_bet" aria-label="Швидка ставка">Швидка ставка</button>
      <button class="btn-stream" data-video="${match.video}" data-subtitles="${match.subtitles}" data-i18n="live_stream" aria-label="Пряма трансляція">Пряма трансляція</button>
      <span class="match-favorite" data-id="${match.id}" role="button" tabindex="0">${favoriteMatches.includes(match.id) ? i18next.t('remove_favorite') : i18next.t('add_favorite')}</span>
    `;
    matchesContainer.appendChild(matchCard);
    gsap.from(matchCard, { opacity: 0, y: 50, duration: 0.5, delay: 0.2 * matchesContainer.children.length });
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
      updateJackpot(amount);
      if (betHistory[betHistory.length - 1].status === 'win') {
        const winAmount = amount * parseFloat(matchCard.querySelector('.coef-item').dataset.coef);
        balance += winAmount;
        localStorage.setItem('balance', balance);
        alert(i18next.t('win', { amount: winAmount.toFixed(2) }));
        points += 5;
        localStorage.setItem('points', points);
        taskNotification.textContent = i18next.t('task_complete', { points: 5 });
        taskNotification.style.display = 'block';
        gsap.to(taskNotification, { opacity: 1, duration: 0.5, y: 0 });
        setTimeout(() => {
          gsap.to(taskNotification, { opacity: 0, duration: 0.5, y: -30, onComplete: () => {
            taskNotification.style.display = 'none';
          }});
        }, 4000);
        const audio = document.getElementById('win-sound');
        audio.play().catch(err => console.error('Audio error:', err));
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
      updateJackpot(amount);
      if (betHistory[betHistory.length - 1].status === 'win') {
        const winAmount = amount * parseFloat(matchCard.querySelector('.coef-item').dataset.coef);
        balance += winAmount;
        localStorage.setItem('balance', balance);
        alert(i18next.t('quick_bet_placed', { amount, home, away }));
        alert(i18next.t('win', { amount: winAmount.toFixed(2) }));
        points += 3;
        localStorage.setItem('points', points);
        taskNotification.textContent = i18next.t('task_complete', { points: 3 });
        taskNotification.style.display = 'block';
        gsap.to(taskNotification, { opacity: 1, duration: 0.5, y: 0 });
        setTimeout(() => {
          gsap.to(taskNotification, { opacity: 0, duration: 0.5, y: -30, onComplete: () => {
            taskNotification.style.display = 'none';
          }});
        }, 4000);
        const audio = document.getElementById('win-sound');
        audio.play().catch(err => console.error('Audio error:', err));
      }
      updateTranslations();
      updateStats();
      transactions.push({ id: Date.now(), type: 'quick_bet', amount, status: 'completed', timestamp: new Date().toISOString() });
      localStorage.setItem('transactions', JSON.stringify(transactions));
    });
  });
  document.querySelectorAll('.btn-stream').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (streamModal) {
        streamModal.style.display = 'flex';
        streamTitle.textContent = e.target.closest('.match-card').querySelector('.match-header').textContent;
        initHLS(streamVideo, e.target.dataset.video);
        streamSubtitles.src = e.target.dataset.subtitles;
        gsap.from('.modal-content', { scale: 0.8, opacity: 0, duration: 0.5, ease: 'back.out(1.7)' });
      }
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
      gsap.from(fav, { scale: 1.3, duration: 0.3 });
    });
    fav.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') fav.click();
    });
  });
  // Свайпи для мобільних
  let touchStartX = 0;
  matchesContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  matchesContainer.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) {
      matchesContainer.scrollBy({ left: 200, behavior: 'smooth' });
    } else if (touchEndX - touchStartX > 50) {
      matchesContainer.scrollBy({ left: -200, behavior: 'smooth' });
    }
  });
}

// Турніри
function updateTournaments() {
  if (!tournamentList) return;
  const tournaments = [
    { name: 'Xbet Slot Championship', prize: '10000 грн' },
    { name: 'Poker Masters', prize: '20000 грн' }
  ];
  tournamentList.innerHTML = tournaments.map(t => `<div class="tournament-card">${t.name} - Приз: ${t.prize}</div>`).join('');
  tournamentList.querySelectorAll('.tournament-card').forEach((card, i) => {
    gsap.from(card, { opacity: 0, x: 50, duration: 0.5, delay: i * 0.2 });
  });
}

// Ініціалізація
function init() {
  initLogoAnimation();
  initParticles();
  initWelcomeButton();
  updateMatches();
  updateTournaments();
  updateStats();
  updateJackpot(0);
  if (!localStorage.getItem('lastTaskDate') || localStorage.getItem('lastTaskDate') !== new Date().toDateString()) {
    points += 10;
    localStorage.setItem('points', points);
    localStorage.setItem('lastTaskDate', new Date().toDateString());
    taskNotification.textContent = i18next.t('task_complete', { points: 10 });
    taskNotification.style.display = 'block';
    gsap.to(taskNotification, { opacity: 1, duration: 0.5, y: 0 });
    setTimeout(() => {
      gsap.to(taskNotification, { opacity: 0, duration: 0.5, y: -30, onComplete: () => {
        taskNotification.style.display = 'none';
      }});
    }, 4000);
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
    } else if (key === 'jackpot') {
      el.textContent = i18next.t(key, { amount: jackpot.toFixed(2) });
    } else {
      el.textContent = i18next.t(key);
    }
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = i18next.t(el.getAttribute('data-i18n-placeholder'));
  });
}

languageSelect?.addEventListener('change', () => {
  i18next.changeLanguage(languageSelect.value, () => {
    localStorage.setItem('language', languageSelect.value);
    updateTranslations();
    updateMatches();
    updateTournaments();
  });
});

themeToggleBtn?.addEventListener('click', () => {
  document.body.classList.toggle('light');
  themeToggleBtn.textContent = document.body.classList.contains('light') ? i18next.t('dark_theme') : i18next.t('light_theme');
  localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
  gsap.to('body', { background: document.body.classList.contains('light') ? 'linear-gradient(135deg, #e0f7fa, #b2ebf2)' : 'linear-gradient(135deg, #0d1b2a, #1b263b)', duration: 0.5 });
});

modalClose?.addEventListener('click', () => {
  streamModal.style.display = 'none';
  streamVideo?.pause();
  gsap.to('.modal-content', { scale: 0.8, opacity: 0, duration: 0.5 });
});

chatToggleBtn?.addEventListener('click', () => {
  chatSupport.classList.toggle('open');
  gsap.to(chatSupport, { x: chatSupport.classList.contains('open') ? 0 : 400, duration: 0.5, ease: 'power2.inOut' });
});

chatCloseBtn?.addEventListener('click', () => {
  chatSupport.classList.remove('open');
  gsap.to(chatSupport, { x: 400, duration: 0.5, ease: 'power2.inOut' });
});

chatSendBtn?.addEventListener('click', () => {
  const message = chatInput.value.trim();
  if (message && !/badword/i.test(message)) {
    chatHistory.push({ sender: 'user', message });
    chatMessages.innerHTML += `<div style="color: #00f2ff;"><strong>User:</strong> ${message}</div>`;
    chatMessages.scrollTop = chatMessages.scrollHeight;
    chatInput.value = '';
    gsap.from(chatMessages.lastChild, { opacity: 0, y: 20, duration: 0.5 });
    setTimeout(() => {
      const responses = [
        i18next.t('hello'),
        i18next.t('replenish_info'),
        i18next.t('casino_info'),
        i18next.t('match_info')
      ];
      const response = responses[Math.floor(Math.random() * responses.length)];
      chatHistory.push({ sender: 'bot', message: response });
      chatMessages.innerHTML += `<div style="color: #ff00ff;"><strong>Bot:</strong> ${response}</div>`;
      chatMessages.scrollTop = chatMessages.scrollHeight;
      gsap.from(chatMessages.lastChild, { opacity: 0, y: 20, duration: 0.5 });
    }, 1000);
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  }
});
chatInput?.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') chatSendBtn.click();
});

btnReplenish?.addEventListener('click', () => {
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
  taskNotification.textContent = i18next.t('task_complete', { points: 5 });
  taskNotification.style.display = 'block';
  gsap.to(taskNotification, { opacity: 1, duration: 0.5, y: 0 });
  setTimeout(() => {
    gsap.to(taskNotification, { opacity: 0, duration: 0.5, y: -30, onComplete: () => {
      taskNotification.style.display = 'none';
    }});
  }, 4000);
});

btnWithdraw?.addEventListener('click', () => {
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
  chatMessages.innerHTML += `<div style="color: #00f2ff;"><strong>User:</strong> ${i18next.t('withdraw_request', { amount, card: requisites.cardNumber })}</div>`;
  chatMessages.scrollTop = chatMessages.scrollHeight;
  localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  transactions.push({ id: Date.now(), type: 'withdraw', amount, status: 'pending', card: requisites.cardNumber, timestamp: new Date().toISOString() });
  localStorage.setItem('transactions', JSON.stringify(transactions));
});

requisitesForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const cardNumber = document.getElementById('card-number')?.value;
  if (!validateCardNumber(cardNumber)) {
    alert(i18next.t('invalid_card'));
    return;
  }
  requisites.cardNumber = cardNumber;
  requisites.cardHolder = document.getElementById('card-holder')?.value;
  localStorage.setItem('requisites', JSON.stringify(requisites));
  alert('Реквизити збережено!');
  gsap.from('#requisites-form', { scale: 0.95, duration: 0.3 });
});

avatarInput?.addEventListener('change', () => {
  const file = avatarInput.files[0];
  if (file) {
    avatarPreview.src = URL.createObjectURL(file);
    gsap.from(avatarPreview, { opacity: 0, scale: 0.8, duration: 0.5 });
  }
});

calcBtn?.addEventListener('click', () => {
  const amount = parseFloat(calcAmount.value);
  const coef = parseFloat(calcCoef.value);
  if (isNaN(amount) || isNaN(coef) || amount < 0 || coef < 1) {
    calcResult.textContent = 'Некоректні дані!';
    return;
  }
  const result = amount * coef;
  calcResult.textContent = i18next.t('calc_result', { amount: result.toFixed(2) });
  gsap.from(calcResult, { opacity: 0, y: 20, duration: 0.5 });
});

referralBtn?.addEventListener('click', () => {
  if (navigator.share) {
    navigator.share({
      title: 'Xbet',
      text: 'Приєднуйся до Xbet і отримай бонуси!',
      url: 'https://vadimgolovnin.github.io/xbet/?ref=user123'
    }).catch(err => console.error('Share error:', err));
  } else {
    alert('Реферальне посилання: https://vadimgolovnin.github.io/xbet/?ref=user123');
  }
  points += 5;
  localStorage.setItem('points', points);
  taskNotification.textContent = i18next.t('task_complete', { points: 5 });
  taskNotification.style.display = 'block';
  gsap.to(taskNotification, { opacity: 1, duration: 0.5, y: 0 });
  setTimeout(() => {
    gsap.to(taskNotification, { opacity: 0, duration: 0.5, y: -30, onComplete: () => {
      taskNotification.style.display = 'none';
    }});
  }, 4000);
});

// Ініціалізація теми
if (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme')) {
  document.body.classList.add('dark');
  themeToggleBtn.textContent = i18next.t('light_theme');
}