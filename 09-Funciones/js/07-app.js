iniciarapp();

function iniciarapp(){
    console.log("iniciar app");

    segundafuncion();
}

function segundafuncion(){
    console.log("desde la segunda funcion");

    autenticacion('luis');
}

function autenticacion(usuario){
    console.log("autentificando ..............");

    console.log("exito");

    console.log(`hola ${usuario}`);
}