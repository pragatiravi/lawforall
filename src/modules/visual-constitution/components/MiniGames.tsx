import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Quiz from './Quiz';
import ConstitutionBoard from './ConstitutionBoard';
import ArticleWheel from './ArticleWheel';
import Flashcards from './Flashcards';

type GameType = 'quiz' | 'board' | 'wheel' | 'flashcards';

export default function MiniGames({ 
  theme, 
  onNavigate 
}: { 
  theme: 'light' | 'dark',
  onNavigate?: (article: any) => void 
}) {
  const [activeGame, setActiveGame] = useState<GameType>('quiz');

  const games = [
    { id: 'quiz', label: 'Mini Quiz' },
    { id: 'board', label: 'Constitution board' },
    { id: 'wheel', label: 'Article Wheel' },
    { id: 'flashcards', label: 'Flashcards' }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
         <h3 className={`text-2xl sm:text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Interactive Mini-games
         </h3>
         <p className={`${theme === 'dark' ? 'text-indigo-200/50' : 'text-slate-500'} text-sm`}>
            Learn critical legal structures with lightweight immersive games dashboard layout.
         </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
         {games.map((g) => (
            <button 
               key={g.id}
               onClick={() => setActiveGame(g.id as GameType)}
               className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                  activeGame === g.id 
                     ? 'bg-indigo-600 border-indigo-500 text-white' 
                     : theme === 'dark' ? 'bg-white/5 border-white/10 hover:bg-white/10 text-indigo-300' : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
               }`}
            >
               {g.label}
            </button>
         ))}
      </div>

      <div className="mt-8">
         <AnimatePresence mode="wait">
            <motion.div
               key={activeGame}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               className="min-h-[400px]"
            >
               {activeGame === 'quiz' && <Quiz theme={theme} />}
               {activeGame === 'board' && <ConstitutionBoard theme={theme} />}
               {activeGame === 'wheel' && <ArticleWheel theme={theme} onNavigate={onNavigate} />}
               {activeGame === 'flashcards' && <Flashcards theme={theme} />}
            </motion.div>
         </AnimatePresence>
      </div>
    </div>
  );
}
