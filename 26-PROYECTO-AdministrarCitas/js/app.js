//variables

const mascota_input = document.querySelector("#mascota");
const propietario_input = document.querySelector("#propietario");
const telefono_input = document.querySelector("#telefono");
const fecha_input = document.querySelector("#fecha");
const hora_input = document.querySelector("#hora");
const sintomas_input = document.querySelector("#sintomas");
const formulario = document.querySelector("#nueva-cita");
const contenedor_citas = document.querySelector("#citas");

//clases

class Citas{
    constructor(){
        this.citas = [];
    }

    agragarCita(cita){
        this.citas = [...this.citas, cita];
        console.log(this.citas);
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
            

            divCita.appendChild(mascotaparrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);

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
    const { mascota, propietario, fecha, hora, sintomas} = citaObj

    if(mascota === "" || propietario === "" || fecha === "" || hora === "" || sintomas === ""){
        ui.imprimirAlerta("Todos los Campos son Obligatorios", "error");
        return;
    }

    //generar un ID unico
    citaObj.id = Date.now();

    administrarCitas.agragarCita({...citaObj});

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