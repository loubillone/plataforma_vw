let usuario = JSON.parse(localStorage.getItem("login") || []);
let contenedorLista = document.getElementById("menu_lista");
let contenedorCards = document.getElementById("contenedor-cards");
let vehiculos = JSON.parse(localStorage.getItem("vehiculos")) || [];

if (usuario) {
  if (usuario.rol === "admin") {
    let item = document.createElement("li");
    item.classList = "nav-item";
    let link = `<a class="nav-link" href="../pages/admin.html">Administración</a>`;
    item.innerHTML = link;
    contenedorLista.appendChild(item);
  }
}

//Cards vehículos

const mostrarCards = () => {
  contenedorCards.innerHTML = "";

  if (vehiculos.length > 0) {
    vehiculos.map((vehiculo) => {
      let div = document.createElement("div");
      div.classList =
        "col-10 offset-sm-1 mb-4 col-md-5 offset-md-0 col-lg-4 offset-lg-0";
      let card = ` <div class="card h-100 card-principal text-center ">
      <div>
        <img
          src="${vehiculo.imagen}"
          class="card-img-top img_tarjeta"
          alt="${vehiculo.nombre}"
        />
      </div>

      <div class="card-body py-5">
        <h5 class="card-title seccion_vehiculos--titulo_card">
          ${vehiculo.nombre}
        </h5>
        <p class="card-text seccion_vehiculos--parrafo_card">Precio: $${vehiculo.precio}
        </p>
      </div>

      <div class="card-footer">
      <a href="#" class="btn btn-primary btn-card float-center">Comprar</a>
      </div>
      
    </div>`;

      div.innerHTML = card;
      contenedorCards.appendChild(div);
    });
  }
};

mostrarCards();
