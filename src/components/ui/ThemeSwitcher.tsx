'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Theme = 'cathedral' | 'limestone' | 'neon';

const themes = {
  cathedral: {
    name: 'Cathedral',
    icon: '⛪',
    colors: {
      bg: '#0b0b0e',
      limestone: '#d7d3c8',
      amethyst: '#b88cff',
      ice: '#70e1f5',
      mint: '#8ef5c3',
      gold: '#e6c670',
      surface: '#1a1a1e',
      border: '#2a2a2e',
    },
  },
  limestone: {
    name: 'Limestone',
    icon: '🏛️',
    colors: {
      bg: '#1a1612',
      limestone: '#f5f1e8',
      amethyst: '#d4a8ff',
      ice: '#90f1ff',
      mint: '#aef5d3',
      gold: '#ffd690',
      surface: '#2a2520',
      border: '#3a352e',
    },
  },
  neon: {
    name: 'Neon',
    icon: '🌃',
    colors: {
      bg: '#050510',
      limestone: '#e8e5ff',
      amethyst: '#ff6bff',
      ice: '#00f0ff',
      mint: '#00ff9f',
      gold: '#ffeb3b',
      surface: '#15152a',
      border: '#25253a',
    },
  },
};

export function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState<Theme>('cathedral');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Load theme from localStorage
    const saved = localStorage.getItem('portfolio-theme') as Theme;
    if (saved && themes[saved]) {
      setCurrentTheme(saved);
      applyTheme(saved);
    }
  }, []);

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    const colors = themes[theme].colors;

    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    localStorage.setItem('portfolio-theme', theme);
  };

  const switchTheme = (theme: Theme) => {
    setCurrentTheme(theme);
    applyTheme(theme);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-surface border-2 border-border flex items-center justify-center text-2xl hover:border-amethyst transition-colors duration-300 shadow-lg hover:shadow-amethyst/20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Theme switcher"
      >
        {themes[currentTheme].icon}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 bg-surface/90 backdrop-blur-lg border border-border rounded-2xl p-4 shadow-2xl min-w-[200px]"
          >
            <p className="text-xs text-limestone/60 mb-3 font-medium uppercase tracking-wider">
              Theme
            </p>
            <div className="space-y-2">
              {(Object.keys(themes) as Theme[]).map((theme) => (
                <motion.button
                  key={theme}
                  onClick={() => switchTheme(theme)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                    currentTheme === theme
                      ? 'bg-amethyst/20 border border-amethyst/50'
                      : 'hover:bg-surface'
                  }`}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-xl">{themes[theme].icon}</span>
                  <span
                    className={`text-sm ${
                      currentTheme === theme
                        ? 'text-limestone font-medium'
                        : 'text-limestone/70'
                    }`}
                  >
                    {themes[theme].name}
                  </span>
                  {currentTheme === theme && (
                    <motion.div
                      layoutId="activeTheme"
                      className="ml-auto w-2 h-2 bg-amethyst rounded-full"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
