import { createContext, useContext, useState } from 'react';

type UiContextType = {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const UiContext = createContext<UiContextType | undefined>(undefined);

export const UiProvider = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <UiContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </UiContext.Provider>
  );
};

export const useUi = (): UiContextType => {
  const context = useContext(UiContext);
  if (!context) {
    throw new Error('useUi must be used within a UiProvider');
  }
  return context;
};
