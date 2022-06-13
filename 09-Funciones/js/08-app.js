function sumar(a,b){
    return a+b;
}

const resultado = sumar(3, 5);

console.log(resultado);


//ejemplo mas avanzado 

let total = 0;

function agregarCarrito(precio){
    return total += precio;
}

function calcularimpuesto(total){
    return total * 1.16;
}

agregarCarrito(300);
agregarCarrito(500);
agregarCarrito(300);

console.log(total);

const totalpagar = calcularimpuesto(total);

console.log(totalpagar);