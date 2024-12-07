//  VISTA WEB DE LOS BOLOS 

// api para obtener los bolos y sus derivados (ciclos, registros, composteras)
// variables--->
import { logout } from "./noToken.js";

const Xcontent = document.querySelector(".main-container");
let arrayElementBolos = [];

// optener el token
function getAuthToken() {
    const token = sessionStorage.getItem('apiToken');
    return token;
}


export async function consultaApiBolosCiclos(id = null, resource1, resource2 = null) {
    let url;

    if (id === null && resource2 === null) {
        url = `http://ecompost.test/api/${resource1}`;

    } else if (id && resource2 === null) {
        url = `http://ecompost.test/api/${resource1}/${id}`;

    } else if (id && resource1 && resource2) {
        url = `http://ecompost.test/api/${resource1}/${id}/${resource2}`;
    }

    try {
        const token = getAuthToken();
        if (!token) {
            logout();
            throw new Error("Token no encontrado. Redirigiendo al login.");
        }

        const resultadoEnBruto = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!resultadoEnBruto.ok) {
            if (resultadoEnBruto.status === 401) {
                logout(); // Manejar expiración de token o no autorizado.
            }
            throw new Error(`Error ${resultadoEnBruto.status} en la API`);
        }

        const resultadoJSON = await resultadoEnBruto.json();
        const datos = resultadoJSON.data;
        arrayElementBolos = datos;

        // Generamos una clave única para el localStorage
        if (resource1 === "bolos") {
            const claveLocalStorage = `bolosCiclos_${resource1}_general`;

            
            // Verificamos si el contenido ya está guardado
            const contenidoGuardado = localStorage.getItem(claveLocalStorage);
            if (contenidoGuardado) {
                // Guardar solo si no existe
                localStorage.setItem(claveLocalStorage, JSON.stringify(datos));
                console.log("Contenido guardado en localStorage.");
            }
            
        }

        return datos;
    } catch (error) {
        console.log(`Error en la consulta de ciclos: ${error}`);
        return [];
    }
}

//Logica de los bolos
export async function rutaBolos() {

    console.log('entrando')
    const bolosData = JSON.parse(localStorage.getItem('bolosCiclos_bolos_general'));

    const contMain = document.createElement("main");
    contMain.classList.add("w-full", "p-12", "mt-5", "grid", "grid-cols-4", "gap-4");

    bolosData.map(bolo => {
        Xcontent.innerHTML = "";

        const boloCont = document.createElement("div");
        boloCont.classList.add("w-full", "flex", "justify-center", "mb-12");

        boloCont.innerHTML = `
                <a href="#boloCiclos${bolo.id}" class="model-bolo rounded-lg shadow-lg w-full h-full p-5 flex flex-col justify-between items-center">
                    <div class="cont-icon-user flex-col justify-between ps">
                        <div class="icon-user">
                            <img src="https://cdn-icons-png.flaticon.com/512/5904/5904059.png" alt="">
                        </div>
                        <div class="icon-user">
                            <img src="https://cdn-icons-png.flaticon.com/512/5904/5904059.png" alt="">
                        </div>
                    </div>
                    <div class="shadow-lg rounded-full bg-white border-b-4 border-gray-900">
                        <p>${bolo.nombre}</p>
                    </div>
                    <div class="shadow-lg rounded-lg bg-white">
                        <img src="https://png.pngtree.com/png-clipart/20230915/original/pngtree-cartoon-of-compost-manhole-container-with-vegetables-and-plants-vector-png-image_12170171.png" alt="">
                    </div>
                    <div class="grid grid-cols-4 gap-2">
                        <div class="bg-green-500 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 fill-green-500">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </div>
                        <h5>${bolo.fecha_final ? 'Finalizado' : 'Activo'}</h5>
                        <div class="bg-blue-500 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                            </svg>
                        </div>
                        <h5>${bolo.fecha_inicio.split(' ', 1)}</h5>
                    </div>
                </a>`;

        contMain.appendChild(boloCont);
    });

    // Agregar el contenedor principal al DOM
    Xcontent.appendChild(contMain);
}

// Función para manejar la carga de ciclos y registros
export async function rutaAllBolos(id) {

    Xcontent.innerHTML = "";
    const ciclos = await consultaApiBolosCiclos(id, 'bolos', 'ciclos');

    console.log(`Cargando ciclo para Bolo con ID: ${id}`);
    Xcontent.innerHTML = "";

    const contenedorGeneral = document.createElement("div");
    contenedorGeneral.classList.add("w-screen", "h-screen", "flex", "flex-col", "justify-between", "items-center");

    const contMain = document.createElement("main");
    contMain.classList.add("w-full", "p-12", "grid", "grid-cols-4", "gap-4");

    // Trabajando con los ciclos
    ciclos.map(async ciclo => {
        const cicloCont = document.createElement("div");
        cicloCont.classList.add("w-full", "flex", "justify-center", "mb-12", "ciclos");

        cicloCont.innerHTML = `
            <div>
                <p>Id ciclo :${ciclo.id}</p>
                <p>Bolo :${ciclo.bolo_id}</p>
                <p>Fecha Inicio :${ciclo.fecha_inicio}</p>
                <p>Fecha Final :${ciclo.fecha_final}</p>
            </div>`;

        contMain.appendChild(cicloCont);

        // Obtener registros relacionados con este ciclo
        const registos = await consultaApiBolosCiclos(ciclo.id, 'ciclo', 'registros');

        // Procesar los registros
        for (let registro of registos) {
            const registosAntes = await consultaApiBolosCiclos(registro.id, 'registro', 'registrosAntes');
            const registosDurante = await consultaApiBolosCiclos(registro.id, 'registro', 'registrosDurante');
            const registosDespues = await consultaApiBolosCiclos(registro.id, 'registro', 'registrosDespues');

            // Procesar registros antes
            for (let antes of registosAntes) {
                const antesCont = document.createElement("div");
                antesCont.classList.add("w-full", "flex", "justify-center", "mb-12", "ciclos");

                antesCont.innerHTML = `
                    <div>
                        <p>Id Antes:${antes.id}</p>
                        <p>Id Registro:${antes.registro_id}</p>
                        <p>Humedad :${antes.humedad}</p>
                        <p>Observaciones iniciales :${antes.observaciones_iniciales}</p>
                        <p>Temperatura ambiente :${antes.temperatura_ambiente} °C</p>
                        <p>Olor :${antes.olor}</p>
                        <p>Presencia insectos :${antes.presencia_insectos ? "Si" : "No"}</p>
                        <p>Temperatura compostera :${antes.temperatura_compostera} ºC</p>
                        <img src="${antes.fotografias_iniciales}" alt="imagen">
                        <p>Fecha :${antes.fotografias_iniciales}</p>
                    </div>`;

                contMain.appendChild(antesCont);
            }

        }
    });

    // Agregar el contenedor al DOM
    Xcontent.appendChild(contMain);
}

// Manejar cambios en la URL para actualizar la vista
window.addEventListener('hashchange', () => {
    const hash = window.location.hash;
    if (hash === '#bolos') {
        rutaBolos();
    }
});

window.addEventListener('load', async () => {
    await consultaApiBolosCiclos(null, 'bolos', null);

    const hash = window.location.hash;
    if (hash === '#bolos') {
        rutaBolos();
    }

});

