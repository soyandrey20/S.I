const addUsuario = document.getElementById('addUsuario');
const btnBack = document.getElementById('btnBack');
const titulosObtenidos = document.getElementById('titulosObtenidos');
const nivelEducacion = document.getElementById('nivelEducacion');
const areasEstudio = document.getElementById('areasEstudio');
const empresasAnteriores = document.getElementById('empresasAnteriores');
const cargosDesempenados = document.getElementById('cargosDesempenados');
const funciones = document.getElementById('funciones');
const tiempoServicio = document.getElementById('tiempoServicio');
const logros = document.getElementById('logros');

addUsuario.addEventListener('click', () => {
    if (validateInputs()) {
        saveUserData();
        pasar();
    } else {
        swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, complete todos los campos correctamente.',
        });
    }
});

btnBack.addEventListener('click', () => {
    window.location.href = '../Ingreso-datos-personales/registro.html';
});

function pasar() {
    window.location.href = '../Ingreso-datos-Habilidades/registro.html';
}

function validateInputs() {
    // Check if all fields are filled
    return titulosObtenidos.value && nivelEducacion.value &&
           areasEstudio.value && empresasAnteriores.value &&
           cargosDesempenados.value && funciones.value &&
           tiempoServicio.value && logros.value;
}

function saveUserData() {
    const usuarioExperiences = {
        cedula: JSON.parse(localStorage.getItem('usuario')).cedula,
        titulosObtenidos: titulosObtenidos.value,
        nivelEducacion: nivelEducacion.value,
        areasEstudio: areasEstudio.value,
        empresasAnteriores: empresasAnteriores.value,
        cargosDesempenados: cargosDesempenados.value,
        funciones: funciones.value,
        tiempoServicio: tiempoServicio.value,
        logros: logros.value
    };
    localStorage.setItem('usuarioExperiences', JSON.stringify(usuarioExperiences));
}
