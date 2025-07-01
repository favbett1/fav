import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const mockMatches = [
  { id: 1, home: 'Шахтар', away: 'Динамо', time: '18:30', odds: { home: 2.1, draw: 3.2, away: 2.8 } },
  { id: 2, home: 'Реал', away: 'Барселона', time: '20:00', odds: { home: 1.9, draw: 3.5, away: 3.0 } },
  { id: 3, home: 'Манчестер Юнайтед', away: 'Ліверпуль', time: '21:00', odds: { home: 2.5, draw: 3.1, away: 2.7 } },
];

function LiveMatches({ addBet }) {
  const [matches, setMatches] = useState(mockMatches);

  useEffect(() => {
    const interval = setInterval(() => {
      setMatches((prev) =>
        prev.map((match) => ({
          ...match,
          odds: {
            home: (parseFloat(match.odds.home) + (Math.random() - 0.5) * 0.1).toFixed(2),
            draw: (parseFloat(match.odds.draw) + (Math.random() - 0.5) * 0.1).toFixed(2),
            away: (parseFloat(match.odds.away) + (Math.random() - 0.5) * 0.1).toFixed(2),
          },
        }))
      );
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section>
      <h2 className="font-orbitron text-3xl text-center mb-6">🎯 Live-матчі</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((match) => (
          <motion.div
            key={match.id}
            className="bg-[#1b263b] p-4 rounded-xl shadow-glow hover:scale-105 transition-transform"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-bold">{match.home} vs {match.away}</h3>
            <p className="text-[#00e0ff] italic">Час: {match.time}</p>
            <div className="flex gap-2 mt-2">
              <button
                className="flex-1 bg-[#0d1b2a] p-2 rounded-lg text-[#00bfff] hover:bg-[#00bfff] hover:text-[#14213d]"
                onClick={() => addBet({ match: `${match.home} vs ${match.away}`, type: 'Перемога ' + match.home, odds: match.odds.home })}
              >
                {match.home}: {match.odds.home}
              </button>
              <button
                className="flex-1 bg-[#0d1b2a] p-2 rounded-lg text-[#00bfff] hover:bg-[#00bfff] hover:text-[#14213d]"
                onClick={() => addBet({ match: `${match.home} vs ${match.away}`, type: 'Нічия', odds: match.odds.draw })}
              >
                Нічия: {match.odds.draw}
              </button>
              <button
                className="flex-1 bg-[#0d1b2a] p-2 rounded-lg text-[#00bfff] hover:bg-[#00bfff] hover:text-[#14213d]"
                onClick={() => addBet({ match: `${match.home} vs ${match.away}`, type: 'Перемога ' + match.away, odds: match.odds.away })}
              >
                {match.away}: {match.odds.away}
              </button>
            </div>
            <button
              className="w-full mt-2 bg-[#00bfff] text-[#14213d] font-bold py-2 rounded-lg hover:bg-[#00e0ff]"
              onClick={() => alert(`Ставка зроблена на матч ${match.home} - ${match.away}`)}
            >
              Зробити ставку
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default LiveMatches;