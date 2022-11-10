const monedasselect = document.querySelector('#criptomonedas');
const monedasselect1 = document.querySelector('#moneda');
const formulario = document.querySelector('#formulario');
const objBusqueda = {
    moneda:'',
    criptomoneda:''
}


//crear un Promise


document.addEventListener('DOMContentLoaded', ()=>{
     consultarCripto();

     formulario.addEventListener('submit',  submitFormulario)
})

function consultarCripto(){
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

    fetch(url)
    .then(respuesta => respuesta.json())
    .then(resultado => selectCriptoMonedas(resultado.Data))
}

function selectCriptoMonedas(monedas){
    monedas.forEach(moneda => {
        const {FullName, Name} = moneda.CoinInfo;

        const option = document.createElement('option');
        option.value = Name;
        option.textContent = FullName;
        monedasselect.appendChild(option);
    });
}

function submitFormulario(e){
    e.preventDefault();
}