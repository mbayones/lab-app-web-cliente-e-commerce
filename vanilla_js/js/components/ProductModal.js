export function initProductModal(state) {
    const container = document.getElementById('modal-container');
    container.innerHTML = `
    <div class="modal fade" id="productModal" tabindex="-1">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content text-center" style="background:#f8f9fa;">
          <div class="modal-header justify-content-center">
            <h5 id="modalTitle" class="modal-title"></h5>
            <button class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <img id="modalImage"
              class="img-fluid mx-auto mb-3"
              style="max-height:400px; object-fit:contain;" />
            <p id="modalDesc"></p>
            <h4 id="modalPrice"></h4>
          </div>
          <div class="modal-footer justify-content-center">
            <button class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            <button id="modalAddBtn" class="btn btn-success">Agregar al carrito</button>
          </div>
        </div>
      </div>
    </div>
  `;

    const modalEl = document.getElementById('productModal');
    const modal = new bootstrap.Modal(modalEl);

    window.addEventListener('modal:show', () => {
        const p = state.currentProduct;
        document.getElementById('modalTitle').textContent = p.title;
        document.getElementById('modalImage').src = p.image;
        document.getElementById('modalDesc').textContent = p.description;
        document.getElementById('modalPrice').textContent = `$${p.price.toFixed(2)}`;
        modal.show();
    });

    document.getElementById('modalAddBtn').addEventListener('click', () => {
        window.dispatchEvent(new Event('cart:add'));
        modal.hide();
    });
}