// src/components/ProductModal.tsx
import React from 'react';
import type { Product } from './ProductCard';
import { useCart } from '../context/CartContext';
import { createPortal } from 'react-dom';
import './ProductModal.scss';

interface Props {
    product: Product;
    show: boolean;
    onClose: () => void;
}

export default function ProductModal({ product, show, onClose }: Props) {
    const { addItem } = useCart();
    if (!show) return null;

    return createPortal(
        <>
            <div
                className="modal fade show d-block modal-portal-custom"
                tabIndex={-1}
            >
                <div
                    className="modal-dialog modal-lg modal-dialog-centered modal-dialog-custom"
                >
                    <div className="modal-content custom-modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{product.title}</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <img
                                src={product.image}
                                className="img-fluid mb-3"
                                alt={product.title}
                                style={{ objectFit: 'contain', maxHeight: '400px' }}
                            />
                            <p>{product.description}</p>
                            <h4>${product.price.toFixed(2)}</h4>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={onClose}>
                                Cerrar
                            </button>
                            <button
                                className="btn btn-success"
                                onClick={() => {
                                    addItem({ id: product.id, title: product.title, price: product.price, image: product.image });
                                    onClose();
                                }}
                            >
                                Agregar al carrito
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="modal-backdrop fade show"
                style={{ backgroundColor: 'rgba(0,0,0,0.5)', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1040 }}
            ></div>
        </>,
        document.body
    );
}