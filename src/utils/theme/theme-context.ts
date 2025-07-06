import { createContext, useContext } from 'react';

interface ThemeContextProps {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  toggleTheme: () => void;
  isDark: boolean;
}

const defaultThemeContextValue: ThemeContextProps = {
  theme: 'light',
  setTheme: () => {},
  toggleTheme: () => {},
  isDark: false,
};

export const ThemeContext = createContext<ThemeContextProps>(defaultThemeContextValue);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  return context;
};
