import { FileText, Sparkles, Globe } from 'lucide-react';
import { translations, type Language } from '../utils/translations';

interface HeaderProps {
  currentLang: Language;
  setLanguage: (lang: Language) => void;
}

export const Header = ({ currentLang, setLanguage }: HeaderProps) => {
  const t = translations[currentLang].header;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
            <div className="p-1.5 md:p-2 bg-indigo-600 rounded-lg">
              <FileText className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <span className="text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 truncate max-w-[150px] md:max-w-none">
              {t.title}
            </span>
          </div>
          <nav className="flex items-center gap-2 md:gap-4">
             <button
              onClick={() => setLanguage(currentLang === 'en' ? 'id' : 'en')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              {currentLang.toUpperCase()}
            </button>
            <a 
              href="https://github.com/raflisetiawan/Cover-Letter-Maker" 
              target="_blank" 
              rel="noreferrer"
              className="hidden md:block text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
            >
              {t.github}
            </a>
            <button className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-full transition-all hover:shadow-lg hover:shadow-indigo-500/30">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
              {t.getStarted}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
