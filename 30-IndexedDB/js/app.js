let db

document.addEventListener('DOMContentLoaded', () =>{
    crmDB();

    setTimeout(() => {
        crearCliente();
    },5000);
})

function crmDB(){
    //crear DB version 1.0
    let crmDB = window.indexedDB.open("crm", 1);

    //si hay un error

    crmDB.onerror = function(){
        console.log("hubo un error a la hora de crear la BD")
    }

    //si se creo bien 

    crmDB.onsuccess = function (){
        console.log("BD creada");

        db = crmDB.result;
    }

    //configuracion

    crmDB.onupgradeneeded = function(e){
        const db =  e.target.result;

        const objectStore = db.createObjectStore('crm',{
            keyPath: 'crm',
            autoIncrement: true
        })

        //definir las columnas

        objectStore.createIndex('nombre', 'nombre',{unique: false});
        objectStore.createIndex('email', 'email',{unique: true});
        objectStore.createIndex('telefono', 'telefono',{unique: false});

        console.log('columnas creadas');
    }
}

function crearCliente(){

    let transaction = db.transaction(['crm'], 'readwrite');

    transaction.oncomplete = function(){
        console.log("Traccion Completada");
    }

    transaction.onerror = function (){
        console.log("Hubo un Error en la transaccion")
    }

    const objectStore = transaction.objectStore('crm');

    const nuevoCliente = {
        telefono: 2283214312,
        nombre: "luis",
        email: "correo@correo.com"
    }

    const peticion = objectStore.add(nuevoCliente);

    console.log(peticion);
}
