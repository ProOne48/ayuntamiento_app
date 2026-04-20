const comentarios = [
  {
    autor: "María Gómez",
    email: "maria@email.com",
    fecha: "17/03/2026",
    hora: "12:15",
    texto: "Me parece una buena iniciativa para que los vecinos estemos informados de todo lo que ocurre en el municipio."
  },
  {
    autor: "Juan Pérez",
    email: "juan@email.com",
    fecha: "17/03/2026",
    hora: "10:42",
    texto: "Sería interesante añadir también fotos de los eventos y un calendario con las próximas actividades."
  },
  {
    autor: "Lucía Fernández",
    email: "lucia@email.com",
    fecha: "17/03/2026",
    hora: "08:03",
    texto: "He asistido al último evento cultural y estuvo muy bien organizado. Ojalá se repita pronto."
  }
];

const localidades = [
  "PELIGROS",
  "ARMILLA",
  "MARACENA",
  "HUETOR VEGA",
  "MOTRIL",
  "LA ZUBIA",
  "BAZA",
  "GUADIX",
  "SANTA FE"
]

const panel = document.getElementById("panelComentarios");
const zonaHover = document.getElementById("zonaHover");
const cerrarPanel = document.getElementById("cerrarPanel");
const btnNuevoComentario = document.getElementById("btnNuevoComentario");
const formularioComentario = document.getElementById("formularioComentario");
const cerrarFormulario = document.getElementById("cerrarFormulario");
const enviarComentario = document.getElementById("enviarComentario");
const listaComentarios = document.getElementById("listaComentarios");
const contadorComentarios = document.getElementById("contadorComentarios");

const inputNombre = document.getElementById("nombre");
const inputEmail = document.getElementById("email");
const inputTexto = document.getElementById("textoComentario");

function abrirPanel() {
  panel.classList.add("abierto");
}

function cerrarPanelComentarios() {
  panel.classList.remove("abierto");
  ocultarFormulario();
}

function mostrarFormulario() {
  formularioComentario.classList.add("visible");
  btnNuevoComentario.style.display = "none";
}

function ocultarFormulario() {
  formularioComentario.classList.remove("visible");
  btnNuevoComentario.style.display = "inline-block";
  limpiarFormulario();
}

function limpiarFormulario() {
  inputNombre.value = "";
  inputEmail.value = "";
  inputTexto.value = "";
}

function actualizarContador() {
  contadorComentarios.textContent = "Comentarios (" + comentarios.length + ")";
}

function crearHTMLComentario(comentario) {
  const article = document.createElement("article");
  article.className = "comentario";

  article.innerHTML = `
    <div class="meta">
      <div class="autor-contenedor">
        <span class="autor">${comentario.autor}</span>
        <span class="autor">${comentario.email}</span>
      </div>
      <div>${comentario.fecha} - ${comentario.hora}</div>
    </div>
    <div class="texto">${comentario.texto}</div>
  `;

  return article;
}

function renderizarComentarios() {
  listaComentarios.innerHTML = "";

  comentarios.forEach((comentario) => {
    listaComentarios.appendChild(crearHTMLComentario(comentario));
  });

  actualizarContador();
}

function obtenerFechaHoraActual() {
  const ahora = new Date();

  const dia = String(ahora.getDate()).padStart(2, "0");
  const mes = String(ahora.getMonth() + 1).padStart(2, "0");
  const anio = ahora.getFullYear();

  const hora = String(ahora.getHours()).padStart(2, "0");
  const minutos = String(ahora.getMinutes()).padStart(2, "0");

  return {
    fecha: dia + "/" + mes + "/" + anio,
    hora: hora + ":" + minutos
  };
}

function esEmailValido(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
  return regex.test(email);
}

function reemplazarParte(str, indice, textoNuevo) {
  console.log(textoNuevo.length)
  
return str.slice(0, indice) + textoNuevo + str.slice(indice + textoNuevo.length)
}

zonaHover.addEventListener("mouseenter", abrirPanel);

cerrarPanel.addEventListener("click", cerrarPanelComentarios);

btnNuevoComentario.addEventListener("click", () => {
  mostrarFormulario();
});

cerrarFormulario.addEventListener("click", () => {
  ocultarFormulario();
});

enviarComentario.addEventListener("click", () => {
  const nombre = inputNombre.value.trim();
  const email = inputEmail.value.trim();
  const texto = inputTexto.value.trim();

  if (!nombre || !email || !texto) {
    alert("Debes rellenar nombre, e-mail y texto del comentario.");
    return;
  }

  if (!esEmailValido(email)) {
    alert("Introduce un correo valido.");
    return;
  }

  const fechaHora = obtenerFechaHoraActual();

  const nuevoComentario = {
    autor: nombre,
    email: email,
    fecha: fechaHora.fecha,
    hora: fechaHora.hora,
    texto: texto
  };

  comentarios.unshift(nuevoComentario);
  renderizarComentarios();
  ocultarFormulario();
});

inputTexto.addEventListener("input", () => {

  localidades.forEach((localidad) => {
    const texto = inputTexto.value

    const regex = new RegExp("\\b" + localidad + "\\b", "giu");
    
    if(texto.match(regex)){
      inputTexto.value = texto.replace(regex,  localidad)
    }    
  })
  
})

renderizarComentarios();