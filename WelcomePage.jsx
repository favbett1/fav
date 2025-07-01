import { motion } from 'framer-motion';

function WelcomePage({ onClose }) {
  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-[#14213d] to-[#0d1b2a] flex flex-col justify-center items-center text-[#00bfff] font-orbitron text-5xl tracking-wider z-50 cursor-pointer"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      onClick={onClose}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClose()}
    >
      teXbet
      <span className="text-xl mt-4 font-normal text-[#00e0ffcc]">Офіційний букмекерський сайт</span>
      <small className="text-sm mt-10 text-[#005580cc]">Натисніть, щоб увійти</small>
    </motion.div>
  );
}

export default WelcomePage;