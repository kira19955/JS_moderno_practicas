(function(){

    let DB;

    document.addEventListener('DOMContentLoaded',()=>{
        crearDB();
    });

    //CREAR LA BASE DE DATOS

    function crearDB(){

        const crearDB = window.indexedDB.open('crm',1);

        crearDB.onerror = ()=>{
            console.log("Huno un Error")
        }

        crearDB.onsuccess = () =>{
            DB = crearDB.result;   
        }

        crearDB.onupgradeneeded = function(e){
           const db = e.target.result;

            const objectStore = db.createObjectStore('crm', {keyPath: 'id', autoIncrement: true});
            
            objectStore.createIndex('nombre', 'nombre', {unique:false});
            objectStore.createIndex('email', 'email', {unique:true});
            objectStore.createIndex('telefono', 'telefono', {unique:false});
            objectStore.createIndex('empresa', 'empresa', {unique:false});
            objectStore.createIndex('id', 'id', {unique:false});

            console.log("DB LISTA Y CREADA");
        }
    }









})();