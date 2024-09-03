const addUsuario = document.getElementById('addUsuario');
const btnBack = document.getElementById('btnBack');
const cedula = document.getElementById('cedula');
const nombre = document.getElementById('nombreCompleto');
const genero = document.getElementById('SelectGenero');
const selectEstadoCivil = document.getElementById('SelectEstadoCivil');
const email = document.getElementById('email');
const fechaNacimiento = document.getElementById('fechaNacimiento');
const direccion = document.getElementById('direccion');
const telefono = document.getElementById('telefono');

addUsuario.addEventListener('click', () => {
    if (validateInputs()) {
        saveUserData();
        pasar();
    } else {
       swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, complete todos los campos correctamente.',
        }) ; 

         
    }
});

btnBack.addEventListener('click', () => {
    window.location.href = '../principal/home.html';
});

function pasar() {
    window.location.href = '../Ingreso-datos-laborales/registro.html';
}

function validateInputs() {
    // Simple validation to check if all fields are filled
    return cedula.value && nombre.value && genero.value &&
           selectEstadoCivil.value && email.value &&
           fechaNacimiento.value && direccion.value && telefono.value;
}

function saveUserData() {
    const usuario = {
        cedula: cedula.value,
        nombre: nombre.value,
        genero: genero.value,
        estadoCivil: selectEstadoCivil.value,
        email: email.value,
        fechaNacimiento: fechaNacimiento.value,
        direccion: direccion.value,
        telefono: telefono.value
    };
    localStorage.setItem('usuario', JSON.stringify(usuario));
}
