// Función para volver atrás LOGIN
function goBack() {
    window.history.back();
}

// Función para validar el INICIO DE SESION 
function validateLogin() {
    // Obtiene los valores de usuario y contraseña
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    // Validación user y pass
    if (username === 'admin' && password === '1234') {
        alert('Inicio de sesión exitoso');
        return true;
    } else {
        alert('Nombre de usuario o contraseña incorrectos');
        return false;
    }
}

//Funcion para validación de campos en FORMULARIO DE CONTACTO
function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    // Utiliza una expresión regular que permita números y el signo '+' al principio (opcional)
    var phoneRegex = /^[+]?[0-9]+$/;
    return phoneRegex.test(phone);
}

function validarFormulario() {
    var email = document.getElementsByName("email")[0].value;
    var phone = document.getElementsByName("phone")[0].value;
    var mensaje = document.getElementsByName("mensaje")[0].value;

    // Validar el formato del correo electrónico
    if (!isValidEmail(email)) {
        alert("Por favor, introduce una dirección de correo electrónico válida.");
        return false;
    }

    // Validar el formato del número de teléfono
    if (!isValidPhone(phone)) {
        alert("Por favor, introduce un número de teléfono válido.");
        return false;
    }

    // Validar la longitud del mensaje
    if (mensaje.length < 15) {
        alert("El mensaje debe tener al menos 15 caracteres.");
        return false;
    }

    // Si todas las validaciones pasan, el formulario se envía
    return true;
}

document.querySelector("form").addEventListener("submit", function (event) {
    if (!validarFormulario()) {
        event.preventDefault(); // Evita que se envíe el formulario si las validaciones fallan
    }
});



