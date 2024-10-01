// Objective: Register the data of the new contract.

import { url } from '../../config.js';

const addUsuario = document.getElementById('addUsuario');
const cedula = document.getElementById('cedula');
const puesto = document.getElementById('puesto');
const tipoContrato = document.getElementById('tipoContrato');
const salario = document.getElementById('salario');
const duracionContrato = document.getElementById('duracionContrato');
const fechaInicio = document.getElementById('fechaInicio');

const clausulas = document.getElementById('clausulas');
const firmaEmpleado = document.getElementById('firmaEmpleado');
const firmaEmpleador = document.getElementById('firmaEmpleador');
const estadoContrato = document.getElementById('estadoContrato')



function getUsers() {
    fetch(`${url}/DataUser`)
        .then(response => response.json())
        .then(users => {
            const selectCedula = document.getElementById('cedula');

            users.forEach(user => {
                if (!user.contratado) {
                    const option = document.createElement('option');
                    option.value = user.cedula;;
                    option.textContent = user.nombre;
                    selectCedula.appendChild(option);
                }
            });

        })
        .catch(error => console.error('Error fetching users:', error));
}

document.addEventListener('DOMContentLoaded', getUsers);

addUsuario.addEventListener('click', sendContrato);

async function sendContrato() {
    // Obtener y calcular la fecha final basada en la fecha de inicio y la duración del contrato
    const inicio = new Date(fechaInicio.value);
    const duracion = parseInt(duracionContrato.value);

    if (!isNaN(duracion)) {
        // Agregamos la duración en meses a la fecha de inicio
        inicio.setMonth(inicio.getMonth() + duracion);

        // Formateamos la fecha a 'YYYY-MM-DD' para que sea compatible con el backend
        const year = inicio.getFullYear();
        const month = (inicio.getMonth() + 1).toString().padStart(2, '0');
        const day = inicio.getDate().toString().padStart(2, '0');
        const fechaFinalCalculada = `${year}-${month}-${day}`;

        // Crear el objeto contrato sin el campo 'fechaFinal' en el formulario
        const contrato = {
            empleado_id: cedula.value,
            puesto: puesto.value,
            tipo_contrato: tipoContrato.value,
            salario: salario.value,
            duracion_contrato: duracionContrato.value,
            fecha_inicio: fechaInicio.value,
            fecha_fin: fechaFinalCalculada,  // Solo se calcula, no necesita estar en el formulario
            clausulas: clausulas.value,
            firma_empleado: firmaEmpleado.value,
            firma_empleador: firmaEmpleador.value,
            estado_contrato: estadoContrato.value
        };

        try {
            // Enviar los datos del contrato con el método POST
            const response = await fetch(`${url}/contratos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contrato)
            });

            if (response.ok) {
                
                Swal.fire({
                    title: 'Contrato creado',
                    text: 'El contrato se ha creado correctamente',
                    icon: 'success',
                    confirmButtonText: 'Entendido'
                }).then(() => {
                    // Recargar el documento y limpiar todos los campos para un nuevo ingreso
                    document.location.reload();
                });

            } else {
                alert('Error al crear contrato');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Hubo un error al intentar crear el contrato.');
        }
    } else {
        alert('Duración del contrato no válida');
    }
}
