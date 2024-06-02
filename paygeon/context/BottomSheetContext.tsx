// context/BottomSheetContext.tsx
import React, { createContext, useState, ReactNode, useContext } from 'react';

type BottomSheetContextType = {
  isVisible: boolean;
  content: ReactNode;
  openSheet: (content: ReactNode) => void;
  closeSheet: () => void;
};

const BottomSheetContext = createContext<BottomSheetContextType | undefined>(undefined);

export const BottomSheetProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);

  const openSheet = (newContent: ReactNode) => {
    setContent(newContent);
    setIsVisible(true);
  };

  const closeSheet = () => {
    setIsVisible(false);
    setContent(null);
  };

  return (
    <BottomSheetContext.Provider value={{ isVisible, content, openSheet, closeSheet }}>
      {children}
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheet = (): BottomSheetContextType => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error('useBottomSheet must be used within a BottomSheetProvider');
  }
  return context;
};
