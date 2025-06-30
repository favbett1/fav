import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Logo() {
  return (
    <div className="flex items-center space-x-2 select-none cursor-default">
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_0_15px_rgba(0,172,255,0.9)]"
      >
        <circle cx="24" cy="24" r="22" stroke="#00ACFF" strokeWidth="3" />
        <text
          x="50%"
          y="55%"
          textAnchor="middle"
          fontSize="20"
          fontWeight="900"
          fill="url(#gradient)"
          fontFamily="'Orbitron', sans-serif"
          style={{ filter: "drop-shadow(0 0 10px #00ACFF)" }}
        >
          teX
        </text>
        <text
          x="50%"
          y="75%"
          textAnchor="middle"
          fontSize="14"
          fontWeight="900"
          fill="#00ACFF"
          fontFamily="'Orbitron', sans-serif"
          style={{ letterSpacing: "0.1em" }}
        >
          bet
        </text>
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00ACFF" />
            <stop offset="100%" stopColor="#005F99" />
          </linearGradient>
        </defs>
      </svg>
      <span className="text-3xl font-extrabold text-blue-400 drop-shadow-md tracking-wider">teXbet</span>
    </div>
  );
}

function Header({ currentTab, setCurrentTab, onLoginClick, user, onLogout }) {
  const tabs = [
    { id: "live", label: "Live ставки" },
    { id: "news", label: "Новини" },
    { id: "casino", label: "Казино" },
    { id: "profile", label: "Кабінет" },
  ];

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-gradient-to-r from-black via-blue-900 to-black border-b border-blue-600 select-none">
      <Logo />
      <nav className="space-x-6 text-white font-semibold text-lg hidden md:flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`hover:text-blue-400 transition ${
              currentTab === tab.id ? "text-blue-400 underline" : ""
            }`}
            onClick={() => setCurrentTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span className="text-blue-400 font-semibold truncate max-w-[150px]" title={user.email}>
              {user.email}
            </span>
            <button
              onClick={onLogout}
              className="text-red-500 border border-red-500 px-4 py-1 rounded hover:bg-red-500 hover:text-black transition"
            >
              Вийти
            </button>
          </>
        ) : (
          <button
            className="text-blue-400 border border-blue-400 px-4 py-1 rounded hover:bg-blue-400 hover:text-black transition"
            onClick={onLoginClick}
          >
            Увійти
          </button>
        )}
      </div>
    </header>
  );
}

function AuthForm({ onClose, onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.includes("@")) {
      alert("Введіть коректний email");
      return;
    }
    if (password.length < 6) {
      alert("Пароль має містити мінімум 6 символів");
      return;
    }
    onAuthSuccess({ email });
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.7, opacity: 0 }}
        className="bg-gray-900 rounded-lg p-8 w-full max-w-md text-white relative shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 select-none">{isLogin ? "Увійти" : "Реєстрація"}</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 rounded py-3 font-semibold transition select-none"
          >
            {isLogin ? "Увійти" : "Зареєструватись"}
          </button>
        </form>
        <p
          className="mt-5 text-center text-gray-400 cursor-pointer select-none hover:text-blue-400 transition"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Немає акаунту? Зареєструватись" : "Вже маєте акаунт? Увійти"}
        </p>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl select-none"
          aria-label="Закрити"
        >
          ×
        </button>
      </motion.div>
    </div>
  );
}

function BetButton({ match }) {
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState("");

  function handlePayment() {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Введіть коректну суму ставки");
      return;
    }
    alert(`Оплата ${amount} UAH за матч ${match.team1} vs ${match.team2} (демо)`);
    setShowModal(false);
    setAmount("");
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="mt-4 w-full py-2 rounded bg-gradient-to-r from-blue-600 to-cyan-500 font-semibold hover:brightness-110 transition select-none"
        aria-label={`Зробити ставку на матч ${match.team1} проти ${match.team2}`}
      >
        Зробити ставку
      </button>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              className="bg-gray-900 rounded-lg p-8 w-full max-w-sm text-white shadow-lg"
            >
              <h3 className="text-xl font-bold mb-4 select-none">Сума ставки (UAH)</h3>
              <input
                type="number"
                min="1"
                className="w-full p-3 mb-6 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Введіть суму"
                autoFocus
                aria-label="Сума ставки в гривнях"
              />
              <button
                onClick={handlePayment}
                className="w-full py-3 rounded bg-green-600 hover:bg-green-700 transition font-semibold select-none"
              >
                Оплатити через Apple Pay / Google Pay
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="mt-4 w-full py-2 rounded border border-gray-600 hover:bg-gray-700 transition select-none"
              >
                Відмінити
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function LiveMatches() {
  const initialMatches = [
    {
      id: 1,
      sport: "Футбол",
      team1: "Барселона",
      team2: "Реал Мадрид",
      odds: { team1: 2.1, draw: 3.2, team2: 3.5 },
      time: "45:00",
    },
    {
      id: 2,
      sport: "UFC",
      team1: "Конор МакГрегор",
      team2: "Майкл Чендлер",
      odds: { team1: 1.8, team2: 2.2 },
      time: "Round 3",
    },
    {
      id: 3,
      sport: "Баскетбол",
      team1: "Лейкерс",
      team2: "Буллз",
      odds: { team1: 1.95, draw: 0, team2: 2.05 },
      time: "3rd Quarter",
    },
  ];

  const [matches, setMatches] = useState(initialMatches);

  useEffect(() => {
    const interval = setInterval(() => {
      setMatches((prev) =>
        prev.map((match) => {
          const newOdds = { ...match.odds };
          for (const key in newOdds) {
            if (newOdds[key] === 0) continue;
            const change = (Math.random() * 0.1 - 0.05).toFixed(2);
            const updated = Math.max(1.01, (newOdds[key] + parseFloat(change)).toFixed(2));
            newOdds[key] = parseFloat(updated);
          }
          return { ...match, odds: newOdds };
        })
      );
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="live" className="space-y-8">
      <h2 className="text-3xl font-bold mb-6 text-blue-400 select-none">🎯 Live-матчі</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {matches.map(({ id, sport, team1, team2, odds, time }) => (
          <motion.div
            key={id}
            className="bg-gray-800 rounded-xl p-6 border border-blue-600 shadow-xl hover:shadow-blue-500 transition-shadow cursor-pointer select-none"
            whileHover={{ scale: 1.04 }}
            layout
            aria-label={`Матч ${team1} проти ${team2} - спорт ${sport}`}
          >
            <p className="text-sm text-gray-400 uppercase tracking-wide">{sport}</p>
            <h3 className="text-2xl font-semibold my-2">
              {team1} <span className="text-blue-300 font-bold">vs</span> {team2}
            </h3>
            <p className="text-gray-300 italic mb-4">{time}</p>
            <div className="flex justify-between text-blue-400 font-mono text-lg font-semibold">
              {Object.entries(odds).map(([key, val]) => (
                <div key={key} className="text-center flex-1">
                  <span className="block capitalize mb-1">
                    {key === "draw" ? "Нічия" : key === "team1" ? team1 : team2}
                  </span>
                  <span className="text-2xl">{val.toFixed(2)}</span>
                </div>
              ))}
            </div>
            <BetButton match={{ team1, team2 }} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function NewsFeed() {
  const news = [
    { id: 1, title: "Барселона обіграла Реал у класичному матчі!", time: "10 хв тому" },
    { id: 2, title: "Конор МакГрегор анонсував новий бій", time: "1 год тому" },
    { id: 3, title: "Нова зірка у світі баскетболу — молодий талант Лейкерс", time: "3 год тому" },
  ];
  return (
    <section id="news" className="space-y-8">
      <h2 className="text-3xl font-bold mb-6 text-blue-400 select-none">📰 Спортивні новини</h2>
      <ul className="space-y-5 max-w-xl">
        {news.map(({ id, title, time }) => (
          <li
            key={id}
            className="border-b border-blue-700 pb-4 cursor-pointer hover:bg-blue-900 rounded px-4 py-3 transition select-text"
            aria-label={`Новина: ${title}`}
          >
            <p className="text-lg font-semibold">{title}</p>
            <p className="text-sm text-gray-400">{time}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Casino() {
  const games = [
    { id: 1, name: "Слоти", provider: "NetEnt" },
    { id: 2, name: "Рулетка", provider: "Evolution" },
    { id: 3, name: "Покер", provider: "Pragmatic Play" },
  ];

  return (
    <section id="casino" className="space-y-8 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-blue-400 select-none">🎰 Казино</h2>
      <div className="grid md:grid-cols-3 gap-10">
        {games.map(({ id, name, provider }) => (
          <div
            key={id}
            className="bg-gray-800 p-6 rounded-xl border border-blue-600 shadow-lg hover:shadow-blue-400 cursor-pointer select-none transition"
            role="button"
            tabIndex={0}
            aria-label={`${name} від ${provider}`}
          >
            <h3 className="text-2xl font-semibold mb-2">{name}</h3>
            <p className="text-blue-400 font-mono">{provider}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Profile({ user }) {
  return (
    <section id="profile" className="max-w-xl mx-auto space-y-8 text-white select-none">
      <h2 className="text-3xl font-bold mb-6 text-blue-400">👤 Профіль користувача</h2>
      <p>Email: <span className="font-mono text-green-400">{user.email}</span></p>
      <p>Реєстрація: 01.01.2024 (демо)</p>
      <p>Баланс: <span className="font-mono text-yellow-400">1000 UAH</span></p>
      <button className="bg-blue-600 hover:bg-blue-700 py-3 px-6 rounded font-semibold transition select-none">
        Поповнити баланс
      </button>
    </section>
  );
}

export default function App() {
  const [currentTab, setCurrentTab] = useState("live");
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(null);

  function handleAuthSuccess(userData) {
    setUser(userData);
  }

  function handleLogout() {
    setUser(null);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white font-sans">
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onLoginClick={() => setShowAuth(true)}
        user={user}
        onLogout={handleLogout}
      />

      <main className="px-8 py-12 max-w-7xl mx-auto">
        {currentTab === "live" && <LiveMatches />}
        {currentTab === "news" && <NewsFeed />}
        {currentTab === "casino" && <Casino />}
        {currentTab === "profile" && user && <Profile user={user} />}
        {currentTab === "profile" && !user && (
          <p className="text-center text-gray-400 select-none">
            Щоб побачити профіль, будь ласка, увійдіть у свій акаунт.
          </p>
        )}
      </main>

      <AnimatePresence>{showAuth && <AuthForm onClose={() => setShowAuth(false)} onAuthSuccess={handleAuthSuccess} />}</AnimatePresence>
    </div>
  );
}

