//variables
const formulario = document.querySelector('#formulario');
const lista = document.querySelector("#lista-tweets");
let tweets = [];


//event 

eventListeners();
function eventListeners(){
    formulario.addEventListener('submit', agregarTweet)
}





//funciones

function agregarTweet(e){
    e.preventDefault();

    console.log("agregando");

    //text area
    const area =  document.querySelector("#tweet").value;

    //validacion 
    if(area === ""){
        error("Un mensaje no puede ir vacio")
        return; //evita que se ejecuten mas lineas d ecodigo
    }

    const tweetsObj = {
        id: Date.now(),
        texto: area,
    }

    //añadir al arreglo de tweets
    tweets = [...tweets, tweetsObj];

    //crear el HTML

    crearHtml();
    
    formulario.reset();


}

//mostrar mensaje de error

function error(mensaje){
    const mensajeError = document.createElement("p");
    mensajeError.textContent = mensaje;
    mensajeError.classList.add("error");

    //insertar en el contenido 
    const contenido = document.querySelector("#contenido");
    contenido.appendChild(mensajeError);


    //elimina la alerta despues de 3s
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);

}

//crea un listado de lo tweets

function crearHtml(){
    limpiarHtml();
    if(tweets.length > 0){
        tweets.forEach(tweet1 =>{

            //crea el HTML
            const li = document.createElement("li");

            //añadir el texto
            li.innerText = tweet1.texto;

            //insertarlo en el HTML

            lista.appendChild(li);

        })
    }
}

function limpiarHtml(){
    while (lista.firstChild){
            lista.removeChild(lista.firstChild);
        
    }
}