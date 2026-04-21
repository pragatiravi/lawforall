import React, { useState, useMemo } from 'react';
import { motion, useAnimation, AnimatePresence } from 'motion/react';
import { getAllArticles } from '../../../data/constitution';
import { Play, RotateCcw, ExternalLink } from 'lucide-react';

export default function ArticleWheel({ 
  theme, 
  onNavigate 
}: { 
  theme: 'light' | 'dark',
  onNavigate?: (article: any) => void
}) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const controls = useAnimation();

  const articles = useMemo(() => getAllArticles(), []);

  const handleSpin = async () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSelectedArticle(null);

    // Pick random article index
    const randomIndex = Math.floor(Math.random() * articles.length);
    const selected = articles[randomIndex];

    // Physics Animation offset configuration
    const randomDegrees = 1800 + Math.random() * 360; // 5+ full spins
    const duration = 3.5; // seconds

    await controls.start({
      rotate: [0, randomDegrees],
      transition: { duration, ease: [0.1, 0.7, 0.1, 1] }
    });

    setSelectedArticle(selected);
    setIsSpinning(false);
  };

  const getTranslatedValue = (field: any) => {
     if (typeof field === 'string') return field;
     if (field && typeof field === 'object') return field['en'] || "";
     return "";
  };

  return (
    <div className="max-w-xl mx-auto space-y-8 flex flex-col items-center">
      <div className="text-center">
         <h4 className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Article Roulette Wheel
         </h4>
         <p className={`text-sm ${theme === 'dark' ? 'text-indigo-200/50' : 'text-slate-500'}`}>
            Spin to discover one of the {articles.length} constitution articles randomly.
         </p>
      </div>

      <div className="relative w-64 h-64 flex items-center justify-center">
         {/* Pointer setup */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-20 w-4 h-6 bg-red-500 clip-arrow" />
         
         <motion.div 
            animate={controls}
            className={`w-full h-full rounded-full border-4 relative overflow-hidden flex items-center justify-center p-2 ${
               theme === 'dark' ? 'border-indigo-500/20 bg-indigo-500/5' : 'border-slate-300 bg-white shadow-xl'
            }`}
         >
            {/* Minimalist 8 segments visual overlays layout (avoiding 448 text node overheads) */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 opacity-30">
               <div className="border-r border-b border-indigo-500/20 bg-indigo-500/5" />
               <div className="border-l border-b border-indigo-500/20 bg-indigo-500/10" />
               <div className="border-r border-top border-indigo-500/20 bg-indigo-500/10" />
               <div className="border-l border-top border-indigo-500/20 bg-indigo-500/5" />
            </div>

            <div className="rounded-full w-12 h-12 bg-indigo-600 flex items-center justify-center shadow-lg z-10">
               <span className="text-white font-black text-xs">SPIN</span>
            </div>
         </motion.div>
      </div>

      <button 
         onClick={handleSpin}
         disabled={isSpinning}
         className={`px-8 py-3 rounded-2xl font-black tracking-wider shadow-lg transition-all flex items-center gap-2 ${
            theme === 'dark' 
               ? 'bg-indigo-600 hover:bg-indigo-500 text-white disabled:bg-indigo-600/50' 
               : 'bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-indigo-400'
         }`}
      >
         {isSpinning ? <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : <Play size={16} />}
         {isSpinning ? "SPINNING..." : "SPIN AGAIN"}
      </button>

      <AnimatePresence>
         {selectedArticle && (
            <motion.div 
               initial={{ scale: 0.9, opacity: 0, y: 10 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.9, opacity: 0 }}
               className={`p-6 rounded-2xl border text-center transition-all w-full space-y-4 relative overflow-hidden backdrop-blur-sm ${
                  theme === 'dark' ? 'bg-indigo-600/10 border-indigo-500/30 text-white' : 'bg-indigo-50 border-indigo-200 text-slate-800'
               }`}
            >
               <div className="absolute inset-0 bg-indigo-500/5 backdrop-blur-[2px] -z-10" />
               
               <div>
                  <p className="text-xs font-bold text-indigo-400 mb-1 tracking-widest uppercase">SELECTED ARTICLE</p>
                  <p className="font-black text-xl mb-1">Article {selectedArticle.article_number}</p>
                  <p className={`font-bold text-sm ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{getTranslatedValue(selectedArticle.title)}</p>
               </div>

               <p className={`text-sm leading-relaxed line-clamp-3 ${theme === 'dark' ? 'text-indigo-200/80' : 'text-slate-600'}`}>
                  {getTranslatedValue(selectedArticle.simple_explanation)}
               </p>

               <div className="pt-2">
                  {/* Fake deep link supporting click navigations triggers layout forwards if they have fully functional page state layouts */}
                  <button 
                     onClick={() => onNavigate && onNavigate(selectedArticle)}
                     className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs px-4 py-2 rounded-xl font-bold flex items-center gap-1 mx-auto transition-all"
                  >
                     View Full Article <ExternalLink size={14} />
                  </button>
               </div>
            </motion.div>
         )}
      </AnimatePresence>

      <style>{`
         .clip-arrow {
            clip-path: polygon(100% 0, 0 0, 50% 100%);
         }
      `}</style>
    </div>
  );
}
