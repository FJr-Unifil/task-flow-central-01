
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="relative overflow-hidden bg-gradient-to-r from-orange-100 to-blue-100 dark:from-slate-800 dark:to-slate-700 border-2 border-orange-200 dark:border-slate-600 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
    >
      <Sun className={`h-4 w-4 transition-all duration-500 ${isDark ? 'rotate-90 scale-0' : 'rotate-0 scale-100'} text-orange-500`} />
      <Moon className={`absolute h-4 w-4 transition-all duration-500 ${isDark ? 'rotate-0 scale-100' : '-rotate-90 scale-0'} text-blue-400`} />
    </Button>
  );
};

export default ThemeToggle;
