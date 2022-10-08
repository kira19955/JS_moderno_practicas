const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

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

    buscarimagenes(termino)
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


function buscarimagenes(termino){
    const key = '30415895-2ffa4b509f9a1cfeaaeb0bae7';
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}`;

    console.log(url);

    fetch(url)
    .then(respuesta => respuesta.json())
    .then(resultado => console.log(resultado))
}