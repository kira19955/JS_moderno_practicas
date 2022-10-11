const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');
const paginacion = document.querySelector('#paginacion');

const registroPorPagina = 40;
let totalPaginas,iterador;
let paginaActual = 1

window.onload = () =>{
    formulario.addEventListener('submit', validarFormulario);
}

function validarFormulario(e){
    e.preventDefault();

    const termino = document.querySelector('#termino').value;

    if(termino ===""){
        mandarMensaje('El Campo no Debe de Estar Vacio');
        return;
    }

    buscarimagenes()
}

function mandarMensaje(mensaje){
    const existe = document.querySelector('.bg-red-100');

    if(!existe){
        const alerta = document.createElement('p');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center');
    
        alerta.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <br/>
        <span class="block sm:inline">${mensaje}</span> 
        `;
    
        formulario.appendChild(alerta);
    
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }

}


function buscarimagenes(){

    const termino = document.querySelector('#termino').value;

    const key = '30415895-2ffa4b509f9a1cfeaaeb0bae7';
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=${registroPorPagina}&page=${paginaActual}`;

    console.log(url);

    fetch(url)
    .then(respuesta => respuesta.json())
    .then(resultado =>{ 
        totalPaginas = calcularPAginas(resultado.totalHits);
        mostrarImagenes(resultado.hits)})
}


//GENERADOR DE PAGINAS

function *crearPaginador(total){
    for (let i = 1; i <= total; i++){
        yield i;
    }
}


function calcularPAginas(total){
    return parseInt(Math.ceil(total/registroPorPagina));
}

function mostrarImagenes(imagenes){
   while (resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }

    //iterar sobre las imagenes 

    imagenes.forEach(imagen => {
        const {previewURL, likes, views, largeImageURL} = imagen;      
        
        resultado.innerHTML += `
        <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
            <div class="bg-white">
                <img class="w-full" src="${previewURL}">

                <div class="p-4">
                    <p class="font-bold"> ${likes} <span class="font-light">Me Gusta</span></p>
                    <p class="font-bold"> ${views} <span class="font-light">Veces Vista</span></p>
                    <a class="block w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 p-1"
                        href= ${largeImageURL}" target="_black" rel="noopener noreferrer">
                    Ver Imagen
                    </a>
                </div>
            </div>
        </div>
        `;
    });

    while(paginacion.firstChild){
        paginacion.removeChild(paginacion.firstChild)
    }

     imprimirPaginador();
}

function imprimirPaginador(){
    iterador = crearPaginador(totalPaginas);

    while(true){
        const {value, done} = iterador.next()       

        if (done) return;

        const boton = document.createElement('a');
        boton.href = '#'
        boton.dataset.pagina = value
        boton.textContent = value
        boton.classList.add('siguiente', 'bg-yellow-400', 'px-4', 'py-1', 'mr-2', 'font-bold', 'mb-4', 'uppercase', 'rounded' );

        boton.onclick = () =>{
            paginaActual  =value
            buscarimagenes()
        }



        paginacion.appendChild(boton);
    }
}