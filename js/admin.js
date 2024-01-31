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
    <td>${vehiculo.precio}</td>`;

    tr.innerHTML = celda;
    tableBody.appendChild(tr);
  });
};

document.getElementById("formulario").addEventListener("submit", handleSubmit);

mostrarTabla();
