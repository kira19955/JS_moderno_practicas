(function () {

    let DB;
    const formulario = document.querySelector('#formulario');

    document.addEventListener('DOMContentLoaded', () => {


        conectarDB();
        formulario.addEventListener('submit', validarCliente);

    })

    function conectarDB() {
        const abrirConexion = window.indexedDB.open('crm', 1);

        abrirConexion.onerror = () => {
            console.log("Hubo un Error")
        }

        abrirConexion.onsuccess = () => {
            DB = abrirConexion.result;
        }
    }

    function validarCliente(e) {
        e.preventDefault();

        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        if (nombre === "" || email === "" || telefono === "" || empresa === "") {
            imprimirAlerta('Todos Los Campos Son Obligatorios', 'error');
            return;
        }
    }

    function imprimirAlerta(mensaje, tipo) {
        //CREAR ALERTA

        const alerta = document.querySelector('.alerta')

        if (!alerta) {
            const divmensaje = document.createElement('div');
            divmensaje.classList.add('px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center', 'border', 'alerta');

            if (tipo === "error") {
                divmensaje.classList.add('bg-red-100', 'border-red-400', 'text-red-700');
            } else {
                divmensaje.classList.add('bg-green-100', 'border-green-400', 'text-green-700');
            }

            divmensaje.textContent = mensaje;
            formulario.appendChild(divmensaje);

            setTimeout(() => {
                divmensaje.remove();
            }, 3000);
        }

    }



})();