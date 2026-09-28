function validarCampoObligatorio(campo, errorElement, mensaje) {
    if (campo.value.trim() === '') {
        errorElement.textContent = mensaje;
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}

function validarLongitud(campo, errorElement, min, max, mensaje) {
    if (campo.value.length < min || campo.value.length > max) {
        errorElement.textContent = mensaje;
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}

function validarCorreo(campo, errorElement,mensaje) {
    const correoRegex = /^[a-zA-Z0-9._%+-]+@unicauca\.edu\.co$/;
    if (!correoRegex.test(campo.value)) {
        errorElement.textContent = mensaje;
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}

function validarGenero(genero, errorElement, mensaje) {
    let seleccionado = false;
    for (let i = 0; i < genero.length; i++) {
        if (genero[i].checked) {
            seleccionado = true;
            break;
        }
    }

    if (!seleccionado) {
        errorElement.textContent = mensaje;
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}

function mostrarMensajeExito() {
    Toastify({
        text: "✅ ¡Registro exitoso!",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
            background: "#198754",
            color: "#fff"
        },
        stopOnFocus: true,
    }).showToast();
}

function validarFormulario() {
    const inputTipoIdentificacion = document.getElementById('identificacion');
    const inputIdentificacion = document.getElementById('numero-identificacion');
    const inputNombres = document.getElementById('nombres');
    const inputApellidos = document.getElementById('apellidos');
    const inputCorreoElectronico = document.getElementById('correo-electronico');
    const inputGenero = document.getElementsByName('genero');

    const labelErrorTipoIdentificacion=document.getElementById('errorTipoIdentificacion');
    const labelErrorNumeroIdentificacion=document.getElementById('errorNumeroIdentificacion');
    const labelErrorNombres=document.getElementById('errorNombres');
    const labelErrorApellidos=document.getElementById('errorApellidos');
    const labelErrorCorreo=document.getElementById('errorCorreo');
    const labelErrorGenero=document.getElementById('errorGenero');

    const tipoIdentificacionValida=validarCampoObligatorio(inputTipoIdentificacion,labelErrorTipoIdentificacion,"El tipo de identificación es obligatorio");
    const identificacionValida = validarCampoObligatorio(inputIdentificacion,labelErrorNumeroIdentificacion, 'La identificación es obligatoria');
    const nombresValidos = validarLongitud(inputNombres,labelErrorNombres , 1, 20, 'El nombre debe tener entre 1 y 20 caracteres');
    const apellidosValidos = validarLongitud(inputApellidos,labelErrorApellidos , 1, 20, 'El apellido debe tener entre 1 y 20 caracteres');
    const correoValido = validarCorreo(inputCorreoElectronico, labelErrorCorreo,'El correo debe tener el dominio @unicauca.edu.co');
    const generoValido = validarGenero(inputGenero,labelErrorGenero,'El género es obligatorio' );

    if (tipoIdentificacionValida && identificacionValida && nombresValidos && apellidosValidos && correoValido && generoValido) {
        mostrarMensajeExito(); 
        const formulario = document.getElementById('formularioContacto'); 
        formulario.scrollIntoView({ behavior: "smooth", block: "start" });        
        setTimeout(() => {
            formulario.reset();
        }, 2000);
        return false;
    } else {
        alert('Por favor, complete correctamente el formulario.');
        return false;
    }
}

function validarCamposAlCambiarFoco()
{
    const inputTipoIdentificacion = document.getElementById('identificacion');
    const inputIdentificacion = document.getElementById('numero-identificacion');
    const inputNombres = document.getElementById('nombres');
    const inputApellidos = document.getElementById('apellidos');
    const inputCorreoElectronico = document.getElementById('correo-electronico');
    const inputGenero = document.getElementsByName('genero');

    const labelErrorTipoIdentificacion=document.getElementById('errorTipoIdentificacion');
    const labelErrorNumeroIdentificacion=document.getElementById('errorNumeroIdentificacion');
    const labelErrorNombres=document.getElementById('errorNombres');
    const labelErrorApellidos=document.getElementById('errorApellidos');
    const labelErrorCorreo=document.getElementById('errorCorreo');
    const labelErrorGenero=document.getElementById('errorGenero');

    inputTipoIdentificacion.addEventListener('blur',()=> validarCampoObligatorio(
        inputTipoIdentificacion,
        labelErrorTipoIdentificacion,
        "El tipo de identificación es obligatorio"));
        
    inputIdentificacion.addEventListener('blur', () => validarCampoObligatorio(inputIdentificacion, labelErrorNumeroIdentificacion, 'El número de id es obligatorio.'));
    inputNombres.addEventListener('blur', () => validarLongitud(inputNombres, labelErrorNombres, 1, 20, 'El nombre debe tener entre 1 y 20 caracteres.'));
    inputApellidos.addEventListener('blur', () => validarLongitud(inputApellidos, labelErrorApellidos, 1, 20, 'El apellido debe tener entre 1 y 20 caracteres.'));
    inputCorreoElectronico.addEventListener('blur', () => validarCorreo(inputCorreoElectronico, labelErrorCorreo,'El correo debe tener el dominio @unicauca.edu.co'));
    Array.from(inputGenero).forEach(input => input.addEventListener('blur', () => validarGenero(inputGenero, labelErrorGenero,'El género es obligatorio')));
}

document.addEventListener('DOMContentLoaded', validarCamposAlCambiarFoco);
