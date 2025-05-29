'use client';

import { createContext, useContext } from 'react';
import { useStringArtState } from '../hooks/use-string-art-state';

type StringArtContextType = ReturnType<typeof useStringArtState>;

const StringArtContext = createContext<StringArtContextType | null>(null);

export function StringArtProvider({
  children,
  canvasWidth,
  canvasHeight,
}: {
  children: React.ReactNode;
  canvasWidth: number;
  canvasHeight: number;
}) {
  const state = useStringArtState(canvasWidth, canvasHeight);

  return (
    <StringArtContext.Provider value={state}>
      {children}
    </StringArtContext.Provider>
  );
}

export function useStringArtContext() {
  const context = useContext(StringArtContext);
  if (!context) {
    throw new Error(
      'useStringArtContext debe usarse dentro de StringArtProvider',
    );
  }
  return context;
}
