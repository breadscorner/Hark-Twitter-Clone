// 'use client'

// import { createContext, useContext, useState, ReactNode } from 'react';

// type Theme = 'light' | 'dark';

// interface ThemeContextProps {
//   theme: Theme;
//   toggleTheme: () => void;
// }

// const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// interface ThemeProviderProps {
//   children: ReactNode;
// }

// export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
//   const [theme, setTheme] = useState<Theme>('light');

//   const toggleTheme = () => {
//     if (theme === 'light') {
//       setTheme('dark');
//       window.localStorage.setItem('theme', 'dark');
//       document.documentElement.classList.add('dark');
//     } else {
//       setTheme('light');
//       window.localStorage.setItem('theme', 'light');
//       document.documentElement.classList.remove('dark');
//     }
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = (): ThemeContextProps => {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     throw new Error('useTheme must be used within a ThemeProvider');
//   }
//   return context;
// };
