// Obtener referencia a los elementos HTML relevantes
const tarjetaRadioButton = document.getElementById("tarjeta");
const tarjetaInfoDiv = document.getElementById("tarjeta-info");

const efectivoRadioButton = document.getElementById("efectivo");
const efectivoInfoDiv = document.getElementById("efectivo-info");
const fechaProgramada = document.getElementById("fecha-hora-programada");
const loAntesPosible = document.getElementById("lo-antes-posible");

const inputImagen = document.getElementById('imagen-input');
const labelImagen = document.getElementById('imagen-label');
const eliminarImagen = document.getElementById('eliminar-imagen');
var comercioCiudad = document.getElementById("comercio-ciudad");
var entregaCiudad = document.getElementById("entrega-ciudad");

const fechaVencimientoInput = document.getElementById("cc-exp");
var inputMontoProductos = document.getElementById("total")

// Variables de botones
const botonSiguienteProducto = document.getElementById("btn-siguiente1");
const botonSiguienteDirecciones = document.getElementById("btn-siguiente2");
const botonSiguienteRecepcion = document.getElementById("btn-siguiente3");
const botonAnterior = document.getElementById("btn-anterior");
// const botonAnteriorFormaPago = document.getElementById("btn_anterior2");
// const botonAnteriorRecepcion = document.getElementById("btn_anterior3");
const botonRealizarPedido = document.getElementById("submit");

// Variables de las secciones
const seccionProductos = document.getElementById("seccion-producto");
const seccionDirecciones = document.getElementById("seccion-direcciones");
const seccionFormaPago = document.getElementById("seccion-forma-pago");
const seccionRecepcion = document.getElementById("seccion-recepcion");
const seccionDatos = document.getElementById("seccion-datos");

// Variables de los datos del negocio
var productosBusqueda;
var totalProductos;
const totalProductosMostrar = document.getElementById("total-productos");
const subtotalMostrar = document.getElementById("subtotal");
var comercioCalle;  
var entregaCalle;
var subtotal;


//variables de efectivo
var moneda = document.getElementById('monto');

// Variables de la tarjeta
var numeroTarjetaInput = document.getElementById('numero-tarjeta');
var cvcInput = document.getElementById('cvc');
var nombreTarjeta = document.getElementById('nombre-tarjeta');
var expiracion  = document.getElementById('cc-exp');
var flagTarjeta = false;

// Variable volver
var volver = 0;
var inicio = document.getElementById("btn-volver-inicio")

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


var totalInput = document.getElementById('total');
var prevValue = '';
var typingTimeout;

