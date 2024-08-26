import { url } from '../../config.js';

let loginBtn = document.getElementById('loginBtn');

export function login() {
    let userName = document.getElementById('userName');
    let password = document.getElementById('password');

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${url}/users`, true);

    xhr.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            const users = JSON.parse(this.response);


            if (userName.value || password.value) {

                let user = users.find(user => user.user === userName.value && user.password === password.value);
                if (user) {
                    localStorage.setItem('user', JSON.stringify(user));
                    window.location.href = '../../Front-end-sistema-informacion/principal/home.html';
                } else {
                     Swal.fire({
                        position: 'top',
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Usuario o contraseña incorrectos',
                        showConfirmButton: false,
                        timer: 2000
                    });

                }
            }
        }
    };

    xhr.send();
}

loginBtn.addEventListener('click', login);
