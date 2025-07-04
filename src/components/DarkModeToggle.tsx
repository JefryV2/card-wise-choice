
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { IoSunnyOutline, IoMoonOutline } from 'react-icons/io5';

export const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if user has a preference stored
    const stored = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldBeDark = stored ? stored === 'true' : prefersDark;
    setIsDark(shouldBeDark);
    
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleDarkMode}
      className="flex items-center space-x-2"
    >
      {isDark ? (
        <>
          <IoSunnyOutline className="w-4 h-4" />
          <span className="text-sm">Light Mode</span>
        </>
      ) : (
        <>
          <IoMoonOutline className="w-4 h-4" />
          <span className="text-sm">Dark Mode</span>
        </>
      )}
    </Button>
  );
};
