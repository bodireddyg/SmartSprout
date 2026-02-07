import React from 'react';
import { motion } from 'framer-motion';
import { wordColors, wordTypeLabels } from '../data/lessons';

const WordLegend: React.FC = () => {
  const types = Object.keys(wordColors) as Array<keyof typeof wordColors>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-calm-100"
    >
      <h4 className="font-display font-bold text-xs uppercase tracking-wider text-gray-500 mb-2">
        Word Types — Color Guide
      </h4>
      <div className="flex flex-wrap gap-2">
        {types.map((type) => (
          <span
            key={type}
            className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${wordColors[type]}`}
          >
            {wordTypeLabels[type]}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default WordLegend;
