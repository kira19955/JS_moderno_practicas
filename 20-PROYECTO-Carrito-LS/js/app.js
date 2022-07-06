//Variables

const carrito = document.querySelector('#carrito');
const contenedor_carrito = document.querySelector('#lista-carrito tbody');
const vaciarcarrito = document.querySelector('#vaciar-carrito');
const lista_cursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargar();

function cargar(){

    lista_cursos.addEventListener('click', agregarCurso);

    //eliminar cursos del carrito

    carrito.addEventListener('click', eliminarcurso);

    //muestra el localstorage

    document.addEventListener('DOMContentLoaded', ()=>{
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

        carritoHtml();
    })

    //vaciar el carrito 

    vaciarcarrito.addEventListener('click', ()=>{
        articulosCarrito = [];
        limpiarhtml();
    }); 

}

//funciones

function agregarCurso(e){
    //CON EL e.preventDefault(); EVITAR QUE HAGA LAS FUNCIONES POR DEFAULT

    e.preventDefault();
    if( e.target.classList.contains('agregar-carrito')){    
        const cursos_seleccionados = e.target.parentElement.parentElement;

        leerDatosCurso(cursos_seleccionados);
    }
}

function eliminarcurso(e){
    if(e.target.classList.contains("borrar-curso")){
        const cursoId = e.target.getAttribute('data-id');

        //elimina del arreglo por el data id

        articulosCarrito =  articulosCarrito.filter(curso => curso.id !== cursoId );
        carritoHtml(); 
    };
}

//funcion leer el HTML del boton al que le dimos click

function leerDatosCurso(curso){
    

    //crear objeto con el contenido del curso actual 
    const infocurso ={
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.u-pull-right').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //revisa si un elemento ya existe en el carrito

    const existe = articulosCarrito.some(curso => curso.id === infocurso.id); 
    if (existe) {
            //actualizamos cantidad
            const cursos = articulosCarrito.map( curso =>{
                if(curso.id === infocurso.id){
                    curso.cantidad ++
                    return curso;
                }else{
                    return curso;
                }
            });
            articulosCarrito = [...cursos]
    }else{
        //agregamos al carrito
        articulosCarrito = [...articulosCarrito, infocurso];
    }
         
    console.log(articulosCarrito);

    

    carritoHtml();

}

//muestra el carrito de compras en el HTML

function carritoHtml(){

    //LIMPIAR EL HTML 
    
    limpiarhtml();
    
    
    //RECORRE EL CARRITO Y GENERA EL HTML
    articulosCarrito.forEach(articulo =>{
        //const { imagen, titulo, precio, cantidad }  = articulo;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src = "${articulo.imagen}" width="100">
            </td>
            <td>
                ${articulo.titulo}
            </td>
            <td>
                ${articulo.precio}
            </td>
            <td>
                ${articulo.cantidad}
            </td>
            <td>
                <a href ="#" class ="borrar-curso" data-id=${articulo.id}>X</a>
            </td>
        
        `;

        //agregar el HTML al TBODY
        contenedor_carrito.appendChild(row);
    });

    //agregar al localstorage

    sincronizarStorage();
}

function sincronizarStorage(){
    localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
}

//eliminar los cursos del tbody
function limpiarhtml(){

    //forma lenta
    //contenedor_carrito.innerHTML = "";

    while (contenedor_carrito.firstChild) {
        contenedor_carrito.removeChild(contenedor_carrito.firstChild)
    }
}