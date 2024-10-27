import { url } from '../../config.js';

const nombre = document.getElementById('nombre');
const empresa = document.getElementById('empresa');
const correo = document.getElementById('correo');
const telefono = document.getElementById('telefono');
const tipo = document.getElementById('tipo');
const mensaje = document.getElementById('mensaje');

const btnEnviar = document.getElementById('btnEnviar');
const validarCorreo = (correo) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(correo);
const validarTelefono = (telefono) => /^\d{7,14}$/.test(telefono);

btnEnviar.addEventListener('click', enviarDatos);

//funcion para obtener el token del reCAPTCHA


async function enviarDatos() {

    const datos = {
        nombre: nombre.value,
        empresa: empresa.value,
        correo: correo.value,
        telefono: telefono.value,
        tipo: tipo.value,
        mensaje: mensaje.value,
        recaptcha: document.getElementById("g-recaptcha-response").value

    };
    console.log(datos);
    if (validarFormulario()) {
        try {
            const response = await fetch(`${url}/pqrs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos),
            });
            const result = await response.json();
            if (response.status === 201) {
                mostrarAlerta(`${tipo.value} enviado con exito`, false);
                window.location.reload();
            } else {
                if (response.status === 400) {
                    mostrarAlerta('Por favor confirmar que no eres un robot', true);
                } else if (response.status === 500) {
                    mostrarAlerta('Error en el servidor', true);
                }

            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

};

function validarFormulario() {


    if (nombre.value === '' || empresa.value === '' || correo.value === '' || telefono.value === '' || tipo.value === '' || mensaje.value === '') {
        mostrarAlerta('Todos los campos son obligatorios', true);
        return;
    }

    if (!validarCorreo(correo.value)) {
        mostrarAlerta('Correo no válido', true);
        return;
    }

    if (!validarTelefono(telefono.value)) {
        mostrarAlerta('Teléfono no válido', true);
        return;
    }

    if (recaptcha.value === '') {
        mostrarAlerta('Por favor, verifica el captcha', true);
        return;
    }

    return true;


}

function mostrarAlerta(mensaje, error) {
    Swal.fire({
        icon: error ? 'error' : 'success',
        title: mensaje,
        showConfirmButton: false,
        timer: 3000
    });

}