totalInput.addEventListener('input', function () {
    clearTimeout(typingTimeout);

    typingTimeout = setTimeout(function () {
        var inputValue = totalInput.value;

        // Remover caracteres no numéricos excepto comas y puntos
        inputValue = inputValue.replace(/[^\d,.]/g, '');

        // Reemplazar puntos por comas para el separador decimal
        inputValue = inputValue.replace(/\./g, ',');

        // Eliminar ceros a la izquierda, pero mantener un 0 inicial
        inputValue = inputValue.replace(/^0(?=\d)/, '');

        if (inputValue === '') {
            // Si el campo está vacío, no mostrar NaN
            totalInput.value = '';
            prevValue = '';
            return;
        }

        // Formatear como moneda (ARS)
        if (!isNaN(inputValue.replace(',', '.'))) {
            var numericValue = parseFloat(inputValue.replace(',', '.'));
            var formattedValue = new Intl.NumberFormat('es-AR', {
                style: 'currency',
                currency: 'ARS',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format(numericValue);
            totalInput.value = formattedValue;
            prevValue = formattedValue;
        } else {
            totalInput.value = prevValue;
        }
    }, 500); // Esperar 1 segundo de inactividad para formatear (ajusta según lo necesites)
});







// Listener para que vea cuando se sube una foto
inputImagen.addEventListener("change", SubirImagen)

// Listener para que no pueda ingresar negativos en el total de los productos
//inputMontoProductos.addEventListener("onkeydown", ValidarMontoPositivo(inputMontoProductos))


// Funcion que valida un monto positivo
// function ValidarMontoPositivo(event) {
//   if (event.key === "-" || event.key === "-") {
//     event.preventDefault();
//   }
// }

// Funcion que valida el subir la imagen
function SubirImagen() {
  var imagenMostrada = document.getElementById('imagen-mostrada');

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
  var imagenMostrada = document.getElementById('imagen-mostrada');

  eliminarImagen.style.display = 'none';
  imagenMostrada.src = '#';
  imagenMostrada.style.display = 'none';
  labelImagen.style.display = 'block';
})

// Cuando se toca siguiente, se tiene que pasar a la parte de direcciones y se hacen las validaciones de primer campo
botonSiguienteProducto.addEventListener("click", function(){
    productosBusqueda = document.getElementById("busqueda").value;
    totalProductos = document.getElementById("total").value;
    if ( productosBusqueda != "" ) {
      if (totalProductos != "") {
        AbrirDirecciones();
        document.getElementById("mensaje-error").textContent = "";
      }else{
        document.getElementById("mensaje-error").textContent = "Debe indicar el precio del / los productos ingresados";
      }
    }else{
        document.getElementById("mensaje-error").textContent = "Debe ingresar el / los productos a comprar";
    }
    
})

const sugerencias1 = document.getElementById('sugerencias1');
const sugerencias2 = document.getElementById('sugerencias2');
const opciones = ['Carlos Paz', 'Córdoba'];

comercioCiudad.addEventListener('input', function() {
    const texto = comercioCiudad.value.toLowerCase();
    sugerencias1.innerHTML = '';

    if (texto.length === 0) {
        return;
    }

    const resultados = opciones.filter(opcion => opcion.toLowerCase().replace("ó","o").includes(texto));

    resultados.forEach(resultado => {
        const sugerencia = document.createElement('div');
        sugerencia.textContent = resultado;
        sugerencia.addEventListener('click', function() {
          comercioCiudad.value = resultado;
            sugerencias1.innerHTML = '';
        });
        sugerencias1.appendChild(sugerencia);
    });
});

entregaCiudad.addEventListener('input', function() {
  const texto = entregaCiudad.value.toLowerCase();
  sugerencias2.innerHTML = '';

  if (texto.length === 0) {
      return;
  }

  const resultados = opciones.filter(opcion => opcion.toLowerCase().includes(texto));

  resultados.forEach(resultado => {
      const sugerencia = document.createElement('div');
      sugerencia.textContent = resultado;
      sugerencia.addEventListener('click', function() {
        entregaCiudad.value = resultado;
          sugerencias2.innerHTML = '';
      });
      sugerencias2.appendChild(sugerencia);
  });
});

document.addEventListener('click', function(event) {
    if (event.target !== comercioCiudad && event.target !== sugerencias1 && event.target !== sugerencias2 && event.target !== entregaCiudad && window.getComputedStyle(seccionDirecciones).display !== 'none') {
        sugerencias1.innerHTML = '';
        sugerencias2.innerHTML = '';
    }
});

// Funcion que hace que se oculte lo de productos y se habilite lo de las direcciones
function AbrirDirecciones() {
  seccionProductos.style.display = "none";
  seccionDirecciones.style.display = "block";
  seccionRecepcion.style.display = "none";
  seccionFormaPago.style.display = "none";
  botonAnterior.style.display = "block";
  volver = 0;
}

// Agregar listener del boton ANTERIOR para que vuelva a los productos
botonAnterior.addEventListener("click", volverPag)

function volverPag(){
  if (volver === 0) {
    CargarPagina();
    volver = 0;
  }
  if (volver === 1) {
    AbrirDirecciones();
    volver = 0;
  }
  if (volver === 2) {
    AbrirRecepcion();
    volver === 1;
  }
  // if (volver === 3) {
  //   AbrirFormaPago();
  //   volver === 2;
  // }
  document.getElementById("mensaje-error").textContent = "";
}


// Agregar listener del boton SIGUIENTE para que pase a la recepción
botonSiguienteDirecciones.addEventListener("click", function(){
    comercioCalle = document.getElementById("comercio-calle").value;
    comercioCiudad = document.getElementById("comercio-ciudad").value;

    entregaCalle = document.getElementById("entrega-calle").value;
    entregaCiudad = document.getElementById("entrega-ciudad").value;
    if (comercioCalle === entregaCalle) {
      document.getElementById("mensaje-error").textContent = "Las direcciones NO deben coincidir";
    } else if (comercioCalle != "" && comercioCiudad != null && entregaCalle != "" && entregaCiudad != "" && comercioCiudad != "" && entregaCiudad != null) {
        if ((entregaCiudad.toLowerCase() === "córdoba" || entregaCiudad.toLowerCase() === "cordoba" || entregaCiudad.toLowerCase() === "carlos paz") && (comercioCiudad.toLowerCase() === "córdoba" || comercioCiudad.toLowerCase() === "cordoba" || comercioCiudad.toLowerCase() === "carlos paz") ) {
          AbrirRecepcion();
          document.getElementById("mensaje-error").textContent = "";
        } else {
          document.getElementById("mensaje-error").textContent = "La ciudad no es válida";
        } 
    } else{
        document.getElementById("mensaje-error").textContent = "Debe completar todos los campos...";
    }
  
})

// AGREGAR VALIDACIONES Y COSAS DE LA CALLE Y DIRECCIONE

function AbrirFormaPago() {
  // Supongamos que totalProductos es un valor con coma como separador decimal
  var totalProductosTexto = totalProductos; // Asegúrate de que totalProductos se maneje como texto

  // Reemplaza la coma por un punto para que JavaScript lo interprete como número decimal
  totalProductosTexto = totalProductosTexto.replace(',', '.');

  // Convierte totalProductosTexto a un número decimal
  var precioProductos = parseFloat(totalProductosTexto);

  // Asegúrate de que costoEnvio se maneje como número decimal
  var costoEnvio = 500.0; // Siempre se considera como número decimal

  // Redondea los números a dos decimales antes de la suma
  precioProductos = Math.round(precioProductos * 100) / 100;
  costoEnvio = Math.round(costoEnvio * 100) / 100;

  // Calcula el subtotal incluyendo el envío
  var subtotal = precioProductos + costoEnvio;

  // Formatea el subtotal para mostrarlo con coma como separador decimal
  var subtotalFormateado = subtotal.toLocaleString('es-AR', { minimumFractionDigits: 2 });

  // Muestra el subtotal en el formato deseado
  subtotalMostrar.innerHTML = "Subtotal: $" + subtotalFormateado;

  // Resto de tu código
  totalProductosMostrar.innerHTML = "Productos: $" + totalProductos;
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
        mensajeError.textContent = "";
    } else {
        // De lo contrario, ocultar el campo de información de tarjeta
        tarjetaInfoDiv.style.display = "none";
        mensajeError.textContent = "";
    }
});

