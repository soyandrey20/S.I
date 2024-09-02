import { url } from '../../config.js';

const cedula = document.getElementById('cedula');
const username = document.getElementById('userName');
const email = document.getElementById('email');
const emailConfirm = document.getElementById('emailConfirm');
const password = document.getElementById('password');
const passwordConfirm = document.getElementById('passwordConfirm');
const registerBtn = document.getElementById('registerBtn');
const rgxPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}$/;
const rgxEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;


registerBtn.addEventListener('click', async () => {
    if (validate()) {
        const data = {
             cedulaa: cedula.value,
             usernamee: username.value,
             emaill: email.value,
             passwordd: password.value
         }
         try {
             const response = await fetch(`${url}/user`, {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json'
                 },
                 body: JSON.stringify(data)
             });
             const res = await response.json();
             console.log(response.status);
             if (response.status === 201) {
                 swal.fire({
                     title: "Registro exitoso",
                     text: "Usuario registrado correctamente",
                     icon: "success",
                     confirmButtonText: "Aceptar"
                 }).then(() => {
                    window.location.href = '../../Front-end-sistema-informacion/principal/home.html';

                 });
             } else {
                 swal.fire({
                     title: "Error al registrar",
                     text: res.message,
                     icon: "error",
                     confirmButtonText: "Aceptar"
                 });
             }
         } catch (error) {
             swal.fire({
                 title: "Error ",
                 text: error,
                 icon: "error",
                 confirmButtonText: "Aceptar"
             });
         } 
       
    }
});

function validate() {
    if (cedula.value == "" || username.value == "" || email.value == "" || emailConfirm.value == "" || password.value == "" || passwordConfirm.value == "") {
        swal.fire({

            title: "Error",
            text: "Debe completar todos los campos",
            icon: "error",
            confirmButtonText: "Aceptar"
        });
        return false;
    }
    if (cedula.value.length < 10) {
        swal.fire({
            title: "Error",
            text: "La cédula debe tener al menos 10 caracteres",
            icon: "error",
            confirmButtonText: "Aceptar"
        });
        return false;
    }
    if (username.value.length < 6) {
        swal.fire({
            title: "Error",
            text: "El nombre de usuario debe tener al menos 6 caracteres",
            icon: "error",
            confirmButtonText: "Aceptar"
        });
        return false;
    }
    if (!rgxEmail.test(email.value)) {
        swal.fire({
            title: "Error",
            text: "El email no es válido",
            icon: "error",
            confirmButtonText: "Aceptar"
        });
        return false;
    }
    if (email.value != emailConfirm.value) {
        swal.fire({
            title: "Error",
            text: "Los emails no coinciden",
            icon: "error",
            confirmButtonText: "Aceptar"
        });
        return false;
    }
    if (!rgxPassword.test(password.value)) {
        swal.fire({
            title: "Error",
            text: "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial",
            icon: "error",
            confirmButtonText: "Aceptar"
        });
        return false;
    }
    if (password.value != passwordConfirm.value) {
        swal.fire({
            title: "Error",
            text: "Las contraseñas no coinciden",
            icon: "error",
            confirmButtonText: "Aceptar"
        });
        return false;
    }
    return true;
}	