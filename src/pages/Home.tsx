// src/pages/Home.tsx
import React, { useState, useEffect } from 'react';
import ProductCard, { type Product } from '../components/ProductCard';
import SearchBar from '../components/SearchBar';

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then((data: Product[]) => setProducts(data));
    }, []);

    const filtered = products.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <main className="container-fluid my-4">
            <div className="row mb-3">
                <div className="col-12">
                    <SearchBar query={query} onSearch={setQuery} />
                </div>
            </div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                {filtered.map(product => (
                    <div key={product.id} className="col">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </main>
    );
}
