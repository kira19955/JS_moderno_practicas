const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', ()=>{
    formulario.addEventListener('submit', buscarClima);
} )

function buscarClima(e){
    e.preventDefault();

    console.log('buscando el clima ')

    //validar

    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if (ciudad === "" || pais ===""){
        
        mostrarError("Los Campos No Pueden Ir Vacios");
        return;
    }

    //consultar la API

    consultarAPI(ciudad,pais);


}

function mostrarError(mensaje){
    const alerta = document.querySelector('.bg-red-100');

    if (!alerta){
        const alerta = document.createElement('div');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');
    
        alerta.innerHTML = `
        <strong class="font-bold">ERROR</strong>
        <span class="block">${mensaje}</span>
        `;
    
        container.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }

   
}

function consultarAPI(ciudad, pais){

    const appID = '1d8739a373290a5185e7ba54f95b11c0';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;

    spinner();

    fetch(url)
    .then(respuesta => respuesta.json())
    .then (datos => {

        limpiarHTML()

        if (datos.cod ==='404'){
            mostrarError('Ciudad No Encontrada');
            return;
        }

        //INPRIME LA RESPUESTA EN EL HTML
        mostrarClima(datos)
    }); 
}

function mostrarClima(datos){
    const {name, main:{temp, temp_max, temp_min}} = datos;

    const nombre = document.createElement('p');
    nombre.textContent = `Clima En ${name}`;
    nombre.classList.add('font-bold', 'text-2xl')

    const temperatura_actual =  kelvinACentigrados(temp)
    const max =  kelvinACentigrados(temp_max)
    const min =  kelvinACentigrados(temp_min)

    const actual = document.createElement('p');
    actual.innerHTML = `${temperatura_actual}&#8451;`;
    actual.classList.add('font-bold', 'text-6xl');

    const maxtem = document.createElement('p');
    maxtem.innerHTML = `Max: ${max}&#8451;`
    maxtem.classList.add('text-xl');
    
    const mintem = document.createElement('p');
    mintem.innerHTML = `Min: ${min}&#8451;`
    mintem.classList.add('text-xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    
    resultadoDiv.appendChild(nombre);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(maxtem);
    resultadoDiv.appendChild(mintem);


    resultado.appendChild(resultadoDiv);
    
}

function kelvinACentigrados(grados){
    return parseInt(grados - 273.15)

}


function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}


function spinner(){

    limpiarHTML();

    const spinner = document.createElement('div');
    spinner.classList.add('spinner')
    spinner.innerHTML = `
    
  <div class="rect2"></div>
  <div class="rect3"></div>
  <div class="rect4"></div>
  <div class="rect5"></div>

    `;

    resultado.appendChild(spinner);
}