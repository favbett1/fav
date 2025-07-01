import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import WelcomePage from './components/WelcomePage';
import LiveMatches from './components/LiveMatches';
import Casino from './components/Casino';
import News from './components/News';
import Profile from './components/Profile';
import BetSlip from './components/BetSlip';
import SupportChat from './components/SupportChat';
import './index.css';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [showWelcome, setShowWelcome] = useState(true);
  const [bets, setBets] = useState(JSON.parse(localStorage.getItem('bets')) || []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const addBet = (bet) => {
    const newBets = [...bets, bet];
    setBets(newBets);
    localStorage.setItem('bets', JSON.stringify(newBets));
  };

  const removeBet = (index) => {
    const newBets = bets.filter((_, i) => i !== index);
    setBets(newBets);
    localStorage.setItem('bets', JSON.stringify(newBets));
  };

  return (
    <Router>
      <div className="min-h-screen">
        <AnimatePresence>
          {showWelcome && <WelcomePage onClose={() => setShowWelcome(false)} />}
        </AnimatePresence>

        <header className="sticky top-0 z-20 bg-[#14213d] text-[#00bfff] p-4 shadow-glow flex justify-between items-center">
          <NavLink to="/" className="font-orbitron text-3xl tracking-wide animate-pulse">
            teXbet
          </NavLink>
          <nav className="flex gap-4">
            <NavLink
              to="/live"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg font-semibold transition-colors ${isActive ? 'bg-[#00bfff] text-[#14213d]' : 'text-[#a3c9ff] hover:bg-[#00bfff] hover:text-[#14213d]'}`}
            >
              Live
            </NavLink>
            <NavLink
              to="/casino"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg font-semibold transition-colors ${isActive ? 'bg-[#00bfff] text-[#14213d]' : 'text-[#a3c9ff] hover:bg-[#00bfff] hover:text-[#14213d]'}`}
            >
              Казино
            </NavLink>
            <NavLink
              to="/news"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg font-semibold transition-colors ${isActive ? 'bg-[#00bfff] text-[#14213d]' : 'text-[#a3c9ff] hover:bg-[#00bfff] hover:text-[#14213d]'}`}
            >
              Новини
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg font-semibold transition-colors ${isActive ? 'bg-[#00bfff] text-[#14213d]' : 'text-[#a3c9ff] hover:bg-[#00bfff] hover:text-[#14213d]'}`}
            >
              Кабінет
            </NavLink>
          </nav>
          <button
            onClick={toggleTheme}
            className="px-3 py-2 border-2 border-[#00bfff] rounded-lg font-semibold hover:bg-[#00bfff] hover:text-[#14213d] transition-colors"
          >
            {theme === 'dark' ? 'Світла тема' : 'Темна тема'}
          </button>
        </header>

        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<LiveMatches addBet={addBet} />} />
            <Route path="/live" element={<LiveMatches addBet={addBet} />} />
            <Route path="/casino" element={<Casino />} />
            <Route path="/news" element={<News />} />
            <Route path="/profile" element={<Profile bets={bets} />} />
          </Routes>
        </main>

        <BetSlip bets={bets} removeBet={removeBet} />
        <SupportChat />
        <footer className="bg-[#14213d] text-[#00bfff] text-center p-4 font-orbitron">
          © 2025 teXbet — офіційний букмекерський сайт від Вадима Головніна
          <br />
          <small className="text-[#00aaccaa]">Підтримка сайту: карта 4149 5110 2688 8354</small>
        </footer>
      </div>
    </Router>
  );
}

export default App;