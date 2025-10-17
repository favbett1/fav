```markdown
# GovBet — Demo Casino (multi-page front-end)

Це демонстраційний мульті-сторінковий фронтенд GovBet, створений як realistic demo для презентацій та інтеграцій (НЕ для реальних ставок).

Особливості:
- Multi-page: `index.html`, `games.html`, `player.html`, `account.html` (демо), `about.html`.
- Локалізація UA / EN (перемикач).
- Age-gate (клієнтський) — для production потрібно серверна валідація.
- OAuth-моки (кнопки відкривають popup `/auth/{provider}`) — для реальної аутентифікації додається бекенд.
- Демонстраційний каталог ігор з великою кількістю демо-слотів (Pragmatic-like, NetEnt-like, Play'n GO-like та інші).
- Плеєр у модальному вікні (iframe) або окрема сторінка `player.html` — у production замінюйте iframe.src на підписаний runtimeUrl від бекенду.
- CI/CD: готовий workflow для GitHub Actions (див. `.github/workflows/deploy.yml`).

Безпека / Ліцензія / Legal:
- Це демо. Не застосовуйте для реального гемблінгу.
- Реальна інфраструктура вимагає:
  - Сервер-проксі для провайдерів (не зберігати API-keys у frontend).
  - Керування сесіями, захист від CSRF, CSP (Content Security Policy).
  - Верифікацію віку та KYC на бекенді.
  - Ліцензії відповідно до юрисдикції.

Інтеграція реальних провайдерів — рекомендації:
1. Створіть ендпоінт `/api/games?provider={id}` у бекенді: повертає JSON list [{id,name,type,provider,thumbnail,runtimeUrlSigned}].
2. Для запуску гри бекенд має підписувати runtime URL або проксити трафік (щоб не передавати API-ключі у браузер).
3. OAuth: зареєструйте клієнти у Google/GitHub, реалізуйте backend `/auth/{provider}` обмін коду на токен, встановлення сесії/куків.

Розгортання на GitHub Pages:
1. Створіть репозиторій (наприклад `favbett1/govbet-demo`).
2. Додайте файли `index.html`, `games.html`, `player.html`, `styles.css`, `app.js`, `README.md`, `.github/workflows/deploy.yml`.
3. Вмикайте GitHub Pages або використайте workflow для авто-деплою при пуші в `main`.

Далі я можу:
- Додати реальний бекенд-проксі на Node.js/Express (приклади коду + Dockerfile).
- Зв'язати OAuth з реальними client_id/secret (вам потрібно надати).
- Підключити реальну бібліотеку ігор або sandbox провайдерів (треба ключі).
```
