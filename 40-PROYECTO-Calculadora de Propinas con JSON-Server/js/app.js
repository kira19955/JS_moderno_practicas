let cliente = {
    mesa: '',
    hora: '',
    pedido: []
};

const categorias = {
    1: 'Comida',
    2: 'Bebidas',
    3: 'Postres'
}

const btnGuardarCliente = document.querySelector('#guardar-cliente');
btnGuardarCliente.addEventListener('click', guardarCliente);

function guardarCliente(e) {
    const mesa = document.querySelector('#mesa').value
    const hora = document.querySelector('#hora').value

    //revisar los campos

    const camposVacios = [mesa, hora].some(campo => campo === "");

    if (camposVacios) {
        //vedificar si hay una alerta
        const existeAlerta = document.querySelector('.invalid-feedback');

        if (!existeAlerta) {
            const alerta = document.createElement('div');
            alerta.classList.add('invalid-feedback', 'd-block', 'text-center');
            alerta.textContent = "Todos Los Campos Son Obligatorios";
            document.querySelector('.modal-body form').appendChild(alerta);

            setTimeout(() => {
                alerta.remove();
            }, 3000);
        }

        return;
    }

    //asignar datos del formulario al cliente
    cliente = { ...cliente, mesa, hora }

    //ocultar modal
    const modalFormulario = document.querySelector('#formulario');
    const modalBootstrap = bootstrap.Modal.getInstance(modalFormulario);
    modalBootstrap.hide();

    //mostrar las Secciones
    mostrarSecciones();

    //obtener platillos de la API

    obtenerPlatillos();

}

function mostrarSecciones() {
    const SeccionesOcultas = document.querySelectorAll('.d-none');

    SeccionesOcultas.forEach(seccion => seccion.classList.remove('d-none'));

}

function obtenerPlatillos() {
    const url = 'http://localhost:4000/platillos';

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(respuesta => mostrarPlatillos(respuesta));
}

function mostrarPlatillos(platillos) {
    const contenido = document.querySelector('#platillos .contenido')

    platillos.forEach(platillo => {
        const row = document.createElement('div');
        row.classList.add('row', 'py-3', 'border-top');

        const nombre = document.createElement('div');
        nombre.classList.add('col-md-4');
        nombre.textContent = platillo.nombre;

        const precio = document.createElement('div');
        precio.classList.add('col-md-3', 'fw-bold');
        precio.textContent = `$${platillo.precio}`;

        const categoria = document.createElement('div');
        categoria.classList.add('col-md-3');
        categoria.textContent = categorias[platillo.categoria];

        const inputCantidad = document.createElement('input');
        inputCantidad.type = 'number'
        inputCantidad.min = 0;
        inputCantidad.value = 0;
        inputCantidad.id = `producto-${platillo.id}`;
        inputCantidad.classList.add('form-control');

        //funcinon que detecta la cantidad y platillo
        inputCantidad.onchange = function () {
            const cantidad = parseInt(inputCantidad.value);
            agregarPlatillo({ ...platillo, cantidad });

        }

        const agregar = document.createElement('div');
        agregar.classList.add('col-md-2');
        agregar.appendChild(inputCantidad);


        row.appendChild(nombre);
        row.appendChild(precio);
        row.appendChild(categoria);
        row.appendChild(agregar);

        contenido.appendChild(row);



    })
}

function agregarPlatillo(producto) {
    let { pedido } = cliente;
    //revisar que la cantidad sea mayor a 0
    if (producto.cantidad > 0) {

        if (pedido.some(articulo => articulo.id === producto.id)) {
            const pedidoActualizado = pedido.map(articulo => {
                if (articulo.id === producto.id) {
                    articulo.cantidad = producto.cantidad
                }
                return articulo;
            });

            cliente.pedido = [...pedidoActualizado];
        } else {
            cliente.pedido = [...pedido, producto]
        }

    } else {
        //eliminar elementos cuando la cantidad sea Cero
        const resultado = pedido.filter(articulo => articulo.id !== producto.id)
        cliente.pedido = [...resultado];
    }

    //limpiar HTML
    limpiarHtml()

    if (cliente.pedido.length) {

        //MOSTRAR EL RSUMEN 
        actualizarResumen();
    } else {
        mensajePedidoVacio()
    }

}

