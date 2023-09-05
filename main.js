

// Obtener referencia a los elementos HTML relevantes
const tarjetaRadioButton = document.getElementById("tarjeta");
const tarjetaInfoDiv = document.getElementById("tarjeta_info");

const efectivoRadioButton = document.getElementById("efectivo");
const efectivoInfoDiv = document.getElementById("efectivo_info");

const inputImagen = document.getElementById('imagenInput');

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
document.getElementById("pedidoForm").addEventListener("submit", function (event) {
    // PRIMERO OBTENEMOS LOS VALORES DEL DOCUMENTO HTML
    const comercioCalle = document.getElementById("comercio_calle").value;
    const comercioNumero = document.getElementById("comercio_numero").value;

    /* aca se agregarian las validaciones, en este caso nos fijamos que sean solo letras
    if(esSoloLetras(comercioCalle)){

    }
    */
})