const addUsuario = document.getElementById('addUsuario');
const btnBack = document.getElementById('btnBack');
const dominioSoftware = document.getElementById('dominioSoftware');
const herramientas = document.getElementById('herramientas');
const lenguajesProgramacion = document.getElementById('lenguajesProgramacion');
const comunicacion = document.getElementsByName('comunicacion');
const liderazgo = document.getElementsByName('liderazgo');
const trabajoEquipo = document.getElementsByName('trabajoEquipo');
const resolucionProblemas = document.getElementsByName('resolucionProblemas');

btnBack.addEventListener('click', () => {
    window.location.href = '../Ingreso-datos-laborales/registro.html';
});

addUsuario.addEventListener('click', () => {
    if (validateSelections()) {
        sendDataStorage();
    } else {
        swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, seleccione una opción en todos los grupos.',
        });
    }
});

function getSelectedValue(elements) {
    for (const element of elements) {
        if (element.checked) {
            return element.value;
        }
    }
    return null;
}

function validateSelections() {
    return getSelectedValue(comunicacion) && 
           getSelectedValue(liderazgo) && 
           getSelectedValue(trabajoEquipo) && 
           getSelectedValue(resolucionProblemas);
}

function sendDataStorage() {
    const usuarioSkills = {
        cedula: JSON.parse(localStorage.getItem('usuario')).cedula,
        dominioSoftware: dominioSoftware.value,
        herramientas: herramientas.value,
        lenguajesProgramacion: lenguajesProgramacion.value,
        comunicacion: getSelectedValue(comunicacion),
        liderazgo: getSelectedValue(liderazgo),
        trabajoEquipo: getSelectedValue(trabajoEquipo),
        resolucionProblemas: getSelectedValue(resolucionProblemas)
    };

    localStorage.setItem('usuarioSkills', JSON.stringify(usuarioSkills));
    window.location.href = '../Ingreso-datos-referencias/registro.html';
}
