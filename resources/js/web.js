// Importar las rutas
import { rutaBolos } from "./viewBolos.js";
import { rutaComposteras } from "./viewComposteras.js";
import { rutaRegistros } from "./viewRegistros.js";
import { rutaInformacion } from "./viewInformacion.js";
// ...

// Función para garantizar que el hash esté en la raíz (limpiar URL)
export function ensureCorrectHashPosition() {
    const hash = window.location.hash;
    const currentPath = window.location.pathname; 
    const expectedPath = `/${hash}`; 

    // Si hay un hash pero el path no es la raíz ("/"), redirige
    if (hash && currentPath !== '/') {
        console.log(`Corrigiendo URL: ${currentPath + hash} -> ${expectedPath}`);
        window.history.replaceState(null, '', `/${hash}`);
    }
}

// Función para manejar las rutas
async function routes() {
    const hash = window.location.hash; 
    console.log(`Hash actual: ${hash}`);

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
        default:
            console.warn(`Ruta desconocida: ${hash}`);
            break;
    }
}

// Evento al cargar la página
window.addEventListener('load', async () => {
    ensureCorrectHashPosition(); 
    routes(); 
});

// Evento al cambiar el hash
window.addEventListener('hashchange', () => {
    ensureCorrectHashPosition(); 
    routes(); 
});
