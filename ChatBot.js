import React, { useState } from 'react';
import { motion } from 'framer-motion';

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const responses = {
    'як грати?': 'Виберіть слот у розділі Казино, натисніть "Грати" і крутіть барабани! Ваш баланс — 100,000 кредитів.',
    'бонуси': 'Ви отримуєте 100 фріспінів при реєстрації! Перевірте акції для деталей.',
    default: 'Сформулюйте запитання чіткіше, я тут, щоб допомогти! 😎'
  };

  const handleSend = () => {
    const response = responses[message.toLowerCase()] || responses.default;
    alert(response);
    setMessage('');
  };

  return (
    <motion.div
      initial={{ x: 300 }}
      animate={{ x: isOpen ? 0 : 300 }}
      className="fixed bottom-4 right-4 bg-gray-800 p-4 rounded"
    >
      <button onClick={() => setIsOpen(!isOpen)} className="bg-yellow-500 text-black px-4 py-2 rounded">
        {isOpen ? 'Закрити' : 'Чат'}
      </button>
      {isOpen && (
        <div className="mt-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="p-2 bg-gray-900 text-white rounded w-full"
          />
          <button onClick={handleSend} className="bg-yellow-500 text-black px-4 py-2 rounded mt-2">
            Надіслати
          </button>
        </div>
      )}
    </motion.div>
  );
}

export default ChatBot;