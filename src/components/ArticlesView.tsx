import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ShieldCheck, Search, Clock, X } from 'lucide-react';
import { getAllArticles, Article, isVerifiedArticle } from '../data/constitution';
import { useTranslation } from 'react-i18next';

interface ArticlesViewProps {
  theme: 'light' | 'dark';
  onSelectArticle: (article: Article) => void;
  selectedPart?: { part_number: string, title: any, articles: Article[] } | null;
}

export default function ArticlesView({ theme, onSelectArticle, selectedPart }: ArticlesViewProps) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language as 'en' | 'hi' | 'kn' | 'mr';

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const articles = selectedPart ? selectedPart.articles : getAllArticles();

  const getTranslatedValue = (field: any) => {
    if (typeof field === 'string') return field;
    if (field && typeof field === 'object') {
       return field[currentLang] || field['en'] || "";
    }
    return "";
  };

  useEffect(() => {
    const saved = localStorage.getItem('recent_constitutional_searches');
    if (saved) setRecentSearches(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (searchQuery !== debouncedQuery) {
       setIsSearching(true);
    }
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setIsSearching(false);
      // Save to recent searches if search exists
      if (searchQuery.trim().length > 2) {
         setRecentSearches(prev => {
            const up = [searchQuery.trim(), ...prev.filter(p => p !== searchQuery.trim())].slice(0, 5);
            localStorage.setItem('recent_constitutional_searches', JSON.stringify(up));
            return up;
         });
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  const filteredArticles = articles.filter((a) => {
    const query = debouncedQuery.toLowerCase().trim();
    if (!query) return true;

    const titleText = getTranslatedValue(a.title);
    const explanationText = getTranslatedValue(a.simple_explanation);

    const matchesNumber = a.article_number.toString().toLowerCase().includes(query) || 
                         `article ${a.article_number}`.toLowerCase().includes(query);
    const matchesTitle = titleText.toLowerCase().includes(query);
    const matchesExplanation = explanationText.toLowerCase().includes(query);

    return matchesNumber || matchesTitle || matchesExplanation;
  });

  const highlightText = (text: string, query: string) => {
     if (!query.trim()) return <span>{text}</span>;
     const regex = new RegExp(`(${query.trim()})`, 'gi');
     const parts = text.split(regex);
     return (
        <span>
           {parts.map((p, i) => 
              p.toLowerCase() === query.trim().toLowerCase() 
                 ? <mark key={i} className="bg-amber-500/30 text-amber-100 rounded px-0.5">{p}</mark> 
                 : p
           )}
        </span>
     );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-12"
    >
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className={`text-4xl sm:text-5xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          {selectedPart ? getTranslatedValue(selectedPart.title) : "Articles of the Constitution"}
        </h2>
        <p className={`${theme === 'dark' ? 'text-indigo-200/60' : 'text-slate-600'}`}>
          {selectedPart ? `Explore the list of articles included inside ${selectedPart.part_number}.` : "Displaying the full list of indexable articles explaining detailed setups."}
        </p>
      </div>

      {/* Search Bar Section with live debounce and recent searches */}
      <div className="space-y-4 max-w-2xl mx-auto">
         <div className="relative flex gap-3">
           <div className="relative flex-1">
             <Search className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} size={20} />
             <input 
               type="text" 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               placeholder="Search by Article number or keyword..."
               className={`w-full border rounded-2xl py-4 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all ${
                 theme === 'dark' ? 'bg-white/5 border-white/20 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
               }`}
             />
             {isSearching && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                   <div className="w-5 h-5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
                </div>
             )}
           </div>

           <select 
              onChange={(e) => {
                 const art = articles.find(a => a.article_number === e.target.value);
                 if (art) onSelectArticle(art);
              }}
              value=""
              className={`rounded-2xl px-4 py-4 text-sm font-bold border focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all cursor-pointer ${
                 theme === 'dark' ? 'bg-white/5 border-white/20 text-indigo-300' : 'bg-white border-slate-200 text-slate-700 shadow-sm'
              }`}
           >
              <option value="" disabled className={theme === 'dark' ? 'bg-slate-900 text-slate-400' : 'bg-white text-slate-400'}>Jump to...</option>
              {articles.map((a) => (
                 <option key={a.article_number} value={a.article_number} className={theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>
                    Article {a.article_number}
                 </option>
              ))}
           </select>
         </div>

         {recentSearches.length > 0 && !searchQuery && (
            <motion.div 
               initial={{ opacity: 0, y: -5 }} 
               animate={{ opacity: 1, y: 0 }}
               className="flex flex-wrap items-center gap-2 text-sm"
            >
               <span className={`${theme === 'dark' ? 'text-indigo-200/50' : 'text-slate-500'} flex items-center gap-1`}><Clock size={14} /> Recent:</span>
               {recentSearches.map((r, idx) => (
                  <div key={idx} className="flex items-center gap-1">
                     <button 
                        onClick={() => setSearchQuery(r)}
                        className={`px-3 py-1 rounded-full transition-all border ${
                           theme === 'dark' ? 'bg-white/5 border-white/10 hover:bg-white/10 text-indigo-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                     >
                        {r}
                     </button>
                  </div>
               ))}
            </motion.div>
         )}
      </div>

      {/* Articles Grid list with gorgeous icons mapping */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((a, index) => {
           const titleText = getTranslatedValue(a.title);
           const explanationText = getTranslatedValue(a.simple_explanation);
           
           return (
             <motion.div
               key={a.article_number}
               whileHover={{ scale: 1.02, y: -5 }}
               className={`p-6 rounded-3xl border cursor-pointer group transition-all relative overflow-hidden flex flex-col ${
                 theme === 'dark' 
                   ? 'bg-white/5 border-white/10 hover:border-indigo-500/50 hover:bg-white/10' 
                   : 'bg-white border-slate-200 hover:border-indigo-500 shadow-sm'
               }`}
               onClick={() => onSelectArticle(a)}
             >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${
                   theme === 'dark' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-100 text-indigo-600'
                }`}>
                   <ShieldCheck />
                </div>
                                <div className="flex items-center gap-2">
                   <span className="text-xs font-bold text-indigo-400 tracking-wider uppercase">Article {a.article_number}</span>
                   {isVerifiedArticle(a.article_number) && (
                     <span className={`text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded-full ${
                       theme === 'dark' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
                     }`}>✓ Verified</span>
                   )}
                 </div>
                <h4 className={`text-xl font-black mt-1 mb-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                   {highlightText(titleText, debouncedQuery)}
                </h4>
                <p className={`text-sm mb-6 line-clamp-3 ${theme === 'dark' ? 'text-indigo-200/50' : 'text-slate-500'}`}>
                   {highlightText(explanationText, debouncedQuery)}
                </p>
                
                <div className="flex items-center gap-1 mt-auto pt-4 text-xs font-bold text-indigo-400 group-hover:underline">
                   Read detail <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
             </motion.div>
           );
        })}
      </div>

      {filteredArticles.length === 0 && (
         <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           className="text-center py-20"
         >
           <p className={`text-lg font-medium ${theme === 'dark' ? 'text-indigo-200/50' : 'text-slate-500'}`}>
             No articles found matching "{debouncedQuery}"
           </p>
         </motion.div>
      )}
    </motion.div>
  );
}
