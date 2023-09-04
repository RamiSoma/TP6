

// Obtener referencia a los elementos HTML relevantes
const tarjetaRadioButton = document.getElementById("tarjeta");
const tarjetaInfoDiv = document.getElementById("tarjeta_info");

const efectivoRadioButton = document.getElementById("efectivo");
const efectivoInfoDiv = document.getElementById("efectivo_info");


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