// AppContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define el tipo del contexto
interface AppContextType {
  opcion_Titulo: string;
  setOpcion_Titulo: (value: string) => void;
}

// Crea el contexto con un valor predeterminado
const AppContext = createContext<AppContextType | undefined>(undefined);

// Proveedor del contexto
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [opcion_Titulo, setOpcion_Titulo] = useState<string>('');

  return (
    <AppContext.Provider value={{ opcion_Titulo, setOpcion_Titulo }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook para usar el contexto en otros componentes
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
