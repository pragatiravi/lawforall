import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, ShieldCheck, Scale, Info, CheckCircle2, XCircle, BookOpen, BadgeCheck, FileText } from 'lucide-react';
import { Article, isVerifiedArticle } from '../data/constitution';

interface ArticleDetailViewProps {
  theme: 'light' | 'dark';
  article: Article;
  onBack: () => void;
}

export default function ArticleDetailView({ theme, article, onBack }: ArticleDetailViewProps) {
  const isVerified = isVerifiedArticle(article.article_number);

  // Normalize do/dont to always be arrays
  const doList = Array.isArray(article.do) ? article.do : [article.do];
  const dontList = Array.isArray(article.dont) ? article.dont : [article.dont];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-4xl mx-auto space-y-12"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-indigo-400 font-bold hover:text-indigo-300 transition-colors"
      >
        <ChevronRight size={18} className="rotate-180" /> Back to Articles
      </button>

      <div className="space-y-8">
        {/* Header/Title block */}
        <div className={`p-6 sm:p-10 rounded-3xl sm:rounded-[40px] border relative overflow-hidden ${
          theme === 'dark' ? 'bg-indigo-950/20 border-indigo-500/20' : 'bg-indigo-50 border-indigo-100 shadow-md'
        }`}>
          <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-indigo-500/10 blur-[60px] sm:blur-[80px] -mr-12 -mt-12" />
          
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-black text-indigo-500 tracking-widest uppercase">
              ARTICLE {article.article_number}
            </span>
            {isVerified && (
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                theme === 'dark' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
              }`}>
                <BadgeCheck size={12} /> Verified
              </span>
            )}
          </div>
          
          <h2 className={`text-3xl sm:text-5xl font-black mt-2 mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            {article.official_title || article.title}
          </h2>
        </div>

        {/* Official Text Section - shown only if verified data has it */}
        {article.official_text && (
          <section className={`p-6 sm:p-8 rounded-3xl border ${
            theme === 'dark' ? 'bg-amber-500/5 border-amber-500/20' : 'bg-amber-50 border-amber-100 shadow-sm'
          }`}>
            <h4 className={`text-lg sm:text-xl font-bold mb-4 flex items-center gap-2 ${
              theme === 'dark' ? 'text-amber-400' : 'text-amber-700'
            }`}>
              <FileText size={20} /> Official Constitutional Text
            </h4>
            <p className={`leading-relaxed text-sm sm:text-base font-serif italic ${
              theme === 'dark' ? 'text-amber-200/70' : 'text-amber-900/80'
            }`}>
              "{article.official_text}"
            </p>
          </section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="space-y-6">
            {/* Explanation */}
            <section className={`p-6 sm:p-8 rounded-3xl border ${
              theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <h4 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2 text-indigo-400">
                <Info size={20} /> Simple Explanation
              </h4>
              <p className={`leading-relaxed text-sm sm:text-base ${theme === 'dark' ? 'text-indigo-200/70' : 'text-slate-600'}`}>
                {article.simple_explanation}
              </p>
            </section>

            {/* Key Points */}
            <section className={`p-6 sm:p-8 rounded-3xl border ${
              theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <h4 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2 text-green-400">
                <ShieldCheck size={20} /> Key Points
              </h4>
              <ul className={`space-y-3 text-sm sm:text-base ${theme === 'dark' ? 'text-indigo-200/70' : 'text-slate-600'}`}>
                {article.key_points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">• {point}</li>
                ))}
              </ul>
            </section>
          </div>

          <div className="space-y-6">
             {/* Example */}
             <section className={`p-6 sm:p-8 rounded-3xl border ${
                theme === 'dark' ? 'bg-indigo-600/10 border-indigo-500/20' : 'bg-indigo-50 border-indigo-100'
             }`}>
                <h4 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2 text-indigo-400">
                   <Scale size={20} /> Real-World Example
                </h4>
                <div className="space-y-4">
                  <p className={`italic text-xs sm:text-sm leading-relaxed ${theme === 'dark' ? 'text-indigo-200/70' : 'text-slate-600'}`}>
                     "{article.example}"
                  </p>
                </div>
             </section>

             {/* Do / Don't as lists */}
             <div className="grid grid-cols-1 gap-6">
               <div className={`p-6 sm:p-8 rounded-3xl border ${
                 theme === 'dark' ? 'bg-green-500/5 border-green-500/20' : 'bg-green-50 border-green-100'
               }`}>
                 <h4 className="text-lg sm:text-xl font-bold mb-4 text-green-400 flex items-center gap-2"><CheckCircle2 size={18} /> What to Do</h4>
                 <ul className={`space-y-2 text-xs sm:text-sm ${theme === 'dark' ? 'text-indigo-200/70' : 'text-slate-600'}`}>
                   {doList.map((item, idx) => (
                     <li key={idx} className="flex items-start gap-2">
                       <CheckCircle2 size={14} className="text-green-400 shrink-0 mt-0.5" />
                       {item}
                     </li>
                   ))}
                 </ul>
               </div>
               <div className={`p-6 sm:p-8 rounded-3xl border ${
                 theme === 'dark' ? 'bg-red-500/5 border-red-500/20' : 'bg-red-50 border-red-100'
               }`}>
                 <h4 className="text-lg sm:text-xl font-bold mb-4 text-red-500 flex items-center gap-2"><XCircle size={18} /> What Not to Do</h4>
                 <ul className={`space-y-2 text-xs sm:text-sm ${theme === 'dark' ? 'text-indigo-200/70' : 'text-slate-600'}`}>
                   {dontList.map((item, idx) => (
                     <li key={idx} className="flex items-start gap-2">
                       <XCircle size={14} className="text-red-400 shrink-0 mt-0.5" />
                       {item}
                     </li>
                   ))}
                 </ul>
               </div>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
