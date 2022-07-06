//constructores

function Seguro(marca,year, tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

//realiza la cotizacion con los datos

Seguro.prototype.cotizarSeguro = function(){
let cantidad;
const base = 2000;

switch (this.marca) {
    case '1':
        cantidad = base * 1.15;
        break;
    case '2':
        cantidad = base * 1.05;
        break;
    case '3':
        cantidad = base * 1.35;
        break;

    default:
        break;
}
    //leer el año 
    const diferencia = new Date().getFullYear() - this.year;

    cantidad -= (( diferencia*3)* cantidad) / 100; 


    if(this.tipo ==="basico"){
        cantidad *= 1.30
    }else{
        cantidad *= 1.50
    }

    return cantidad;

};

function UI(){}

//llena las opciones de los años
UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear();
    let min = max -20;

    const select = document.querySelector('#year');

    for(let i = max; i > min; i--){
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        select.appendChild(option); 
    }
}

//muestra alertas en pantalla

UI.prototype.Mostrarmensaje = (mensaje, tipo) => {
    const div = document.createElement("div");

    if (tipo === 'error'){
        div.classList.add("error");
    }else{
        div.classList.add("correcto");
    }

    div.classList.add("mensaje","mt-10");
    div.textContent = mensaje;

    //insertar
    const formulario = document.querySelector("#cotizar-seguro");
    formulario.insertBefore(div, document.querySelector("#resultado"));

    setTimeout(() => {
        div.remove();
    }, 3000);

}

UI.prototype.mostrarResultado = (total, seguro) =>{

    const {marca, year, tipo} = seguro;
    let textomarca;

    switch (marca) {
        case '1':
            textomarca = 'Americano';
            break;
        case '2':
            textomarca = 'Asiatico';
            break;
        case '3':
            textomarca = 'Europeo';
            break;
            
    
        default:
            break;
    }
    //crear el resultado
    const div = document.createElement("div");
    div.classList.add("mt-10");
    div.innerHTML =  `
    <p class= "header">Tu Resumen</p>
    <p class= "font-bold">Marca: <span class="font-normal"> ${textomarca}</span> </p>
    <p class= "font-bold">Año: <span class="font-normal">  ${year}</span> </p>
    <p class= "font-bold">Año: <span class="font-normal capitalize">  ${tipo}</span> </p>
    <p class= "font-bold">Total: <span class="font-normal"> $ ${total}</span> </p>
    `;

    const resultadoDiv = document.querySelector("#resultado");
    

    //mostrar el spinner
    const spinner = document.querySelector("#cargando");
    spinner.style.display = "block";

    setTimeout(() => {
        spinner.style.display = "none";
        resultadoDiv.appendChild(div);
    }, 3000);
}

//instanciar UI

const ui = new UI();
console.log(ui);


document.addEventListener('DOMContentLoaded',()=>{
    ui.llenarOpciones(); //llena el select con los años;
});


eventlistener();

function eventlistener(){
    const formulario = document.querySelector("#cotizar-seguro");
    formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e){
    e.preventDefault();

    //leer la marca seleccionada
    const marca = document.querySelector("#marca").value;
    //leer la año  seleccionada
    const year = document.querySelector("#year").value;
    //leer la tipo seleccionada
    const tipo = document.querySelector("input[name='tipo']:checked").value;
    if (marca === "" || year === "" || tipo ===""){
        ui.Mostrarmensaje("Todos los campos son Obligatorios", "error");
        return;   
    }
    
    ui.Mostrarmensaje("Cotizando......", "exito");

    const resultados = document.querySelector("#resultado div");
    if(resultados != null){
        resultados.remove();
    }

    //instanciar el seguro
const seguro = new Seguro(marca, year, tipo);
const total = seguro.cotizarSeguro();

    //utilizar un proto 
    ui.mostrarResultado(total, seguro);
    

    
}
