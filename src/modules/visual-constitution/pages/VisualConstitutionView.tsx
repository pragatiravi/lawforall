import React from 'react';
import { motion } from 'motion/react';
import VisualConcepts from '../components/VisualConcepts';
import MiniGames from '../components/MiniGames';

export default function VisualConstitutionView({ 
  theme,
  onNavigate 
}: { 
  theme: 'light' | 'dark',
  onNavigate?: (article: any) => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-16 py-8"
    >
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className={`text-4xl sm:text-6xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'} tracking-tight`}>
           Visual <span className="text-indigo-500">Constitution</span>
        </h2>
        <p className={`${theme === 'dark' ? 'text-indigo-200/60' : 'text-slate-600'} text-base sm:text-lg`}>
           Explore cinematic concepts and interactive mini-games explaining critical Legal structures immersive setups accurately.
        </p>
      </div>

      <div className="space-y-24">
         <section className={`p-8 rounded-[40px] border relative overflow-hidden ${
            theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-xl'
         }`}>
            <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/10 blur-[80px] -ml-32 -mt-32" />
            <VisualConcepts theme={theme} />
         </section>

         <section className={`p-8 rounded-[40px] border relative overflow-hidden ${
            theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-xl'
         }`}>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-500/10 blur-[80px] -mr-32 -mb-32" />
            <MiniGames theme={theme} onNavigate={onNavigate} />
         </section>
      </div>
    </motion.div>
  );
}
