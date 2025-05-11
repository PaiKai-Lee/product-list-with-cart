import { useContext } from 'react';
import { UiContext, UiContextType } from '../stores/uiContext';

export const useUi = (): UiContextType => {
  const context = useContext(UiContext);
  if (!context) {
    throw new Error('useUi must be used within a UiProvider');
  }
  return context;
};
