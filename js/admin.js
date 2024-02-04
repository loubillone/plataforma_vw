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

//------------MODAL----------------
//Para usar el modal

let myModal = new bootstrap.Modal(document.getElementById("myModal"));

//Mostrar modal

const editModal = (index) => {
  console.log(index);
  // myModal.show();
  crearCuerpoModal(index);
};

const crearCuerpoModal = (index) => {
  document.querySelector(".modal-body").innerHTML = "";

  let bodyModal = document.querySelector(".modal-body");
  let contenidoBody = `<form id="form-update" onSubmit="actualizarCurso(event, ${index})"> 
  <label>Nombre del vehículo</label>
                  <input
                    type="text"
                    name=""
                    id="nombre-update"
                    class="form-control"
                    value = "${vehiculos[index].nombre}
                    required
                  />

                  <label for="">Modelo</label>
                  <input
                    type="text"
                    name=""
                    id="modelo-update"
                    class="form-control"
                    value = "${vehiculos[index].modelo}
                    required
                  />

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
                  <select
                    name=""
                    id="fabricacion-update"
                    class="form-control"
                    required
                  >
                    <option value="${vehiculos[index].fabricacion}">${vehiculos[index].fabricacion}</option>
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
                    <option value="${vehiculos[index].estado}">${vehiculos[index].estado}</option>
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
                    value=${vehiculos[index].imagen}
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

const actualizarDatos = () => {};

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
    <td><button class="btn btn-danger btn-sm" ><i class="fa fa-trash-o" aria-hidden="true"></i></button></td>`;

    tr.innerHTML = celda;
    tableBody.appendChild(tr);
  });
};

document.getElementById("formulario").addEventListener("submit", handleSubmit);

mostrarTabla();
