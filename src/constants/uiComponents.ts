// src/constants/uiComponents.ts

// Button Sizes for consistency
export const buttonSizes = {
    small: "px-4 py-2 text-sm",  // Small buttons
    medium: "px-6 py-3 text-md", // Medium buttons (default)
    large: "px-8 py-4 text-lg",   // Large buttons
  };
  
  // Default button styles
  export const buttonStyles = {
    primary: "bg-primary text-white border border-transparent rounded-lg hover:bg-primary-dark active:bg-primary-dark focus:ring-2 focus:ring-primary-light focus:ring-opacity-50",
    secondary: "bg-secondary text-white border border-transparent rounded-lg hover:bg-secondary-dark active:bg-secondary-dark focus:ring-2 focus:ring-secondary-light focus:ring-opacity-50",
    outline: "bg-transparent text-primary border border-primary rounded-lg hover:bg-primary-light active:bg-primary focus:ring-2 focus:ring-primary-light focus:ring-opacity-50",
    danger: "bg-danger text-white border border-transparent rounded-lg hover:bg-danger-dark active:bg-danger-dark focus:ring-2 focus:ring-danger-light focus:ring-opacity-50",
  };
  
  // Card Layout Styles (for container components)
  export const cardStyles = {
    default: "bg-white shadow-lg rounded-lg p-6",
    hover: "bg-gray-100 shadow-xl transition-all duration-300",
    outlined: "border border-gray-300 rounded-lg p-4 bg-white",
    fullWidth: "w-full bg-white shadow-lg rounded-lg p-6",
  };
  
  // Common text styles (titles, paragraphs, and captions)
  export const textStyles = {
    title: "font-semibold text-2xl text-primary mb-4",
    subtitle: "font-medium text-xl text-secondary mb-3",
    body: "text-base text-gray-800 mb-3",
    caption: "text-sm text-gray-600",
    bold: "font-bold",
    italic: "italic",
  };
  
  // Grid Layout for responsive design
  export const gridLayout = {
    default: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", // 1 column on mobile, 2 on medium, 3 on large
    large: "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8", // For larger sections
    list: "grid grid-cols-1 gap-4", // For lists
  };
  
  // Container Styles (for flexible layout)
  export const containerStyles = {
    default: "max-w-7xl mx-auto p-6",
    fullWidth: "w-full px-4",
  };
  
  // Input Fields (form components)
  export const inputStyles = {
    default: "px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light",
    error: "px-4 py-2 border border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300",
    disabled: "px-4 py-2 border border-gray-300 rounded-lg opacity-50 cursor-not-allowed",
  };
  
  // Modal Styles (for popups and overlays)
  export const modalStyles = {
    default: "bg-white shadow-xl rounded-lg p-8 max-w-lg mx-auto",
    overlay: "fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50",
    closeButton: "absolute top-2 right-2 text-xl text-gray-500 hover:text-gray-700 cursor-pointer",
  };
  
  // Table Styles (for displaying data in tabular format)
  export const tableStyles = {
    container: "overflow-x-auto shadow-lg rounded-lg",
    table: "min-w-full bg-white table-auto",
    th: "text-left px-4 py-2 bg-gray-100 font-semibold text-sm text-gray-700",
    td: "text-left px-4 py-2 text-sm text-gray-800",
    stripedRow: "bg-gray-50 hover:bg-gray-100",
  };
  
  // Dropdown Styles (select menus)
  export const dropdownStyles = {
    default: "px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light",
    hover: "hover:bg-gray-100",
    disabled: "opacity-50 cursor-not-allowed",
  };
  
  // Notification Styles (for alerting users)
  export const notificationStyles = {
    success: "bg-green-500 text-white p-4 rounded-lg",
    error: "bg-red-500 text-white p-4 rounded-lg",
    info: "bg-blue-500 text-white p-4 rounded-lg",
    warning: "bg-yellow-500 text-white p-4 rounded-lg",
  };
  
  // Avatar Styles (for profile images)
  export const avatarStyles = {
    small: "w-8 h-8 rounded-full object-cover",
    medium: "w-12 h-12 rounded-full object-cover",
    large: "w-16 h-16 rounded-full object-cover",
  };
  
  // Tooltip Styles
  export const tooltipStyles = {
    default: "bg-black text-white p-2 rounded-md text-xs",
    top: "absolute bottom-full left-1/2 transform -translate-x-1/2",
    right: "absolute left-full top-1/2 transform -translate-y-1/2",
  };
  
  // Spinner Styles (for loading indicators)
  export const spinnerStyles = {
    default: "w-8 h-8 border-t-2 border-primary border-solid rounded-full animate-spin",
  };
  
  // Badge Styles
  export const badgeStyles = {
    default: "inline-block bg-primary text-white text-xs py-1 px-3 rounded-full",
    success: "inline-block bg-green-500 text-white text-xs py-1 px-3 rounded-full",
    error: "inline-block bg-red-500 text-white text-xs py-1 px-3 rounded-full",
  };
  
  // Flexbox Layout (useful for spacing elements)
  export const flexLayout = {
    center: "flex justify-center items-center",
    between: "flex justify-between items-center",
    around: "flex justify-around items-center",
    column: "flex flex-col items-center",
  };
  