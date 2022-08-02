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

}

class UI{

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
   console.log(citaObj)
}

// valida y agrega una nueva cita a la clase de citas

function nuevaCita(e){
    e.preventDefault();

    //extraer la informacion del objeto cita
    const { mascota, propietario, fecha, hora, sintomas} = citaObj

    if(mascota === "" || propietario === "" || fecha === "" || hora === "" || sintomas === ""){
        console.log("todos los campos son obligatorios");
        return;
    }

}