// Agregar listener PARA CUANDO SE INGRESE LA TARJETA

numeroTarjetaInput.addEventListener('input', function () {
  // Eliminar caracteres no numéricos, comas y puntos
  var numeroTarjeta = numeroTarjetaInput.value.replace(/[^\d]/g, '');
  // Formatear el número de tarjeta con espacios cada 4 dígitos
  numeroTarjeta = formatNumber(numeroTarjeta);
  // Actualizar el valor del campo de entrada
  numeroTarjetaInput.value = numeroTarjeta;
  // Validar la tarjeta después del formateo
  ValidarTarjeta();
});

// Función para formatear el número de tarjeta con espacios cada 4 dígitos
const input = document.getElementById("numero-tarjeta");
input.addEventListener("input", () => input.value = formatNumber(input.value.replaceAll(" ", "")));

function formatNumber(number) {
  return number.split("").reduce((seed, next, index) => {
    if (index !== 0 && !(index % 4)) {
      seed += " ";
    }
    return seed + next;
  }, "");
}

// Función para validar la tarjeta de crédito
function ValidarTarjeta() {
  // Verificar si el número de tarjeta es un número válido
  var numeroTarjeta = numeroTarjetaInput.value.replace(/\s/g, '');
  if (numeroTarjeta === '') {
    // Si el campo de tarjeta está vacío, resetea el fondo y muestra un mensaje de error
    numeroTarjetaInput.style.backgroundColor = '';
    document.getElementById('mensaje-error').textContent = 'Número de tarjeta requerido';
    return 'Número de tarjeta requerido';
  }
  if (!/^\d+$/.test(numeroTarjeta)) {
    document.getElementById('numero-tarjeta').className = 'error'; // Aplicar la clase 'error'
    document.getElementById('mensaje-error').textContent = 'Número de tarjeta inválido';
    return 'Número de tarjeta inválido';
  }

  // Expresiones regulares para Visa y Mastercard
  var visaPattern = /^4[0-9]{15}?$/;
  var mastercardPattern = /^5[1-5][0-9]{14}$/;

  // Verificar si el número coincide con Visa o Mastercard
  if (visaPattern.test(numeroTarjeta)) {
    document.getElementById('numero-tarjeta').className = ''; // Quitar la clase 'error'
    numeroTarjetaInput.style.backgroundColor = '';
    document.getElementById("tipo-tarjeta-label").style.display = "block";
    document.getElementById('tipo-tarjeta').textContent = 'Visa';
    document.getElementById('mensaje-error').textContent = '';
    return 'Visa';
  } else if (mastercardPattern.test(numeroTarjeta)) {
    document.getElementById('numero-tarjeta').className = ''; // Quitar la clase 'error'
    numeroTarjetaInput.style.backgroundColor = '';
    document.getElementById("tipo-tarjeta-label").style.display = "block";
    document.getElementById('tipo-tarjeta').textContent = 'Mastercard';
    document.getElementById('mensaje-error').textContent = '';
    return 'Mastercard';
  } else {
    document.getElementById('numero-tarjeta').className = 'error'; // Aplicar la clase 'error'
    numeroTarjetaInput.style.backgroundColor = 'rgb(255, 197, 197)';
    document.getElementById("tipo-tarjeta-label").style.display = "block";
    document.getElementById('tipo-tarjeta').textContent = 'Desconocida';
    document.getElementById('mensaje-error').textContent = 'Tipo de tarjeta desconocido';
    return 'Tipo de tarjeta desconocido';
  }
}

