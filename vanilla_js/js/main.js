import { initNavbar } from './components/Navbar.js';
import { initSearch } from './components/Search.js';
import { initProductGrid } from './components/ProductGrid.js';
import { initProductModal } from './components/ProductModal.js';
import { initCartOffcanvas } from './components/CartOffcanvas.js';

const state = { products: [], cart: [], currentProduct: null };

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initSearch(state);
    initProductModal(state);
    initCartOffcanvas(state);
    initProductGrid(state);
});