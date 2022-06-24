//variables
const marca = document.querySelector('#marca')
const year = document.querySelector('#year')
const minimo = document.querySelector('#minimo')
const maximo = document.querySelector('#maximo')
const puertas = document.querySelector('#puertas')
const trasmision = document.querySelector('#trasmision')
const color = document.querySelector('#color')


const resultado = document.querySelector('#resultado')


//generador de fechas
const max = new Date().getFullYear();
const min = max - 10;

console.log(max);
console.log(min);

//generar un objeto con la busqueda

const datosBusqueda = {
    marca : '',
    year : '',
    minimo : '',
    maximo : '',
    puertas : '',
    trasmision : '',
    color : ''
}



//eventos

document.addEventListener('DOMContentLoaded', ()=>{
    mostrarAutos();

    //llena las opciones de años
    llenarSelect();
})

marca.addEventListener('change', () =>{
    console.log("cambio......")

    http://localhost:8069/survey/start/diseno-web-1/phantom
})



//funciones
function mostrarAutos(){
    autos.forEach(auto =>{

        const {marca, modelo, year, puertas, transmision, precio, color} = auto;
        const autoHTML = document.createElement('p');
        autoHTML.textContent = `
        ${marca} ${modelo} - ${year} - ${puertas} Puertas - Trasmisión: ${transmision} - precio: ${precio} - Color: ${color}
        
        `;


        //insertar en el HTML

        resultado.appendChild(autoHTML);
    })
}

//genera los años del select 

function llenarSelect(){
    for ( let i = max; i>=min; i--){
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);  //agrega las opciones del año al select 

    }
}