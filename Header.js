import React from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { motion } from 'framer-motion';

function Header({ user, setUser }) {
  const handleLogout = () => {
    signOut(getAuth()).then(() => setUser(null));
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-yellow-500 text-black p-4 flex justify-between items-center"
    >
      <Link to="/" className="text-2xl font-bold">Parimatch Reborn</Link>
      <nav className="flex items-center">
        <Link to="/casino" className="mx-2 hover:underline">Казино</Link>
        <Link to="/tournaments" className="mx-2 hover:underline">Турніри</Link>
        <Link to="/promotions" className="mx-2 hover:underline">Акції</Link>
        {user ? (
          <>
            <span className="mx-2">Баланс: {user.balance || 100000}</span>
            <button onClick={handleLogout} className="bg-black text-yellow-500 px-4 py-2 rounded">
              Вийти
            </button>
          </>
        ) : (
          <Link to="/login" className="bg-black text-yellow-500 px-4 py-2 rounded">Увійти</Link>
        )}
      </nav>
    </motion.header>
  );
}

export default Header;