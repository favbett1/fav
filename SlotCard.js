import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function SlotCard({ slot }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gray-800 p-4 rounded hover:shadow-lg"
    >
      <img src={slot.image} alt={slot.name} className="w-full h-32 object-cover mb-2" />
      <h3 className="text-lg font-bold">{slot.name}</h3>
      <p className="text-sm text-gray-400">{slot.provider}</p>
      <Link to={`/slot/${slot.id}`} className="text-yellow-500 hover:underline">Грати</Link>
    </motion.div>
  );
}

export default SlotCard;