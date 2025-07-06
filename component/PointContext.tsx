
import React, { createContext, useContext, useState, ReactNode } from 'react';

type PointContextType = {
  points: number;
  addPoints: (amount: number) => void;
  name: string;
  setName: (newName: string) => void;
};

const PointContext = createContext<PointContextType | null>(null);

export const PointProvider = ({ children }: { children: ReactNode }) => {
  const [points, setPoints] = useState(0);
  const [name, setName] = useState('Guest');

  const addPoints = (amount: number) => {
    setPoints(prev => prev + amount);
  };

  return (
    <PointContext.Provider value={{ points, addPoints, name, setName }}>
      {children}
    </PointContext.Provider>
  );
};

export const usePoints = (): PointContextType => {
  const context = useContext(PointContext);
  if (!context) throw new Error('usePoints must be used inside PointProvider');
  return context;
};
