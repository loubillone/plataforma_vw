let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

const handleSubmit = (e) => {
  e.preventDefault();

  inicioSesion();
};

const inicioSesion = () => {
  let email = document.getElementById("text-email").value;
  let password = document.getElementById("text-password").value;

  let validarUsuario = usuarios.find((user) => {
    return user.email === email;
  });

  if (validarUsuario) {
    if (validarUsuario.password === password) {
      localStorage.setItem("login", JSON.stringify(validarUsuario));
      location.replace("./pages/home.html");
    } else {
      alert("Su usuario o contraseña no son correctos");
    }
  } else {
    alert("Su usuario o contraseña no son correctos");
  }
};

document.getElementById("formulario").addEventListener("submit", handleSubmit);
