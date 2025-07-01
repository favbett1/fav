import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

function Tournaments() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const db = getFirestore();
    getDocs(collection(db, 'users')).then((snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLeaderboard(data.sort((a, b) => b.balance - a.balance).slice(0, 10));
    });
  }, []);

  return (
    <section className="p-8">
      <h2 className="text-2xl font-bold mb-4">Турніри</h2>
      <table className="w-full bg-gray-800 rounded">
        <thead>
          <tr>
            <th className="p-2">Гравець</th>
            <th className="p-2">Бали</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((player, index) => (
            <tr key={index}>
              <td className="p-2">{player.email}</td>
              <td className="p-2">{player.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Tournaments;