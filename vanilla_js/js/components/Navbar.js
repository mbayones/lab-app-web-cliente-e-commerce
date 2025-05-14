export function initNavbar() {
    const container = document.getElementById('navbar-container');
    container.innerHTML = `
    <nav class="navbar navbar-light bg-light sticky-top">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Mi E-Commerce</a>
        <button class="btn btn-outline-primary" type="button"
          data-bs-toggle="offcanvas" data-bs-target="#cartOffcanvas">
          Carrito
        </button>
      </div>
    </nav>
  `;
}