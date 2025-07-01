import { useState } from 'react';
import { motion } from 'framer-motion';

const casinoGames = [
  { name: 'Crazy Time (демо)', provider: 'Evolution' },
  { name: 'Aviator (демо)', provider: 'Spribe' },
  { name: 'Sweet Bonanza (демо)', provider: 'Pragmatic Play' },
  { name: 'Book of Ra (демо)', provider: 'Novomatic' },
];

const slotSymbols = ['🍒', '🍋', '🍉', '🍇', '🍊', '⭐', '7️⃣'];

function Casino() {
  const [reels, setReels] = useState(['🍒', '🍋', '🍉']);
  const [result, setResult] = useState('');

  const spinSlot = () => {
    const newReels = Array(3).fill().map(() => slotSymbols[Math.floor(Math.random() * slotSymbols.length)]);
    setReels(newReels);
    setResult(newReels.every((val, i, arr) => val === arr[0]) ? 'Виграш! +500 грн 🎉' : 'Спробуйте ще!');
  };

  return (
    <section>
      <h2 className="font-orbitron text-3xl text-center mb-6">🎰 Казино (демо)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {casinoGames.map((game, index) => (
          <motion.div
            key={index}
            className="bg-[#1b263b] p-4 rounded-xl shadow-glow text-center text-[#00d4ff] font-bold hover:scale-105 transition-transform"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            role="button"
            tabIndex={0}
          >
            🎮 {game.name}
            <small className="block text-[#00aacc] mt-2">Провайдер: {game.provider}</small>
          </motion.div>
        ))}
      </div>
      <div className="bg-[#0d1b2a] p-6 rounded-xl shadow-glow mt-6 text-center text-[#00d4ff] font-bold">
        <div className="flex justify-center gap-4 text-4xl mb-4">{reels.join(' ')}</div>
        <button className="bg-[#00bfff] text-[#14213d] font-bold py-2 px-6 rounded-lg hover:bg-[#00e0ff]" onClick={spinSlot}>
          Запустити слот
        </button>
        <div className="mt-2">{result}</div>
      </div>
    </section>
  );
}

export default Casino;