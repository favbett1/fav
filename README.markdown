# Parimatch Reborn

A modern demo casino site inspired by Parimatch, with enhanced features and slot integrations.

## Setup
1. **Install Node.js**: Download and install from [nodejs.org](https://nodejs.org).
2. **Clone Repository**:
   ```bash
   git clone https://github.com/your-username/parimatch-reborn.git
   cd parimatch-reborn
   ```
3. **Install Dependencies**:
   ```bash
   npm install
   ```
4. **Firebase Setup**:
   - Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com).
   - Enable Email and Google authentication.
   - Copy your Firebase config to `src/firebase.js`.
5. **Run Locally**:
   ```bash
   npm run dev
   ```
6. **Build for Deployment**:
   ```bash
   npm run build
   ```

## Deployment to GitHub Pages
1. Create a GitHub repository named `parimatch-reborn`.
2. Push the project:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```
3. Deploy to GitHub Pages:
   ```bash
   npm run build
   git add dist
   git commit -m "Deploy to GitHub Pages"
   git subtree push --prefix dist origin gh-pages
   ```
4. In GitHub, go to Settings > Pages, select `gh-pages` branch, and save.
5. Access the site at `https://your-username.github.io/parimatch-reborn/`.

## Features
- **Casino**: Grid of slots with filters and search.
- **Slots**: Demo modes for Sweet Bonanza, Book of Dead, etc.
- **Demo Accounts**: 100,000 virtual credits, 100 free spins on registration.
- **Tournaments**: Leaderboard with daily/weekly events.
- **Chatbot**: Interactive support bot.