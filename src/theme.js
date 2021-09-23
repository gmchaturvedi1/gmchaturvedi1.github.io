import { createTheme, CreateMUIStyled } from '@mui/material/styles';
import { createContext, useState } from 'react';
import { theme } from '../data.json';

const lightTheme = createTheme(
 theme && theme.light && Object.keys(theme.light).length > 0
  ? theme.light
  : {
     palette: {
      type: 'light',
     },
    }
);

const darkTheme = createTheme(
 theme && theme.dark && Object.keys(theme.dark).length > 0
  ? theme.dark
  : {
     palette: {
      type: 'dark',
     },
    }
);
const ThemeContext = createContext();
const ThemeProvider = ({ children }) => {
 const [theme, setTheme] = useState(lightTheme);
 //const [theme, setTheme] = useState(typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? darkTheme : lightTheme);
 const toggleTheme = () => {
  setTheme(theme.palette.type === 'dark' ? lightTheme : darkTheme);
 };

 return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export { ThemeProvider, ThemeContext };
