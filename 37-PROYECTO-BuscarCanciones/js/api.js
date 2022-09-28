import * as UI from './interfaz.js';

class API {
    constructor(artista, cancion){
        this.artista = artista;
        this.cancion = cancion;
    }

    consultarAPI(){
        console.log('Consultando API');
    }
}

export default API