// Інтерактивність для "Іба Чотко" сайту
document.addEventListener('DOMContentLoaded', () => {
  // поточний рік
  document.getElementById('year').textContent = new Date().getFullYear();

  // Массив мемних фраз
  const phrases = [
    "Іба чотко!",
    "Чотко і без компромісів",
    "Геть нудьгу — тільки меми",
    "Коли все ясно — іба чотко",
    "Звучить як план: іба чотко",
    "Прокачай на 100%: іба чотко"
  ];

  // Наповнюємо галерею "мемів" простими плитками
  const grid = document.getElementById('memeGrid');
  for (let i = 0; i < 8; i++) {
    const tile = document.createElement('div');
    tile.className = 'meme-tile';
    const idx = Math.floor(Math.random() * phrases.length);
    tile.innerHTML = `
      <div style="font-weight:700;color:var(--accent);font-size:18px;margin-bottom:8px">
        ${phrases[idx]}
      </div>
      <div style="font-size:12px;color:var(--muted)">Натисни для проголошення</div>
    `;
    tile.addEventListener('click', () => speakPhrase(phrases[idx]));
    grid.appendChild(tile);
  }

  // кнопки
  document.getElementById('playPhrase').addEventListener('click', () => speakPhrase("Іба чотко!"));
  document.getElementById('randomize').addEventListener('click', randomizeHeroText);
  document.getElementById('speakBtn').addEventListener('click', () => speakPhrase("Іба!"));

  // копіювання URL
  document.getElementById('copyUrl').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(location.href);
      alert('URL скопійовано в буфер обміну!');
    } catch (e) {
      alert('Не вдалося скопіювати URL. Спробуйте вручну.');
    }
  });

  // підготовка кнопки "твіту"
  const tweetBtn = document.getElementById('tweet');
  const tweetText = encodeURIComponent("Іба Чотко — заходь на офіційний мем-сайт! " + location.href);
  tweetBtn.href = `https://twitter.com/intent/tweet?text=${tweetText}`;

  // функції
  function randomizeHeroText(){
    const t = phrases[Math.floor(Math.random() * phrases.length)];
    const el = document.querySelector('.hero-title');
    el.style.opacity = 0;
    setTimeout(() => {
      el.textContent = t;
      el.style.opacity = 1;
    }, 180);
  }

  function speakPhrase(text){
    // Використовуємо Web Speech API якщо доступно
    if ('speechSynthesis' in window) {
      const msg = new SpeechSynthesisUtterance(text);
      // обираємо українську голосову локаль, якщо є
      const voices = speechSynthesis.getVoices();
      const uk = voices.find(v => /uk|uk-UA/i.test(v.lang)) || voices.find(v => /en|en-US/i.test(v.lang));
      if (uk) msg.voice = uk;
      msg.rate = 1.0;
      msg.pitch = 1.1;
      speechSynthesis.cancel();
      speechSynthesis.speak(msg);
    } else {
      // fallback — коротке вікно
      alert(text);
    }
  }

  // Попередній виклик для ініціалізації голосів у деяких браузерах
  if ('speechSynthesis' in window) {
    window.speechSynthesis.getVoices();
  }
});
