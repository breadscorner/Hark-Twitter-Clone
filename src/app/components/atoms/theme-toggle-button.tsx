'use client'

import React, { useState, useEffect } from 'react';
import { useTheme } from '../molecules/theme-provider'; 
import Sun from '../atoms/light-mode-icon'; 
import Moon from '../atoms/dark-mode-icon'; 

export default function ThemeToggleButton() {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, toggleTheme } = useTheme(); 

  // Effect to set mounted state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? <Moon /> : <Sun />}
    </button>
  );
}