const url = 'http://localhost:4000/clientes';

export const nuevoCliente = async cliente =>{
    try {
        //para mandar a post se agrega la configuracion
       await fetch(url,{
            method: 'POST',  //el tipo de funcion que se manda 
            body: JSON.stringify(cliente), // se manda como string o objeto 
            headers: {
                'Content-Type': 'application/json'
            }
        });

        window.location.href = 'index.html';
        
    } catch (error) {
        console.log(error)
    }
}