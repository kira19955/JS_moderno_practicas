//variables

const mascota_input = document.querySelector("#mascota");
const propietario_input = document.querySelector("#propietario");
const telefono_input = document.querySelector("#telefono");
const fecha_input = document.querySelector("#fecha");
const hora_input = document.querySelector("#hora");
const sintomas_input = document.querySelector("#sintomas");
const formulario = document.querySelector("#nueva-cita");
const contenedor_citas = document.querySelector("#citas");

let editando;

//clases

class Citas{
    constructor(){
        this.citas = [];
    }

    agragarCita(cita){
        this.citas = [...this.citas, cita];
        console.log(this.citas);
    }

    eliminarCita(id){
        this.citas = this.citas.filter( cita => cita.id !== id)
    }

    editarCita(citaActualizada){
        this.citas = this.citas.map( cita => cita.id === citaActualizada.id ? citaActualizada : cita);
    }

}

class UI{

    imprimirAlerta(mensaje, tipo){
        // crear el div
        const divmensaje = document.createElement("div");
        divmensaje.classList.add("text-center", "alert", "d-block", "col-12");

        //agregar clase al ripo de error 

        if(tipo === "error"){
            divmensaje.classList.add("alert-danger");
        }else{
            divmensaje.classList.add("alert-success");
        }

        //div
        divmensaje.textContent = mensaje;

        document.querySelector("#contenido").insertBefore(divmensaje, document.querySelector(".agregar-cita"));

        setTimeout(() => {
            divmensaje.remove();
        }, 3000);
    }

    imprimirCitas({citas}){

        this.limpiarHtml();
        
        citas.forEach(cita => {
            const { mascota, propietario, fecha, hora, sintomas, id, telefono} = cita

            const divCita =document.createElement("div");
            divCita.classList.add("cita", 'p-3');
            divCita.dataset.id = id;

            const mascotaparrafo = document.createElement("h2");
            mascotaparrafo.classList.add("card-title", "font-weight-bolder");
            mascotaparrafo.textContent = mascota;

            const propietarioParrafo = document.createElement("p");
            propietarioParrafo.innerHTML = `
            <span class="font-weight-bolder">Propietario: </span> ${propietario}
            `;

            const telefonoParrafo = document.createElement("p");
            telefonoParrafo.innerHTML = `
            <span class="font-weight-bolder">telefono: </span> ${telefono}
            `;

            const fechaParrafo = document.createElement("p");
            fechaParrafo.innerHTML = `
            <span class="font-weight-bolder">fecha: </span> ${fecha}
            `;

            const horaParrafo = document.createElement("p");
            horaParrafo.innerHTML = `
            <span class="font-weight-bolder">hora: </span> ${hora}
            `;

            const sintomasParrafo = document.createElement("p");
            sintomasParrafo.innerHTML = `
            <span class="font-weight-bolder">sintomas: </span> ${sintomas}
            `;

            //boton para eliminar la cita
            const btnEliminar = document.createElement("button");
            btnEliminar.classList.add("btn", "btn-danger", "mr-2");
            btnEliminar.innerHTML = 'Eliminar <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'
            
            btnEliminar.onclick = () => eliminarCita(id);

            //editar
            const btnEditar = document.createElement("button");
            btnEditar.classList.add("btn", "btn-info");
            btnEditar.innerHTML = 'Editar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>'
            btnEditar.onclick = () => cargarEdicion(cita);


            divCita.appendChild(mascotaparrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);

            contenedor_citas.appendChild(divCita);
        });
    }

    limpiarHtml(){
        while (contenedor_citas.firstChild) {
            contenedor_citas.removeChild(contenedor_citas.firstChild);
        }
    }

}


const ui = new UI();

const administrarCitas = new Citas();


//eventos
eventListener();
function eventListener(){
    mascota_input.addEventListener('input', datosCita);
    propietario_input.addEventListener('input', datosCita);
    telefono_input.addEventListener('input', datosCita);
    fecha_input.addEventListener('input', datosCita);
    hora_input.addEventListener('input', datosCita);
    sintomas_input.addEventListener('input', datosCita);
    formulario.addEventListener('submit', nuevaCita)
}

//objeto con la informacion de la cita
const citaObj = {
    mascota: "",
    propietario : "",
    telefono : "",
    fecha : "",
    hora : "",
    sintomas : "",
}


//agregar datos al objeto de lista
function datosCita(e){
   citaObj[ e.target.name] = e.target.value;
}

// valida y agrega una nueva cita a la clase de citas

function nuevaCita(e){
    e.preventDefault();

    //extraer la informacion del objeto cita
    const { mascota, propietario, fecha, hora, sintomas, telefono} = citaObj

    if(mascota === "" || propietario === "" || fecha === "" || hora === "" || sintomas === "" || telefono === ""){
        ui.imprimirAlerta("Todos los Campos son Obligatorios", "error");
        return;
    }

    if(editando){
        ui.imprimirAlerta("Editado correctamente");

        administrarCitas.editarCita({...citaObj});

        formulario.querySelector('button[type="submit"]').textContent = "Crear Cita";

        editando = false;
    }else{
        citaObj.id = Date.now();

        administrarCitas.agragarCita({...citaObj});

        //mensaje agregado 

        ui.imprimirAlerta("se agrego correctamente");
    }

    //generar un ID unico   

    reiniciarObjeto();

    formulario.reset();

    ui.imprimirCitas(administrarCitas);

}

function reiniciarObjeto(){
    citaObj.mascota= "";
    citaObj.propietario = "";
    citaObj.telefono = "";
    citaObj.fecha = "";
    citaObj.hora = "";
    citaObj.sintomas = "";    
}

function eliminarCita(id){
    administrarCitas.eliminarCita(id);

    ui.imprimirAlerta("La cita se Elimino correctamente");

    ui.imprimirCitas(administrarCitas);

}

function cargarEdicion(cita){
    const { mascota, propietario, fecha, hora, sintomas,telefono,id} = cita

    //llenar los inputs
    mascota_input.value = mascota;
    propietario_input.value = propietario;
    telefono_input.value = telefono;
    fecha_input.value = fecha;
    hora_input.value = hora;
    sintomas_input.value = sintomas;

    //llenar el objeto 

    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    formulario.querySelector('button[type="submit"]').textContent = "Guardar Cambios";
    editando = true;

}