export function initProductGrid(state) {
    const container = document.getElementById('products-container');
    container.innerHTML = `<div id="products-row"
    class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4"></div>`;

    function render(list) {
        const row = document.getElementById('products-row');
        row.innerHTML = '';
        list.forEach(p => {
            const col = document.createElement('div');
            col.className = 'col';
            col.innerHTML = `
        <div class="card h-100">
          <img src="${p.image}" class="card-img-top"
            style="object-fit:contain; height:200px;" alt="${p.title}" />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${p.title}</h5>
            <p class="card-text mt-auto">$${p.price.toFixed(2)}</p>
            <button class="btn btn-primary mt-2" data-id="${p.id}">Ver detalles</button>
          </div>
        </div>
      `;
            row.appendChild(col);
        });
    }

    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {
            state.products = data;
            render(data);
        });

    window.addEventListener('products:filter', e => render(e.detail));

    container.addEventListener('click', e => {
        const btn = e.target.closest('button[data-id]');
        if (!btn) return;
        const id = +btn.dataset.id;
        state.currentProduct = state.products.find(p => p.id === id);
        window.dispatchEvent(new Event('modal:show'));
    });
}