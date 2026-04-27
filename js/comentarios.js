const BASE_URL = "http://localhost:8080/php/index.php";
// Obtener el ID de la noticia desde la URL limpia
const noticiaId = window.location.pathname.split("/").pop();
const comentarios = [];

const localidadesPromise = fetch(BASE_URL + "/get_municipios").then(response => response.json());

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

fetch(BASE_URL + "/get_comentarios/" + noticiaId).then(async response => {
  response_data = await response.json()  
  response_data.forEach(comentario => {
    comentarios.push(comentario);
  })
}).then(() => renderizarComentarios());

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
  const [fecha, hora] = comentario.created_at ? comentario.created_at.split(" ") : [comentario.fecha, comentario.hora]

  article.innerHTML = `
    <div class="meta">
      <div class="autor-contenedor">
        <span class="autor">${comentario.username}</span>
        <span class="autor">${comentario.email}</span>
      </div>
      <div>${fecha} - ${hora}</div>
    </div>
    <div class="texto">${comentario.content}</div>
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
    username: nombre,
    email: email,
    created_at: fechaHora.fecha + " " + fechaHora.hora,
    texto: texto
  };

  comentarios.unshift(nuevoComentario);
  renderizarComentarios();
  ocultarFormulario();
});

inputTexto.addEventListener("input", async  () => {
  const localidades = await localidadesPromise;
  if(localidades && localidades.length === 0) return;

  console.log(localidades);
  

  localidades.forEach((localidad) => {
    const texto = inputTexto.value

    const regex = new RegExp("\\b" + localidad.name + "\\b", "giu");
    
    if(texto.match(regex)){
      inputTexto.value = texto.replace(regex,  localidad.name.toUpperCase());
    }    
  })
  
})