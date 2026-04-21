import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Scale, 
  MessageSquare, 
  Users, 
  PhoneCall, 
  Globe, 
  ChevronRight, 
  BookOpen, 
  ShieldCheck,
  Info,
  Clapperboard,
  Menu,
  X,
  Search,
  GraduationCap,
  Briefcase,
  Car,
  ShoppingCart,
  Lock,
  Sun,
  Moon
} from 'lucide-react';
import Hero3D from './components/Hero3D';
import ChatBot from './components/ChatBot';
import { laws, Law } from './data/laws';
import './i18n';
import ConstitutionView from './components/ConstitutionView';
import ArticlesView from './components/ArticlesView';
import ArticleDetailView from './components/ArticleDetailView';
import { Article, Part, getAllArticles, getParts, getSchedules, getPreamble } from './data/constitution';

type Page = 'home' | 'laws' | 'chat' | 'lawyers' | 'emergency' | 'law-detail' | 'mission' | 'privacy' | 'terms' | 'constitution' | 'articles' | 'article-detail' | 'visual-constitution';
import VisualConstitutionView from './modules/visual-constitution/pages/VisualConstitutionView';

const NavItem = ({ 
  page, 
  icon, 
  label, 
  currentPage, 
  setCurrentPage, 
  setIsMenuOpen,
  theme
}: { 
  page: Page, 
  icon: React.ReactNode, 
  label: string,
  currentPage: Page,
  setCurrentPage: (p: Page) => void,
  setIsMenuOpen: (o: boolean) => void,
  theme: 'light' | 'dark'
}) => (
  <button
    onClick={() => { setCurrentPage(page); setIsMenuOpen(false); }}
    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
      currentPage === page 
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
        : theme === 'dark' 
          ? 'text-indigo-200 hover:bg-white/10' 
          : 'text-slate-600 hover:bg-slate-200'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

export default function App() {
  const { t, i18n } = useTranslation();
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedLaw, setSelectedLaw] = useState<Law | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(24); // Support manageable pagination chunks
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const categories = useMemo(() => [
    { id: 'constitution', icon: <ShieldCheck />, title: t('constitution'), color: 'from-blue-500 to-indigo-600' },
    { id: 'women', icon: <Users />, title: t('women_rights'), color: 'from-purple-500 to-pink-600' },
    { id: 'consumer', icon: <ShoppingCart />, title: t('consumer'), color: 'from-amber-500 to-orange-600' },
    { id: 'education', icon: <GraduationCap />, title: t('education'), color: 'from-emerald-500 to-teal-600' },
    { id: 'workplace', icon: <Briefcase />, title: t('workplace'), color: 'from-slate-500 to-slate-700' },
    { id: 'traffic', icon: <Car />, title: t('traffic'), color: 'from-red-500 to-rose-600' },
    { id: 'cyber', icon: <Lock />, title: t('cyber'), color: 'from-cyan-500 to-blue-600' },
    { id: 'visual-constitution', icon: <Clapperboard />, title: 'Visual constitution', color: 'from-fuchsia-500 to-purple-600' }
  ], [t]);

  const allFilteredContent = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    const activeLang = i18n.language as 'en' | 'hi' | 'kn' | 'mr';

    const getVal = (field: any) => {
       if (typeof field === 'string') return field;
       if (field && typeof field === 'object') return field[activeLang] || field['en'] || "";
       return "";
    };

    const currentPreamble = typeof getPreamble() === 'string' ? getPreamble() : (getPreamble() as any).en || "";

    const searchableData: any[] = [
       ...laws.map(l => ({ ...l, type: 'law' })),
       ...getParts().map(p => ({ ...p, type: 'part' })),
       ...getAllArticles().map(a => ({ ...a, type: 'article', isArticle: true })),
       ...getSchedules().map(s => ({ ...s, type: 'schedule' })),
       { 
          type: 'preamble', 
          title: { en: "Preamble", hi: "प्रस्तावना", kn: "ಪೀಠಿಕೆ", mr: "प्रस्तावना" }, 
          text: currentPreamble 
       }
    ];

    if (!query) return searchableData;

    return searchableData.filter(item => {
        const titleText = getVal(item.title) || "";
        let descText = "";

        if (item.type === 'law') {
           descText = item.content && item.content[activeLang] ? getVal(item.content[activeLang].about) : "";
        } else if (item.type === 'article') {
           descText = getVal(item.simple_explanation);
        } else if (item.type === 'schedule') {
           descText = getVal(item.content);
        } else if (item.type === 'preamble') {
           descText = item.text || "";
        }

        const matchesTitle = titleText.toLowerCase().includes(query);
        const matchesDesc = descText.toLowerCase().includes(query);
        const matchesNumber = (item.article_number && item.article_number.toString().toLowerCase().includes(query)) ||
                             (item.article_number && `article ${item.article_number}`.toLowerCase().includes(query)) ||
                             (item.part_number && item.part_number.toString().toLowerCase().includes(query)) ||
                             (item.schedule_number && item.schedule_number.toString().toLowerCase().includes(query));

        return matchesTitle || matchesDesc || matchesNumber;
    });
  }, [searchQuery, i18n.language]);

  const lawyers = useMemo(() => [
    { name: "Adv. Rajesh Kumar", spec: "Criminal Law", city: "New Delhi", exp: "15+ Years" },
    { name: "Adv. Priya Sharma", spec: "Women's Rights", city: "Mumbai", exp: "10+ Years" },
    { name: "Adv. Suresh Hegde", spec: "Civil Law", city: "Bengaluru", exp: "20+ Years" },
    { name: "Adv. Ananya Das", spec: "Cyber Law", city: "Kolkata", exp: "8+ Years" },
  ], []);

  const helplines = useMemo(() => [
    { name: "National Emergency", number: "112", desc: "All-in-one emergency number" },
    { name: "Women Helpline", number: "1091", desc: "Safety and support for women" },
    { name: "Cyber Crime", number: "1930", desc: "Reporting financial cyber fraud" },
    { name: "Child Helpline", number: "1098", desc: "Support for children in distress" },
  ], []);

  const currentLang = i18n.language as 'en' | 'hi' | 'kn' | 'mr';

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans selection:bg-indigo-500/30 ${
      theme === 'dark' ? 'bg-[#050510] text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] blur-[120px] rounded-full transition-colors duration-700 ${
          theme === 'dark' ? 'bg-indigo-600/20' : 'bg-indigo-400/10'
        }`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] blur-[120px] rounded-full transition-colors duration-700 ${
          theme === 'dark' ? 'bg-purple-600/10' : 'bg-purple-400/5'
        }`} />
      </div>

      {/* Navigation */}
      <nav className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
        theme === 'dark' ? 'bg-black/20 border-white/10' : 'bg-white/70 border-slate-200'
      } px-4 sm:px-6 py-3 sm:py-4`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/40">
              <Scale className="text-white" size={20} />
            </div>
            <h1 className={`text-xl sm:text-2xl font-black tracking-tighter bg-gradient-to-r bg-clip-text text-transparent ${
              theme === 'dark' ? 'from-white to-indigo-300' : 'from-slate-900 to-indigo-600'
            }`}>
              {t('app_name')}
            </h1>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-2">
            <NavItem page="home" icon={<BookOpen size={18} />} label={t('home')} currentPage={currentPage} setCurrentPage={setCurrentPage} setIsMenuOpen={setIsMenuOpen} theme={theme} />
            <NavItem page="laws" icon={<Search size={18} />} label={t('explore_laws')} currentPage={currentPage} setCurrentPage={setCurrentPage} setIsMenuOpen={setIsMenuOpen} theme={theme} />
            <NavItem page="visual-constitution" icon={<Clapperboard size={18} />} label="Visuals" currentPage={currentPage} setCurrentPage={setCurrentPage} setIsMenuOpen={setIsMenuOpen} theme={theme} />
            <NavItem page="chat" icon={<MessageSquare size={18} />} label={t('chat')} currentPage={currentPage} setCurrentPage={setCurrentPage} setIsMenuOpen={setIsMenuOpen} theme={theme} />
            <NavItem page="lawyers" icon={<Users size={18} />} label={t('lawyers')} currentPage={currentPage} setCurrentPage={setCurrentPage} setIsMenuOpen={setIsMenuOpen} theme={theme} />
            <NavItem page="emergency" icon={<PhoneCall size={18} />} label={t('emergency')} currentPage={currentPage} setCurrentPage={setCurrentPage} setIsMenuOpen={setIsMenuOpen} theme={theme} />
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-xl transition-all ${
                theme === 'dark' ? 'bg-white/5 hover:bg-white/10 text-amber-400' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
              }`}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <select 
              onChange={(e) => changeLanguage(e.target.value)}
              value={i18n.language}
              className={`rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all ${
                theme === 'dark' ? 'bg-white/5 border-white/20 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'
              }`}
            >
              <option value="en" className={theme === 'dark' ? 'bg-slate-900' : 'bg-white'}>English</option>
              <option value="hi" className={theme === 'dark' ? 'bg-slate-900' : 'bg-white'}>हिन्दी</option>
              <option value="kn" className={theme === 'dark' ? 'bg-slate-900' : 'bg-white'}>ಕನ್ನಡ</option>
              <option value="mr" className={theme === 'dark' ? 'bg-slate-900' : 'bg-white'}>मराठी</option>
            </select>
            
            <button className={`lg:hidden p-2 rounded-lg transition-colors ${
              theme === 'dark' ? 'text-white hover:bg-white/10' : 'text-slate-900 hover:bg-slate-200'
            }`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed inset-x-0 top-[73px] z-40 backdrop-blur-xl border-b p-6 lg:hidden flex flex-col gap-4 shadow-2xl ${
              theme === 'dark' ? 'bg-slate-900/95 border-white/10' : 'bg-white/95 border-slate-200'
            }`}
          >
            <NavItem page="home" icon={<BookOpen size={18} />} label={t('home')} currentPage={currentPage} setCurrentPage={setCurrentPage} setIsMenuOpen={setIsMenuOpen} theme={theme} />
            <NavItem page="laws" icon={<Search size={18} />} label={t('explore_laws')} currentPage={currentPage} setCurrentPage={setCurrentPage} setIsMenuOpen={setIsMenuOpen} theme={theme} />
            <NavItem page="chat" icon={<MessageSquare size={18} />} label={t('chat')} currentPage={currentPage} setCurrentPage={setCurrentPage} setIsMenuOpen={setIsMenuOpen} theme={theme} />
            <NavItem page="lawyers" icon={<Users size={18} />} label={t('lawyers')} currentPage={currentPage} setCurrentPage={setCurrentPage} setIsMenuOpen={setIsMenuOpen} theme={theme} />
            <NavItem page="emergency" icon={<PhoneCall size={18} />} label={t('emergency')} currentPage={currentPage} setCurrentPage={setCurrentPage} setIsMenuOpen={setIsMenuOpen} theme={theme} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12 sm:space-y-20"
            >
              <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 sm:gap-12 items-center">
                <div className="space-y-6 sm:space-y-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className={`text-4xl sm:text-6xl md:text-8xl font-black mt-2 sm:mt-6 leading-[0.9] tracking-tighter ${
                      theme === 'dark' ? 'text-white' : 'text-slate-900'
                    }`}>
                      JUSTICE <br />
                      <span className="text-indigo-500">FOR ALL.</span>
                    </h2>
                    <p className={`text-lg sm:text-xl mt-4 sm:mt-6 max-w-lg leading-relaxed ${
                      theme === 'dark' ? 'text-indigo-200/70' : 'text-slate-600'
                    }`}>
                      {t('tagline')}
                    </p>
                  </motion.div>

                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    <button 
                      onClick={() => setCurrentPage('laws')}
                      className="px-6 sm:px-8 py-3 sm:py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-xl shadow-indigo-500/30 transition-all flex items-center gap-2 group"
                    >
                      {t('get_started')}
                      <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button 
                      onClick={() => setCurrentPage('chat')}
                      className={`px-6 sm:px-8 py-3 sm:py-4 border rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all flex items-center gap-2 ${
                        theme === 'dark' ? 'bg-white/5 hover:bg-white/10 border-white/10 text-white' : 'bg-slate-200 hover:bg-slate-300 border-slate-300 text-slate-700'
                      }`}
                    >
                      {t('ai_assistant')}
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <Hero3D theme={theme} />
                </div>
              </div>

              {/* Categories Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((cat, i) => (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i }}
                    whileHover={{ y: -10 }}
                    className={`group relative p-8 rounded-3xl border transition-all cursor-pointer overflow-hidden ${
                      theme === 'dark' ? 'bg-white/5 border-white/10 hover:border-indigo-500/50' : 'bg-white border-slate-200 hover:border-indigo-500 shadow-sm hover:shadow-md'
                    }`}
                    onClick={() => {
                      if (cat.id === 'constitution') {
                        setSelectedPart(null);
                        setCurrentPage('constitution');
                      } else if (cat.id === 'visual-constitution') {
                        setCurrentPage('visual-constitution');
                      } else {
                        setCurrentPage('laws');
                      }
                    }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                    <div className="relative z-10">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${
                        theme === 'dark' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-100 text-indigo-600'
                      }`}>
                        {cat.icon}
                      </div>
                      <h3 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{cat.title}</h3>
                      <p className={`text-sm ${theme === 'dark' ? 'text-indigo-200/50' : 'text-slate-500'}`}>Explore fundamental principles and legal frameworks.</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {currentPage === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-4xl mx-auto"
            >
              <ChatBot theme={theme} />
            </motion.div>
          )}

          {currentPage === 'lawyers' && (
            <motion.div
              key="lawyers"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="text-center max-w-2xl mx-auto">
                <h2 className={`text-4xl font-black mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t('lawyer_directory')}</h2>
                <p className={`${theme === 'dark' ? 'text-indigo-200/60' : 'text-slate-600'}`}>Connect with verified legal professionals across India.</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lawyers.map((l, i) => (
                  <div key={i} className={`p-6 rounded-3xl border transition-all ${
                    theme === 'dark' ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-slate-200 hover:bg-slate-50 shadow-sm'
                  }`}>
                    <div className="flex justify-between items-start mb-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        theme === 'dark' ? 'bg-indigo-600/20 text-indigo-400' : 'bg-indigo-100 text-indigo-600'
                      }`}>
                        <Users size={24} />
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        theme === 'dark' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600'
                      }`}>{l.exp}</span>
                    </div>
                    <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{l.name}</h3>
                    <p className="text-indigo-400 text-sm font-medium mb-4">{l.spec}</p>
                    <div className={`space-y-2 text-sm ${theme === 'dark' ? 'text-indigo-200/60' : 'text-slate-500'}`}>
                      <p className="flex items-center gap-2"><Globe size={14} /> {l.city}</p>
                    </div>
                    <button className={`w-full mt-6 py-3 rounded-xl font-bold transition-all ${
                      theme === 'dark' ? 'bg-white/5 hover:bg-indigo-600 text-white' : 'bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-700'
                    }`}>
                      Contact Lawyer
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {currentPage === 'emergency' && (
            <motion.div
              key="emergency"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto space-y-8"
            >
              <div className="text-center">
                <h2 className={`text-4xl font-black mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t('helplines')}</h2>
                <p className={`${theme === 'dark' ? 'text-indigo-200/60' : 'text-slate-600'}`}>Immediate assistance during legal or safety emergencies.</p>
              </div>
              <div className="grid gap-4">
                {helplines.map((h, i) => (
                  <div key={i} className={`group flex items-center justify-between p-6 rounded-3xl border transition-all ${
                    theme === 'dark' ? 'bg-white/5 border-white/10 hover:border-red-500/50' : 'bg-white border-slate-200 hover:border-red-500 shadow-sm'
                  }`}>
                    <div className="flex items-center gap-6">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform ${
                        theme === 'dark' ? 'bg-red-500/10' : 'bg-red-50'
                      }`}>
                        <PhoneCall size={28} />
                      </div>
                      <div>
                        <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{h.name}</h3>
                        <p className={`text-sm ${theme === 'dark' ? 'text-indigo-200/50' : 'text-slate-500'}`}>{h.desc}</p>
                      </div>
                    </div>
                    <div className="text-3xl font-black text-red-500 tracking-widest">{h.number}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {currentPage === 'laws' && (
            <motion.div
              key="laws"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-12"
            >
              <div className="relative max-w-2xl mx-auto">
                <Search className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} size={20} />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('search_placeholder')}
                  className={`w-full border rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all ${
                    theme === 'dark' ? 'bg-white/5 border-white/20 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {allFilteredContent.slice(0, visibleCount).map((item, index) => {
                  const activeLang = i18n.language as 'en' | 'hi' | 'kn' | 'mr';
                  const getVal = (field: any) => {
                     if (typeof field === 'string') return field;
                     if (field && typeof field === 'object') return field[activeLang] || field['en'] || "";
                     return "";
                  };

                  const titleText = getVal(item.title) || "";
                  let descText = "";
                  let typeLabel = "Information";

                  if (item.type === 'law') {
                      descText = item.content && item.content[activeLang] ? getVal(item.content[activeLang].about) : "";
                      typeLabel = "Law Category";
                  } else if (item.type === 'article') {
                      descText = getVal(item.simple_explanation);
                      typeLabel = `Article ${item.article_number}`;
                  } else if (item.type === 'part') {
                      descText = "Explore chapters and articles of this part index.";
                      typeLabel = item.part_number;
                  } else if (item.type === 'schedule') {
                      descText = getVal(item.content);
                      typeLabel = `Schedule ${item.schedule_number}`;
                  } else if (item.type === 'preamble') {
                      descText = item.text || "";
                      typeLabel = "Preamble";
                  }

                  const handleCardClick = () => {
                     if (item.type === 'law') {
                        setSelectedLaw(item);
                        setCurrentPage('law-detail');
                     } else if (item.type === 'article') {
                        setSelectedArticle(item);
                        setCurrentPage('article-detail');
                     } else if (item.type === 'part') {
                        setSelectedPart(item);
                        setCurrentPage('articles');
                     } else if (item.type === 'preamble') {
                        setCurrentPage('constitution'); // Preamble sits inside Constitution View
                     }
                  };

                  return (
                    <motion.div 
                      key={`${item.type}-${item.id || item.article_number || item.part_number || item.schedule_number || index}`}
                      whileHover={{ scale: 1.02 }}
                      className={`p-6 sm:p-8 rounded-3xl border cursor-pointer group transition-all flex flex-col ${
                        theme === 'dark' ? 'bg-white/5 border-white/10 hover:bg-indigo-600/20 hover:border-indigo-500/50' : 'bg-white border-slate-200 hover:border-indigo-500 shadow-sm hover:shadow-md'
                      }`}
                      onClick={handleCardClick}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          theme === 'dark' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-100 text-indigo-600'
                        }`}>
                          {item.type === 'law' ? <BookOpen /> : <ShieldCheck />}
                        </div>
                        <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase bg-indigo-500/10 px-3 py-1 rounded-full">
                           {typeLabel}
                        </span>
                      </div>
                      <h3 className={`text-2xl font-black mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                         {titleText}
                      </h3>
                      <p className={`mb-6 line-clamp-3 ${theme === 'dark' ? 'text-indigo-200/50' : 'text-slate-500'}`}>
                         {descText}
                      </p>
                      <div className="flex items-center gap-2 text-indigo-400 font-bold mt-auto">
                        {t('get_started')} <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {allFilteredContent.length > visibleCount && (
                <div className="text-center mt-8">
                  <button 
                    onClick={() => setVisibleCount(prev => prev + 24)}
                    className={`px-6 py-3 rounded-xl font-bold border transition-all text-sm ${
                        theme === 'dark' ? 'bg-white/5 border-white/10 hover:bg-indigo-600/20 text-indigo-400' : 'bg-white border-slate-200 hover:shadow-sm hover:border-indigo-400 text-indigo-600'
                    }`}
                  >
                    Load More Results (+24)
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {currentPage === 'law-detail' && selectedLaw && (
            <motion.div
              key="law-detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-4xl mx-auto space-y-12"
            >
              <button 
                onClick={() => setCurrentPage('laws')}
                className="flex items-center gap-2 text-indigo-400 font-bold hover:text-indigo-300 transition-colors"
              >
                <ChevronRight size={18} className="rotate-180" /> {t('back_to_laws')}
              </button>

              <div className="space-y-8">
                <div className={`p-6 sm:p-10 rounded-3xl sm:rounded-[40px] border relative overflow-hidden ${
                  theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-xl'
                }`}>
                  <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-indigo-600/10 blur-[60px] sm:blur-[80px] -mr-24 -mt-24 sm:-mr-32 sm:-mt-32" />
                  <h2 className={`text-3xl sm:text-5xl font-black mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{selectedLaw.title[currentLang]}</h2>
                  <p className="text-indigo-400 font-bold tracking-widest uppercase text-xs sm:text-sm">{selectedLaw.content[currentLang].reference}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <div className="space-y-6">
                    <section className={`p-6 sm:p-8 rounded-3xl border ${
                      theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'
                    }`}>
                      <h4 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2 text-indigo-400">
                        <Info size={20} /> {t('what_is_about')}
                      </h4>
                      <p className={`leading-relaxed text-sm sm:text-base ${theme === 'dark' ? 'text-indigo-200/70' : 'text-slate-600'}`}>
                        {selectedLaw.content[currentLang].about}
                      </p>
                    </section>

                    <section className={`p-6 sm:p-8 rounded-3xl border ${
                      theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'
                    }`}>
                      <h4 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2 text-green-400">
                        <ShieldCheck size={20} /> {t('key_rights')}
                      </h4>
                      <ul className={`space-y-3 text-sm sm:text-base ${theme === 'dark' ? 'text-indigo-200/70' : 'text-slate-600'}`}>
                        {selectedLaw.content[currentLang].rights.map((right, idx) => (
                          <li key={idx} className="flex items-start gap-2">• {right}</li>
                        ))}
                      </ul>
                    </section>
                  </div>

                  <div className="space-y-6">
                    <section className={`p-6 sm:p-8 rounded-3xl border ${
                      theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'
                    }`}>
                      <h4 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2 text-amber-400">
                        <Scale size={20} /> {t('auth_allowed')}
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <p className="text-[10px] sm:text-xs font-bold text-indigo-400 uppercase mb-2">{t('auth_allowed')}</p>
                          <ul className={`space-y-1 text-xs sm:text-sm ${theme === 'dark' ? 'text-indigo-200/70' : 'text-slate-600'}`}>
                            {selectedLaw.content[currentLang].authorities_allowed.map((item, idx) => (
                              <li key={idx}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                        <div className={`pt-4 border-t ${theme === 'dark' ? 'border-white/5' : 'border-slate-100'}`}>
                          <p className="text-[10px] sm:text-xs font-bold text-red-400 uppercase mb-2">{t('auth_not_allowed')}</p>
                          <ul className={`space-y-1 text-xs sm:text-sm ${theme === 'dark' ? 'text-indigo-200/70' : 'text-slate-600'}`}>
                            {selectedLaw.content[currentLang].authorities_not_allowed.map((item, idx) => (
                              <li key={idx}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </section>

                    <section className={`p-6 sm:p-8 rounded-3xl border ${
                      theme === 'dark' ? 'bg-indigo-600/10 border-indigo-500/20' : 'bg-indigo-50 border-indigo-100'
                    }`}>
                      <h4 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2 text-indigo-400">
                        <MessageSquare size={20} /> {t('scenario')}
                      </h4>
                      <div className="space-y-4">
                        <p className={`italic text-xs sm:text-sm leading-relaxed ${theme === 'dark' ? 'text-indigo-200/70' : 'text-slate-600'}`}>
                          "{selectedLaw.content[currentLang].scenario}"
                        </p>
                        <p className="text-xs sm:text-sm text-indigo-400 font-medium">
                          {selectedLaw.content[currentLang].explanation}
                        </p>
                      </div>
                    </section>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <div className={`p-6 sm:p-8 rounded-3xl border ${
                    theme === 'dark' ? 'bg-green-500/5 border-green-500/20' : 'bg-green-50 border-green-100'
                  }`}>
                    <h4 className="text-lg sm:text-xl font-bold mb-4 text-green-400">{t('what_to_do')}</h4>
                    <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-indigo-200/70' : 'text-slate-600'}`}>{selectedLaw.content[currentLang].todo}</p>
                  </div>
                  <div className={`p-8 rounded-3xl border ${
                    theme === 'dark' ? 'bg-red-500/5 border-red-500/20' : 'bg-red-50 border-red-100'
                  }`}>
                    <h4 className="text-lg sm:text-xl font-bold mb-4 text-red-400">{t('what_not_to_do')}</h4>
                    <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-indigo-200/70' : 'text-slate-600'}`}>{selectedLaw.content[currentLang].not_todo}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentPage === 'visual-constitution' && (
            <VisualConstitutionView 
              theme={theme} 
              onNavigate={(article) => {
                 setSelectedArticle(article);
                 setCurrentPage('article-detail');
              }}
            />
          )}

          {currentPage === 'constitution' && (
            <ConstitutionView 
              theme={theme} 
              onNavigateToArticles={() => { setSelectedPart(null); setCurrentPage('articles'); }} 
              onSelectPart={(part) => { setSelectedPart(part); setCurrentPage('articles'); }}
              setCurrentPage={setCurrentPage}
            />
          )}

          {currentPage === 'articles' && (
            <ArticlesView 
              theme={theme} 
              onSelectArticle={(article) => { setSelectedArticle(article); setCurrentPage('article-detail'); }}
              selectedPart={selectedPart}
            />
          )}

          {currentPage === 'article-detail' && selectedArticle && (
            <ArticleDetailView 
              theme={theme} 
              article={selectedArticle} 
              onBack={() => setCurrentPage('articles')} 
            />
          )}

          {currentPage === 'mission' && (
            <motion.div
              key="mission"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto space-y-8"
            >
              <h2 className={`text-4xl font-black text-center ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t('mission')}</h2>
              <div className={`p-8 rounded-3xl border leading-relaxed text-lg ${
                theme === 'dark' ? 'bg-white/5 border-white/10 text-indigo-200/80' : 'bg-white border-slate-200 text-slate-600 shadow-sm'
              }`}>
                {t('mission_desc')}
              </div>
              <button onClick={() => setCurrentPage('home')} className="mx-auto block text-indigo-400 font-bold hover:underline">
                {t('back_to_laws')}
              </button>
            </motion.div>
          )}

          {currentPage === 'privacy' && (
            <motion.div
              key="privacy"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto space-y-8"
            >
              <h2 className={`text-4xl font-black text-center ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t('privacy')}</h2>
              <div className={`p-8 rounded-3xl border leading-relaxed ${
                theme === 'dark' ? 'bg-white/5 border-white/10 text-indigo-200/80' : 'bg-white border-slate-200 text-slate-600 shadow-sm'
              }`}>
                {t('privacy_desc')}
              </div>
              <button onClick={() => setCurrentPage('home')} className="mx-auto block text-indigo-400 font-bold hover:underline">
                {t('back_to_laws')}
              </button>
            </motion.div>
          )}

          {currentPage === 'terms' && (
            <motion.div
              key="terms"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto space-y-8"
            >
              <h2 className={`text-4xl font-black text-center ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t('terms')}</h2>
              <div className={`p-8 rounded-3xl border leading-relaxed ${
                theme === 'dark' ? 'bg-white/5 border-white/10 text-indigo-200/80' : 'bg-white border-slate-200 text-slate-600 shadow-sm'
              }`}>
                {t('terms_desc')}
              </div>
              <button onClick={() => setCurrentPage('home')} className="mx-auto block text-indigo-400 font-bold hover:underline">
                {t('back_to_laws')}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className={`mt-20 border-t py-8 sm:py-12 px-4 sm:px-6 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-black/40 border-white/10' : 'bg-slate-100 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Scale className="text-indigo-500" />
              <h3 className={`text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t('app_name')}</h3>
            </div>
            <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-indigo-200/50' : 'text-slate-500'}`}>
              {t('app_desc')}
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t('about')}</h4>
            <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-indigo-200/50' : 'text-slate-500'}`}>
              <li onClick={() => setCurrentPage('mission')} className="hover:text-indigo-400 cursor-pointer transition-colors">{t('mission')}</li>
              <li onClick={() => setCurrentPage('privacy')} className="hover:text-indigo-400 cursor-pointer transition-colors">{t('privacy')}</li>
              <li onClick={() => setCurrentPage('terms')} className="hover:text-indigo-400 cursor-pointer transition-colors">{t('terms')}</li>
            </ul>
          </div>

          <div className={`p-6 rounded-2xl border space-y-3 ${
            theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <h4 className={`font-bold flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              <ShieldCheck size={18} className="text-indigo-400" /> {t('disclaimer_title')}
            </h4>
            <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-indigo-200/50' : 'text-slate-500'}`}>
              {t('disclaimer_text')}
            </p>
          </div>
        </div>
        <div className={`max-w-7xl mx-auto mt-12 pt-8 border-t text-center text-xs ${
          theme === 'dark' ? 'border-white/5 text-indigo-200/30' : 'border-slate-200 text-slate-400'
        }`}>
          © 2026 LawForAll • Built with ❤️ for Civic Education
        </div>
      </footer>
    </div>
  );
}
