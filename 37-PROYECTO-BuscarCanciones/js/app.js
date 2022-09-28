import * as UI from './interfaz.js';
import API from './api.js';

console.log(API);
console.log(UI);

UI.formulario.addEventListener('submit', buscarCancion);

function buscarCancion(e){
    e.preventDefault();

    //OBTENER LOS DATOS DEL FORMULARIO

    const artista =  document.querySelector('#artista').value;
    const cancion = document.querySelector('#cancion').value;

    if (artista === "" || cancion ==""){
        UI.divMensaje.textContent = "Error... Todos los Campos son Obligatorios";
        UI.divMensaje.classList.add('error');

        setTimeout(() => {
            UI.divMensaje.remove();
        }, 3000);

        return;
    }

    //CONSULTAR A LA API

    const busqueda = new API(artista, cancion);
    busqueda.consultarAPI();

   
}