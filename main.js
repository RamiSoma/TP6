// Obtener referencia a los elementos HTML relevantes
const tarjetaRadioButton = document.getElementById("tarjeta");
const tarjetaInfoDiv = document.getElementById("tarjeta_info");

const efectivoRadioButton = document.getElementById("efectivo");
const efectivoInfoDiv = document.getElementById("efectivo-info");

const inputImagen = document.getElementById('imagenInput');
const labelImagen = document.getElementById('imagenLabel');
const eliminarImagen = document.getElementById('eliminarImagen');

const fechaVencimientoInput = document.getElementById("cc-exp");

// Variables de botones
const botonSiguienteProducto = document.getElementById("btn_siguiente1");
const botonSiguienteDirecciones = document.getElementById("btn_siguiente2");
const botonAnterior = document.getElementById("btn-anterior");
const botonSiguienteFormaPago = document.getElementById("btn_siguiente3");
// const botonAnteriorFormaPago = document.getElementById("btn_anterior2");
// const botonAnteriorRecepcion = document.getElementById("btn_anterior3");

// Variables de las secciones
const seccionProductos = document.getElementById("seccion-producto");
const seccionDirecciones = document.getElementById("seccion-direcciones");
const seccionFormaPago = document.getElementById("seccion-forma-pago");
const seccionRecepcion = document.getElementById("seccion-recepcion");

// Variables de los datos del negocio
var productosBusqueda;
var comercioCalle;
var comercioCiudad;
var entregaCalle;
var entregaCiudad;

// Variables de la tarjeta
var numeroTarjetaInput = document.getElementById('numeroTarjeta');
var cvcInput = document.getElementById('cvc');

// Variable volver
var volver = 0;

// Primero se carga la página y cuando se carga hacer la funcion cargar página
window.addEventListener("load", CargarPagina)

// Cargar la pagina, solo mostrando las seccion de productos
function CargarPagina() {
  // Seccion del producto queda mostrandose
  seccionProductos.style.display = "block";
  // Ocultar demás secciones
  seccionDirecciones.style.display = "none";
  seccionFormaPago.style.display = "none";
  seccionRecepcion.style.display = "none";
  botonAnterior.style.display = "none";
}

// Listener para que vea cuando se sube una foto
inputImagen.addEventListener("change", SubirImagen)

// Funcion que valida el subir la imagen
function SubirImagen() {
  var imagenMostrada = document.getElementById('imagenMostrada');

    if (inputImagen.files.length === 0) {
        console.log('Selecciona una imagen para subir.')
        imagenMostrada.style.display = 'none';
        eliminarImagen.style.display = 'none';
        return;
    }

  var imagen = inputImagen.files[0];

    if (imagen.type !== 'image/jpeg') {
        console.log('Por favor, selecciona una imagen en formato JPG.')
        imagenMostrada.style.display = 'none';
        eliminarImagen.style.display = 'none';
        return;
    }

    if (imagen.size > 5 * 1024 * 1024) {
        alert('La imagen es demasiado grande. Inténtelo nuevamente.')
        imagenMostrada.style.display = 'none';
        eliminarImagen.style.display = 'none';
        return;
    }

  // Mostrar la imagen seleccionada
  var reader = new FileReader();
  reader.onload = function(e) {
      imagenMostrada.src = e.target.result
      imagenMostrada.style.display = 'block'
      imagenMostrada.style.maxWidth = '500px'; // Ancho fijo de 300 píxeles
      imagenMostrada.style.maxHeight = '300px'
  }

    reader.readAsDataURL(imagen);
    eliminarImagen.style.display = 'block';
    labelImagen.style.display = 'none';
}

// Listener para cuando se ELIMINA LA IMAGEN
eliminarImagen.addEventListener("click",function(){
  var imagenMostrada = document.getElementById('imagenMostrada');

  eliminarImagen.style.display = 'none';
  imagenMostrada.src = '#';
  imagenMostrada.style.display = 'none';
  labelImagen.style.display = 'block';
})

