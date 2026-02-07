import React from 'react';
import { motion } from 'framer-motion';
import { Star, Trophy, ArrowRight, Home } from 'lucide-react';
import ReactConfetti from 'react-confetti';

interface LessonCompleteProps {
  lessonTitle: string;
  lessonEmoji: string;
  totalStars: number;
  maxStars: number;
  onGoHome: () => void;
  onNextLesson: () => void;
}

const LessonComplete: React.FC<LessonCompleteProps> = ({
  lessonTitle,
  lessonEmoji,
  totalStars,
  maxStars,
  onGoHome,
  onNextLesson,
}) => {
  return (
    <div className="max-w-lg mx-auto px-4 py-12 text-center">
      <ReactConfetti recycle={false} numberOfPieces={300} />

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
        className="text-7xl mb-6"
      >
        {lessonEmoji}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h1 className="font-display font-extrabold text-3xl text-gray-800 mb-2">
          You Grew Smarter! 🌱
        </h1>
        <p className="text-gray-500 font-display text-lg mb-8">
          You finished <span className="font-bold text-green-600">{lessonTitle}</span> — keep growing!
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, type: 'spring' }}
        className="bg-white rounded-3xl p-8 shadow-lg border-2 border-yellow-200 mb-8 inline-block"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Trophy size={32} className="text-yellow-500" />
          <span className="font-display font-extrabold text-2xl text-gray-800">
            Stars Earned
          </span>
        </div>
        <div className="flex items-center justify-center gap-3">
          {Array.from({ length: maxStars }, (_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.8 + i * 0.2, type: 'spring', stiffness: 300 }}
            >
              <Star
                size={40}
                className={
                  i < totalStars
                    ? 'text-yellow-400 fill-yellow-400 drop-shadow-md'
                    : 'text-gray-200'
                }
              />
            </motion.div>
          ))}
        </div>
        <p className="mt-4 font-display font-bold text-lg text-gray-600">
          {totalStars} / {maxStars}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onGoHome}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-display font-bold transition-colors"
        >
          <Home size={20} />
          All Lessons
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNextLesson}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-calm-500 hover:bg-calm-600 text-white font-display font-bold shadow-lg shadow-calm-200 transition-colors"
        >
          Keep Learning
          <ArrowRight size={20} />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default LessonComplete;
