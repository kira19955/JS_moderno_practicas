//variables
const enviar = document.querySelector('#enviar');
const formulario = document.querySelector('#enviar-mail')

//variables para campos 

const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');


eventList();
function eventList(){

    //cuando al app arranca
    document.addEventListener('DOMContentLoaded', iniciarapp);
    //campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);
};



//funciones

function iniciarapp(){
    enviar.disable = true;
    enviar.classList.add('cursor-not-allowed','opacity-50');

};

//valida el formulario
function validarFormulario(e){
    if(e.target.value.length > 0){
        console.log('si hay algo');
    }else{
        e.target.classList.add('border', 'border-red-500');

        mostrarError("Todos los Campos Estan Vacios");
    }

    if(e.target.type === 'email'){
        const resultado = e.target.value.indexOf('@');
        if(resultado < 0){
            mostrarError("El email no es Valido")
        }

    }
};

function mostrarError(mensaje){
    const mensajeerror = document.createElement("p");
    mensajeerror.textContent = mensaje;
    mensajeerror.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');
    if(errores.length === 0){
        formulario.appendChild(mensajeerror);
    }

    

};