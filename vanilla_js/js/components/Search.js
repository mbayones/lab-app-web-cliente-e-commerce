export function initSearch(state) {
    const container = document.getElementById('search-container');
    container.innerHTML = `
    <input id="search-input" type="text" class="form-control"
      placeholder="Buscar productos..." />
  `;
    const input = document.getElementById('search-input');
    input.addEventListener('input', () => {
        const q = input.value.toLowerCase();
        const filtered = state.products.filter(p =>
            p.title.toLowerCase().includes(q)
        );
        window.dispatchEvent(new CustomEvent('products:filter', { detail: filtered }));
    });
}