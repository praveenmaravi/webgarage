// src/constants/themes.ts

export const lightTheme = {
    background: "#ffffff",  // White background
    text: "#333333",        // Dark text for readability
    primary: "#0070f3",     // Primary color (blue)
    secondary: "#6c6c6c",   // Secondary color (gray)
    accent: "#ff5722",      // Accent color (orange)
    buttonBg: "#0070f3",    // Button background color (primary)
    buttonText: "#ffffff",  // Button text color (white)
    borderRadius: "8px",    // Rounded corners for UI elements
    fontFamily: "'Inter', sans-serif", // Global font family
    fontSize: "16px",       // Default font size
    inputBg: "#f7f7f7",     // Light background for inputs
    inputText: "#333333",   // Text color for inputs
    inputBorder: "#d1d1d1", // Border color for inputs
    cardBg: "#f9f9f9",      // Card background color
    cardBorder: "#e5e5e5",  // Card border color
  };
  
  export const darkTheme = {
    background: "#121212",  // Dark background for dark mode
    text: "#f0f0f0",        // Light text for contrast
    primary: "#00bcd4",     // Primary color (cyan)
    secondary: "#6c6c6c",   // Secondary color (gray)
    accent: "#ff5722",      // Accent color (orange)
    buttonBg: "#00bcd4",    // Button background color (primary)
    buttonText: "#121212",  // Button text color (dark for contrast)
    borderRadius: "8px",    // Rounded corners for UI elements
    fontFamily: "'Inter', sans-serif", // Global font family
    fontSize: "16px",       // Default font size
    inputBg: "#2a2a2a",     // Dark background for inputs
    inputText: "#f0f0f0",   // Light text color for inputs
    inputBorder: "#444444", // Darker border for inputs
    cardBg: "#1e1e1e",      // Dark card background color
    cardBorder: "#333333",  // Darker card border color
  };
  
  // Export the combined themes object for easy access
  export const themes = {
    light: lightTheme,
    dark: darkTheme,
  };
  