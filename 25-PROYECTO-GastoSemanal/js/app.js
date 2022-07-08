//Variables y Selectores
const formulario = document.querySelector("#agregar-gasto");
const gastoLista = document.querySelector("#gastos ul");

//eventos

eventList();
function eventList(){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto)
}


//Clases






//funciones

function preguntarPresupuesto(){
    const presupuestoUsuario =  prompt("¿Cual es tu Presupuesto?");

    if( presupuestoUsuario ==="" || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0 ){
        window.location.reload();
    }
}