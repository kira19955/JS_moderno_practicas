const boton = document.querySelector('#cargarJSON');

boton.addEventListener('click', obtenerDatos);

function obtenerDatos(){
    fetch('data/empleado.json')
        .then (respuesta =>  respuesta.json())
        .then(resultado => mostrarHtml(resultado))
}

//asi se puede mostrar la informacion de una URL 
function mostrarHtml({empresa,id, nombre,trabajo}){
    const contenido = document.querySelector('.contenido');
    contenido.innerHTML = `
    <p>Empleado: ${nombre}</p>
    <p>ID: ${id}</p>
    <p>Empresa: ${empresa}</p>
    <p>Trabajo: ${trabajo}</p>
    `
}