const url = 'http://localhost:4000/clientes';


//CUANDO SE CREA UN NUEVO CLIENTE
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

//OBTIENE LOS CLIENTES

export const obtenerClientes = async () =>{
    try {
        const resultado = await fetch(url)
        const clientes = await resultado.json()

        return clientes
    } catch (error) {
        console.log(error)
    }
}


//elimina un cliente

export const eliminarCliente =async (id) =>{
    try {
        await fetch(`${url}/${id}`,{
            method: 'DELETE',

        })
    } catch (error) {
        console.log(error)
    }
}

//obtiene un cliente por su ID

export const obtenerCliente = async id =>{
    try {
        const resultado = await fetch(`${url}/${id}`)
        const cliente = await resultado.json()

         return cliente
    } catch (error) {
        console.log(error)
    }
}


//actualiza un registro

export const editarCliente =async cliente =>{
 console.log(cliente)   

 try {
   await fetch(`${url}/${cliente.id}`, {
        method: 'Put',
        body: JSON.stringify(cliente),
        headers:{
            'Content-Type': 'application/json'
        }
    })
    
    window.location.href = 'index.html';
 } catch (error) {
    console.log(error)
 }
}