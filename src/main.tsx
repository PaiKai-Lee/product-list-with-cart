import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { CartProvider } from './stores/cartContext.tsx';
import { ProductsProvider } from './stores/productsContext.tsx';
import { UiProvider } from './stores/uiContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UiProvider>
      <ProductsProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ProductsProvider>
    </UiProvider>
  </StrictMode>,
);
