import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, ShieldCheck, BookOpen } from 'lucide-react';
import { getPreamble, getParts, Part } from '../data/constitution';

interface ConstitutionViewProps {
  theme: 'light' | 'dark';
  onNavigateToArticles: () => void;
  onSelectPart: (part: Part) => void;
  setCurrentPage: (page: any) => void;
}

export default function ConstitutionView({ theme, onNavigateToArticles, onSelectPart, setCurrentPage }: ConstitutionViewProps) {
  const preamble = getPreamble();
  const parts = getParts();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-12"
    >
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className={`text-5xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          The Constitution of India
        </h2>
        <p className={`${theme === 'dark' ? 'text-indigo-200/60' : 'text-slate-600'}`}>
          The supreme law of India laying down the framework defining fundamental political code, structure, and duties.
        </p>
        <button 
          onClick={onNavigateToArticles}
          className="mt-4 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg flex items-center gap-2 mx-auto"
        >
          <BookOpen size={18} /> View All Articles
        </button>
      </div>

      {/* Preamble Section */}
      <section className={`p-8 sm:p-12 rounded-3xl border relative overflow-hidden ${
        theme === 'dark' ? 'bg-indigo-950/20 border-indigo-500/20' : 'bg-indigo-50 border-indigo-100'
      }`}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] -mr-32 -mt-32" />
        <h3 className={`text-2xl font-black mb-6 text-indigo-500 flex items-center gap-2`}>
          <ShieldCheck /> PREAMBLE
        </h3>
        <p className={`text-lg sm:text-xl font-medium leading-relaxed tracking-wide text-pretty italic ${
          theme === 'dark' ? 'text-indigo-100/90' : 'text-slate-800'
        }`}>
          "{preamble}"
        </p>
      </section>

      {/* Parts Section */}
      <div className="space-y-6">
        <h3 className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          Parts of the Constitution
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {parts.map((p, index) => (
            <motion.div
              key={p.part_number}
              whileHover={{ scale: 1.02 }}
              className={`p-6 rounded-3xl border cursor-pointer transition-all group ${
                theme === 'dark' 
                  ? 'bg-white/5 border-white/10 hover:border-indigo-500/50 hover:bg-white/10' 
                  : 'bg-white border-slate-200 hover:border-indigo-500 shadow-sm'
              }`}
              onClick={() => {
                 onSelectPart(p);
                 // We don't have part-specific page in instructions, just show articles or navigate to articles page pre-filtered
              }}
            >
              <span className="text-xs font-bold text-indigo-400 tracking-wider uppercase">{p.part_number}</span>
              <h4 className={`text-xl font-black mt-1 mb-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {p.title}
              </h4>
              <p className={`text-sm ${theme === 'dark' ? 'text-indigo-200/50' : 'text-slate-500'}`}>
                Contains {p.articles.length} Article{p.articles.length !== 1 ? 's' : ''}
              </p>
              <div className="flex items-center gap-1 mt-4 text-xs font-bold text-indigo-400 group-hover:underline">
                 Explore articles <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
