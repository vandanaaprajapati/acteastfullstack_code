
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals.js';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom'; // ✅
import { CartProvider } from "./components/CartContext.js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter> 
        <CartProvider>
          <App />
        </CartProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();
