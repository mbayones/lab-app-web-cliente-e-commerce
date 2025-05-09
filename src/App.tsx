// src/App.tsx
import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import CartSidebar from './components/CartSidebar';

export default function App() {
  const [showCart, setShowCart] = useState(false);

  return (
    <CartProvider>
      <nav className="navbar navbar-light bg-light sticky-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Mi E-Commerce</a>
          <button
            className="btn btn-outline-primary"
            onClick={() => setShowCart(true)}
          >
            Carrito
          </button>
        </div>
      </nav>
      <Home />
      <CartSidebar show={showCart} onClose={() => setShowCart(false)} />
    </CartProvider>
  );
}