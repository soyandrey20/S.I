import { url } from '../../config.js';


const ConfirmBtn = document.getElementById('ConfirmBtn');
const passwordConfirm = document.getElementById('passwordConfirm');
const password = document.getElementById('password');
const rgxPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}$/;

// Obtener el token de la URL
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');

ConfirmBtn.addEventListener('click', async () => {
    // Obtener las contraseñas ingresadas
    const newPassword = password.value;
    const confirmPassword = passwordConfirm.value;

    // Validar que las contraseñas coincidan
    if (newPassword !== confirmPassword) {
        swal.fire({
            title: "Error",
            text: "Las contraseñas no coinciden",
            icon: "error",
            confirmButtonText: "Aceptar"
        });
        return;
    }
    if (!rgxPassword.test(newPassword)) {
        swal.fire({
            title: "Error",
            text: "La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial",
            icon: "error",
            confirmButtonText: "Aceptar"
        });
        return;
    }


    // Validar que el token esté presente
    if (!token) {
        swal.fire({
            title: "Error",
            text: "Token inválido o expirado",
            icon: "error",
            confirmButtonText: "Aceptar"
        });

        return;
    }

    // Preparar los datos para enviar
    const data = {
        token: token,
        newPassword: newPassword
    };

    try {
        // Enviar la solicitud al servidor para restablecer la contraseña
        const response = await fetch(`${url}/Contrasena`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // Manejar la respuesta del servidor
        if (response.ok) {
            const result = await response.json();

            swal.fire({
                title: "Contraseña restablecida",
                text: "La contraseña se restableció correctamente",
                icon: "success",
                confirmButtonText: "Aceptar"
            }).then(() => {
                window.location.href = '../Login/Index.html';
            });

        } else {
            const error = await response.json();

            swal.fire({
                title: "Error al restablecer la contraseña",
                text: error.message,
                icon: "error",
                confirmButtonText: "Aceptar"
            });
        }
    } catch (error) {
        console.error('Error al restablecer la contraseña:', error);

        swal.fire({
            title: "Error al restablecer la contraseña",
            text: "Hubo un error al restablecer la contraseña",
            icon: "error",
            confirmButtonText: "Aceptar"
        });
    }
});
