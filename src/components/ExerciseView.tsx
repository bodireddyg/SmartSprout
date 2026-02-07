import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, RotateCcw, ChevronRight, CheckCircle2, Volume2, Sparkles } from 'lucide-react';
import ReactConfetti from 'react-confetti';
import { Exercise, Word, encouragements } from '../data/lessons';
import WordTile from './WordTile';
import SentenceBuilder from './SentenceBuilder';

interface ExerciseViewProps {
  exercise: Exercise;
  exerciseNumber: number;
  totalExercises: number;
  onComplete: (stars: number) => void;
  onNext: () => void;
}

const ExerciseView: React.FC<ExerciseViewProps> = ({
  exercise,
  exerciseNumber,
  totalExercises,
  onComplete,
  onNext,
}) => {
  const [selectedWords, setSelectedWords] = useState<Word[]>([]);
  const [usedWordIds, setUsedWordIds] = useState<Set<string>>(new Set());
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [randomEncouragement] = useState(
    () => encouragements[Math.floor(Math.random() * encouragements.length)]
  );

  const handleWordClick = useCallback((word: Word) => {
    if (isCorrect) return;
    setSelectedWords(prev => [...prev, word]);
    setUsedWordIds(prev => new Set(prev).add(word.id));
  }, [isCorrect]);

  const handleRemoveWord = useCallback((index: number) => {
    if (isCorrect) return;
    setSelectedWords(prev => {
      const removed = prev[index];
      const newWords = prev.filter((_, i) => i !== index);
      setUsedWordIds(prevIds => {
        const newIds = new Set(prevIds);
        newIds.delete(removed.id);
        return newIds;
      });
      return newWords;
    });
  }, [isCorrect]);

  const handleCheck = useCallback(() => {
    const userSentence = selectedWords.map(w => w.text);
    const correct = JSON.stringify(userSentence) === JSON.stringify(exercise.correctSentence);
    setIsCorrect(correct);
    setAttempts(prev => prev + 1);

    if (correct) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);

      const stars = attempts === 0 ? 3 : attempts === 1 ? 2 : 1;
      onComplete(stars);

      const sentence = selectedWords.map(w => w.text).join(' ');
      const utterance = new SpeechSynthesisUtterance(sentence);
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      utterance.lang = 'en-US';
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  }, [selectedWords, exercise.correctSentence, attempts, onComplete]);

  const handleReset = useCallback(() => {
    setSelectedWords([]);
    setUsedWordIds(new Set());
    setIsCorrect(null);
  }, []);

  const speakWord = useCallback((text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.7;
    utterance.pitch = 1.1;
    utterance.lang = 'en-US';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {showConfetti && <ReactConfetti recycle={false} numberOfPieces={200} />}

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-500 font-display">
            Exercise {exerciseNumber} of {totalExercises}
          </span>
          <span className="text-sm text-gray-400">
            {Math.round((exerciseNumber / totalExercises) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(exerciseNumber / totalExercises) * 100}%` }}
            className="bg-gradient-to-r from-calm-400 to-success-400 h-3 rounded-full"
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Instruction */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-md mb-6 border border-calm-100"
      >
        <h2 className="font-display font-bold text-xl text-gray-800 mb-2">
          {exercise.instruction}
        </h2>
        <p className="text-gray-500 text-sm">{randomEncouragement}</p>
      </motion.div>

      {/* Hint */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-6 flex items-start gap-3"
          >
            <Lightbulb size={20} className="text-yellow-500 mt-0.5 flex-shrink-0" />
            <p className="text-yellow-800 font-display">{exercise.hint}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sentence Builder */}
      <div className="mb-6">
        <SentenceBuilder
          selectedWords={selectedWords}
          onRemoveWord={handleRemoveWord}
          isCorrect={isCorrect}
        />
      </div>

      {/* Result feedback */}
      <AnimatePresence>
        {isCorrect === true && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-success-50 border-2 border-success-300 rounded-2xl p-5 mb-6 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles size={24} className="text-success-500" />
              <h3 className="font-display font-bold text-xl text-success-700">
                Amazing! You got it!
              </h3>
              <Sparkles size={24} className="text-success-500" />
            </div>
            <p className="text-success-600 font-display">{exercise.encouragement}</p>
          </motion.div>
        )}
        {isCorrect === false && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-4 mb-6"
          >
            <p className="text-orange-700 font-display font-semibold">
              Almost there! Try again — you can do it! 💪
            </p>
            <p className="text-orange-500 text-sm mt-1">
              Tap the hint button if you need a little help.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Available words */}
      <div className="mb-8">
        <h3 className="font-display font-bold text-gray-600 text-sm uppercase tracking-wider mb-3">
          Available Words — Tap to add!
        </h3>
        <div className="flex flex-wrap gap-3 justify-center">
          {exercise.availableWords.map((word) => (
            <div key={word.id} className="relative">
              <WordTile
                word={word}
                onClick={() => handleWordClick(word)}
                isUsed={usedWordIds.has(word.id)}
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  speakWord(word.text);
                }}
                className="absolute -top-1 -right-1 p-1 bg-white rounded-full shadow-md hover:bg-calm-50 transition-colors"
                aria-label={`Listen to ${word.text}`}
              >
                <Volume2 size={12} className="text-calm-500" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-3 flex-wrap">
        {!showHint && !isCorrect && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowHint(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-yellow-50 hover:bg-yellow-100 text-yellow-700 font-display font-bold border-2 border-yellow-200 transition-colors"
          >
            <Lightbulb size={20} />
            Show Hint
          </motion.button>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReset}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gray-50 hover:bg-gray-100 text-gray-600 font-display font-bold border-2 border-gray-200 transition-colors"
        >
          <RotateCcw size={20} />
          Start Over
        </motion.button>

        {!isCorrect && selectedWords.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCheck}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-calm-500 hover:bg-calm-600 text-white font-display font-bold shadow-lg shadow-calm-200 transition-colors"
          >
            <CheckCircle2 size={20} />
            Check Answer
          </motion.button>
        )}

        {isCorrect && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-success-500 hover:bg-success-600 text-white font-display font-bold shadow-lg shadow-success-200 transition-colors"
          >
            Next
            <ChevronRight size={20} />
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default ExerciseView;
