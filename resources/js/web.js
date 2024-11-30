// importar todas las paginas 
import { rutaBolos } from "./viewBolos.js";
import { rutaComposteras } from "./viewComposteras.js";
import { rutaRegistros } from "./viewRegistros.js";
// ...

// funcion para que dependiendo de la ruta que muestre una funcion que contiene una pagina (SPA)
function routes() {

    // optener la ruta actual 
    const hash = window.location.hash;

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