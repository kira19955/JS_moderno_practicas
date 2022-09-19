const boton = document.querySelector('#cargarAPI');

boton.addEventListener('click', mostrar);

function mostrar(){
    fetch('https://picsum.photos/list')
    .then(respuesta => respuesta.json())
    .then(resultado => mostrarDatos(resultado))
}

function mostrarDatos(datos){

    const contenido = document.querySelector('.contenido');

    let html = '';

    datos.forEach(perfil =>{
        const {author,post_url} = perfil;

        html+= `
        <p>Autor: ${author}</p>
        <a href="${post_url}" target="_blank">Ver imagen </a>
        `
    })

   
    contenido.innerHTML = html;

}