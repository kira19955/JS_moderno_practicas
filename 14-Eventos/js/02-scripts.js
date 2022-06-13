const nav = document.querySelector(".navegacion");

//registrar un evento 

nav.addEventListener('click', ()=>{
    console.log("click");
})


nav.addEventListener('mouseenter', ()=>{
    console.log("Entrando a la navegacion");
    nav.style.color = "red";
})

nav.addEventListener('mouseout', ()=>{
    console.log("saliendo a la navegacion");
})
