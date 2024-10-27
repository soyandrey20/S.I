import { url } from '../../config.js';


const logout = document.getElementById('logout');


logout.addEventListener('click', (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ logout: true })
    })
        .then(res => res.json())
        .then(data => {
            if (data.logout) {
                window.location.href = 'http://localhost:3000/login';
            }
        })
        .catch(err => console.log(err));
});


let arrow = document.querySelectorAll('.arrow');
for (let i = 0; i < arrow.length; i++) {
    arrow[i].addEventListener('click', (e) => {
        let arrowParent = e.target.parentElement.parentElement;
        arrowParent.classList.toggle('showMenu');
    });
}

let sidebar = document.querySelector('.sidebar');
let sidebarBtn = document.querySelector('.bx-menu');
sidebarBtn.addEventListener('click', () => {
    sidebar.classList.toggle('close');
});


window.addEventListener('DOMContentLoaded', cargarPagina);
async function cargarPagina() {
    sidebar.classList.toggle('close');
    cargarNombreUsuario(); // Llamar a la función de cargar usuario al iniciar
}


const cedulaGetFromLocalStorage = localStorage.getItem('userName');
const optInfo = document.getElementById('optInfo');
const optPqrs = document.getElementById('optPqrs');


function cargarNombreUsuario() {
    fetch(`http://localhost:3000/user/${cedulaGetFromLocalStorage}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data && data.nombre) {
                profile_name.textContent = data.nombre;
            } else {
                console.error('El campo "nombre" no existe en la respuesta.');
            }

            if (data && data.permiso === true) {
                // no hacer nada
            } else {
                optInfo.style.display = 'none';
                optPqrs.style.display = 'none';
            }

        })
        .catch(err => console.log(err));
}

const btnOpen = document.getElementById('btn-open');
const btnClose = document.getElementById('btn-close');
const chatPopup = document.getElementById('chat-popup');

function notify() {
    if (!("Notification" in window)) {
        alert("Este navegador no soporta notificaciones de escritorio");
    } else if (Notification.permission === "granted") {
        new Notification("!Backup realizado con éxito");
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
                new Notification("!Backup realizado con éxito");
            }
        });
    }
}

//funcion para ejecutar la notificacion cada 5 segundos
// setInterval(notify, 5000);

//funcion para hacer backup al sistema
async function backup() {
    fetch(`${url}/backup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ backup: true })

    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            console.log('Backup realizado con éxito');
        })
        .catch(err => console.log(err));
}

//funcion para guardar backup y notificar
function backupNotify() {
    //mostrar mensaje que el backup se va a realizar y luego de 5 segundos se ejecuta la funcion backup
    new Notification("El sistema se va a respaldar en 1 Minutos");
    setTimeout(() => {
        notify();
        backup();
    }, 50000);
}

setInterval(backupNotify, 100000);