var nombreTarjetaInput = document.getElementById('nombre-tarjeta');

nombreTarjetaInput.addEventListener('input', function () {
  var nombreTarjeta = nombreTarjetaInput.value;
  var soloLetras = /^[A-Za-z\s]+$/;

  if (!soloLetras.test(nombreTarjeta)) {
    // Si se ingresan caracteres no permitidos, muestra un mensaje de error
    nombreTarjetaInput.style.backgroundColor = 'rgb(255, 197, 197)';
    document.getElementById('mensaje-error').textContent = 'Ingresa solo letras en este campo';
    // Elimina los caracteres no permitidos
    nombreTarjetaInput.value = nombreTarjeta.replace(/[^A-Za-z\s]+/g, '');
  } else {
    // Si la entrada es válida, restaura los estilos y elimina el mensaje de error
    nombreTarjetaInput.style.backgroundColor = '';
    document.getElementById('mensaje-error').textContent = '';
  }
});

// Agregar evento input al input de fecha de vencimiento
var mensajeError = document.getElementById('mensaje-error');

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
  // Eliminar caracteres no numéricos
  var cvc = cvcInput.value.replace(/[^\d]/g, '');
  // Limitar la longitud a 3 caracteres
  cvc = cvc.substring(0, 3);
  // Actualizar el valor del campo de entrada
  cvcInput.value = cvc;
  // Validar el CVC después del formateo
  ValidarCodigoSeguridad();
});

// Funcion que valida el codigo de seguridad
// Debe tener en cuenta qué tipo de tarjeta se ha ingresado (Visa o Mastercard)
// Función para validar el código de seguridad
function ValidarCodigoSeguridad() {
  // Verificar si el código de seguridad es un número válido
  var codigoSeguridad = document.getElementById('cvc').value;
  if (codigoSeguridad === '') {
    // Si el campo de código de seguridad está vacío, resetea el fondo y muestra un mensaje de error
    cvcInput.style.backgroundColor = '';
    document.getElementById('mensaje-error').textContent = 'Código de seguridad requerido';
    return 'Código de seguridad requerido';
  }
  if (!/^\d+$/.test(codigoSeguridad)) {
    document.getElementById('mensaje-error').textContent = 'Código de seguridad inválido';
    return 'Código de seguridad inválido';
  }

  // Obtener el tipo de tarjeta actual
  var tipoTarjeta = ValidarTarjeta();

  // Verificar la longitud del código de seguridad (CVV o CVC) según el tipo de tarjeta
  if (
    (tipoTarjeta === 'Visa' && codigoSeguridad.length === 3) ||
    (tipoTarjeta === 'Mastercard' && codigoSeguridad.length === 3)
  ) {
    cvcInput.style.backgroundColor = '';
    document.getElementById('mensaje-error').textContent = '';
    return 'Válido';
  } else {
    cvcInput.style.backgroundColor = 'rgb(255, 197, 197)';
    document.getElementById('mensaje-error').textContent = 'Longitud de código de seguridad incorrecta';
    return 'Longitud de código de seguridad incorrecta';
  }
}

