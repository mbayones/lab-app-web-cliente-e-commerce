// src/components/CartSidebar.tsx
import React from 'react';
import { useCart } from '../context/CartContext';
import { createPortal } from 'react-dom';

interface Props {
    show: boolean;
    onClose: () => void;
}

export default function CartSidebar({ show, onClose }: Props) {
    const { items, updateQty, removeItem, clearCart } = useCart();
    if (!show) return null;

    const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

    return createPortal(
        <>
            <div
                className="offcanvas offcanvas-end show"
                style={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    width: '350px',
                    height: '100vh',
                    visibility: 'visible',
                    zIndex: 1050,
                    backgroundColor: '#ffffff',
                    padding: '1rem',
                    boxShadow: '-2px 0 8px rgba(0,0,0,0.1)',
                }}
            >
                <button
                    onClick={onClose}
                    style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', fontSize: '1.5rem', background: 'none', border: 'none' }}
                    aria-label="Cerrar carrito"
                >
                    ×
                </button>
                <h5 className="mb-4">Carrito de Compras</h5>
                <div className="d-flex flex-column" style={{ overflowY: 'auto', flexGrow: 1 }}>
                    {items.length === 0 ? (
                        <p>El carrito está vacío.</p>
                    ) : (
                        items.map(item => (
                            <div key={item.id} className="d-flex align-items-center mb-3">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                                />
                                <div className="ms-3 flex-grow-1">
                                    <h6>{item.title}</h6>
                                    <p className="mb-1">${item.price.toFixed(2)}</p>
                                    <div className="input-group input-group-sm" style={{ width: '100px' }}>
                                        <button
                                            className="btn btn-outline-secondary"
                                            onClick={() => updateQty(item.id, item.qty - 1)}
                                            disabled={item.qty <= 1}
                                        >
                                            -
                                        </button>
                                        <input
                                            type="text"
                                            className="form-control text-center"
                                            value={item.qty}
                                            readOnly
                                        />
                                        <button
                                            className="btn btn-outline-secondary"
                                            onClick={() => updateQty(item.id, item.qty + 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <button
                                    className="btn btn-outline-danger btn-sm ms-2"
                                    onClick={() => removeItem(item.id)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))
                    )}
                </div>
                {items.length > 0 && (
                    <div className="mt-3">
                        <h5>Total: ${total.toFixed(2)}</h5>
                        <button
                            className="btn btn-success w-100 mt-2"
                            onClick={() => {
                                clearCart();
                                onClose();
                            }}
                        >
                            Finalizar compra
                        </button>
                        <button className="btn btn-outline-secondary w-100 mt-2" onClick={clearCart}>
                            Vaciar carrito
                        </button>
                    </div>
                )}
            </div>
            <div
                className="offcanvas-backdrop fade show"
                style={{ backgroundColor: 'rgba(0,0,0,0.3)', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1040 }}
            ></div>
        </>,
        document.body
    );
}