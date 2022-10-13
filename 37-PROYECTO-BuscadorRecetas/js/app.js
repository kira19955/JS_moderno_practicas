function iniciarApp(){

    const selectCategorias = document.querySelector('#categorias');
    selectCategorias.addEventListener('change', seleccionarCategoria);

    obtenerCategorias()

    function obtenerCategorias(){
        const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';

        fetch(url)
        .then(respues => {
         return respues.json()
        })
        .then(respuesta =>{ 
            mostrarCategorias(respuesta.categories)
        })
    }

    function mostrarCategorias(categorias){
        categorias.forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria.strCategory
            console.log(option);
            option.text = categoria.strCategory
            selectCategorias.appendChild(option);
        });
    }

    function seleccionarCategoria(e){
        const categoria = e.target.value;
        const url  = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`;

        fetch(url)
        .then(respuesta => respuesta.json())
        .then(respuesta => mostrarRecetas(respuesta.meals))
    }

    function mostrarRecetas(recetas){

        //iterar en los resultados
        recetas.forEach(receta =>{
            const recetaContenedor = document.createElement('div');
            
        })
    }
}

document.addEventListener('DOMContentLoaded', iniciarApp);