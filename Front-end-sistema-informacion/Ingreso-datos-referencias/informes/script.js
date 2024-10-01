// Objetivo: manejar la lógica de la vista de usuarios

import { url } from '../../../config.js';


const tableData = document.getElementById('tableData');




const inputs = document.querySelectorAll('input');

let count = 0;
let dataD = null;


const fincas = [];




async function cargarTabla() {

  try {
    const response = await fetch(`${url}/DataUser`);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const users = await response.json();

    tableData.innerHTML = '';

    users.forEach(user => {
      const tableRow = document.createElement('tr');

      tableRow.innerHTML = `
        <td id="Cedula">${user.cedula}</td>
        <td id="Cedula_tp">${user.nombre}</td>
        <td id="nombre1">${user.genero}</td>
        <td id="nombre2">${user.estadoCivil || ''}</td>
        <td id="apellido1">${user.email || ''}</td>
        <td id="apellido2">${user.fechaNacimiento || ''}</td>
        <td id="Email">${user.direccion}</td>
        <td id="Telefono">${user.telefono}</td>
        <td id="Contrato">${user.contratado ? 'Si' : 'No'}</td>
        <td>
          <a href="#" class="btn-add" title="agregar"><i class='bx bxs-plus-circle' ></i></a>
 
 
          
        </td>
      `;

      tableData.appendChild(tableRow);
    });
    $(document).ready(function () {

      $('#userTable').DataTable({
        "paging": true,
        "pageLength": 5,
        "searching": true,
        "lengthMenu": [5, 10, 15],
        "language": {
          "paginate": {
            "next": "Siguiente", // Cambia el texto del botón "Next"
            "previous": "Anterior" // Cambia el texto del botón "Previous"
          },
          "search": "Buscar", // Cambia el texto de la etiqueta "Search"
          "lengthMenu": "Mostrar _MENU_ entradas por página",
          "info": "Mostrando _START_ a _END_ de _TOTAL_ entradas"
        }
      });
    });
  } catch (error) {
    console.error('Error obteniendo usuarios:', error);
  }


}

// Llama a la función para cargar la tabla cuando se cargue la página
window.addEventListener('DOMContentLoaded', cargarTabla);



window.addEventListener('click', async (e) => {
  count = 0;
  if (e.target.classList.contains('bxs-plus-circle')) {
    window.location.href = `../../Ingreso-datos-personales/registro.html`;
  }
  else if (e.target.classList.contains('bxs-edit-alt')) {

    let data1 = (e.target.parentElement.parentElement.parentElement.children);
    localStorage.setItem('cedula', data1[0].textContent);
    localStorage.setItem('tipo', data1[1].textContent);
    localStorage.setItem('nombre_1', data1[2].textContent);
    localStorage.setItem('nombre_2', data1[3].textContent);
    localStorage.setItem('apellido_1', data1[4].textContent);
    localStorage.setItem('apellido_2', data1[5].textContent);
    localStorage.setItem('email', data1[6].textContent);
    localStorage.setItem('password', data1[7].textContent);
    localStorage.setItem('Estado', data1[7].textContent);


    window.location.href = `/vistas/usuarios/usuarios_edit.html`;



  } else if (e.target.classList.contains('bxs-trash-alt')) {
    dataD = (e.target.parentElement.parentElement.parentElement.children);
    swal.fire({
      title: "¿Está seguro de que desea desactivar el usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        deactivateUser();
      }
    });


  } else if (e.target.classList.contains('bxs-check-circle')) {

    dataD = (e.target.parentElement.parentElement.parentElement.children);

    swal.fire({
      title: "¿Está seguro de que desea activar el usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        activateUser();
      }
    });
  }




});




const fillData = (data1) => {
  inputs[0].value = data1[0].textContent;


  inputs[1].value = data1[2].textContent;
  inputs[2].value = data1[3].textContent;
  inputs[3].value = data1[4].textContent;
  inputs[4].value = data1[5].textContent;
  inputs[5].value = data1[6].textContent;
  inputs[6].value = data1[7].textContent;




}









async function deactivateUser() {

  let opt = validarFincasActivas();

  if (!opt) {

    swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No se puede desactivar un usuario con fincas activas',
    });

  } else {


    const cedula = dataD[0].textContent;

    const Estado = false;
    const data = {
      cedula,
      Estado
    };


    const xhr = new XMLHttpRequest();

    xhr.open('PUT', `${url}/DeleteUsuarios/${cedula}`);


    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
      if (this.readyState === 4 && this.status === 200) {

        swal.fire({
          icon: 'success',
          title: 'Usuario desactivado correctamente',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });

      } else {
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al desactivar el usuario',
        });
      }
    };
    xhr.send(JSON.stringify(data));

  }
}

async function activateUser() {

  const cedula = dataD[0].textContent;

  const Estado = true;
  const data = {
    cedula,
    Estado
  };


  const xhr = new XMLHttpRequest();

  xhr.open('PUT', `${url}/DeleteUsuarios/${cedula}`);


  xhr.setRequestHeader('Content-Type', 'application/json');
  console.log(JSON.stringify(data));
  xhr.onload = function () {
    console.log(this.response)
    if (this.readyState === 4 && this.status === 200) {

      swal.fire({
        icon: 'success',
        title: 'Usuario activado correctamente',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });


    } else {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al activar el usuario',
      });
    }
  };
  xhr.send(JSON.stringify(data));

}



function validarFincasActivas() {
  let opt = true;

  for (let i = 0; i < fincas.length; i++) {

    if (fincas[i].id_persona == dataD[0].textContent) {
      opt = false;
      break;
    }
  }
  return opt;
}

const btnSendFile = document.getElementById('btnSendFile');

btnSendFile.addEventListener('click', async () => {
  swal.fire({
    title: "¿Está seguro de que desea enviar el informe por correo",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      sendFile();
    }
  }
  );
}
);



async function sendFile() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${url}/export-pdf`, true);
  xhr.send();
}


 
