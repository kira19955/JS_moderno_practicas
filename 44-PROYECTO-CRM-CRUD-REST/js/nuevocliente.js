import {mostrarAlerta} from './funciones.js';
import {nuevoCliente} from './API.js'
(function(){
    const formulario = document.querySelector('#formulario');
    formulario.addEventListener('submit', validarCliente)

    function validarCliente(e){
        e.preventDefault();

        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;
        
        //se puede validar tambien creando un objeto con los valores adquiridos

        const cliente = {
            nombre,
            email,
            telefono,
            empresa
        }

        if (validar(cliente)){
            //mostrar mensaje
            mostrarAlerta("todos los campos son obligatorios");
            return
        }

        nuevoCliente(cliente)
        
    }

    function validar(obj){
        return  !Object.values(obj).every( input => input !== '');

    }


})();