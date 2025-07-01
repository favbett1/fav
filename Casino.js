import React from 'react';
import { Link } from 'react-router-dom';
import SlotCard from '../components/SlotCard';

const slots = [
  { id: 'sweet-bonanza', name: 'Sweet Bonanza', provider: 'Pragmatic Play', image: 'https://via.placeholder.com/150?text=Sweet+Bonanza' },
  { id: 'book-of-dead', name: 'Book of Dead', provider: 'Play’n GO', image: 'https://via.placeholder.com/150?text=Book+of+Dead' },
  { id: 'gates-of-olympus', name: 'Gates of Olympus', provider: 'Pragmatic Play', image: 'https://via.placeholder.com/150?text=Gates+of+Olympus' },
  { id: 'starburst', name: 'Starburst', provider: 'NetEnt', image: 'https://via.placeholder.com/150?text=Starburst' },
  { id: 'wolf-gold', name: 'Wolf Gold', provider: 'Pragmatic Play', image: 'https://via.placeholder.com/150?text=Wolf+Gold' },
  { id: 'big-bass-bonanza', name: 'Big Bass Bonanza', provider: 'Pragmatic Play', image: 'https://via.placeholder.com/150?text=Big+Bass+Bonanza' },
];

function Casino() {
  return (
    <section className="p-8">
      <h2 className="text-2xl font-bold mb-4">Популярні слоти</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {slots.map(slot => (
          <SlotCard key={slot.id} slot={slot} />
        ))}
      </div>
    </section>
  );
}

export default Casino;