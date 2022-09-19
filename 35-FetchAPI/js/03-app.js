//const boton = document.querySelector('#cargarJSONArray');

//boton.addEventListener('click', obterterDatos);


document.addEventListener('DOMContentLoaded', obterterDatos) // cargar la informacion desde el momento en que abres la pagina 


function obterterDatos(){
    fetch('data/empleados.json')
    .then(respuesta => respuesta.json())
    .then( resultado => mostrar(resultado))
}

function mostrar(empleados){
    const contenido = document.querySelector('.contenido');

    let html= '';

    empleados.forEach(empleado => {
        const {id,nombre,empresa,trabajo} = empleado;
        html+= `
        <p>Empleado: ${nombre}</p>
        <p>ID: ${id}</p>
        <p>Empresa: ${empresa}</p>
        <p>Trabajo: ${trabajo}</p>
        `
    });

    contenido.innerHTML = html;
}