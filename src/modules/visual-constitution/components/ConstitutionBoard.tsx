import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutGrid, Info } from 'lucide-react';

const boardData = [
  { id: "14-18", category: "Fundamental Rights", title: "Right to Equality", articles: "14 - 18", desc: "Covers equality before law, prohibition of discrimination, equality of opportunity, abolition of untouchability and titles." },
  { id: "19-22", category: "Fundamental Rights", title: "Right to Freedom", articles: "19 - 22", desc: "Covers freedom of speech, assembly, movement, protection in respect of conviction, and protection of life and personal liberty." },
  { id: "23-24", category: "Fundamental Rights", title: "Right against Exploitation", articles: "23 - 24", desc: "Prohibition of traffic in human beings and forced labor, prohibition of employment of children in factories." },
  { id: "25-28", category: "Fundamental Rights", title: "Freedom of Religion", articles: "25 - 28", desc: "Conscience and free profession, practice and propagation of religion, manage religious affairs." },
  { id: "29-30", category: "Fundamental Rights", title: "Cultural & Educational", articles: "29 - 30", desc: "Protection of interests of minorities, right of minorities to establish and administer educational institutions." },
  { id: "36-51", category: "Directive Principles", title: "State Policy Guidelines", articles: "36 - 51", desc: "Guidelines to secure a social order for the promotion of welfare of the people, equal justice, right to work." },
  { id: "51A", category: "Fundamental Duties", title: "Fundamental Duties", articles: "51A", desc: "To abide by the Constitution and respect its ideals, cherish and follow coordinates noble setups." }
];

export default function ConstitutionBoard({ theme }: { theme: 'light' | 'dark' }) {
  const [selectedItem, setSelectedItem] = useState<any>(null);

  return (
    <div className="space-y-8">
      <div className="text-center">
         <h4 className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Constitution Board Grid
         </h4>
         <p className={`text-sm ${theme === 'dark' ? 'text-indigo-200/50' : 'text-slate-500'}`}>
            Click card row for detailed explanation guidelines.
         </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {boardData.map((item) => (
            <motion.div 
               key={item.id}
               whileHover={{ scale: 1.02 }}
               onClick={() => setSelectedItem(item)}
               className={`p-6 rounded-3xl border cursor-pointer transition-all relative overflow-hidden flex flex-col justify-between ${
                  theme === 'dark' ? 'bg-white/5 border-white/10 hover:border-indigo-500/50' : 'bg-white border-slate-200 hover:border-indigo-500 shadow-sm'
               }`}
            >
               <div>
                  <div className="flex justify-between items-start mb-4">
                     <span className="text-xs font-black text-indigo-400 tracking-wider uppercase bg-indigo-500/10 px-3 py-1 rounded-full">
                        Article {item.articles}
                     </span>
                  </div>
                  <h5 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                     {item.title}
                  </h5>
               </div>
               <div className="flex items-center gap-1 text-xs font-bold text-indigo-400 mt-6">
                  Learn category Details <Info size={14} />
               </div>
            </motion.div>
         ))}
      </div>

      <AnimatePresence>
         {selectedItem && (
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
               onClick={() => setSelectedItem(null)}
            >
               <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className={`w-full max-w-lg p-8 rounded-3xl border ${
                     theme === 'dark' ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-2xl'
                  }`}
                  onClick={(e) => e.stopPropagation()}
               >
                  <h4 className="text-2xl font-black mb-1">{selectedItem.title}</h4>
                  <p className="text-xs font-bold text-indigo-400 tracking-widest uppercase mb-4">Articles {selectedItem.articles}</p>
                  <p className={`text-base leading-relaxed ${theme === 'dark' ? 'text-indigo-200/80' : 'text-slate-700'}`}>
                     {selectedItem.desc}
                  </p>
                  <button 
                     onClick={() => setSelectedItem(null)}
                     className="mt-8 w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all"
                  >
                     Close details
                  </button>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
}