// Cuando se toca siguiente, se tiene que pasar a la parte de direcciones y se hacen las validaciones de primer campo
botonSiguienteProducto.addEventListener("click", function(){
    productosBusqueda = document.getElementById("busqueda").value;
    if ( productosBusqueda != "") {
        AbrirDirecciones();
        document.getElementById("mensajeError").textContent = "";
    }else{
        document.getElementById("mensajeError").textContent = "Debe ingresar una cadena de texto en la búsqueda.";
    }
    
})

// Funcion que hace que se oculte lo de productos y se habilite lo de las direcciones
function AbrirDirecciones() {
  seccionProductos.style.display = "none";
  seccionDirecciones.style.display = "block";
  seccionFormaPago.style.display = "none";
  botonAnterior.style.display = "block";
}

// Agregar listener del boton ANTERIOR para que vuelva a los productos
botonAnterior.addEventListener("click", function () {
  if (volver === 0) {
    CargarPagina();
    volver = 0;
  }
  if (volver === 1) {
    AbrirDirecciones();
    volver = 0;
  }
  if (volver === 2) {
    AbrirFormaPago();
    volver === 1;
  }
})

// Agregar listener del boton SIGUIENTE para que pase a la forma de pago
botonSiguienteDirecciones.addEventListener("click", function(){
    comercioCalle = document.getElementById("comercio_calle").value;
    comercioCiudad = document.getElementById("comercio_ciudad").value;
    entregaCalle = document.getElementById("entrega_calle").value;
    entregaCiudad = document.getElementById("entrega_ciudad").value;
    if (comercioCalle != "" && comercioCiudad != null && entregaCalle != "" && entregaCiudad != "" && comercioCiudad != "" && entregaCiudad != null) {
        AbrirFormaPago();
        document.getElementById("mensajeError").textContent = "";
    }else{
        document.getElementById("mensajeError").textContent = "Debe completar todos los campos...";
    }
})

// AGREGAR VALIDACIONES Y COSAS DE LA CALLE Y DIRECCIONES

// Funcion que pasa a la forma de pago
function AbrirFormaPago() {
  seccionDirecciones.style.display = "none";
  seccionFormaPago.style.display = "block";
  seccionRecepcion.style.display = "none";
  volver = 1;
}

// Agregar listener del boton ANTERIOR para que vuelva a las direcciones
// botonAnteriorFormaPago.addEventListener("click", AbrirDirecciones)

// Agregar un evento de cambio al botón de opción de TARJETA
tarjetaRadioButton.addEventListener("change", function () {
    if (tarjetaRadioButton.checked) {
        // Si se selecciona tarjeta de débito, mostrar el campo de información de tarjeta
        tarjetaInfoDiv.style.display = "block";
        efectivoInfoDiv.style.display = "none";
    } else {
        // De lo contrario, ocultar el campo de información de tarjeta
        tarjetaInfoDiv.style.display = "none";
    }
});

// Agregar listener PARA CUANDO SE INGRESE LA TARJETA

numeroTarjetaInput.addEventListener('input', function () {
  ValidarTarjeta();
});

// Función para formatear el número de tarjeta con espacios cada 4 dígitos
const input = document.getElementById("numeroTarjeta");
input.addEventListener("input", () => input.value = formatNumber(input.value.replaceAll(" ", "")));

function formatNumber(number) {
  return number.split("").reduce((seed, next, index) => {
    if (index !== 0 && !(index % 4)) {
      seed += " ";
    }
    return seed + next;
  }, "");
}

