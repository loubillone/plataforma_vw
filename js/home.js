let usuario = JSON.parse(localStorage.getItem("login") || []);
let contenedorLista = document.getElementById("menu_lista");

if (usuario) {
  if (usuario.rol === "admin") {
    let item = document.createElement("li");
    item.classList = "nav-item";
    let link = `<a class="nav-link" href="../pages/admin.html">Administración</a>`;
    item.innerHTML = link;
    contenedorLista.appendChild(item);
  }
}
