// Objective: Register the data of the new contract.

import { url } from '../../config.js';




function getUsers() {
    fetch(`${url}/DataUser`)
        .then(response => response.json())
        .then(users => {
            const selectCedula = document.getElementById('cedula');

            users.forEach(user => {
               
                if (user.contratado) {
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

addUsuario.addEventListener('click', sendNomina);

async function sendNomina() {
    
    const cedula = document.getElementById('cedula');
    const salario = document.getElementById('salarioBase');
    const bonificacion = document.getElementById('bonificaciones');
    const deduccion = document.getElementById('deducciones');
    const fechapago = document.getElementById('fechaPago');
 


    //obtener el mes de la fecha de pago
    const mes = fechapago.value.split('-')[1];
    console.log(fechapago.value);
    const data = {
        cedula: cedula.value,
        salario: salario.value,
        bonificacion: bonificacion.value,
        deduccion: deduccion.value,
        fechapago: fechapago.value 
    };

    const response = await fetch(`${url}/DataNomina`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        alert('Nomina registrada con exito');
        location.href = 'registro.html';
    }
    else {
        alert('Error al registrar la nomina');
    }
}