function ValidarTarjeta() {
  // Verificar si el número de tarjeta es un número válido
  var numeroTarjeta = numeroTarjetaInput.value.replace(/\s/g, '');
  if (numeroTarjeta === '') {
    // If the CVC input is empty, reset the background color
    numeroTarjetaInput.style.backgroundColor = '';
  }
  if (!/^\d+$/.test(numeroTarjeta)) {
    document.getElementById('numeroTarjeta').className = 'error'; // Aplicar la clase 'error'
    return 'Inválido';
  }

  // Expresiones regulares para Visa y Mastercard
  var visaPattern = /^4[0-9]{12}(?:[0-9]{3})?$/;
  var mastercardPattern = /^5[1-5][0-9]{14}$/;

  // Verificar si el número coincide con Visa o Mastercard
  if (visaPattern.test(numeroTarjeta)) {
      document.getElementById('numeroTarjeta').className = '';// Quitar la clase 'error'
      numeroTarjetaInput.style.backgroundColor = '';
      document.getElementById('tipoTarjeta').textContent = 'Visa';
      return 'Visa';
  } else if (mastercardPattern.test(numeroTarjeta)) {
      document.getElementById('numeroTarjeta').className = ''; // Aplicar la clase 'error'
      numeroTarjetaInput.style.backgroundColor = '';
      document.getElementById('tipoTarjeta').textContent = 'Mastercard';
      return 'Mastercard';
  } else {
      document.getElementById("numeroTarjeta").className = 'error'; // Aplicar la clase 'error'
      numeroTarjetaInput.style.backgroundColor = 'rgb(255, 197, 197)';
      document.getElementById('tipoTarjeta').textContent = 'Desconocida';
      return 'Desconocida';
  }
}

// Agregar evento input al input de fecha de vencimiento
var mensajeError = document.getElementById('mensajeError');

fechaVencimientoInput.addEventListener('input', function () {
  var fechaVencimiento = fechaVencimientoInput.value.trim(); // Remove leading/trailing whitespace

  if (fechaVencimiento === '') {
    // If the expiration date input is empty, reset the background color and clear the error message
    fechaVencimientoInput.style.backgroundColor = '';
    mensajeError.textContent = '';
  } else if (!ValidarFechaVencimiento()) {
    // La fecha de vencimiento es inválida, aplica estilos y muestra el mensaje de error
    fechaVencimientoInput.style.backgroundColor = 'rgb(255, 197, 197)';
    mensajeError.textContent = 'La fecha de vencimiento debe ser mayor a la fecha actual.';
  } else {
    // La fecha de vencimiento es válida, restaura los estilos y elimina el mensaje de error
    fechaVencimientoInput.style.backgroundColor = ''; // Restaurar el fondo original
    mensajeError.textContent = ''; // Eliminar el mensaje de error
  }
});

// Funcion para validar la fecha de vencimiento
function ValidarFechaVencimiento() {
  // Verifica que la fecha de vencimiento esté en el formato "MM/AAAA"
  var fechaVencimiento = fechaVencimientoInput.value.replace(/\s/g, '');
  var formatoValido = /^(\d{2})\/(\d{4})$/;
  if (!formatoValido.test(fechaVencimiento)) {
    return false;
  }

  // Extrae el mes y el año de la fecha de vencimiento
  var partesFecha = fechaVencimiento.split('/');
  var mes = parseInt(partesFecha[0], 10);
  var anio = parseInt(partesFecha[1], 10);

  // Obtiene la fecha actual
  var fechaActual = new Date();
  var anioActual = fechaActual.getFullYear();
  var mesActual = fechaActual.getMonth() + 1; // El mes en JavaScript es de 0 a 11

  // Compara la fecha de vencimiento con la fecha actual
  if (anio < anioActual || (anio === anioActual && mes < mesActual)) {
    return false; // La fecha de vencimiento es anterior a la fecha actual
  }

  return true; // La fecha de vencimiento es válida
}

// Agregar listener para cuando se ingresa EL CODIGO DE SEGURIDAD
cvcInput.addEventListener('input', function () {
  var resultado = ValidarCodigoSeguridad();;
});

