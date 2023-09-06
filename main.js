// Obtener referencia a los elementos HTML relevantes
const tarjetaRadioButton = document.getElementById("tarjeta");
const tarjetaInfoDiv = document.getElementById("tarjeta_info");

const efectivoRadioButton = document.getElementById("efectivo");
const efectivoInfoDiv = document.getElementById("efectivo_info");

const inputImagen = document.getElementById('imagenInput');

const fechaVencimientoInput = document.getElementById("fechaVencimiento");

const botonSiguienteProducto = document.getElementById("btn_siguiente1");
const botonSiguienteDirecciones = document.getElementById("btn_siguiente2");

// Variables de las secciones
const seccionProductos = document.getElementById("seccion-producto");
const seccionDirecciones = document.getElementById("seccion-direcciones");
const seccionFormaPago = document.getElementById("seccion-forma-pago");
const seccionRecepcion = document.getElementById("seccion-recepcion");

// Primero se carga la página y cuando se carga hacer la funcion cargar página
window.addEventListener("load", CargarPagina())

// Cargar la pagina, solo mostrando las seccion de productos
function CargarPagina() {
  // Seccion del producto queda mostrandose
  seccionProductos.style.display = "block";
  // Ocultar demás secciones
  seccionDirecciones.style.display = "none";
  seccionFormaPago.style.display = "none";
  seccionRecepcion.style.display = "none";
}


// Cuando se toca siguiente, se tiene que pasar a la parte de direcciones
botonSiguienteProducto.addEventListener("click", AbrirDirecciones())

// Funcion que hace que se oculte 
function AbrirDirecciones() {
  seccionProductos.style.display = "none";
  seccionDirecciones.style.display = "block";
}

// Funcion que valida el subir la imagen
function SubirImagen() {
    var imagenMostrada = document.getElementById('imagenMostrada');

    if (inputImagen.files.length === 0) {
        console.log('Selecciona una imagen para subir.')
        imagenMostrada.style.display = 'none';
        return;
    }

    var imagen = inputImagen.files[0];

    if (imagen.type !== 'image/jpeg') {
        console.log('Por favor, selecciona una imagen en formato JPG.')
        imagenMostrada.style.display = 'none';
        return;
    }

    if (imagen.size > 5 * 1024 * 1024) {
        alert('La imagen es demasiado grande. Inténtelo nuevamente.')
        imagenMostrada.style.display = 'none';
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
}

// Agregar un evento de cambio al botón de opción de tarjeta
tarjetaRadioButton.addEventListener("change", function () {
    if (tarjetaRadioButton.checked) {
        // Si se selecciona tarjeta de débito, mostrar el campo de información de tarjeta
        tarjetaInfoDiv.style.display = "block";
    } else {
        // De lo contrario, ocultar el campo de información de tarjeta
        tarjetaInfoDiv.style.display = "none";
    }
});

// Agregar un evento de cambio al botón de opción de tarjeta
efectivoRadioButton.addEventListener("change", function () {
    if (tarjetaRadioButton.checked) {
        // Si se selecciona tarjeta de débito, mostrar el campo de información de tarjeta
        tarjetaInfoDiv.style.display = "none";
    } else {
        // De lo contrario, ocultar el campo de información de tarjeta
        tarjetaInfoDiv.style.display = "none";
    }
});

inputImagen.addEventListener("change", SubirImagen())



// ACA ADENTRO VAMOS A HACER LAS VALIDACIONES
document.getElementById("pedidoForm").addEventListener("submit", function (e) {
    e.preventDefault()
    // PRIMERO OBTENEMOS LOS VALORES DEL DOCUMENTO HTML
    const comercioCalle = document.getElementById("comercio_calle").value;
    const comercioNumero = document.getElementById("comercio_numero").value;
    

    
    /* aca se agregarian las validaciones, en este caso nos fijamos que sean solo letras
    if(esSoloLetras(comercioCalle)){

    }
    */
   if(document.getElementById("fecha_hora_programada").checked){
        verificarFecha();
   }
   
    
})

// NO FUNCIONA LO QUE QUIERO HACER LPM
// fechaVencimientoInput.addEventListener("input", function () {
//     const valor = fechaVencimientoInput.value;

//     // Verificar si el valor tiene el formato MM/AAAA completo
//     if (/^(0[1-9]|1[0-2])\/\d{4}$/.test(valor)) {
//         // El formato es válido, no hacemos nada especial
//     } else {
//         // El formato no es válido, eliminamos caracteres no permitidos
//         fechaVencimientoInput.value = valor.replace(/[^\d\/]/g, "");
//     }

//     // Si ya se ingresaron dos dígitos para el mes y no se ha ingresado el aanio, automáticamente agregar "/"
//     if (valor.length === 2 && !valor.includes("/")) {
//         fechaVencimientoInput.value = valor + "/";
//     }
// });

function VerificarFecha() {
    const fechaHoraEntrega = new Date(document.getElementById("fecha_hora_entrega").value);
    var fechaActual = new Date();

    // Sumar 30 minutos a la fecha actual
    fechaActual.setMinutes(fechaActual.getMinutes() + 30);

    if (fechaHoraEntrega < fechaActual) {
        document.getElementById("mensajeError").textContent = "La fecha debe ser al menos 30 minutos en el futuro.";
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


//Fijarse que el textbox acepte solo intergers hasta 15 caracteres
function ValidarTarjeta() {
    //Asignamos a la variable numeroTarjeta el numero de tarjeta traido desde la pagina.
    var numeroTarjeta = document.getElementById('numeroTarjeta').value;  
    // Expresiones regulares para Visa y Mastercard
    var visaPattern = /^4[0-9]{12}(?:[0-9]{3})?$/;
    var mastercardPattern = /^5[1-5][0-9]{14}$/;
  
    // Verificar si el número coincide con Visa o Mastercard
    if (visaPattern.test(numeroTarjeta)) {
      return 'Visa';
    } else if (mastercardPattern.test(numeroTarjeta)) {
      return 'Mastercard';
    } else {
      return 'Desconocida';
    }
}

function ValidarFechaVencimiento() {
  //asignamos a la variable fechaVencimiento

  // Verifica que la fecha de vencimiento esté en el formato "MM/AA"
  var fechaVencimiento = document.getElementById('fechaVencimiento').value;
  var formatoValido = /^(\d{2})\/(\d{4})$/;
  if (!formatoValido.test(fechaVencimiento)) {
    return false;
  }

  // Extrae el mes y el anio de la fecha de vencimiento
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

//deberia tener en cuenta que tarjeta tiene tipo visa o mastercard
function ValidarCodigoSeguridad() {
    // Verificar si el código de seguridad es un número válido
    var codigoSeguridad = document.getElementById('cvc').value;
    if (!/^\d+$/.test(codigoSeguridad)) {
      return 'Inválido';
    }
  
    // Verificar la longitud del código de seguridad (CVV o CVC)
    if (codigoSeguridad.length === 3 || codigoSeguridad.length === 4) {
      return 'Válido';
    } else {
      return 'Inválido';
    }
}






// Agregar listeners a los campos de entrada
var numeroTarjetaInput = document.getElementById('numeroTarjeta');
var cvcInput = document.getElementById('cvc');

numeroTarjetaInput.addEventListener('input', function () {
  var resultado = ValidarTarjeta();
  console.log(resultado);
});

fechaVencimientoInput.addEventListener('input', function () {
  var resultado = ValidarFechaVencimiento();
  console.log(resultado);
});

cvcInput.addEventListener('input', function () {
  var resultado = ValidarCodigoSeguridad();
  console.log(resultado);
});