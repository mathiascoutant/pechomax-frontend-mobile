import React, { createContext, useContext, useState } from 'react';

interface ModalContextType {
  isModalVisible: boolean;
  toggleModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <ModalContext.Provider value={{ isModalVisible, toggleModal }}>
      {children}
    </ModalContext.Provider>
  );
};
