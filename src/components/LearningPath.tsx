import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Lock, Star, ChevronRight, Sprout, TreePine, Trees } from 'lucide-react';
import { Lesson, lessons } from '../data/lessons';

interface LessonProgress {
  completed: boolean;
  starsEarned: number;
  exerciseStars: number[];
}

interface LearningPathProps {
  lessonProgress: Record<string, LessonProgress>;
  onSelectLesson: (lesson: Lesson) => void;
}

interface Stage {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  icon: React.ReactNode;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  color: string;
  bgColor: string;
  borderColor: string;
  progressColor: string;
}

const stages: Stage[] = [
  {
    id: 'beginner',
    title: 'Seedling Stage',
    subtitle: 'Start here! Learn the basics',
    emoji: '🌱',
    icon: <Sprout size={24} />,
    difficulty: 'beginner',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    progressColor: 'from-green-400 to-green-500',
  },
  {
    id: 'intermediate',
    title: 'Sapling Stage',
    subtitle: 'Growing stronger! Build on what you know',
    emoji: '🌿',
    icon: <TreePine size={24} />,
    difficulty: 'intermediate',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    progressColor: 'from-blue-400 to-blue-500',
  },
  {
    id: 'advanced',
    title: 'Mighty Tree Stage',
    subtitle: 'You are amazing! Take on bigger challenges',
    emoji: '🌳',
    icon: <Trees size={24} />,
    difficulty: 'advanced',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    progressColor: 'from-purple-400 to-purple-500',
  },
];

