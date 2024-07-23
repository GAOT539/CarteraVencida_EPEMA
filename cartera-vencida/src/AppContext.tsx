// AppContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define el tipo del contexto
interface AppContextType {
  opcion_Titulo: string;
  setOpcion_Titulo: (value: string) => void;
  selectedRow: any; // Añadir el estado para la fila seleccionada
  setSelectedRow: (row: any) => void; // Añadir el setter para la fila seleccionada
  nuevaData: any;
  setNuevaData: (value: any) => void;
}

// Crea el contexto con un valor predeterminado
const AppContext = createContext<AppContextType | undefined>(undefined);

// Proveedor del contexto
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [opcion_Titulo, setOpcion_Titulo] = useState<string>('');
  const [selectedRow, setSelectedRow] = useState<any>(null); // Estado inicial para la fila seleccionada
  const [nuevaData, setNuevaData] = useState<any>(null);

  return (
    <AppContext.Provider value={{ opcion_Titulo, setOpcion_Titulo, selectedRow, setSelectedRow, nuevaData, setNuevaData  }}>
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
