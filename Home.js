import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Home() {
  return (
    <section className="bg-gray-900 p-8 text-center">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-4xl font-bold mb-4"
      >
        Ласкаво просимо до Parimatch Reborn!
      </motion.h1>
      <p className="text-lg mb-4">Грайте в улюблені слоти з демо-рахунком!</p>
      <Link to="/casino" className="bg-yellow-500 text-black px-6 py-3 rounded hover:bg-yellow-600">
        Грати зараз
      </Link>
    </section>
  );
}

export default Home;