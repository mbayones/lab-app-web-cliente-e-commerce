// src/components/ProductCard.tsx
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import ProductModal from './ProductModal';

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
}

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="card h-100">
                <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.title}
                    style={{ objectFit: 'contain', height: '200px' }}
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text mt-auto">${product.price.toFixed(2)}</p>
                    <button
                        className="btn btn-primary mt-2"
                        onClick={() => setShowModal(true)}
                    >
                        Ver detalles
                    </button>
                </div>
            </div>
            <ProductModal
                product={product}
                show={showModal}
                onClose={() => setShowModal(false)}
            />
        </>
    );
}
