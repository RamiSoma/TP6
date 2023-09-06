// Obtener referencia a los elementos HTML relevantes
const tarjetaRadioButton = document.getElementById("tarjeta");
const tarjetaInfoDiv = document.getElementById("tarjeta_info");

const efectivoRadioButton = document.getElementById("efectivo");
const efectivoInfoDiv = document.getElementById("efectivo_info");

const inputImagen = document.getElementById('imagenInput');

const fechaVencimientoInput = document.getElementById("fechaVencimiento");
var banderaPrueba = 0

function subirImagen() {
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

inputImagen.addEventListener("change", subirImagen)



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

//     // Si ya se ingresaron dos dígitos para el mes y no se ha ingresado el año, automáticamente agregar "/"
//     if (valor.length === 2 && !valor.includes("/")) {
//         fechaVencimientoInput.value = valor + "/";
//     }
// });

function verificarFecha() {
    const fechaHoraEntrega = new Date(document.getElementById("fecha_hora_entrega").value);
    var fechaActual = new Date();

    // Sumar 30 minutos a la fecha actual
    fechaActual.setMinutes(fechaActual.getMinutes() + 30);

    if (fechaHoraEntrega < fechaActual) {
        document.getElementById("mensajeError").textContent = "La fecha debe ser al menos 30 minutos en el futuro.";
    }
}


//no se como se hace eso de que me diga el elemento
function validarTarjeta(numeroTarjeta) {
    // Expresiones regulares para Visa y Mastercard
    var visaPattern = /^4[0-9]{12}(?:[0-9]{3})?$/;
    var mastercardPattern = /^5[1-5][0-9]{14}$/;
  
    // Eliminar espacios en blanco y guiones
    numeroTarjeta = numeroTarjeta.replace(/\s/g, '').replace(/-/g, '');
  
    // Verificar si el número coincide con Visa o Mastercard
    if (visaPattern.test(numeroTarjeta)) {
      return 'Visa';
    } else if (mastercardPattern.test(numeroTarjeta)) {
      return 'Mastercard';
    } else {
      return 'Desconocida';
    }
}

function validarFechaVencimiento(fechaVencimiento) {
  // Verifica que la fecha de vencimiento esté en el formato "MM/AA"
  var formatoValido = /^(\d{2})\/(\d{2})$/;
  if (!formatoValido.test(fechaVencimiento)) {
    return false;
  }

  // Extrae el mes y el año de la fecha de vencimiento
  var partesFecha = fechaVencimiento.split('/');
  var mes = parseInt(partesFecha[0], 10);
  var año = parseInt(partesFecha[1], 10);

  // Obtiene la fecha actual
  var fechaActual = new Date();
  var añoActual = fechaActual.getFullYear();
  var mesActual = fechaActual.getMonth() + 1; // El mes en JavaScript es de 0 a 11

  // Compara la fecha de vencimiento con la fecha actual
  if (año < añoActual || (año === añoActual && mes < mesActual)) {
    return false; // La fecha de vencimiento es anterior a la fecha actual
  }

  return true; // La fecha de vencimiento es válida
}

function validarCodigoSeguridad(codigoSeguridad) {
    // Verificar si el código de seguridad es un número válido
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