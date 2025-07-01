import { motion } from 'framer-motion';

const mockNews = [
  { id: 1, title: 'Шахтар переміг у Лізі Чемпіонів!' },
  { id: 2, title: 'Новий сезон УПЛ стартує 10 серпня' },
  { id: 3, title: 'Оновлення в казино: нові слоти!' },
];

function News() {
  return (
    <section>
      <h2 className="font-orbitron text-3xl text-center mb-6">📰 Останні новини</h2>
      <ul className="max-w-2xl mx-auto">
        {mockNews.map((news, index) => (
          <motion.li
            key={news.id}
            className="bg-[#1b263b] p-4 rounded-xl shadow-glow mb-4 text-[#00d4ff] font-semibold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {news.title}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

export default News;