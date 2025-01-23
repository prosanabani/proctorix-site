export const test = () => {
  return 'test';
};

// Function to get the initial theme from localStorage
export const getInitialTheme = (): 'light' | 'dark' | 'system' => {
  const storedTheme = localStorage.getItem('theme') as
    | 'light'
    | 'dark'
    | 'system'
    | null;
  return storedTheme ? storedTheme : 'light'; // Default to 'light' if no theme is stored
};
