import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

// Defining types for the ThemeContext
interface ThemeContextProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  setTheme: (theme: boolean) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// Provider component that holds the logic for theme state
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Load theme preference from local storage on component mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newTheme = !prev;
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      return newTheme;
    });
  };

  // Set a specific theme (used for external overrides like default theme settings)
  const setTheme = (theme: boolean) => {
    setIsDarkMode(theme);
    localStorage.setItem("theme", theme ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the ThemeContext
export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
