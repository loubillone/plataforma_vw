let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

class Usuario {
  constructor(nombre, email, password, rol = "usuario") {
    this.nombre = nombre;
    this.email = email;
    this.password = password;
    this.rol = rol;
  }
}

//FUNCION QUE DETIENE QUE SE REFRESQUE LA PÁGINA Y ADEMÁS LLAMA A LA FUNCIÓN DE REGISTRO
const handleSubmit = (e) => {
  e.preventDefault();

  registroUsuario();
};

//FUNCION DE REGISTRO

const registroUsuario = () => {
  let nombre = document.getElementById("text-nombre").value;
  let email = document.getElementById("text-email").value;
  let password = document.getElementById("text-password").value;
  let password2 = document.getElementById("text-password2").value;

  if (password != password2) {
    return alert("No coinciden las contraseñas");
  }

  let validar = usuarios.find((user) => {
    return user.email === email;
  });

  if (validar) {
    return alert(
      "El correo ya está registrado, inicie sesión con sus credenciales"
    );
  }

  usuarios.push(new Usuario(nombre, email, password));

  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  document.getElementById("formulario").reset();

  alert("Usuario registrado con éxito");

  location.replace("../index.html");
};

document.getElementById("formulario").addEventListener("submit", handleSubmit);
