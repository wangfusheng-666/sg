import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface HealthModeContextType {
  isElderlyMode: boolean;
  toggleElderlyMode: () => void;
  fontSizeMultiplier: number;
}

const HealthModeContext = createContext<HealthModeContextType | undefined>(undefined);

export const HealthModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isElderlyMode, setIsElderlyMode] = useState(false);

  const toggleElderlyMode = () => {
    setIsElderlyMode(prev => !prev);
  };

  const fontSizeMultiplier = isElderlyMode ? 1.25 : 1;

  useEffect(() => {
    if (isElderlyMode) {
      document.documentElement.classList.add('elderly-mode');
    } else {
      document.documentElement.classList.remove('elderly-mode');
    }
  }, [isElderlyMode]);

  return (
    <HealthModeContext.Provider value={{ isElderlyMode, toggleElderlyMode, fontSizeMultiplier }}>
      <div className={isElderlyMode ? 'elderly-mode-container transition-all duration-500' : 'transition-all duration-500'}>
        {children}
      </div>
    </HealthModeContext.Provider>
  );
};

export const useHealthMode = () => {
  const context = useContext(HealthModeContext);
  if (context === undefined) {
    throw new Error('useHealthMode must be used within a HealthModeProvider');
  }
  return context;
};
