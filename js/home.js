let usuario = JSON.parse(localStorage.getItem("login") || null);
let contenedorLista = document.getElementById("menu_lista");
let contenedorCards = document.getElementById("contenedor-cards");
let vehiculos = JSON.parse(localStorage.getItem("vehiculos")) || [];
let formMenu = document.getElementById("formulario-menu");

//SI EL ROL ES ADMIN AGREGAR LINK ADMINISTRACIÓN
if (usuario) {
  if (usuario.rol === "admin") {
    let item = document.createElement("li");
    item.classList = "nav-item";
    let link = `<a class="nav-link" href="../pages/admin.html">Administración</a>`;
    item.innerHTML = link;
    contenedorLista.appendChild(item);
  }
} else {
  //Si no está logueado vuelve al index para loguearse
  location.replace("../index.html");
}

//CERRAR SESIÓN

if (usuario.rol === "admin" || usuario.rol === "usuario") {
  let boton = document.createElement("button");
  boton.classList = `btn btn-success mx-2`;
  boton.type = "button";
  boton.id = "boton-sesion";
  let cuerpoBoton = `<i class="fa fa-sign-out" aria-hidden="true"></i>`;
  boton.innerHTML = cuerpoBoton;
  formMenu.appendChild(boton);
}

const cerrarSesion = () => {
  let validar = confirm(`Hola ${usuario.nombre}, quieres cerrar sesión?`);

  if (validar) {
    localStorage.removeItem("login");
    alert("Cerraste sesión");
    location.replace("../index.html");
  }
};

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

//CLICK EN ÍCONO DE CERRAR SESIÓN
document.getElementById("boton-sesion").addEventListener("click", cerrarSesion);

mostrarCards();
