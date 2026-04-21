import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

const flashcardsData = [
  { id: 1, title: "Article 14", front: "Right to Equality", back: "Equality before law and equal protection of laws to all citizens within India." },
  { id: 2, title: "Article 19", front: "Freedom of Speech", back: "Protection of certain rights regarding freedom of speech, assembly, movement etc." },
  { id: 3, title: "Article 21", front: "Right to Life", back: "Protection of life and personal liberty except according to procedure established by law." },
  { id: 4, title: "Article 21A", front: "Right to Education", back: "The State shall provide free and compulsory education to all children of 6 to 14 years." },
  { id: 5, title: "Article 32", front: "Constitutional Remedies", back: "Right to move the Supreme Court for enforcement of fundamental rights including Writs." }
];

export default function Flashcards({ theme }: { theme: 'light' | 'dark' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = flashcardsData[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
       setCurrentIndex(prev => (prev + 1) % flashcardsData.length);
    }, 200);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
       setCurrentIndex(prev => (prev - 1 + flashcardsData.length) % flashcardsData.length);
    }, 200);
  };

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <div className="text-center">
         <h4 className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Constitutional Flashcards
         </h4>
         <p className={`text-sm ${theme === 'dark' ? 'text-indigo-200/50' : 'text-slate-500'}`}>
            Click to flip card to review simplified descriptions.
         </p>
      </div>

      <div className="perspective-1000 w-full aspect-[4/3] relative">
         <AnimatePresence mode="wait">
            <motion.div
               key={currentIndex + (isFlipped ? '-flipped' : '-front')}
               initial={{ rotateY: isFlipped ? -180 : 180, opacity: 0 }}
               animate={{ rotateY: 0, opacity: 1 }}
               exit={{ rotateY: isFlipped ? 180 : -180, opacity: 0 }}
               transition={{ duration: 0.5 }}
               onClick={() => setIsFlipped(!isFlipped)}
               className={`absolute inset-0 rounded-3xl border cursor-pointer shadow-xl flex flex-col items-center justify-center p-8 text-center select-none ${
                  theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
               }`}
            >
               <div className="absolute top-4 right-6 text-xs font-black text-indigo-400 tracking-wider">
                  Card {currentIndex + 1} / {flashcardsData.length}
               </div>

               <div className="space-y-4">
                  <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full">{currentCard.title}</span>
                  {!isFlipped ? (
                     <p className="text-3xl font-black">{currentCard.front}</p>
                  ) : (
                     <p className={`text-base font-medium leading-relaxed ${theme === 'dark' ? 'text-indigo-200/80' : 'text-slate-700'}`}>
                        {currentCard.back}
                     </p>
                  )}
               </div>

               <div className="absolute bottom-6 text-xs text-indigo-400/60 flex items-center gap-1 font-bold">
                  <RotateCcw size={14} /> Click card to flip
               </div>
            </motion.div>
         </AnimatePresence>
      </div>

      <div className="flex justify-center items-center gap-4">
         <button 
            onClick={handlePrev}
            className={`p-3 rounded-full border ${
               theme === 'dark' ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white' : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-800'
            }`}
         >
            <ChevronLeft size={20} />
         </button>
         <button 
            onClick={handleNext}
            className={`p-3 rounded-full border ${
               theme === 'dark' ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white' : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-800'
            }`}
         >
            <ChevronRight size={20} />
         </button>
      </div>
    </div>
  );
}