function actualizarResumen() {
    const contenido = document.querySelector('#resumen .contenido')

    const resumen = document.createElement('div')

    resumen.classList.add('col-md-6', 'card', 'py-2', 'px-3', 'shadow');

    //informacion de la mesa
    const mesa = document.createElement('p');
    mesa.textContent = 'mesa: ';
    mesa.classList.add('fe-bold')

    const mesaSpan = document.createElement('span');
    mesaSpan.textContent = cliente.mesa;
    mesaSpan.classList.add('fw-normal');

    //informacion de la hora
    const hora = document.createElement('p');
    hora.textContent = 'hora: ';
    hora.classList.add('fe-bold')

    const horaSpan = document.createElement('span');
    horaSpan.textContent = cliente.mesa;
    horaSpan.classList.add('fw-normal');

    mesa.appendChild(mesaSpan);
    hora.appendChild(horaSpan);

    //titulo de la seccion 
    const heading = document.createElement('h3');
    heading.textContent = 'Platillos Consumidos';
    heading.classList.add('my-4', 'text-center');

    //ITERAR SOBRE EL ARRAY DE PEDIDOS 

    const grupo = document.createElement('ul');
    grupo.classList.add('list-group');

    const { pedido } = cliente;
    pedido.forEach(articulo => {
        const { nombre, cantidad, precio, id } = articulo;

        const lista = document.createElement('li');
        lista.classList.add('list-group-item');

        const nombreEl = document.createElement('h4');
        nombreEl.classList.add('my-4');
        nombreEl.textContent = nombre;

        //agregar elementos al LI

        lista.appendChild(nombreEl);

        const cantidadEl = document.createElement('p');
        cantidadEl.classList.add('fw-bold');
        cantidadEl.textContent = 'Cantidad:';

        const cantidadValor = document.createElement('span');
        cantidadValor.classList.add('fw-normal');
        cantidadValor.textContent = cantidad;

        cantidadEl.appendChild(cantidadValor);

        //precio

        const precioEl = document.createElement('p');
        precioEl.classList.add('fw-bold');
        precioEl.textContent = 'Precio:';

        const precioValor = document.createElement('span');
        precioValor.classList.add('fw-normal');
        precioValor.textContent = `$${precio}`;

        precioEl.appendChild(precioValor);

        //Sub total

        const subtoalEl = document.createElement('p');
        subtoalEl.classList.add('fw-bold');
        subtoalEl.textContent = 'Sub Total:';

        const subtoalElValor = document.createElement('span');
        subtoalElValor.classList.add('fw-normal');
        subtoalElValor.textContent = precio * cantidad;

        subtoalEl.appendChild(subtoalElValor);

        //Boton para eliminar 

        const botonElminar = document.createElement('button');
        botonElminar.classList.add('btn', 'btn-danger');
        botonElminar.textContent = "Eliminar Del Pedido";
        botonElminar.onclick = function () {
            eliminarProducto(id)
        }

        lista.appendChild(nombreEl);
        lista.appendChild(cantidadEl);
        lista.appendChild(precioEl);
        lista.appendChild(subtoalEl);
        lista.appendChild(botonElminar);

        //agregar lista al Grupo Principal

        grupo.appendChild(lista)

    })


    resumen.appendChild(heading);
    resumen.appendChild(mesa);
    resumen.appendChild(hora);

    resumen.appendChild(grupo);

    contenido.appendChild(resumen);

    //funcion mostrar formulario Propinas

    formularioPropinas();
}

function limpiarHtml() {
    const contenido = document.querySelector('#resumen .contenido')

    while (contenido.firstChild) {
        contenido.removeChild(contenido.firstChild)
    }

}

function eliminarProducto(id) {
    const { pedido } = cliente
    const resultado = pedido.filter(articulo => articulo.id !== id)
    cliente.pedido = [...resultado];

    console.log(cliente.pedido);

    limpiarHtml()

    if (cliente.pedido.length) {

        //MOSTRAR EL RSUMEN 
        actualizarResumen();
    } else {
        mensajePedidoVacio()
    }



    //se gresa a Cero el formulario
    const productoEliminado = `#producto-${id}`;
    const inputEliminado = document.querySelector(productoEliminado);
    inputEliminado.value = 0
}

function mensajePedidoVacio() {
    const contenido = document.querySelector('#resumen .contenido');

    const texto = document.createElement('p');
    texto.classList.add('text-center');
    texto.textContent = "Añade los elementos del pedido";

    contenido.appendChild(texto);

}

