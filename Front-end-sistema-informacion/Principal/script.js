


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
            }

        })
        .catch(err => console.log(err));
}

