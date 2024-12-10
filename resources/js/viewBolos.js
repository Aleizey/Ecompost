//  VISTA WEB DE LOS BOLOS 

// api para obtener los bolos y sus derivados (ciclos, registros, composteras)
// variables--->
import { logout } from "./noToken.js";

const Xcontent = document.querySelector(".main-container");

const pantallaCarga = document.createElement('div');
pantallaCarga.classList = `pantallaCarga`;
pantallaCarga.innerHTML = `       
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="animate-spin size-72">
             <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>

        </div>`

let arrayElementBolos = [];

// optener el token
function getAuthToken() {
    const token = sessionStorage.getItem('apiToken');
    return token;
}


export async function consultaApiBolosCiclos(id = null, resource1, resource2 = null) {
    let url;

    if (id === null && resource2 === null) {
        url = ` /api/${resource1}`;

    } else if (id && resource2 === null) {
        url = ` /api/${resource1}/${id}`;

    } else if (id && resource1 && resource2) {
        url = ` /api/${resource1}/${id}/${resource2}`;
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

        if (resultadoJSON.data) {

            pantallaCarga.remove()
            return datos;
        }

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

        // return datos;
    } catch (error) {
        console.log(`Error en la consulta de ciclos: ${error}`);
        return [];
    }
}

//Logica de los bolos
export async function rutaBolos() {

    Xcontent.appendChild(pantallaCarga)

    console.log('entrando')
    arrayElementBolos = await consultaApiBolosCiclos(null, 'bolos', null);
    // const bolosData = JSON.parse(localStorage.getItem('bolosCiclos_bolos_general'));

    const contMain = document.createElement("main");
    contMain.classList.add("w-full", "p-12", "mt-5", "grid", "grid-cols-4", "gap-4");

    arrayElementBolos.map(bolo => {
        Xcontent.innerHTML = "";

        const boloCont = document.createElement("div");
        boloCont.classList.add("w-full", "flex", "justify-center", "mb-12");

        boloCont.innerHTML = `
                <a href="#boloCiclos${bolo.id}" class="model-bolo rounded-lg shadow-lg w-full h-full p-5 flex flex-col justify-between items-center">
                    <div class="cont-icon-user flex-col justify-between ps">
                    </div>
                    <div class="shadow-lg rounded-full bg-white border-b-4 border-gray-900">
                        <p>${bolo.nombre}</p>
                    </div>
                    <div class="bolo-img">
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

    const contGeneralMain = document.createElement("main");
    contGeneralMain.classList.add("w-screen", "h-screen", "flex", "flex-col", "justify-between", "items-center");

    const contCiclo = document.createElement("div");
    contCiclo.classList.add("w-full", "p-12", "grid", "grid-cols-4", "gap-4");

    // Trabajando con los ciclos
    ciclos.map(async ciclo => {
        const cicloCont = document.createElement("div");
        cicloCont.classList.add("w-full", "flex", "justify-center", "mb-12", "ciclos");

        cicloCont.innerHTML = `
                <div class="flex justify-between">
                <div class="flex flex-row">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                   <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>

                   <p class="ms-3"> Ciclo ${ciclo.id} </p>
                </div>
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                </svg>
                </div>
                </div>
           </div>
           <div class="flex flex-row">
                <div class="text-gray-600 text-start">
                   Pulsa para ver el contenido de este ciclo  
                </div>
           </div>
           <div class="flex flex-row justify-between">
                <div>

                 <p class="">${ciclo.fecha_final ? "Finalizado" : "Activo"}</p>

                </div>
                <div class="flex flex-col justify-end ">
                <div class="flex flex-row items-center ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 me-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
               </svg>
                 <p class=" ms-3">${ciclo.fecha_inicio.slice(0, 10)}</p>
                 </div>
                </div>
           </div>
            `;



        contGeneralMain.appendChild(contCiclo);
        contCiclo.appendChild(cicloCont);

        cicloCont.addEventListener("click", async () => {

            // Obtener registros relacionados con este ciclo
            const registos = await consultaApiBolosCiclos(ciclo.id, 'ciclo', 'registros');

            registos.map(async registro => {
                // Procesar los registros
                const [registosAntes, registosDurante, registosDespues] = await Promise.all([
                    consultaApiBolosCiclos(registro.id, 'registro', 'registrosAntes'),
                    consultaApiBolosCiclos(registro.id, 'registro', 'registrosDurante'),
                    consultaApiBolosCiclos(registro.id, 'registro', 'registrosDespues')
                ]);

                const crearTabla = (registros, tipo) => {
                    return registros.map(reg => {
                        const contenedor = document.createElement("div");
                        contenedor.classList.add("tablas-registros");

                        if (tipo === 'antes') {
                            contenedor.innerHTML = `
                      <table class="min-w-full table-auto border-collapse border border-gray-200">
                        <thead class="bg-gray-500 text-white">
                          <tr>
                            <th class="px-4 py-2 border border-gray-300 ">Id Antes</th>
                            <th class="px-4 py-2 border border-gray-300">Id Registro</th>
                            <th class="px-4 py-2 border border-gray-300">Humedad</th>
                            <th class="px-4 py-2 border border-gray-300">Observaciones Inicial</th>
                            <th class="px-4 py-2 border border-gray-300">Temperatura Ambiente</th>
                            <th class="px-4 py-2 border border-gray-300">Olor</th>
                            <th class="px-4 py-2 border border-gray-300">Presencia Insectos</th>
                            <th class="px-4 py-2 border border-gray-300">Temperatura Compostera</th>
                            <th class="px-4 py-2 border border-gray-300">Fotografías Iniciales</th>
                            <th class="px-4 py-2 border border-gray-300">Fecha</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr class="bg-white hover:bg-gray-200">
                            <td class="px-4 py-2 border border-gray-300">${reg.id}</td>
                            <td class="px-4 py-2 border border-gray-300">${reg.registro_id}</td>
                            <td class="px-4 py-2 border border-gray-300">${reg.humedad}</td>
                            <td class="px-4 py-2 border border-gray-300">${reg.observaciones_iniciales}</td>
                            <td class="px-4 py-2 border border-gray-300">${reg.temperatura_ambiente}</td>
                            <td class="px-4 py-2 border border-gray-300">${reg.olor}</td>
                            <td class="px-4 py-2 border border-gray-300">${reg.presencia_insectos ? 'Sí' : 'No'}</td>
                            <td class="px-4 py-2 border border-gray-300">${reg.temperatura_compostera}</td>
                            <td class="px-4 py-2 border border-gray-300"><p class="text-blue-500">${reg.fotografias_iniciales}</p></td>
                            <td class="px-4 py-2 border border-gray-300">${reg.fecha}</td>
                          </tr>
                        </tbody>
                      </table>`;
                        } else if (tipo === 'durante') {
                            contenedor.innerHTML = `
                      <table class="min-w-full table-auto border-collapse border border-gray-200">
                        <thead class="bg-gray-500 text-white">
                          <tr>
                            <th class="px-4 py-2 border border-gray-300">Id Durante</th>
                            <th class="px-4 py-2 border border-gray-300">Id Registro</th>
                            <th class="px-4 py-2 border border-gray-300">Riego</th>
                            <th class="px-4 py-2 border border-gray-300">Revolver</th>
                            <th class="px-4 py-2 border border-gray-300">Litros Verde</th>
                            <th class="px-4 py-2 border border-gray-300">Tipo de verde</th>
                            <th class="px-4 py-2 border border-gray-300">Aporte seco</th>
                            <th class="px-4 py-2 border border-gray-300">Tipo Seco</th>
                            <th class="px-4 py-2 border border-gray-300">Fotografías Durante</th>
                            <th class="px-4 py-2 border border-gray-300">Observacion</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr class="bg-white hover:bg-gray-200">
                            <td class="px-4 py-2 border border-gray-300">${reg.id}</td>
                            <td class="px-4 py-2 border border-gray-300">${reg.registro_id}</td>
                            <td class="px-4 py-2 border border-gray-300">${reg.riego ? "SI" : "NO"}</td>
                            <td class="px-4 py-2 border border-gray-300">${reg.revolver ? "SI" : "NO"}</td>
                            <td class="px-4 py-2 border border-gray-300">${reg.litros_verde}</td>
                            <td class="px-4 py-2 border border-gray-300">${reg.tipo_aporte_verde}</td>
                            <td class="px-4 py-2 border border-gray-300">${reg.aporte_seco}</td>
                            <td class="px-4 py-2 border border-gray-300">${reg.tipo_aporte_seco}</td>
                            <td class="px-4 py-2 border border-gray-300"><p class="text-blue-500">${reg.fotografias_durante}</p></td>
                            <td class="px-4 py-2 border border-gray-300">${reg.observaciones_durante}</td>
                          </tr>
                        </tbody>
                      </table>`;
                        } else if (tipo === 'despues') {
                            contenedor.innerHTML = `
                      <table class="min-w-full table-auto border-collapse border border-gray-200">
                        <thead class="bg-gray-500 text-white">
                          <tr>
                            <th class="px-4 py-2 border border-gray-300">Id Despues</th>
                            <th class="px-4 py-2 border border-gray-300">Id Registro</th>
                            <th class="px-4 py-2 border border-gray-300">Nivel Llenado</th>
                            <th class="px-4 py-2 border border-gray-300">Fotografías Despues</th>
                            <th class="px-4 py-2 border border-gray-300">Observacion Final</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr class="bg-white hover:bg-gray-200">
                            <td class="px-4 py-2 border border-gray-300">${reg.id}</td>
                            <td class="px-4 py-2 border border-gray-300">${reg.registro_id}</td>
                            <td class="px-4 py-2 border border-gray-300">${reg.nivel_llenado_final}</td>
                            <td class="px-4 py-2 border border-gray-300"><p class="text-blue-500">${reg.fotografias_final}</p></td>
                            <td class="px-4 py-2 border border-gray-300">${reg.observaciones_final}</td>
                          </tr>
                        </tbody>
                      </table>`;
                        }

                        contCiclo.appendChild(contenedor);
                    });
                };

                // Crear tablas
                crearTabla(registosAntes, 'antes');
                crearTabla(registosDurante, 'durante');
                crearTabla(registosDespues, 'despues');
            });
        });
    });

    // Agregar el contenedor al DOM
    Xcontent.appendChild(contGeneralMain);
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