//Variables y Selectores
const formulario = document.querySelector("#agregar-gasto");
const gastoListado = document.querySelector("#gastos ul");

//eventos

eventList();

function eventList(){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
    formulario.addEventListener('submit', agregarGasto);
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

    agregarGastoListado(gastos){
        this.limpiarHTML();
        
        gastos.forEach(gasto => {
            const {cantidad, nombre, id} = gasto;

            //crear nu LI
            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = "list-group-item d-flex justify-content-between aling-ites-center";
            nuevoGasto.dataset.id = id;

            //agregar el HTML al gasto
            nuevoGasto.innerHTML = `${nombre} <span class="badge badge-primary badge-pill"> ${cantidad} </span>`;

            //boton para borrar el gasto
            const btnborrar = document.createElement("button");
            btnborrar.textContent = "Borrar X";
            btnborrar.classList.add('btn', 'btn-danger', 'borrar-gasto');

            nuevoGasto.appendChild(btnborrar);

            //agregar al HTML
            gastoListado.appendChild(nuevoGasto);
        });
    }

    limpiarHTML(){
        while(gastoListado.firstChild){
            gastoListado.removeChild(gastoListado.firstChild)
        }
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
function agregarGasto(e){
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

    //objeto tipo  gasto
    const gasto = {nombre, cantidad, id:Date.now()} 

    
    presupuesto.nuevoGasto(gasto);

    ui.imprimirAlerta("Correcto");

    //agregar gastos  
    const {gastos} = presupuesto;
    ui.agregarGastoListado(gastos);
    formulario.reset()
    
}