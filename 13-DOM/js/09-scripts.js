/* const primero = document.querySelector("a");
primero.remove();
console.log(primero);
 */

//ELIMINAR DESDE EL PADRE

const primero = document.querySelector(".navegacion");
primero.removeChild(primero.children[2]);