// Agregar un evento de cambio al botón de opción de EFECTIVO
efectivoRadioButton.addEventListener("change", function () {
    if (tarjetaRadioButton.checked) {
        // Si se selecciona tarjeta de débito, mostrar el campo de información de tarjeta
        tarjetaInfoDiv.style.display = "none";
        mensajeError.textContent = "";
    } else {
        // De lo contrario, ocultar el campo de información de tarjeta
        tarjetaInfoDiv.style.display = "none";
        efectivoInfoDiv.style.display = "grid";
        mensajeError.textContent = "";
    }
});

//Formateo de moneda
moneda.addEventListener('input', function(){formatCurrency});
let formateador = new Intl.NumberFormat('es-AR',{
  style: 'currency',
  currency:'ARS',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2

})

function formatCurrency(moneda) {
  // Obtén el valor actual del input
  let valorInput = formateador.format(moneda.value);
  input.value = valorInput;
  /*
  // Verifica si el número es válido
  if (!isNaN(valorInput)) {
      // Formatea el número en el formato de moneda argentina
      input.value = number.toLocaleString('es-AR', {
          style: 'currency',
          currency: 'ARS'
      });
  } else {
      // Si el número no es válido, muestra un valor vacío o un mensaje de error
      input.value = '';
  }*/
}

// Agregar listener del boton SIGUIENTE para que se pase a la forma de pago
botonRealizarPedido.addEventListener("click", function(){
  if (tarjetaRadioButton.checked || efectivoRadioButton.checked) {
    var montoPaga = document.getElementById("monto").value;
    totalProductos = document.getElementById("total").value;
    if (efectivoRadioButton.checked){
      if(montoPaga != null && parseInt(montoPaga) >= parseInt(totalProductos) + 500){
      ConfirmarPedido();
      document.getElementById("mensaje-error").textContent = "";
    }else{
      document.getElementById("mensaje-error").textContent = "Ingresar un valor mayor que el monto de compra";
    }}
    if (tarjetaRadioButton.checked) {
      if (tarjetaRadioButton.checked  && nombreTarjeta.value.replace(" ","") != "" && ValidarFechaVencimiento() && ValidarCodigoSeguridad() == 'Válido' && (ValidarTarjeta() == 'Visa' || ValidarTarjeta() == 'Mastercard')) {
        ConfirmarPedido();
        document.getElementById("mensaje-error").textContent = "";
      } else {
        document.getElementById("mensajeError").textContent = "Deben llenarse todos los campos";
    }}
  } else {
    document.getElementById("mensaje-error").textContent = "Debe seleccionar una forma de pago";
  }
});

// Agregar evento input al campo de entrada monto
var montoInput = document.getElementById('monto');
var prevMontoValue = montoInput.value;
var mensajeError = document.getElementById('mensaje-error'); // Asegúrate de que el mensaje de error tenga el ID correcto

montoInput.addEventListener('input', function () {
    var montoValue = montoInput.value;

    // Reemplazar punto por coma y eliminar caracteres no numéricos
    montoValue = montoValue.replace(/\./g, ',').replace(/[^\d,]/g, '');

    // Verificar si ya hay una coma presente en el valor
    var commaCount = (montoValue.match(/,/g) || []).length;

    if (commaCount > 1 || montoValue.startsWith(',')) {
        // Si ya hay una coma como primer carácter o se intenta agregar otra coma,
        // eliminar la coma recién ingresada y asegurarse de que no sea el primer carácter
        montoValue = prevMontoValue;
    }

    // Verificar si el valor es negativo
    if (montoValue.startsWith('-')) {
        montoValue = montoValue.substring(1); // Eliminar el signo negativo
    }

    // Actualizar el valor del campo de entrada monto
    montoInput.value = montoValue;
    prevMontoValue = montoValue;

    // Borrar el mensaje de error
    mensajeError.textContent = '';
});

// Funcion que pasa a la recepcion
function AbrirRecepcion() {
  seccionDirecciones.style.display = "none";
  seccionFormaPago.style.display = "none";
  seccionRecepcion.style.display = "block";
  volver = 1;
  //botonAnterior.style.display = "none";
}

// Agregar un listener al campo de entrada de fecha y hora
var fechaHoraEntregaInput = document.getElementById("fecha-hora-entrega");
fechaHoraEntregaInput.addEventListener("input", VerificarFecha);
// Agregar listener del boton ANTERIOR para que vuelva a la forma de pago
// botonAnteriorRecepcion.addEventListener("click", AbrirFormaPago)
botonSiguienteRecepcion.addEventListener("click", function(){
  if(fechaProgramada.checked){
    if (VerificarFecha()){
      AbrirFormaPago();
    }
  }
  if(loAntesPosible.checked){
    AbrirFormaPago();
  }
});

