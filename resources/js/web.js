// importar todas las paginas 
import { rutaBolos } from "./viewBolos.js";
import { rutaComposteras } from "./viewComposteras.js";
import { rutaRegistros } from "./viewRegistros.js";
import { rutaInformacion } from "./viewInformacion.js";
// ...

// funcion para que dependiendo de la ruta que muestre una funcion que contiene una pagina (SPA)
async function routes() {

    // optener la ruta actual 
    const hash = window.location.hash;
    console.log(hash);

    // rutas funcion 
    switch (hash) {
        case '#bolos':
            rutaBolos();
            break;
        case '#composteras':
            rutaComposteras();
            break;
        case '#registros':
            rutaRegistros();
            break;
        case '#informacion':
            rutaInformacion();
            break;
        // ...
        default:
            console.warn(`Ruta desconocida: ${hash}`);
            break;
    }
}

// llamar a la funcion para que se ejecute una vez que se cargue la pagina
window.addEventListener('load', async () => {
    routes();
    // ...
});

// Manejar cambios en la URL para actualizar la vista
window.addEventListener('hashchange', () => {
    routes();
    // ...
});