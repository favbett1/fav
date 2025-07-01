import { useState } from 'react';
import { motion } from 'framer-motion';

function Profile({ bets }) {
  const [balance, setBalance] = useState(parseFloat(localStorage.getItem('balance')) || 1000);

  const replenishBalance = () => {
    const amount = parseFloat(prompt('Введіть суму для поповнення (грн):', '100'));
    if (!isNaN(amount) && amount > 0) {
      setBalance(balance + amount);
      localStorage.setItem('balance', balance + amount);
      alert(`Баланс поповнено на ${amount.toFixed(2)} грн!\nНомер карти для оплати: 4149 5110 2688 8354`);
    } else {
      alert('Введіть правильну суму!');
    }
  };

  return (
    <section className="max-w-md mx-auto">
      <h2 className="font-orbitron text-3xl text-center mb-6">👤 Особистий кабінет</h2>
      <div className="text-center text-[#00bfff] font-bold text-xl mb-4">Баланс: {balance.toFixed(2)} грн</div>
      <button className="w-full bg-[#00bfff] text-[#14213d] font-bold py-2 rounded-lg hover:bg-[#00e0ff] mb-4" onClick={replenishBalance}>
        Поповнити демо баланс
      </button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert('Вхід у кабінет наразі недоступний. Це демо-версія.');
        }}
        className="space-y-4"
      >
        <input
          type="text"
          placeholder="Логін"
          className="w-full p-2 border-2 border-[#00bfff66] rounded-lg bg-transparent text-[#e0e6f2] focus:border-[#00e0ff] focus:bg-[#14213d]"
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          className="w-full p-2 border-2 border-[#00bfff66] rounded-lg bg-transparent text-[#e0e6f2] focus:border-[#00e0ff] focus:bg-[#14213d]"
          required
        />
        <button type="submit" className="w-full bg-[#00bfff] text-[#14213d] font-bold py-2 rounded-lg hover:bg-[#00e0ff]">
          Увійти
        </button>
      </form>
      <h3 className="font-orbitron text-2xl mt-6 mb-4">📜 Історія ставок</h3>
      {bets.length === 0 ? (
        <p className="text-center text-[#00aacc]">Ставок ще немає.</p>
      ) : (
        <ul className="space-y-2">
          {bets.map((bet, index) => (
            <motion.li
              key={index}
              className="bg-[#1b263b] p-3 rounded-lg shadow-glow text-[#00d4ff]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {bet.match} - {bet.type} (коеф. {bet.odds})
            </motion.li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Profile;