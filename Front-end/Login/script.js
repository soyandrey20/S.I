import { url } from '../../config.js';

let Cedula = '';

const loginBtn = document.getElementById('loginBtn');
const contraseñaRees = document.getElementById('contraseñaRees');
const register = document.getElementById('registerr');



register.addEventListener('click', () => {
    window.location.href = '../../Front-end/Registro/Index.html';
});

contraseñaRees.addEventListener('click', () => {
    Swal.fire({
        title: 'Ingrese la cédula del cliente',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off',
            pattern: '[0-9]{10}'
        },
        showCancelButton: true,
        confirmButtonText: 'Reestablecer contraseña',
        cancelButtonText: 'Cancelar',
        preConfirm: (cedula) => {
            if (cedula === '') {
                Swal.showValidationMessage('Por favor ingrese la cédula');

            }
        }

    }).then((result) => {
        if (result.isConfirmed) {
            Cedula = result.value;

            sendEmail();
        }
    });
});


async function sendEmail() {
    const id = Cedula;



    const data = {
        id: id,
    };
    console.log('data', data);
    if (id === '') {
        window.alert('Por favor ingrese la cedula');

        return false;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('post', `${url}/ReestablecerContrasena`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        console.log(this.status)
        if (this.readyState === 4 && this.status === 200) {

            Swal.fire({
                icon: 'success',
                title: 'Correo enviado',
                text: 'Se ha enviado un correo con la contraseña',
            });

        } else {
            console.error('Error obtener users:', this.statusText);
        }
    };

    xhr.send(JSON.stringify(data));
}



export async function login() {

    let userName = document.getElementById('userName').value;
    let password = document.getElementById('password').value;

    const data = {
        id: userName,
        password: password
    };

    if (!userName || !password) {
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Campos vacíos',
            text: 'Por favor, ingrese usuario y contraseña',
            showConfirmButton: false,
            timer: 2000
        });
        return;
    }

    try {

        const response = await fetch(`${url}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.status === 200) {
            localStorage.setItem('userName', userName);


            swal.fire({
                showConfirmButton: false,
                title: "Inicio de sesión exitoso",
                text: `Bienvenido ${result.user.name}`,
                icon: "success",
                timer: 2000,

            }).then(() => {
                localStorage.setItem('user', JSON.stringify(result));
                window.location.href = '../../Front-end-sistema-informacion/principal/home.html';


            });
        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Oops...',
                text: result.message,
                showConfirmButton: false,
                timer: 2000
            });
        }
    } catch (error) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Error',
            text: 'No se pudo realizar la solicitud',
            showConfirmButton: false,
            timer: 2000
        });
    }
}


loginBtn.addEventListener('click', login);

