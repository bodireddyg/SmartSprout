import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sprout, Search, Map, LayoutGrid } from 'lucide-react';
import { lessons, categories, Lesson } from './data/lessons';
import Header from './components/Header';
import LessonCard from './components/LessonCard';
import ExerciseView from './components/ExerciseView';
import LessonComplete from './components/LessonComplete';
import WordLegend from './components/WordLegend';
import LearningPath from './components/LearningPath';

type HomeTab = 'path' | 'explore';

type View = 'home' | 'exercise' | 'complete';

interface LessonProgress {
  completed: boolean;
  starsEarned: number;
  exerciseStars: number[];
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [lessonProgress, setLessonProgress] = useState<Record<string, LessonProgress>>({});
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [lessonStarsAccumulator, setLessonStarsAccumulator] = useState(0);
  const [homeTab, setHomeTab] = useState<HomeTab>('path');

  const totalStars = Object.values(lessonProgress).reduce(
    (sum, p) => sum + p.starsEarned,
    0
  );
  const completedLessons = Object.values(lessonProgress).filter(p => p.completed).length;

  const filteredLessons = lessons.filter((lesson) => {
    const matchesCategory = selectedCategory === 'all' || lesson.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSelectLesson = useCallback((lesson: Lesson) => {
    setSelectedLesson(lesson);
    setCurrentExerciseIndex(0);
    setLessonStarsAccumulator(0);
    setCurrentView('exercise');
  }, []);

  const handleExerciseComplete = useCallback((stars: number) => {
    setLessonStarsAccumulator(prev => prev + stars);
  }, []);

  const handleNextExercise = useCallback(() => {
    if (!selectedLesson) return;

    if (currentExerciseIndex < selectedLesson.exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
    } else {
      const maxStars = selectedLesson.exercises.length * 3;
      const existing = lessonProgress[selectedLesson.id];
      const newStars = Math.max(existing?.starsEarned || 0, lessonStarsAccumulator);

      setLessonProgress(prev => ({
        ...prev,
        [selectedLesson.id]: {
          completed: true,
          starsEarned: newStars,
          exerciseStars: [],
        },
      }));
      setCurrentView('complete');
    }
  }, [selectedLesson, currentExerciseIndex, lessonProgress, lessonStarsAccumulator]);

  const handleGoHome = useCallback(() => {
    setCurrentView('home');
    setSelectedLesson(null);
    setCurrentExerciseIndex(0);
    setLessonStarsAccumulator(0);
  }, []);

  const handleNextLesson = useCallback(() => {
    if (!selectedLesson) return;
    const currentIndex = lessons.findIndex(l => l.id === selectedLesson.id);
    const nextIndex = (currentIndex + 1) % lessons.length;
    handleSelectLesson(lessons[nextIndex]);
  }, [selectedLesson, handleSelectLesson]);

  return (
    <div className="min-h-screen">
      <Header
        totalStars={totalStars}
        completedLessons={completedLessons}
        currentView={currentView === 'home' ? 'home' : 'lesson'}
        onGoHome={handleGoHome}
      />

      <AnimatePresence mode="wait">
        {currentView === 'home' && (
          <motion.main
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-5xl mx-auto px-4 py-8"
          >
            {/* Welcome section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full mb-4">
                <Sprout size={18} className="text-green-500" />
                <span className="text-green-700 font-display font-semibold text-sm">
                  Growing Smarter Every Day!
                </span>
              </div>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-gray-800 mb-3">
                Welcome to Smart<span className="text-green-500">Sprout</span>!
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto font-display">
                Learn English, Grammar, Maths & Science by building sentences with colorful words. Tap, learn, and grow!
              </p>
            </motion.div>

            {/* Tab switcher: Learning Path vs Explore */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="flex justify-center mb-6"
            >
              <div className="inline-flex bg-white rounded-2xl p-1 border-2 border-gray-100 shadow-sm">
                <button
                  onClick={() => setHomeTab('path')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-display font-bold text-sm transition-all ${
                    homeTab === 'path'
                      ? 'bg-green-500 text-white shadow-md shadow-green-200'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Map size={16} />
                  Learning Path
                </button>
                <button
                  onClick={() => setHomeTab('explore')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-display font-bold text-sm transition-all ${
                    homeTab === 'explore'
                      ? 'bg-calm-500 text-white shadow-md shadow-calm-200'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <LayoutGrid size={16} />
                  Explore All
                </button>
              </div>
            </motion.div>

            {/* Learning Path view */}
            {homeTab === 'path' && (
              <motion.div
                key="path"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <LearningPath
                  lessonProgress={lessonProgress}
                  onSelectLesson={handleSelectLesson}
                />
              </motion.div>
            )}

            {/* Explore view: Search + Categories + Grid */}
            {homeTab === 'explore' && (
              <motion.div
                key="explore"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="max-w-md mx-auto mb-6"
            >
              <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search lessons — try Grammar, Maths, Science..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border-2 border-calm-100 focus:border-calm-300 focus:outline-none font-display text-gray-700 placeholder-gray-400 transition-colors"
                  aria-label="Search lessons"
                />
              </div>
            </motion.div>

            {/* Category filters */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex flex-wrap justify-center gap-2 mb-8"
            >
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`
                    px-4 py-2 rounded-full font-display font-semibold text-sm transition-all
                    ${
                      selectedCategory === cat.id
                        ? 'bg-calm-500 text-white shadow-md shadow-calm-200'
                        : 'bg-white text-gray-600 hover:bg-calm-50 border border-gray-200'
                    }
                  `}
                >
                  {cat.emoji} {cat.name}
                </button>
              ))}
            </motion.div>

            {/* Word Legend */}
            <div className="mb-8">
              <WordLegend />
            </div>

            {/* Lesson grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredLessons.map((lesson, index) => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  index={index}
                  isCompleted={lessonProgress[lesson.id]?.completed || false}
                  starsEarned={lessonProgress[lesson.id]?.starsEarned || 0}
                  onClick={() => handleSelectLesson(lesson)}
                />
              ))}
            </div>

            {filteredLessons.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-4xl mb-3">🔍</p>
                <p className="font-display font-bold text-gray-500">
                  No lessons found. Try a different search!
                </p>
              </motion.div>
            )}

              </motion.div>
            )}
          </motion.main>
        )}

        {currentView === 'exercise' && selectedLesson && (
          <motion.main
            key={`exercise-${selectedLesson.id}-${currentExerciseIndex}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="py-4"
          >
            <ExerciseView
              exercise={selectedLesson.exercises[currentExerciseIndex]}
              exerciseNumber={currentExerciseIndex + 1}
              totalExercises={selectedLesson.exercises.length}
              onComplete={handleExerciseComplete}
              onNext={handleNextExercise}
            />
          </motion.main>
        )}

        {currentView === 'complete' && selectedLesson && (
          <motion.main
            key="complete"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <LessonComplete
              lessonTitle={selectedLesson.title}
              lessonEmoji={selectedLesson.emoji}
              totalStars={lessonStarsAccumulator}
              maxStars={selectedLesson.exercises.length * 3}
              onGoHome={handleGoHome}
              onNextLesson={handleNextLesson}
            />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
