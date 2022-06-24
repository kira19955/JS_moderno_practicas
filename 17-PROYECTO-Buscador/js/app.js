//variables
const marca = document.querySelector('#marca')
const year = document.querySelector('#year')
const minimo = document.querySelector('#minimo')
const maximo = document.querySelector('#maximo')
const puertas = document.querySelector('#puertas')
const trasmision = document.querySelector('#transmision')
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
    mostrarAutos(autos);

    //llena las opciones de años
    llenarSelect();
})

marca.addEventListener('change', e  =>{
    datosBusqueda.marca = e.target.value

    filtrarAuto();
})

year.addEventListener('change', e  =>{
    datosBusqueda.year = e.target.value

    filtrarAuto(); 
})

minimo.addEventListener('change', e  =>{
    datosBusqueda.minimo = e.target.value

    filtrarAuto();
})

maximo.addEventListener('change', e  =>{
    datosBusqueda.maximo = e.target.value
    //filtrarAuto();
})
puertas.addEventListener('change', e  =>{
    datosBusqueda.puertas = e.target.value
})
trasmision.addEventListener('change', e  =>{
    datosBusqueda.trasmision = e.target.value
})
color.addEventListener('change', e  =>{
    datosBusqueda.color = e.target.value
})


//funciones
function mostrarAutos(autos){
    limpiarHtml();

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

//limpiar HTML

function limpiarHtml(){
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
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


//funcion que filtra
function filtrarAuto(){
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo);
    //console.log(resultado);

    mostrarAutos(resultado);
}

function filtrarMarca(auto){
    if(datosBusqueda.marca){
        return auto.marca === datosBusqueda.marca;
    }
    return auto;
}

function filtrarYear(auto){
    if(datosBusqueda.year){
        return auto.year === parseInt(datosBusqueda.year) ;
    }
    return auto;
}

function filtrarMinimo(auto){
    if(datosBusqueda.minimo){
        return auto.precio >= minimo;
    }
    return auto;
}