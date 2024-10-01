import { url } from "../../config.js";

const btnBack = document.getElementById('btnBack');
const addUsuario = document.getElementById('addUsuario');
const nombreReferencia = document.getElementById('nombreReferencia');
const cargo = document.getElementById('cargo');
const empresa = document.getElementById('empresa');
const telefonosContacto = document.getElementById('telefonosContacto');
const pruebasPsicologicas = document.getElementsByName('pruebasPsicologicas');
const pruebasTecnicas = document.getElementsByName('pruebasTecnicas');
const pruebasConocimiento = document.getElementsByName('pruebasConocimiento');

btnBack.addEventListener('click', () => {
    window.location.href = '../Ingreso-datos-Habilidades/registro.html';
});

addUsuario.addEventListener('click', async () => {
    try {
        await sendDataUserReferences();
        await sendDataUserExperiences();
        await sendDataUserSkills();
        await sendDataUserDataBase();
    } catch (error) {
        console.error('Error:', error);
        swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al registrar el usuario',
        });
    }
});

async function sendDataUserReferences() {
    const seleccionadoP = getSelectedValue(pruebasPsicologicas);
    const seleccionadoT = getSelectedValue(pruebasTecnicas);
    const seleccionadoC = getSelectedValue(pruebasConocimiento);

    const dataReferences = {
        cedula: JSON.parse(localStorage.getItem('usuario')).cedula,
        nombreReferencia: nombreReferencia.value,
        cargo: cargo.value,
        empresa: empresa.value,
        telefonosContacto: telefonosContacto.value,
        pruebasPsicologicas: seleccionadoP,
        pruebasTecnicas: seleccionadoT,
        pruebasConocimiento: seleccionadoC
    };

    await postData(`${url}/UserReferences`, dataReferences);
}

async function sendDataUserExperiences() {
    const usuarioExperiences = JSON.parse(localStorage.getItem('usuarioExperiences'));
    await postData(`${url}/userExperiences`, usuarioExperiences);  
}

async function sendDataUserSkills() {
    const usuarioSkills = JSON.parse(localStorage.getItem('usuarioSkills'));
    await postData(`${url}/userSkills`, usuarioSkills);
}

async function sendDataUserDataBase() {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    await postData(`${url}/users`, usuario);

    swal.fire({
        icon: 'success',
        title: 'Usuario registrado correctamente',
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = '../Ingreso-datos-personales/registro.html';
        }
    });
}

function getSelectedValue(elements) {
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].checked) {
            return elements[i].value;
        }
    }
    return null;
}

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
}
