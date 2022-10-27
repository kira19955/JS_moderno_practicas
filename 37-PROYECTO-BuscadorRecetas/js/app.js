function iniciarApp() {
    const resultado = document.querySelector('#resultado');

    const selectCategorias = document.querySelector('#categorias');
    if(selectCategorias){
        selectCategorias.addEventListener('change', seleccionarCategoria);
        obtenerCategorias()
    }

    const favoritosDiv = document.querySelector('.favoritos');
    if(favoritosDiv){
        obtenerFavoritos();
    }

    const modal = new bootstrap.Modal('#modal', {})


    function obtenerCategorias() {
        const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';

        fetch(url)
            .then(respues => {
                return respues.json()
            })
            .then(respuesta => {
                mostrarCategorias(respuesta.categories)
            })
    }

    function mostrarCategorias(categorias) {
        categorias.forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria.strCategory
            option.text = categoria.strCategory
            selectCategorias.appendChild(option);
        });
    }

    function seleccionarCategoria(e) {
        const categoria = e.target.value;
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`;

        fetch(url)
            .then(respuesta => respuesta.json())
            .then(respuesta => mostrarRecetas(respuesta.meals))
    }

    function mostrarRecetas(recetas) {

        limpiarHtml(resultado);

        const headingResultados = document.createElement('h2');
        headingResultados.classList.add('text-center', 'text-black', 'my-5');
        headingResultados.textContent = recetas.length ?  'Resultados' : 'No hay Resultados';
        resultado.appendChild(headingResultados);

        //iterar en los resultados
        recetas.forEach(receta => {
            const { idMeal, strMeal, strMealThumb } = receta
            const recetaContenedor = document.createElement('div');
            recetaContenedor.classList.add('col-md-4');

            const recetaCard = document.createElement('div');
            recetaCard.classList.add('card', 'mb-4');

            const recetaImagen = document.createElement('img');
            recetaImagen.classList.add('card-img-top');
            recetaImagen.alt = `Imagen de la receta ${strMeal}`;
            recetaImagen.src = strMealThumb ?? receta.img;

            const recetaBody = document.createElement('div');
            recetaBody.classList.add('card-body');

            const heading = document.createElement('h3');
            heading.classList.add('card-title', 'mb-3');
            heading.textContent = strMeal ?? receta.titulo;

            const recetaButton = document.createElement('button');
            recetaButton.classList.add('btn', 'btn-danger', 'w-100');
            recetaButton.textContent = 'Ver Receta';

            recetaButton.onclick = function (){
                seleccionarReceta(idMeal ?? receta.id)
            }


            //inyectar en el codigo HTML

            recetaBody.appendChild(heading);
            recetaBody.appendChild(recetaButton);

            recetaCard.appendChild(recetaImagen);
            recetaCard.appendChild(recetaBody);


            recetaContenedor.appendChild(recetaCard);

            resultado.appendChild(recetaContenedor);

        })
    }

    function seleccionarReceta(id){
        const url = `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

        fetch(url)
        .then(resultado => resultado.json())
        .then(resultado => mostrarRecetaModal(resultado.meals[0]))

    }

    function mostrarRecetaModal(receta){
        
        const {idMeal, strInstructions, strMeal, strMealThumb} = receta;

        const modalTitle = document.querySelector('.modal .modal-title');
        const modalBody = document.querySelector('.modal .modal-body');

        modalTitle.textContent = strMeal;
        modalBody.innerHTML = `
        <img class="img-fluid" src="${strMealThumb}" alt="Receta ${strMeal}"/>
        <h3 class="my-3">Instrucciones</h3>
        <p>${strInstructions}</p>
        <h3 class="my-3">Ingredientes y Cantidades</h3>
        `;

        const listGroup = document.createElement('ul');
        listGroup.classList.add('list-group');

        //mostrar Cantidades e Ingredientes
        for (let i = 1; i<=20; i++){
            if(receta[`strIngredient${i}`]){
                const ingrediente =  receta[`strIngredient${i}`];
                const cantidad =  receta[`strMeasure${i}`];

                const IngredienteLi = document.createElement('li');
                IngredienteLi.classList.add('list-group-item');
                IngredienteLi.textContent = `${ingrediente} - ${cantidad}`;

                listGroup.appendChild(IngredienteLi);
            }
        }

        modalBody.appendChild(listGroup);

        const modalFooter = document.querySelector('.modal .modal-footer');
        limpiarHtml(modalFooter)
        

        //botones cerra y favorito 

        const btnFavoritos = document.createElement('button');
        btnFavoritos.classList.add('btn','btn-danger','col');
        btnFavoritos.textContent = existeStorage(idMeal) ? 'Eliminar Favorito' : 'Guardar Favorito';

        //LocalStorage

        btnFavoritos.onclick = function(){

            if(existeStorage(idMeal)){
                eliminarFavorito(idMeal);
                btnFavoritos.textContent = 'Guardar Favorito';
                mostrarToast("ELIMINADO CORRECTAMENTE")

                return;
            }
            
            agregarFavorito({
                id: idMeal,
                titulo: strMeal,
                img: strMealThumb,
            });
            btnFavoritos.textContent = 'Eliminar Favorito';
            mostrarToast("AGREGADO CORRECTAMENTE")

        }

        const btnCerrar = document.createElement('button');
        btnCerrar.classList.add('btn','btn-secondary','col');
        btnCerrar.textContent = 'Cerrar';
        btnCerrar.onclick = function(){
            modal.hide();
        }

        modalFooter.appendChild(btnFavoritos);
        modalFooter.appendChild(btnCerrar);
            //muestra el modal
        modal.show();
    }

    function agregarFavorito(recetaObjeto){
        const favoritosReceta = JSON.parse( localStorage.getItem('favoritos') ) ?? [];
        localStorage.setItem('favoritos', JSON.stringify([...favoritosReceta,recetaObjeto]));
    }

    function eliminarFavorito(id){
        const favoritosReceta = JSON.parse( localStorage.getItem('favoritos') ) ?? [];
        const nuevosFavoritos = favoritosReceta.filter( favoritosReceta => favoritosReceta.id !== id);
        localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
    }

    function existeStorage(id){
        const favoritosReceta = JSON.parse( localStorage.getItem('favoritos') ) ?? [];
        return favoritosReceta.some(favorito => favorito.id === id);
    }

    function mostrarToast(mensaje){
        const toastDiv = document.querySelector('#toast');
        const toastBody = document.querySelector('.toast-body');
        const toast = new bootstrap.Toast(toastDiv);

        toastBody.textContent = mensaje;
        toast.show();
    }

    function obtenerFavoritos(){
        const favoritosReceta = JSON.parse( localStorage.getItem('favoritos') ) ?? [];
        console.log(favoritosReceta)
        if(favoritosReceta.length){
            mostrarRecetas(favoritosReceta);
            return;
        }

        const noFavoritos = document.createElement('p');
        noFavoritos.textContent= 'NO HAY FAVORITOS';
        noFavoritos.classList.add('fs-4', 'text-center', 'font-bold', 'mt-5');
        resultado.appendChild(noFavoritos);

    }
    function limpiarHtml(selector) {
        while (selector.firstChild) {
            selector.removeChild(selector.firstChild);
        }
    }
}

document.addEventListener('DOMContentLoaded', iniciarApp);