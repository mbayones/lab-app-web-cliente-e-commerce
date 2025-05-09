// src/context/CartContext.tsx
import React, { createContext, ReactNode, useContext } from 'react';
import Swal from 'sweetalert2';
import { useLocalStorage } from '../hooks/useLocalStorage';

export interface CartItem {
    id: number;
    title: string;
    price: number;
    image: string;
    qty: number;
}

interface CartContextType {
    items: CartItem[];
    addItem: (item: Omit<CartItem, 'qty'>) => void;
    removeItem: (id: number) => void;
    updateQty: (id: number, qty: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useLocalStorage<CartItem[]>('cart', []);

    const addItem = (item: Omit<CartItem, 'qty'>) => {
        setItems(prev => {
            const exists = prev.find(i => i.id === item.id);
            if (exists) {
                return prev.map(i =>
                    i.id === item.id ? { ...i, qty: i.qty + 1 } : i
                );
            }
            return [...prev, { ...item, qty: 1 }];
        });
        Swal.fire('Agregado', 'Producto agregado al carrito', 'success');
    };

    const removeItem = (id: number) =>
        setItems(prev => prev.filter(i => i.id !== id));

    const updateQty = (id: number, qty: number) =>
        setItems(prev => prev.map(i => (i.id === id ? { ...i, qty } : i)));

    const clearCart = () => {
        setItems([]);
        Swal.fire('Listo', 'Carrito vaciado', 'info');
    };

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider');
    return ctx;
}