import { createContext, useState } from 'react';

export type UiContextType = {
  isModalOpen: boolean;
  isLoading: boolean;
  openModal: () => void;
  closeModal: () => void;
  setLoading: () => void;
  removeLoading: () => void;
};

export const UiContext = createContext<UiContextType | undefined>(undefined);

export const UiProvider = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const setLoading = () => setIsLoading(true);
  const removeLoading = () => setIsLoading(false);

  return (
    <UiContext.Provider
      value={{
        isModalOpen,
        openModal,
        closeModal,
        isLoading,
        setLoading,
        removeLoading,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};
