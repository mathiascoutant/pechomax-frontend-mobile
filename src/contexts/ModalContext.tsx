import React, { createContext, useContext, useState } from 'react';

interface ModalContextType {
  isModalVisible: boolean;
  toggleModalConversation: () => void;
}

interface ModalCatchContextType {
  isModalCatchVisible: boolean;
  toggleModalCatch: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);
const ModalCatchContext = createContext<ModalCatchContextType | undefined>(undefined);

export const useModalConversation = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalConversation must be used within a ModalProvider');
  }
  return context;
};

export const useModalCatch = (): ModalCatchContextType => {
  const context = useContext(ModalCatchContext);
  if (!context) {
    throw new Error('useModalCatch must be used within a ModalCatchProvider');
  }
  return context;
};

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalCatchVisible, setIsModalCatchVisible] = useState(false);

  const toggleModalConversation = () => {
    setIsModalVisible(!isModalVisible);
  };

  const toggleModalCatch = () => {
    setIsModalCatchVisible(!isModalCatchVisible);
  };

  return (
    <ModalContext.Provider value={{ isModalVisible, toggleModalConversation }}>
      <ModalCatchContext.Provider value={{ isModalCatchVisible, toggleModalCatch }}>
        {children}
      </ModalCatchContext.Provider>
    </ModalContext.Provider>
  );
};
