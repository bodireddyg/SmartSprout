import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2 } from 'lucide-react';
import { Word, wordColors } from '../data/lessons';

interface SentenceBuilderProps {
  selectedWords: Word[];
  onRemoveWord: (index: number) => void;
  isCorrect: boolean | null;
}

const SentenceBuilder: React.FC<SentenceBuilderProps> = ({ selectedWords, onRemoveWord, isCorrect }) => {
  const speakSentence = () => {
    if (selectedWords.length === 0) return;
    const sentence = selectedWords.map(w => w.text).join(' ');
    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.rate = 0.8;
    utterance.pitch = 1.1;
    utterance.lang = 'en-US';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-display font-bold text-gray-600 text-sm uppercase tracking-wider">
          Your Sentence
        </h3>
        {selectedWords.length > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={speakSentence}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-calm-50 hover:bg-calm-100 text-calm-600 text-sm font-semibold transition-colors"
            aria-label="Listen to sentence"
          >
            <Volume2 size={16} />
            Listen
          </motion.button>
        )}
      </div>

      <motion.div
        animate={{
          borderColor: isCorrect === true
            ? '#4ade80'
            : isCorrect === false
              ? '#f87171'
              : '#b8dbff',
          backgroundColor: isCorrect === true
            ? '#f0fdf4'
            : isCorrect === false
              ? '#fef2f2'
              : 'white',
        }}
        className={`
          sentence-slot flex flex-wrap items-center gap-2 p-4 min-h-[72px]
          ${selectedWords.length > 0 ? 'has-words' : ''}
        `}
      >
        <AnimatePresence mode="popLayout">
          {selectedWords.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="text-gray-400 font-display text-center w-full"
            >
              Tap words below to build your sentence...
            </motion.p>
          ) : (
            selectedWords.map((word, index) => (
              <motion.div
                key={`${word.id}-${index}`}
                layout
                initial={{ scale: 0, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0, opacity: 0, y: -20 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className={`
                  relative inline-flex items-center gap-1.5 px-3 py-2 rounded-xl 
                  border-2 font-display font-bold text-base cursor-pointer
                  ${wordColors[word.type]}
                  hover:shadow-md transition-shadow
                `}
                onClick={() => onRemoveWord(index)}
                role="button"
                aria-label={`Remove word: ${word.text}`}
              >
                {word.emoji && <span className="text-lg">{word.emoji}</span>}
                <span>{word.text}</span>
                <X size={14} className="ml-1 opacity-50" />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default SentenceBuilder;