function VerificarFecha() {
  var fechaEntrega = fechaHoraEntregaInput.value;
  const fechaHoraEntrega = new Date(fechaEntrega);
  var fechaActual = new Date();
  const fechaMaxima = new Date();
  fechaMaxima.setDate(fechaActual.getDate() + 7);

  // Sumar 30 minutos a la fecha actual
  fechaActual.setMinutes(fechaActual.getMinutes() + 30);

  if (!fechaEntrega) {
    document.getElementById("mensaje-error").textContent = "Debe ingresar un valor en la fecha.";
    return false;
  } else if (fechaHoraEntrega <= fechaActual) {
    document.getElementById("mensaje-error").textContent = "La fecha debe ser mayor a hoy! :D";
    return false;
  } else if (fechaHoraEntrega >= fechaMaxima) {
    document.getElementById("mensaje-error").textContent = "La programación del pedido puede ser de hasta 7 días posteriores! :D";
    return false;
  } else if (fechaHoraEntrega.getHours() < 7 ||
    fechaHoraEntrega.getHours() > 23 ||
    fechaHoraEntrega.getMinutes() < 0 ||
    fechaHoraEntrega.getMinutes() > 59) {
    document.getElementById("mensaje-error").textContent = "Recuerda que el comercio abre de 7 a 23:59! :D";
    return false;
  } else {
    document.getElementById("mensaje-error").textContent = "";
    return true;
  }
}



function ConfirmarPedido(){
    const montoPagar = document.getElementById("monto-pagar");
    const direccionComercio = document.getElementById("direccion-comercio");
    const direccionEntrega = document.getElementById("direccion-entrega");
    const formaPago = document.getElementById("forma-pago");
    const recepcion = document.getElementById("recepcion");
    var fechaHora = document.getElementById("fecha-hora-entrega").value;

    const [fechaPart, horaPart] = fechaHora.split("T");
    const [año, mes, dia] = fechaPart.split("-").map(Number);
    
    montoPagar.textContent = '$' + totalProductos + ' + $500 de envío';
    direccionComercio.textContent = comercioCalle + ' - ' + comercioCiudad;
    direccionEntrega.textContent = entregaCalle + ' - ' + entregaCiudad;
    if (efectivoRadioButton.checked) {
      formaPago.textContent = "efectivo";
    } else {
      formaPago.textContent = "tarjeta de débito/crédito";
    }
    if (loAntesPosible.checked) {
      recepcion.textContent = "Lo antes posible" ;
    } else {
      recepcion.textContent = 'Pedido programado para el día ' + dia + '/' + mes + ' a las ' + horaPart + ' hs';
    }

    realizarConfirmacion();
}

//Funcion para realizarConfirmacion del pedido
function realizarConfirmacion(){
  const confirmado = document.getElementById("btn-conf-conf")
  const cancelado = document.getElementById("btn-conf-canc")

  confirmame.style.opacity = "1";
  confirmame.style.pointerEvents = "auto";


  confirmado.addEventListener("click",function(){
    seccionFormaPago.style.display = "none";
    confirmame.style.opacity = "0";
    popup.style.opacity = "1";
    popup.style.pointerEvents = "auto";
    // Ocultar el popup después de 5 segundos
    setTimeout(function () {
        popup.style.opacity = "0";
        popup.style.pointerEvents = "none";
    }, 3000);

    seccionRecepcion.style.display = "none";
    seccionDatos.style.display = "block";
    botonAnterior.style.display = "none";
  })

  cancelado.addEventListener("click",function(){
    AbrirFormaPago();
    confirmame.style.opacity = "0";
    cancelo.style.opacity = "1";
    cancelo.style.pointerEvents = "auto";
    // Ocultar el popup después de 5 segundos
    setTimeout(function () {
        cancelo.style.opacity = "0";
        cancelo.style.pointerEvents = "none";
    }, 2000);

  })



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

fechaProgramada.addEventListener("change", function(){
  var inputFecha = document.getElementById("fecha-hora-entrega");
  if (fechaProgramada.checked){
    inputFecha.style.display = "block";
  }else{
    inputFecha.style.display = "none";
  }
})

loAntesPosible.addEventListener("change", function(){
  var inputFecha = document.getElementById("fecha-hora-entrega");
  if (loAntesPosible.checked){
    inputFecha.style.display = "none";
  }
})

inicio.addEventListener("click",function(){
  location.reload();
 /* volver = 0
  volverPag();*/
})