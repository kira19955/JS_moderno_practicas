//Variables y Selectores
const formulario = document.querySelector("#agregar-gasto");
const gastoLista = document.querySelector("#gastos ul");

//eventos

eventList();
function eventList(){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
    formulario.addEventListener('submit', agregarGastos);
}


//Clases
class Presupuesto{
    constructor(presupuesto){
        this.presupuesto  =  Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }

    nuevoGasto(gasto){
        this.gastos = [...this.gastos, gasto]
        console.log(this.gastos);
    }

}

class UI{
    insertarPresupuesto(cantidad){
        //extrayendo el valor
        const {presupuesto, restante} = cantidad;

        //agregando al HTML
        document.querySelector("#total").textContent = presupuesto;
        document.querySelector("#restante").textContent = restante;
    }

    imprimirAlerta(mensaje, tipo){
        //crear el DIV
        const divMensaje = document.createElement("div");
        divMensaje.classList.add("text-center", "alert")

        if(tipo === "error"){
            divMensaje.classList.add("alert-danger");
        } else{
            divMensaje.classList.add("alert-success");
        }

        //agregar mensaje 
        divMensaje.textContent = mensaje;

        document.querySelector(".primario").insertBefore(divMensaje, formulario);

        setTimeout(()=>{
            divMensaje.remove()
        },3000);
    }

}

//instanciar 
const ui = new UI();
let presupuesto



//funciones

function preguntarPresupuesto(){
    const presupuestoUsuario =  prompt("¿Cual es tu Presupuesto?");

    if( presupuestoUsuario ==="" || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0 ){
        window.location.reload();
    }

    presupuesto = new Presupuesto(presupuestoUsuario);
    console.log(presupuesto);
    ui.insertarPresupuesto(presupuesto)
}

//añadir gastos
function agregarGastos(e){
    e.preventDefault();

    //leer los datos del formulario 
    const nombre = document.querySelector("#gasto").value;
    const cantidad = Number( document.querySelector("#cantidad").value);

    //validar
    if(nombre === "" || cantidad === ""){
        ui.imprimirAlerta( "Ambos campos son Obligatorios", "error");
        return
    }else if(cantidad <= 0 || isNaN(cantidad)){
        ui.imprimirAlerta( "Cantidad no valida", "error");
        return
    } 

    //objero gasto
    const gasto = {nombre, cantidad, id:Date.now()} 

    presupuesto.nuevoGasto(gasto);

    ui.imprimirAlerta("Correcto");
    formulario.reset()
    
}