import { useEffect, useMemo, useState } from 'react';
import { css } from 'styled-system/css';
import useRenderMode from './use-render-mode';

type Theme = 'light' | 'dark';

type UseDarkModeType = {
  isDark: boolean;
  toggleTheme: () => void;
  theme: Theme;
  themeIcon: string;
};

export default function useDarkMode(): UseDarkModeType {
  const renderMode = useRenderMode();
  // Check localStorage for theme preference or fallback to system preference
  const [isDark, setIsDark] = useState(() => {
    if (renderMode === 'ssr') {
      return false;
    }
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Effect to apply theme on mount and when isDark changes
  useEffect(() => {
    if (isDark) {
      // document.documentElement.classList.add('dark');
      document.documentElement.setAttribute(
        'class',
        css({ backgroundColor: 'black' })
      );
    } else {
      document.documentElement.setAttribute(
        'class',
        css({ backgroundColor: 'white' })
      );
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = (ev?: any) => {
    console.log(ev);

    setIsDark((prev) => !prev);
  };

  const theme = useMemo(() => (isDark ? 'dark' : 'light'), [isDark]);
  const themeIcon = useMemo(
    () => (isDark ? 'akar-icons:moon' : 'akar-icons:sun'),
    [isDark]
  );

  return { isDark, toggleTheme, theme, themeIcon };
}
