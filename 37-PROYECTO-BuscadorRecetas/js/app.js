function iniciarApp() {

    const selectCategorias = document.querySelector('#categorias');
    selectCategorias.addEventListener('change', seleccionarCategoria);

    const resultado = document.querySelector('#resultado');

    obtenerCategorias()

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
            console.log(option);
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

        limpiarHtml();

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
            recetaImagen.src = strMealThumb;

            const recetaBody = document.createElement('div');
            recetaBody.classList.add('card-body');

            const heading = document.createElement('h3');
            heading.classList.add('card-title', 'mb-3');
            heading.textContent = strMeal;

            const recetaButton = document.createElement('button');
            recetaButton.classList.add('btn', 'btn-danger', 'w-100');
            recetaButton.textContent = 'Ver Receta';

            console.log(recetaImagen);

            //inyectar en el codigo HTML

            recetaBody.appendChild(heading);
            recetaBody.appendChild(recetaButton);

            recetaCard.appendChild(recetaImagen);
            recetaCard.appendChild(recetaBody);


            recetaContenedor.appendChild(recetaCard);

            resultado.appendChild(recetaContenedor);

        })
    }

    function limpiarHtml() {
        while (resultado.firstChild) {
            resultado.removeChild(resultado.firstChild);
        }
    }
}

document.addEventListener('DOMContentLoaded', iniciarApp);