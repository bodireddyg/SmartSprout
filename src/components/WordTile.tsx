import React from 'react';
import { motion } from 'framer-motion';
import { Word, wordColors, wordTypeLabels } from '../data/lessons';

interface WordTileProps {
  word: Word;
  onClick: () => void;
  isUsed: boolean;
  showType?: boolean;
}

const WordTile: React.FC<WordTileProps> = ({ word, onClick, isUsed, showType = true }) => {
  return (
    <motion.button
      layout
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: isUsed ? 0.9 : 1,
        opacity: isUsed ? 0.4 : 1,
      }}
      whileHover={!isUsed ? { scale: 1.08, y: -3 } : {}}
      whileTap={!isUsed ? { scale: 0.95 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={!isUsed ? onClick : undefined}
      disabled={isUsed}
      className={`
        word-tile relative inline-flex flex-col items-center gap-1 
        px-4 py-3 rounded-2xl border-2 font-display font-bold text-lg
        ${wordColors[word.type]}
        ${isUsed ? 'cursor-not-allowed grayscale' : 'cursor-pointer hover:shadow-lg'}
        transition-shadow
      `}
      aria-label={`Word: ${word.text}, type: ${wordTypeLabels[word.type]}`}
    >
      {word.emoji && (
        <span className="text-2xl leading-none" role="img" aria-hidden="true">
          {word.emoji}
        </span>
      )}
      <span className="leading-tight">{word.text}</span>
      {showType && (
        <span className="text-[10px] font-normal opacity-60 uppercase tracking-wider">
          {wordTypeLabels[word.type]}
        </span>
      )}
    </motion.button>
  );
};

export default WordTile;
