import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const slotThemes = {
  'sweet-bonanza': {
    name: 'Sweet Bonanza',
    symbols: ['🍎', '🍇', '🍬', '🍭', '💎'],
    winMultiplier: 20,
    grid: [6, 5],
    features: ['tumble', 'freeSpins'],
  },
  'book-of-dead': {
    name: 'Book of Dead',
    symbols: ['📖', '👳', '⚱️', '🦅', '💰'],
    winMultiplier: 15,
    grid: [5, 3],
    features: ['expandingSymbols'],
  },
  'gates-of-olympus': {
    name: 'Gates of Olympus',
    symbols: ['⚡️', '🔱', '💎', '🏛️', '👑'],
    winMultiplier: 25,
    grid: [6, 5],
    features: ['multipliers', 'tumble'],
  },
  'starburst': {
    name: 'Starburst',
    symbols: ['💎', '⭐', '🔷', '🔶', '7️⃣'],
    winMultiplier: 10,
    grid: [5, 3],
    features: ['expandingWilds'],
  },
  'wolf-gold': {
    name: 'Wolf Gold',
    symbols: ['🐺', '🦅', '🦬', '🏜️', '🌙'],
    winMultiplier: 12,
    grid: [5, 3],
    features: ['moneyRespin'],
  },
  'big-bass-bonanza': {
    name: 'Big Bass Bonanza',
    symbols: ['🎣', '🐟', '🪝', '🛥️', '💰'],
    winMultiplier: 18,
    grid: [5, 3],
    features: ['freeSpins', 'wilds'],
  },
};

function Slot() {
  const { id } = useParams();
  const slot = slotThemes[id] || slotThemes['sweet-bonanza'];
  const [balance, setBalance] = useState(localStorage.getItem('balance') ? parseInt(localStorage.getItem('balance')) : 100000);
  const [reels, setReels] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('user')) {
      const db = getFirestore();
      const userRef = doc(db, 'users', localStorage.getItem('user'));
      setDoc(userRef, { balance }, { merge: true });
    }
  }, [balance]);

  const spinReels = () => {
    const newReels = [];
    const [rows, cols] = slot.grid;
    for (let i = 0; i < cols; i++) {
      const col = [];
      for (let j = 0; j < rows; j++) {
        col.push(slot.symbols[Math.floor(Math.random() * slot.symbols.length)]);
      }
      newReels.push(col);
    }
    setReels(newReels);
    checkWin(newReels);
  };

  const checkWin = (reels) => {
    let win = 0;
    const flatReels = reels.flat();
    const counts = {};
    flatReels.forEach(s => counts[s] = (counts[s] || 0) + 1);
    for (let s in counts) {
      if (counts[s] >= 8) win += counts[s] * slot.winMultiplier;
    }
    const newBalance = balance - 10 + win; // 10 credits per spin
    setBalance(newBalance);
    localStorage.setItem('balance', newBalance);
    if (win > 0) {
      alert(`Ви виграли ${win} кредитів у ${slot.name}!`);
    }
  };

  return (
    <section className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">{slot.name}</h1>
      <canvas id="slotCanvas" width="600" height="400" className="mx-auto border border-gray-500"></canvas>
      <div className="mt-4">
        <button onClick={spinReels} className="bg-yellow-500 text-black px-6 py-3 rounded hover:bg-yellow-600">
          Крутити!
        </button>
      </div>
      <p className="mt-4">Ставка: 10 кредитів за спін</p>
    </section>
  );
}

export default Slot;