function formularioPropinas() {
    const contenido = document.querySelector('#resumen .contenido');

    const formulario = document.createElement('div');
    formulario.classList.add('col-md-6', 'formulario');

    const divFormulario = document.createElement('div');
    divFormulario.classList.add('card', 'py-2', 'px-3', 'shadow')

    const heading = document.createElement('h3');
    heading.classList.add('my-4');
    heading.textContent = "Propina";
    heading.classList.add('text-center')


    //Radio Button 10%
    const radio10 = document.createElement('input');
    radio10.type = 'radio';
    radio10.name = 'propina';
    radio10.value = '10';
    radio10.classList.add('form-check-input');
    radio10.onclick = calcularPropina

    const radio10Label = document.createElement('label');
    radio10Label.classList.add('form-check-label')
    radio10Label.textContent = "10%"

    const radio10Div = document.createElement('div');
    radio10Div.classList.add('form-check');

    radio10Div.appendChild(radio10);
    radio10Div.appendChild(radio10Label);


    //Radio Button 25%
    const radio25 = document.createElement('input');
    radio25.type = 'radio';
    radio25.name = 'propina';
    radio25.value = '25';
    radio25.classList.add('form-check-input');
    radio25.onclick = calcularPropina

    const radio25Label = document.createElement('label');
    radio25Label.classList.add('form-check-label')
    radio25Label.textContent = "25%"

    const radio25Div = document.createElement('div');
    radio25Div.classList.add('form-check');

    radio25Div.appendChild(radio25);
    radio25Div.appendChild(radio25Label);


    //Radio Button 50%
    const radio50 = document.createElement('input');
    radio50.type = 'radio';
    radio50.name = 'propina';
    radio50.value = '50';
    radio50.classList.add('form-check-input');
    radio50.onclick = calcularPropina

    const radio50Label = document.createElement('label');
    radio50Label.classList.add('form-check-label')
    radio50Label.textContent = "50%"

    const radio50Div = document.createElement('div');
    radio50Div.classList.add('form-check');

    radio50Div.appendChild(radio50);
    radio50Div.appendChild(radio50Label);


    divFormulario.appendChild(heading);
    divFormulario.appendChild(radio10Div);
    divFormulario.appendChild(radio25Div);
    divFormulario.appendChild(radio50Div);

    formulario.appendChild(divFormulario);


    contenido.appendChild(formulario);


}

function calcularPropina(){
    const {pedido} = cliente;
    let subtotal= 0;

    pedido.forEach(articulo =>{
        subtotal+= articulo.cantidad * articulo.precio;
    })

    //Seleccionar el Radio buton con la propina
    const propinaSeleccionada = document.querySelector('[name="propina"]:checked').value;

    //Calcular la propina

    const propina = ((subtotal * parseInt(propinaSeleccionada))/100);

    //total a pagar 

    const total = subtotal + propina;


    mostrarTotalHtml(subtotal,total, propina);
    
}

function mostrarTotalHtml(subtotal,total, propina){

    const divTotales = document.createElement('div');

    divTotales.classList.add('total-pagar');

    //subtotal 
    const subtotalParrafo = document.createElement('p');
    subtotalParrafo.classList.add('fs-3','fw-bold', 'mt-5');
    subtotalParrafo.textContent = "Subtotal Consumo: ";

    const subtotalSpan = document.createElement('span');
    subtotalSpan.classList.add('fw-normal');
    subtotalSpan.textContent = `$${subtotal}`;

    subtotalParrafo.appendChild(subtotalSpan);

    //PROPINA

    const propinaParrafo = document.createElement('p');
    propinaParrafo.classList.add('fs-3','fw-bold', 'mt-5');
    propinaParrafo.textContent = "Propina: ";

    const propinaSpan = document.createElement('span');
    propinaSpan.classList.add('fw-normal');
    propinaSpan.textContent = `$${propina}`;

        propinaParrafo.appendChild(propinaSpan);


    //Total

    const totalParrafo = document.createElement('p');
    totalParrafo.classList.add('fs-3','fw-bold', 'mt-5');
    totalParrafo.textContent = "Total: ";

    const totalSpan = document.createElement('span');
    totalSpan.classList.add('fw-normal');
    totalSpan.textContent = `$${total}`;

    totalParrafo.appendChild(totalSpan);

    //ELiminar el ultimo Resultado 
    const totalPagarDiv = document.querySelector('.total-pagar');
    if(totalPagarDiv){
        totalPagarDiv.remove()
    }


   

    divTotales.appendChild(subtotalParrafo);
    divTotales.appendChild(propinaParrafo);
    divTotales.appendChild(totalParrafo);

    
    
    
    
    
    
    const formulario = document.querySelector('.formulario > div');

    formulario.appendChild(divTotales);
}