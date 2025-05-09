// src/components/SearchBar.tsx
import React from 'react';

interface Props {
    query: string;
    onSearch: (q: string) => void;
}

export default function SearchBar({ query, onSearch }: Props) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                className="form-control mb-4"
                placeholder="Buscar productos..."
                value={query}
                onChange={e => onSearch(e.target.value)}
            />
        </form>
    );
}
