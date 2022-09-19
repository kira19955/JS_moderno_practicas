const cargar = document.querySelector('#cargarTxt');
cargar.addEventListener('click', obtenerDatos);

function obtenerDatos(){

    fetch('data/datos.txt') // se solicta la URL a consultar

    .then(respuesta =>{ //se crea una respuesta 
        console.log(respuesta);

        return respuesta.text(); //se regresa la respuesta ya sea en json o text
    })
    .then(datos =>{
        console.log(datos)
    })
    .catch(error =>{  //siempre lleva un catch por si hay errores 
        console.log(error);
    })
}

