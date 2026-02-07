import React from 'react';
import { motion } from 'framer-motion';
import { Star, Lock, CheckCircle2 } from 'lucide-react';
import { Lesson } from '../data/lessons';

interface LessonCardProps {
  lesson: Lesson;
  index: number;
  isCompleted: boolean;
  starsEarned: number;
  onClick: () => void;
}

const difficultyColors = {
  beginner: 'bg-green-100 text-green-700 border-green-200',
  intermediate: 'bg-blue-100 text-blue-700 border-blue-200',
  advanced: 'bg-purple-100 text-purple-700 border-purple-200',
};

const LessonCard: React.FC<LessonCardProps> = ({ lesson, index, isCompleted, starsEarned, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      onClick={onClick}
      className="category-card bg-white rounded-2xl p-5 shadow-md border-2 border-transparent hover:border-calm-200 relative overflow-hidden"
    >
      {isCompleted && (
        <div className="absolute top-3 right-3">
          <CheckCircle2 size={24} className="text-success-500" />
        </div>
      )}

      <div className="text-4xl mb-3">{lesson.emoji}</div>

      <h3 className="font-display font-bold text-lg text-gray-800 mb-1">
        {lesson.title}
      </h3>

      <p className="text-sm text-gray-500 mb-3">{lesson.description}</p>

      <div className="flex items-center justify-between">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${difficultyColors[lesson.difficulty]}`}>
          {lesson.difficulty}
        </span>

        <div className="flex items-center gap-0.5">
          {[1, 2, 3].map((star) => (
            <Star
              key={star}
              size={16}
              className={
                star <= starsEarned
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-200'
              }
            />
          ))}
        </div>
      </div>

      <div className="mt-3 w-full bg-gray-100 rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(starsEarned / 3) * 100}%` }}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
          className="bg-gradient-to-r from-calm-400 to-calm-500 h-2 rounded-full"
        />
      </div>
    </motion.div>
  );
};

export default LessonCard;
