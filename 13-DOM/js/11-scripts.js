const boton = document.querySelector(".btn-flotante");
const footer = document.querySelector(".footer");


boton.addEventListener('click', flotar)

function flotar(){
    if(footer.classList.contains("activo")){
        footer.classList.remove("activo");
        boton.classList.remove("activo");
        boton.textContent= "Idioma y Moneda";
    }else{
        footer.classList.add("activo");
        boton.classList.add("activo");
        boton.textContent= "X Cerrar";
    }
}