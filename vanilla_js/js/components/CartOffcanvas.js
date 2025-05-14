import { getCart, saveCart } from '../utils/storage.js';

export function initCartOffcanvas(state) {
    const container = document.getElementById('offcanvas-container');
    container.innerHTML = `
    <div class="offcanvas offcanvas-end" tabindex="-1" id="cartOffcanvas">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title">Carrito de Compras</h5>
        <button class="btn-close text-reset" data-bs-dismiss="offcanvas"></button>
      </div>
      <div class="offcanvas-body d-flex flex-column" style="overflow-y:auto;">
        <div id="cartItems" class="flex-grow-1 text-center"></div>
        <div id="cartTotal" class="mt-3"></div>
        <button id="finalizeCartBtn" class="btn btn-success w-100 mt-2" style="display:none;">Finalizar compra</button>
        <button id="clearCartBtn" class="btn btn-outline-secondary w-100 mt-2" style="display:none;">Vaciar carrito</button>
      </div>
    </div>
  `;

    state.cart = getCart();

    function render() {
        const itemsEl = document.getElementById('cartItems');
        const totalEl = document.getElementById('cartTotal');
        const clearBtn = document.getElementById('clearCartBtn');
        const finalizeBtn = document.getElementById('finalizeCartBtn');
        itemsEl.innerHTML = '';
        if (state.cart.length === 0)
        {
            itemsEl.innerHTML = '<p>El carrito está vacío.</p>';
            totalEl.innerHTML = '';
            clearBtn.style.display = 'none';
            finalizeBtn.style.display = 'none';
        } else
        {
            let total = 0;
            state.cart.forEach(item => {
                total += item.price * item.qty;
                const div = document.createElement('div');
                div.className = 'd-flex align-items-center mb-3';
                div.innerHTML = `
          <img src="${item.image}" style="width:50px;height:50px;object-fit:contain;" />
          <div class="ms-3 flex-grow-1">
            <h6>${item.title}</h6>
            <p class="mb-1">$${item.price.toFixed(2)}</p>
            <div class="input-group input-group-sm" style="width:100px;">
              <button class="btn btn-outline-secondary" data-action="dec" data-id="${item.id}">-</button>
              <input type="text" class="form-control text-center" value="${item.qty}" readonly />
              <button class="btn btn-outline-secondary" data-action="inc" data-id="${item.id}">+</button>
            </div>
          </div>
          <button class="btn btn-outline-danger btn-sm ms-2" data-action="rem" data-id="${item.id}">Eliminar</button>
        `;
                itemsEl.appendChild(div);
            });
            totalEl.innerHTML = `<h5>Total: $${total.toFixed(2)}</h5>`;
            clearBtn.style.display = 'block';
            finalizeBtn.style.display = 'block';
        }
        saveCart(state.cart);
    }

    // Eventos
    window.addEventListener('cart:add', () => {
        const p = state.currentProduct;
        const exists = state.cart.find(i => i.id === p.id);
        if (exists) exists.qty++;
        else state.cart.push({ ...p, qty: 1 });
        render();
        Swal.fire('Agregado', 'Producto agregado al carrito', 'success');
    });

    document.getElementById('cartItems').addEventListener('click', e => {
        const action = e.target.dataset.action;
        const id = +e.target.dataset.id;
        const item = state.cart.find(i => i.id === id);
        if (!action) return;
        if (action === 'inc') item.qty++;
        if (action === 'dec' && item.qty > 1) item.qty--;
        if (action === 'rem') state.cart = state.cart.filter(i => i.id !== id);
        render();
    });

    document.getElementById('clearCartBtn').addEventListener('click', () => {
        state.cart = [];
        render();
        Swal.fire('Listo', 'Carrito vaciado', 'info');
    });

    document.getElementById('finalizeCartBtn').addEventListener('click', () => {
        state.cart = [];
        render();
        Swal.fire('Éxito', 'Compra finalizada', 'success');
        new bootstrap.Offcanvas(cartOffcanvasEl).hide();
    });

    render();
}