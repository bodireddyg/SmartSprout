import React from 'react';
import { Sprout, Star, Trophy, Home } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  totalStars: number;
  completedLessons: number;
  currentView: 'home' | 'lesson' | 'exercise';
  onGoHome: () => void;
}

const Header: React.FC<HeaderProps> = ({ totalStars, completedLessons, currentView, onGoHome }) => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white/80 backdrop-blur-md shadow-sm border-b border-calm-100 sticky top-0 z-50"
    >
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {currentView !== 'home' && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGoHome}
              className="p-2 rounded-xl bg-calm-50 hover:bg-calm-100 text-calm-600 transition-colors"
              aria-label="Go home"
            >
              <Home size={22} />
            </motion.button>
          )}
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Sprout size={28} className="text-green-500" />
            </motion.div>
            <h1 className="text-xl md:text-2xl font-bold text-calm-800 font-display">
              Smart<span className="text-green-500">Sprout</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-1.5 bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-200"
          >
            <Star size={18} className="text-yellow-500 fill-yellow-400" />
            <span className="font-bold text-yellow-700 font-display text-sm">
              {totalStars}
            </span>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-1.5 bg-success-50 px-3 py-1.5 rounded-full border border-success-200"
          >
            <Trophy size={18} className="text-success-500" />
            <span className="font-bold text-success-700 font-display text-sm">
              {completedLessons}
            </span>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
