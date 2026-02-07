# SmartSprout 🌱

**Growing Smarter Every Day!**

SmartSprout is a fun, interactive learning app for kids — including those with autism and learning disabilities — that teaches English, Grammar, Maths, Science, Geography, History, and more through sentence-building exercises. Built with React, TypeScript, and TailwindCSS.

---

## Features

- **140+ Lessons** across 55+ categories
- **Autism & Learning Disability Friendly**: Social scripts, sensory words, routines, calm-down strategies, and safety phrases designed with evidence-based approaches
- **Grade-based Maths** (Grade 1–10): Counting, algebra, trigonometry, and more
- **Grade-based English** (Grade 1–10): Alphabet, grammar, essay writing, poetry analysis
- **Science, Geography & History** lessons covering Solar System, Ireland, Europe, India
- **Social Scripts**: Asking for help, taking turns, saying no nicely, joining games, and waiting patiently
- **Feelings & Body Signals**: Recognising emotions, body signals, calm-down words, and sensory overload language
- **Safety Words**: Emergency phrases, name & address, stranger safety
- **Sensory Words**: Describing what you see, hear, touch, smell, and taste
- **Phonics & Sound Patterns**: Letter sounds, short/long vowels, consonant blends, and word families
- **Routines & Sequencing**: Step-by-step routines using first/then/last language
- **Choice Making**: Expressing wants, preferences, and favourites
- **Cause & Effect**: Because/so, predictions, before/after
- **Predictable Patterns**: "I can...", "I see a...", "The ___ is ___" — repetitive frames that build confidence
- **Brain Training** exercises for concentration and memory
- **Everyday Words & Conversations** for practical language skills
- **Interactive sentence builder** with drag-and-drop word tiles
- **Progress tracking** with a learning path
- **Engaging emojis and encouragements** throughout

---

## Tech Stack

| Technology | Purpose |
|---|---|
| [React](https://react.dev/) 18 | UI framework |
| [TypeScript](https://www.typescriptlang.org/) 5 | Type-safe JavaScript |
| [Vite](https://vitejs.dev/) 4 | Build tool & dev server |
| [TailwindCSS](https://tailwindcss.com/) 3 | Utility-first CSS styling |
| [Framer Motion](https://www.framer.com/motion/) | Animations |
| [Lucide React](https://lucide.dev/) | Icons |
| [React Confetti](https://www.npmjs.com/package/react-confetti) | Celebration effects |

---

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v16 or higher) — [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**

To verify your installation, run:

```bash
node --version
npm --version
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd SmartSprout
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The app will start at **http://localhost:5173** (default Vite port). Open this URL in your browser.

### 4. Build for production

```bash
npm run build
```

This creates an optimised production build in the `dist/` folder.

### 5. Preview the production build

```bash
npm run preview
```

---

## Project Structure

```
SmartSprout/
├── public/                  # Static assets (favicon)
├── src/
│   ├── components/          # React components
│   │   ├── App.tsx          # Main app component
│   │   ├── Header.tsx       # App header with progress
│   │   ├── LearningPath.tsx # Stage-based lesson path
│   │   ├── LessonCard.tsx   # Lesson card in grid view
│   │   ├── LessonComplete.tsx # Lesson completion screen
│   │   ├── ExerciseView.tsx # Exercise display & logic
│   │   ├── SentenceBuilder.tsx # Sentence building area
│   │   ├── WordTile.tsx     # Draggable word tile
│   │   └── WordLegend.tsx   # Word type colour legend
│   ├── data/
│   │   └── lessons.ts       # All lessons, categories & encouragements
│   ├── index.css            # Global styles (Tailwind imports)
│   ├── main.tsx             # App entry point
│   └── vite-env.d.ts        # Vite type declarations
├── index.html               # HTML entry point
├── package.json             # Dependencies & scripts
├── tailwind.config.js       # Tailwind configuration
├── postcss.config.js        # PostCSS configuration
├── tsconfig.json            # TypeScript configuration
├── tsconfig.node.json       # TypeScript config for Node
├── vite.config.ts           # Vite configuration
└── README.md                # This file
```

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |

---

## How It Works

1. **Choose a lesson** from the home screen by browsing categories or using the search bar.
2. **Build sentences** by tapping/clicking word tiles in the correct order.
3. **Get hints** if you're stuck — each exercise has a helpful hint.
4. **Complete exercises** to earn encouragements and track your progress.
5. **Follow the Learning Path** for a structured, stage-by-stage journey.

---

## Adding New Lessons

All lesson data lives in `src/data/lessons.ts`. Each lesson follows this structure:

```typescript
{
  id: 'unique-lesson-id',
  title: 'Lesson Title',
  description: 'Short description',
  emoji: '📚',
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  category: 'Category Name',
  exercises: [
    {
      id: 'unique-exercise-id',
      instruction: 'Question or instruction text',
      hint: 'A helpful hint...',
      correctSentence: ['Word1', 'Word2', 'Word3'],
      availableWords: [
        { id: 'w1', text: 'Word1', type: 'subject', emoji: '📖' },
        // ... more words (include distractors!)
      ],
      encouragement: 'Positive feedback message!',
    },
  ],
}
```

To add a new category, add an entry to the `categories` array:

```typescript
{ id: 'Category Name', name: 'Category Name', emoji: '📚' }
```

---

## Troubleshooting

| Issue | Solution |
|---|---|
| `npm install` fails | Make sure Node.js v16+ is installed. Try deleting `node_modules` and `package-lock.json`, then run `npm install` again. |
| Port 5173 already in use | Vite will automatically try the next available port, or you can run `npm run dev -- --port 3000` |
| Styles not loading | Make sure TailwindCSS is properly configured. Run `npm run dev` and check the terminal for errors. |
| Blank screen | Open browser dev tools (F12) and check the Console tab for errors. |

---

## License

This project is for educational purposes.

---

Built with ❤️ for young learners everywhere. 🌱
