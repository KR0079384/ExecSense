import { useTheme } from '../contexts/ThemeContext';

interface NavbarProps {
  language?: string;
}

export function Navbar({ language }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();

  const getLanguageDisplay = () => {
    if (!language || language === 'unknown') return 'Auto';
    return language.charAt(0).toUpperCase() + language.slice(1);
  };

  return (
    <nav className="w-full glass-nav sticky top-0 z-50">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-6">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#00d4ff] via-[#00b8e6] to-[#00ffff] bg-clip-text text-transparent">
              Universal Code Executor
            </h1>
            <div className="hidden sm:flex items-center space-x-3">
              <span className="text-sm text-gray-500 dark:text-gray-400">Language:</span>
              <span className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#00d4ff]/10 dark:bg-[#00d4ff]/20 text-[#00d4ff] dark:text-[#00ffff] border border-[#00d4ff]/30 dark:border-[#00ffff]/40 neon-glow-cyan">
                {getLanguageDisplay()}
              </span>
            </div>
          </div>
          
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-lg bg-gray-100 dark:bg-[#1a1a1a] hover:bg-gray-200 dark:hover:bg-[#2a2a2a] transition-all duration-300 border border-gray-200 dark:border-[#00d4ff]/20 hover:border-[#00d4ff]/40"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