// Funcion que valida el codigo de seguridad
//deberia tener en cuenta que tarjeta tiene tipo visa o mastercard
function ValidarCodigoSeguridad() {
  // Verificar si el código de seguridad es un número válido
  var codigoSeguridad = document.getElementById('cvc').value;
  if (codigoSeguridad === '') {
    // If the CVC input is empty, reset the background color
    cvcInput.style.backgroundColor = '';
  }
  if (!/^\d+$/.test(codigoSeguridad)) {
    return 'Inválido';
  }

  // Verificar la longitud del código de seguridad (CVV o CVC)
  if (codigoSeguridad.length === 3 || codigoSeguridad.length === 4) {
    cvcInput.style.backgroundColor = '';
    return 'Válido';
  } else {
    cvcInput.style.backgroundColor = 'rgb(255, 197, 197)';
    return 'Inválido';
  }
}

// Agregar un evento de cambio al botón de opción de EFECTIVO
efectivoRadioButton.addEventListener("change", function () {
    if (tarjetaRadioButton.checked) {
        // Si se selecciona tarjeta de débito, mostrar el campo de información de tarjeta
        tarjetaInfoDiv.style.display = "none";
    } else {
        // De lo contrario, ocultar el campo de información de tarjeta
        tarjetaInfoDiv.style.display = "none";
        efectivoInfoDiv.style.display = "block";
    }
});

// Agregar listener del boton SIGUIENTE para que se pase a la recepcion
botonSiguienteFormaPago.addEventListener("click", AbrirRecepcion)

// Funcion que pasa a la recepcion
function AbrirRecepcion() {
  seccionFormaPago.style.display = "none";
  seccionRecepcion.style.display = "block";
  volver = 2;
}

// Agregar listener del boton ANTERIOR para que vuelva a la forma de pago
// botonAnteriorRecepcion.addEventListener("click", AbrirFormaPago)

function verificarFecha() {
    var fechaEntrega = document.getElementById("fecha_hora_entrega").value;
    const fechaHoraEntrega = new Date(fechaEntrega);
    var fechaActual = new Date();

    // Sumar 30 minutos a la fecha actual
    fechaActual.setMinutes(fechaActual.getMinutes() + 30);

    if (!fechaEntrega) {
        document.getElementById("mensajeError").textContent = "Debe ingresar un valor en la fecha.";
    }else if (fechaHoraEntrega < fechaActual) {
        document.getElementById("mensajeError").textContent = "La fecha debe ser al menos 30 minutos en el futuro.";
    }else{
        document.getElementById("mensajeError").textContent = "";
    }
}

function reemplazarCaracteres(texto, caracteresAReemplazar, caracteresNuevos) {
  var resultado = '';
  for (var i = 0; i < texto.length; i++) {
    var caracterActual = texto.charAt(i);
    var indice = caracteresAReemplazar.indexOf(caracterActual);
    if (indice !== -1) {
      resultado += caracteresNuevos.charAt(indice);
    } else {
      resultado += caracterActual;
    }
  }
  return resultado;
}


$('.cc-exp').payment('formatCardExpiry');

var liveValidateDetails = function() {
  var live_expiry = $('.cc-exp__example').payment('cardExpiryVal');
  var live_month = live_expiry["month"];
  var live_year = live_expiry["year"].slice(-4); // Extract the last 4 characters
  var live_validateExpiry = $.payment.validateCardExpiry(live_month, live_year);
  var live_validateCVC = $.payment.validateCardCVC($('.cc-cvc__example').val());

  $('.cc-exp__ouputMonth').text(live_month);
  $('.cc-exp__ouputYear').text(live_year);

  if (live_validateExpiry) {
    $('.cc-exp__example').addClass('identified');
    $('.cc-exp__ouputValid').text('Yes');
  } else {
    $('.cc-exp__example').removeClass('identified');
    $('.cc-exp__ouputValid').text('No');
  }

  if (live_validateCVC) {
    $('.cc-cvc__example').addClass('identified');
  } else {
    $('.cc-cvc__example').removeClass('identified');
  }
}