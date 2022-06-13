/* const nuevo = document.createElement("A");
//agregando el texto
nuevo.textContent = "Nuevo enlace";
//agregando el href
nuevo.href = "/nuevo-enlace";
nuevo.target = "_black";
console.log(nuevo);


//seleccionar la navegacion 

const nave = document.querySelector(".navegacion")
nave.insertBefore(nuevo, nave.children[1]);



 */


const P1 = document.createElement("P");
P1.textContent = "Concierto";
P1.classList.add("categoria", "concierto");

const P2 = document.createElement("P");
P2.textContent = "concierto de ROCK";
P2.classList.add("titulo")


const P3 = document.createElement("P");
P3.textContent = "$1800 por persona";
P3.classList.add("precio");
console.log(P1);
console.log(P2);
console.log(P3);


//crear el info o card

const div = document.createElement("div");
div.classList.add("info");

div.appendChild(P1);
div.appendChild(P2);
div.appendChild(P3);

//crear la imagen 
const imagen = document.createElement("img");
imagen.src = "img/hacer2.jpg";

//crear el CARD

const tarjeta = document.createElement("div");
tarjeta.classList.add("card");

//asignar la imagen 

tarjeta.appendChild(imagen);

//asignar info

tarjeta.appendChild(div);

//mostrar el elemento

const tarjetas = document.querySelector(".contenedor-cards")
console.log(tarjetas.children);
tarjetas.append(tarjeta);
/* nave.insertBefore(nuevo, nave.children[1]);
 */


console.log(tarjeta);