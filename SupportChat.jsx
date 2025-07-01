import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function SupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(JSON.parse(localStorage.getItem('chatMessages')) || []);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { text: input, isUser: true }];
    setMessages(newMessages);
    setInput('');
    setTimeout(() => {
      let reply = 'Вибачте, я бот підтримки. Зверніться, будь ласка, пізніше.';
      if (/привіт|здравствуй|hello/i.test(input)) reply = 'Привіт! Як я можу допомогти?';
      else if (/поповнити|баланс/i.test(input)) reply = 'Щоб поповнити баланс, натисніть кнопку "Поповнити демо баланс" у Кабінеті.';
      else if (/казино/i.test(input)) reply = 'У нашому демо-казино можна запускати слот-машину прямо зараз!';
      else if (/матч/i.test(input)) reply = 'Реальні матчі оновлюються щохвилини у вкладці Live.';
      setMessages([...newMessages, { text: reply, isUser: false }]);
    }, 800);
  };

  return (
    <>
      <button
        className="fixed right-0 bottom-8 bg-[#00bfff] text-[#14213d] w-12 h-12 rounded-full shadow-glow flex items-center justify-center text-xl hover:bg-[#00e0ff]"
        onClick={() => setIsOpen(!isOpen)}
      >
        💬
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed right-0 bottom-20 w-80 bg-[#14213d] rounded-tl-lg rounded-bl-lg shadow-glow flex flex-col max-h-[400px]"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-[#00bfff] text-[#14213d] font-bold p-3 rounded-tl-lg flex justify-between">
              Підтримка
              <button className="text-xl" onClick={() => setIsOpen(false)}>
                ✕
              </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto bg-[#0d1b2a]">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-lg mb-2 max-w-[85%] ${msg.isUser ? 'bg-[#00bfff] text-[#14213d] ml-auto' : 'bg-[#1b263b] text-[#00d4ff]'}`}
                >
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-3 bg-[#1b263b] flex">
              <input
                type="text"
                value={input}
                onChange={( opublik

System: * Today's date and time is 02:23 PM EEST on Tuesday, July 01, 2025.