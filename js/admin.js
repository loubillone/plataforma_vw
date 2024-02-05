class Vehiculos {
  constructor(id, nombre, modelo, color, fabricacion, estado, imagen, precio) {
    this.id = id;
    this.nombre = nombre;
    this.modelo = modelo;
    this.color = color;
    this.fabricacion = fabricacion;
    this.estado = estado;
    this.imagen = imagen;
    this.precio = precio;
  }
}

let vehiculos = JSON.parse(localStorage.getItem("vehiculos")) || [];
let tableBody = document.getElementById("table-body");
let formMenu = document.getElementById("formulario-menu");
let usuario = JSON.parse(localStorage.getItem("login") || null);

//Validar rol admin para que directamente no muestre la opción del formulario de carga

const validarUsuario = () => {
  if (usuario) {
    if (usuario.rol !== "admin") {
      document.querySelector("main").innerHTML = "";
      let div = document.createElement("div");
      div.classList = "container";
      let estructura = `<div class="row mt-5">
        <div class="col">
          <div class="alert alert-danger" role="alert">
            No tiene permisos para ver esta página
          </div>
  
          <div>
          <a href="../pages/home.html">Volver</a>
        </div>
        
      </div>`;
      div.innerHTML = estructura;

      document.querySelector("main").appendChild(div);
    } else {
      mostrarTabla();
    }
  } else {
    location.replace("../index.html");
  }
};
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

//------------MODAL----------------

//Para usar el modal

let myModal = new bootstrap.Modal(document.getElementById("myModal"));

//Mostrar modal

const editModal = (index) => {
  // console.log(index);
  myModal.show();
  crearCuerpoModal(index);
};

const crearCuerpoModal = (index) => {
  document.querySelector(".modal-body").innerHTML = "";

  let bodyModal = document.querySelector(".modal-body");
  let contenidoBody = `<form id="form-update" onSubmit="actualizarDatos(event, ${index})">
  <label>Nombre del vehículo</label>
  <input type="text" name="" id="nombre-update" class="form-control" value =
  "${vehiculos[index].nombre}" required />

  <label>Modelo</label>
  <input type="text" name="" id="modelo-update" class="form-control" value =
  "${vehiculos[index].modelo}" required />

  <br />
  <select name="" id="color-update" class="form-control" required>
    <option value="${vehiculos[index].color}">${vehiculos[index].color}</option>
    <option value="rojo">Rojo</option>
    <option value="plata sirius">Plata sirius</option>
    <option value="negro">Negro</option>
    <option value="azul noche">Azul noche</option>
    <option value="blanco">Blanco</option>
  </select>

  <br />
  <label>Año de fabricación</label>
  <br />
  <select name="" id="fabricacion-update" class="form-control" required>
    <option value="${vehiculos[index].fabricacion}">
      ${vehiculos[index].fabricacion}
    </option>
    <option value="2024">2024</option>
    <option value="2023">2023</option>
    <option value="2022">2022</option>
    <option value="2021">2021</option>
    <option value="2020">2020</option>
  </select>
  <br />

  <label>Estado</label>
  <br />
  <select name="" id="estado-update" class="form-control" required>
    <option value="${vehiculos[index].estado}">
      ${vehiculos[index].estado}
    </option>
    <option value="Nuevo">Nuevo</option>
    <option value="Usado">Usado</option>
  </select>

  <br />
  <label for="">Imagen</label>
  <input
    type="text"
    name=""
    id="imagen-update"
    class="form-control"
    value="${vehiculos[index].imagen}"
    placeholder="${vehiculos[index].imagen}"
  />

  <label for="">Precio</label>
  <input
    type="number"
    name=""
    id="precio-update"
    class="form-control"
    value="${vehiculos[index].precio}"
    required
  />
  <button class="btn btn-primary mt-3 float-end">Guardar</button>
</form>`;

  bodyModal.innerHTML = contenidoBody;
};

const actualizarDatos = (e, index) => {
  e.preventDefault();

  let nombre = document.getElementById("nombre-update").value;
  let modelo = document.getElementById("modelo-update").value;
  let color = document.getElementById("color-update").value;
  let fabricacion = document.getElementById("fabricacion-update").value;
  let estado = document.getElementById("estado-update").value;
  let imagen = document.getElementById("imagen-update").value;
  let precio = document.getElementById("precio-update").value;

  let nuevaData = {
    nombre,
    modelo,
    color,
    fabricacion,
    estado,
    imagen,
    precio,
  };

  vehiculos.splice(index, 1, nuevaData);
  localStorage.setItem("vehiculos", JSON.stringify(vehiculos));
  myModal.hide();
  mostrarTabla();
};

const borrarVehiculo = (index) => {
  let validar = confirm(
    `Está seguro que quiere eliminar el curso ${vehiculos[index].nombre}`
  );

  if (validar) {
    vehiculos.splice(index, 1);
    localStorage.setItem("vehiculos", JSON.stringify(vehiculos));
    alert("Vehículo eliminado");
    mostrarTabla();
  }
};
//------------MODAL----------------

const handleSubmit = (e) => {
  e.preventDefault();

  agregarVehiculo();
};

const agregarVehiculo = () => {
  let id = new Date().getTime();
  let nombre = document.getElementById("nombre").value;
  let modelo = document.getElementById("modelo").value;
  let color = document.getElementById("color").value;
  let fabricacion = document.getElementById("fabricacion").value;
  let estado = document.getElementById("estado").value;
  let imagen = document.getElementById("imagen").value;
  let precio = document.getElementById("precio").value;

  vehiculos.push(
    new Vehiculos(
      id,
      nombre,
      modelo,
      color,
      fabricacion,
      estado,
      imagen,
      precio
    )
  );

  localStorage.setItem("vehiculos", JSON.stringify(vehiculos));
  document.getElementById("formulario").reset();
  document.getElementById("nombre").focus();

  mostrarTabla();
};

const mostrarTabla = () => {
  tableBody.innerHTML = "";

  vehiculos.map((vehiculo, index) => {
    let tr = document.createElement("tr");
    let celda = `<th scope="row">${index + 1}</th>
    <td>${vehiculo.nombre}</td>
    <td>${vehiculo.modelo}</td>
    <td>${vehiculo.color}</td>
    <td>${vehiculo.precio}</td>
    
    <td><button class="btn btn-warning btn-sm" onclick = "editModal(${index})"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button></td>
    <td><button class="btn btn-danger btn-sm" onclick = "borrarVehiculo(${index})" ><i class="fa fa-trash-o" aria-hidden="true"></i></button></td>`;

    tr.innerHTML = celda;
    tableBody.appendChild(tr);
  });
};

//ENVÍO DE FORMULARIO
document.getElementById("formulario").addEventListener("submit", handleSubmit);

//CLICK EN ÍCONO DE CERRAR SESIÓN
document.getElementById("boton-sesion").addEventListener("click", cerrarSesion);

validarUsuario();