const LearningPath: React.FC<LearningPathProps> = ({ lessonProgress, onSelectLesson }) => {
  const getLessonsForStage = (difficulty: string) =>
    lessons.filter((l) => l.difficulty === difficulty);

  const getStageProgress = (difficulty: string) => {
    const stageLessons = getLessonsForStage(difficulty);
    const completed = stageLessons.filter((l) => lessonProgress[l.id]?.completed).length;
    return { completed, total: stageLessons.length };
  };

  const isStageUnlocked = (difficulty: string) => {
    if (difficulty === 'beginner') return true;
    if (difficulty === 'intermediate') {
      const beginnerProgress = getStageProgress('beginner');
      return beginnerProgress.completed >= Math.ceil(beginnerProgress.total / 2);
    }
    if (difficulty === 'advanced') {
      const intermediateProgress = getStageProgress('intermediate');
      return intermediateProgress.completed >= Math.ceil(intermediateProgress.total / 2);
    }
    return false;
  };

  const isLessonUnlocked = (lesson: Lesson, index: number, stageLessons: Lesson[]) => {
    if (!isStageUnlocked(lesson.difficulty)) return false;
    if (index === 0) return true;
    const prevLesson = stageLessons[index - 1];
    return lessonProgress[prevLesson.id]?.completed || false;
  };

  const getNextRecommended = (): Lesson | null => {
    for (const stage of stages) {
      const stageLessons = getLessonsForStage(stage.difficulty);
      if (!isStageUnlocked(stage.difficulty)) continue;
      for (let i = 0; i < stageLessons.length; i++) {
        const lesson = stageLessons[i];
        if (!lessonProgress[lesson.id]?.completed && isLessonUnlocked(lesson, i, stageLessons)) {
          return lesson;
        }
      }
    }
    return null;
  };

  const nextRecommended = getNextRecommended();

  const totalLessons = lessons.length;
  const totalCompleted = Object.values(lessonProgress).filter((p) => p.completed).length;
  const overallPercent = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Overall progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-5 shadow-md border border-green-100 mb-8"
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-display font-bold text-lg text-gray-800">Your Learning Journey</h3>
            <p className="text-sm text-gray-500">
              {totalCompleted} of {totalLessons} lessons completed
            </p>
          </div>
          <div className="text-right">
            <span className="font-display font-extrabold text-2xl text-green-600">{overallPercent}%</span>
          </div>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${overallPercent}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 h-4 rounded-full"
          />
        </div>
        <div className="flex justify-between mt-2 text-xs font-display font-semibold text-gray-400">
          <span>🌱 Seedling</span>
          <span>🌿 Sapling</span>
          <span>🌳 Mighty Tree</span>
        </div>
      </motion.div>

      {/* Recommended next lesson */}
      {nextRecommended && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h3 className="font-display font-bold text-sm uppercase tracking-wider text-gray-500 mb-3">
            ✨ Recommended Next
          </h3>
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectLesson(nextRecommended)}
            className="w-full bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-5 border-2 border-green-200 hover:border-green-300 text-left transition-colors shadow-sm"
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl">{nextRecommended.emoji}</span>
              <div className="flex-1">
                <p className="font-display font-bold text-lg text-gray-800">
                  {nextRecommended.title}
                </p>
                <p className="text-sm text-gray-500">{nextRecommended.description}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                    {nextRecommended.category}
                  </span>
                  <span className="text-xs text-gray-400">
                    {nextRecommended.exercises.length} exercises
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-green-500 font-display font-bold">
                Start <ChevronRight size={18} />
              </div>
            </div>
          </motion.button>
        </motion.div>
      )}

      {/* Stages */}
      <div className="space-y-8">
        {stages.map((stage, stageIndex) => {
          const stageLessons = getLessonsForStage(stage.difficulty);
          const progress = getStageProgress(stage.difficulty);
          const unlocked = isStageUnlocked(stage.difficulty);
          const stagePercent =
            progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0;

          return (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: stageIndex * 0.15 }}
            >
              {/* Stage header */}
              <div
                className={`flex items-center gap-3 mb-4 p-4 rounded-2xl border-2 ${
                  unlocked ? `${stage.bgColor} ${stage.borderColor}` : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className={`${unlocked ? stage.color : 'text-gray-400'}`}>
                  {unlocked ? stage.icon : <Lock size={24} />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3
                      className={`font-display font-bold text-lg ${
                        unlocked ? 'text-gray-800' : 'text-gray-400'
                      }`}
                    >
                      {stage.emoji} {stage.title}
                    </h3>
                    {progress.completed === progress.total && progress.total > 0 && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">
                        ⭐ Complete!
                      </span>
                    )}
                  </div>
                  <p className={`text-sm ${unlocked ? 'text-gray-500' : 'text-gray-400'}`}>
                    {unlocked ? stage.subtitle : 'Complete more lessons above to unlock!'}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`font-display font-bold text-sm ${
                      unlocked ? stage.color : 'text-gray-400'
                    }`}
                  >
                    {progress.completed}/{progress.total}
                  </span>
                </div>
              </div>

              {/* Stage progress bar */}
              {unlocked && (
                <div className="w-full bg-gray-100 rounded-full h-2 mb-4 mx-1">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stagePercent}%` }}
                    transition={{ duration: 0.6, delay: stageIndex * 0.15 + 0.2 }}
                    className={`bg-gradient-to-r ${stage.progressColor} h-2 rounded-full`}
                  />
                </div>
              )}

              {/* Lesson list */}
              {unlocked && (
                <div className="relative ml-6">
                  {/* Vertical connector line */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />

                  <div className="space-y-3">
                    {stageLessons.map((lesson, lessonIndex) => {
                      const isCompleted = lessonProgress[lesson.id]?.completed || false;
                      const stars = lessonProgress[lesson.id]?.starsEarned || 0;
                      const lessonUnlocked = isLessonUnlocked(lesson, lessonIndex, stageLessons);
                      const isRecommended = nextRecommended?.id === lesson.id;

                      return (
                        <motion.div
                          key={lesson.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: stageIndex * 0.15 + lessonIndex * 0.05 + 0.3 }}
                          className="relative flex items-center gap-3"
                        >
                          {/* Node on the line */}
                          <div
                            className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
                              isCompleted
                                ? 'bg-green-500 border-green-500 text-white'
                                : lessonUnlocked
                                ? isRecommended
                                  ? 'bg-green-100 border-green-400 text-green-600 animate-pulse'
                                  : 'bg-white border-gray-300 text-gray-500'
                                : 'bg-gray-100 border-gray-200 text-gray-300'
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle2 size={16} />
                            ) : lessonUnlocked ? (
                              <span>{lessonIndex + 1}</span>
                            ) : (
                              <Lock size={12} />
                            )}
                          </div>

                          {/* Lesson card */}
                          <motion.button
                            whileHover={lessonUnlocked ? { scale: 1.02, x: 4 } : {}}
                            whileTap={lessonUnlocked ? { scale: 0.98 } : {}}
                            onClick={() => lessonUnlocked && onSelectLesson(lesson)}
                            disabled={!lessonUnlocked}
                            className={`flex-1 flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${
                              isCompleted
                                ? 'bg-green-50 border-green-200 hover:border-green-300'
                                : lessonUnlocked
                                ? isRecommended
                                  ? 'bg-white border-green-300 shadow-md shadow-green-100 hover:border-green-400'
                                  : 'bg-white border-gray-200 hover:border-calm-300 hover:shadow-sm'
                                : 'bg-gray-50 border-gray-100 cursor-not-allowed opacity-60'
                            }`}
                          >
                            <span className="text-2xl">{lesson.emoji}</span>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p
                                  className={`font-display font-bold text-sm truncate ${
                                    lessonUnlocked ? 'text-gray-800' : 'text-gray-400'
                                  }`}
                                >
                                  {lesson.title}
                                </p>
                                {isRecommended && (
                                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-green-100 text-green-600 whitespace-nowrap">
                                    UP NEXT
                                  </span>
                                )}
                              </div>
                              <p
                                className={`text-xs truncate ${
                                  lessonUnlocked ? 'text-gray-500' : 'text-gray-300'
                                }`}
                              >
                                {lesson.description}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <span
                                  className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                                    lessonUnlocked
                                      ? 'bg-gray-100 text-gray-500'
                                      : 'bg-gray-50 text-gray-300'
                                  }`}
                                >
                                  {lesson.category}
                                </span>
                                <span className="text-[10px] text-gray-400">
                                  {lesson.exercises.length} exercises
                                </span>
                              </div>
                            </div>

                            {/* Stars */}
                            {isCompleted && (
                              <div className="flex items-center gap-0.5">
                                {[1, 2, 3].map((s) => (
                                  <Star
                                    key={s}
                                    size={14}
                                    className={
                                      s <= stars
                                        ? 'text-yellow-400 fill-yellow-400'
                                        : 'text-gray-200'
                                    }
                                  />
                                ))}
                              </div>
                            )}

                            {lessonUnlocked && !isCompleted && (
                              <ChevronRight size={18} className="text-gray-400" />
                            )}
                          </motion.button>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default LearningPath;
