import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Clapperboard, RotateCcw } from 'lucide-react';
import conceptsData from '../data/visualConcepts.json';

interface Concept {
  id: string;
  title: string;
  prompt: string;
  preset_gradient: string;
}

export default function VisualConcepts({ theme }: { theme: 'light' | 'dark' }) {
  const [activeConcept, setActiveConcept] = useState<Concept | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePlay = (concept: Concept) => {
    setActiveConcept(concept);
    setIsLoading(true);
    setIsPlaying(false);

    // Simulate video generation / loading process
    setTimeout(() => {
      setIsLoading(false);
      setIsPlaying(true);
    }, 2500);
  };

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
         <h3 className={`text-2xl sm:text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Visual Concepts & Explorations
         </h3>
         <p className={`${theme === 'dark' ? 'text-indigo-200/50' : 'text-slate-500'} text-sm`}>
            Simulate cinematic educational concepts explaining critical legal layouts accurately.
         </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {conceptsData.map((c: Concept) => (
          <motion.div
            key={c.id}
            whileHover={{ scale: 1.02, y: -5 }}
            className={`p-6 rounded-3xl border transition-all relative overflow-hidden flex flex-col justify-between ${
              theme === 'dark' 
                ? 'bg-white/5 border-white/10 hover:border-indigo-500/30' 
                : 'bg-white border-slate-200 shadow-sm hover:border-indigo-500 shadow-md'
            }`}
          >
             <div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                   theme === 'dark' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-100 text-indigo-600'
                }`}>
                   <Clapperboard size={20} />
                </div>
                <h4 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                   {c.title}
                </h4>
                <p className={`text-xs mb-6 line-clamp-3 ${theme === 'dark' ? 'text-indigo-200/50' : 'text-slate-500'}`}>
                   {c.prompt}
                </p>
             </div>

             <button 
                onClick={() => handlePlay(c)}
                className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 text-sm transition-all ${
                   theme === 'dark' ? 'bg-indigo-600 hover:bg-indigo-500 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
             >
                <Play size={16} /> Simulate Render
             </button>
          </motion.div>
        ))}
      </div>

      {/* Video Simulation Modal Overlay Node layout */}
      <AnimatePresence>
         {activeConcept && (
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            >
               <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className={`w-full max-w-4xl rounded-3xl border overflow-hidden relative ${
                     theme === 'dark' ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
                  }`}
               >
                  <div className={`p-4 border-b flex items-center justify-between ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'}`}>
                     <h3 className={`font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{activeConcept.title}</h3>
                     <button 
                        onClick={() => { setActiveConcept(null); setIsPlaying(false); }}
                        className={`p-2 rounded-full hover:bg-white/10 text-slate-400`}
                     >
                        Close
                     </button>
                  </div>

                  <div className="aspect-video bg-black relative flex items-center justify-center overflow-hidden">
                     {isLoading && (
                        <div className="flex flex-col items-center gap-4 text-center">
                           <div className="w-12 h-12 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin" />
                           <p className="text-white text-sm font-bold tracking-widest animate-pulse">GENERATING CINEMATIC CONCEPT...</p>
                        </div>
                     )}

                     {isPlaying && (
                        <div className={`absolute inset-0 bg-gradient-to-br ${activeConcept.preset_gradient} opacity-40 animate-pulse`} />
                     )}

                     {isPlaying && (
                        <motion.div 
                           initial={{ scale: 0.95 }}
                           animate={{ scale: 1 }}
                           className="z-10 text-center space-y-4 px-6"
                        >
                           <p className="text-white text-2xl font-black drop-shadow-lg">{activeConcept.title}</p>
                           <p className="text-white/80 text-sm max-w-xl mx-auto drop-shadow-md">
                              {activeConcept.prompt}
                           </p>
                           <div className="flex justify-center gap-3">
                              <button className="p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all">
                                 <Pause size={20} />
                              </button>
                              <button 
                                 onClick={() => handlePlay(activeConcept)}
                                 className="p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all"
                              >
                                 <RotateCcw size={20} />
                              </button>
                           </div>
                        </motion.div>
                     )}
                     
                     {/* Looping particle fallback grid simulation background template layout */}
                     <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:30px_30px]" />
                     </div>
                  </div>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
}
