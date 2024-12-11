//  VISTA WEB DE LAS COMPOSTEREAS 

// api para obtener las composteras y insertar (registro, registroAntes, registroDurante, registroDespues)
// variables--->
import { logout } from "./noToken.js";

const Xcontent = document.querySelector(".main-container");
const user = JSON.parse(localStorage.getItem('user'));
let QR;

const pantallaCarga = document.createElement('div');
pantallaCarga.classList = `pantallaCarga`;
pantallaCarga.innerHTML = `       
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="animate-spin size-72">
             <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>

        </div>`

let arrayElementComposteras = [];

// optener el token
function getAuthToken() {
    const token = sessionStorage.getItem('apiToken');
    return token;
}

// funcion ---->
async function consultaApisCompost(id = null, resource1, resource2 = null) {

    let url;

    if (id === null && resource2 === null) {
        url = ` /api/${resource1}`;

    } else if (resource2 === null) {
        url = ` /api/${resource1}/${id}`;
        console.log(url);
    } else if (id && resource1 && resource2) {
        url = ` /api/${resource1}/${id}/${resource2}`;
    }


    try {
        const token = getAuthToken();
        if (!token) {
            logout();
            throw new Error("No se encontró el token de autenticación.");
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
        arrayElementComposteras = [...datos];

        if (resultadoJSON.data) {

            pantallaCarga.remove()
            return datos;
        }

    } catch (error) {
        console.log(`Error en la consulta de ${resource1}: ${error}`);
        return [];
    }
}

async function siguienteCompostera(id) {

    let url = ` /api/compostera/${id}`;
    console.log(url);

    try {
        const token = getAuthToken();
        if (!token) {
            logout();
            throw new Error("No se encontró el token de autenticación.");
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

        if (resultadoJSON.data) {

            pantallaCarga.remove()
            return datos;
        }

    } catch (error) {
        console.log(`Error en la consulta de : ${error}`);
        return [];
    }
}

//funcion para actualizar los datos de las composteras.
async function actualizarApisCopost(idCompostera, data) {
    const url = ` /api/compostera/${idCompostera}`;

    try {
        const token = getAuthToken();
        console.log(token);
        if (!token) {
            throw new Error("No se encontró el token de autenticación.");
        }

        const resultadoEnBruto = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        const resultadoJSON = await resultadoEnBruto.json();

        if (!resultadoEnBruto.ok) {
            throw new Error(`Error del servidor: ${resultadoJSON.message || 'Sin mensaje de error'}`);
        }

        return resultadoJSON.data;
    } catch (error) {
        console.log(`Error en la actualización de la compostera: ${error}`);
        return null;
    }
}

// Añadir falta refactorizar el codigo en una o pocas funciones 

//Comienzan de las funciones de agregar contenido.
async function AnadirApisBolos(nombre, desc) {

    const url = " /api/bolos";

    try {
        const token = getAuthToken();
        console.log(token)
        if (!token) {
            throw new Error("No se encontró el token de autenticación.");
        }

        const resultadoEnBruto = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({

                "nombre": nombre,
                "fecha_inicio": "2023-02-22 00:00:00",
                "fecha_final": null,
                "comentario": desc,
                "imagen": null,
                "finalizado": 0,

            }),
        });

        const resultadoJSON = await resultadoEnBruto.json();
        console.log(resultadoJSON.data);
        return resultadoJSON.data;

    } catch (error) {
        console.log(`Error en la consulta de ciclos: ${error}`);
        return [];
    }
}

async function AnadirApisCiclo(boloId, CompstId) {

    const url = " /api/ciclos";

    try {
        const token = getAuthToken();
        console.log(token)
        if (!token) {
            throw new Error("No se encontró el token de autenticación.");
        }

        const resultadoEnBruto = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({

                "compostera_id": CompstId,
                "bolo_id": boloId,
                "fecha_inicio": "2022-01-12 00:00:00"

            }),
        });

        const resultadoJSON = await resultadoEnBruto.json();
        console.log(resultadoJSON.data);
        return resultadoJSON.data;

    } catch (error) {
        console.log(`Error en la consulta de ciclos: ${error}`);
        return [];
    }
}

async function obtenerCiclosDeCompostera(composteraId) {
    try {
        // Llama a la API para obtener los ciclos de una compostera
        const ciclos = await consultaApisCompost(composteraId, 'compostera', 'ciclos');

        // Filtra los ciclos donde `fecha_final` sea null si no está filtrado desde el backend
        const ciclosSinFechaFinal = ciclos.filter(ciclo => ciclo.fecha_final === null);
        return ciclosSinFechaFinal;
    } catch (error) {
        console.error('Error al obtener los ciclos de la compostera:', error);
        return [];
    }
}

//funcion para actualizar los datos de los ciclos.
async function actualizarApisCiclos(idCiclo, data) {
    const url = ` /api/ciclos/${idCiclo}`;

    try {
        const token = getAuthToken();
        console.log(token);
        if (!token) {
            throw new Error("No se encontró el token de autenticación.");
        }

        const resultadoEnBruto = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        const resultadoJSON = await resultadoEnBruto.json();

        if (!resultadoEnBruto.ok) {
            throw new Error(`Error del servidor: ${resultadoJSON.message || 'Sin mensaje de error'}`);
        }

        console.log(resultadoJSON.data);
        return resultadoJSON.data;
    } catch (error) {
        console.log(`Error en la actualización de la compostera: ${error}`);
        return null;
    }
}

async function AnadirApisRegistro(cicloId, CompstId, userId) {

    const url = " /api/registro";

    try {
        const token = getAuthToken();
        if (!token) {
            throw new Error("No se encontró el token de autenticación.");
        }

        const resultadoEnBruto = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({

                "fecha_hora": "2024-11-03 19:48:14",
                "user_id": userId,
                "compostera_id": CompstId,
                "ciclo_id": cicloId,

            }),
        });

        const resultadoJSON = await resultadoEnBruto.json();
        console.log(resultadoJSON.data);
        return resultadoJSON.data;

    } catch (error) {
        console.log(`Error en la consulta de ciclos: ${error}`);
        return [];
    }
}

async function AnadirApisRegistroAntes(registroId, tempAmb, tempCompost, humedad, olor, insectos, foto, observ, llenado) {

    const url = ` /api/registro/${registroId}/registrosAntes`;

    try {
        const token = getAuthToken();
        if (!token) {
            throw new Error("No se encontró el token de autenticación.");
        }

        const resultadoEnBruto = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({

                "temperatura_ambiente": tempAmb,
                "temperatura_compostera": tempCompost,
                "llenado_inicial": llenado,
                "olor": olor,
                "presencia_insectos": insectos,
                "humedad": humedad,
                "fotografias_iniciales": foto,
                "observaciones_iniciales": observ,
                "registro_id": registroId,

            }),
        });

        const resultadoJSON = await resultadoEnBruto.json();
        console.log(resultadoJSON.data);
        return resultadoJSON.data;

    } catch (error) {
        console.log(`Error en la consulta de ciclos: ${error}`);
        return [];
    }
}

async function AnadirApisRegistroDurante(registroId, riego, revolver, litroVerde, typeVerde, aportSeco, typeSeco, foto, observ) {

    const url = ` /api/registro/${registroId}/registrosDurante`;

    try {
        const token = getAuthToken();
        if (!token) {
            throw new Error("No se encontró el token de autenticación.");
        }

        const resultadoEnBruto = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({

                "riego": riego,
                "revolver": revolver,
                "litros_verde": litroVerde,
                "tipo_aporte_verde": typeVerde,
                "aporte_seco": aportSeco,
                "tipo_aporte_seco": typeSeco,
                "fotografias_durante": foto,
                "observaciones_durante": observ,
                "registro_id": registroId

            }),
        });

        const resultadoJSON = await resultadoEnBruto.json();
        console.log(resultadoJSON.data);
        return resultadoJSON.data;

    } catch (error) {
        console.log(`Error en la consulta de ciclos: ${error}`);
        return [];
    }
}

async function AnadirApisRegistroDespues(registroId, llenado, foto, observ) {

    const url = ` /api/registro/${registroId}/registrosDespues`;

    try {
        const token = getAuthToken();
        if (!token) {
            throw new Error("No se encontró el token de autenticación.");
        }

        const resultadoEnBruto = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({

                "nivel_llenado_final": llenado,
                "fotografias_final": foto,
                "observaciones_final": observ,
                "registro_id": registroId,

            }),
        });

        const resultadoJSON = await resultadoEnBruto.json();
        console.log(resultadoJSON.data);
        return resultadoJSON.data;

    } catch (error) {
        console.log(`Error en la consulta de ciclos: ${error}`);
        return [];
    }
}

// funcion ---->
export async function rutaComposteras() {

    const divForm = document.querySelector("#divForm");

    divForm.innerHTML = `Compostera`;

    Xcontent.appendChild(pantallaCarga)

    arrayElementComposteras = await consultaApisCompost(null, 'compostera', null);
    const contMain = document.createElement("main");
    contMain.classList.add("w-full", "p-12", "flex", "flex-row", "items-center", "justify-center");

    console.log(arrayElementComposteras)
    arrayElementComposteras.map(compostera => {

        Xcontent.innerHTML = "";

        const contenedor = document.createElement("div");
        contenedor.classList.add("w-full", "flex", "justify-center", "align-center", "mb-12");
        contenedor.innerHTML = `
            <div class="content-compost ">
                <div id="openModal${compostera.id}" class="compost ${compostera.ocupado ? "" : "oscurecer"} color-compost${compostera.id}">
                    <div class="compostaje"></div>
                </div>
                <div class="text-compost">
                    Compostera ${compostera.id}
                </div>
                <div class="element-compost">
                    <div class="${compostera.ocupado ? "in-active" : "active"}">

                    ${compostera.ocupado ?

                `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                         </svg>`
                :
                `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="">
                         <path stroke-linecap="round" stroke-linejoin="round"
                             d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                     </svg>`
            }                    

                    </div>
                    <div class="type">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        
    <div id="modal${compostera.id}" class="absolute inset-0 z-50 items-center justify-center bg-black bg-opacity-50 hidden">
        <div class=" fondo-modal w-full h-full flex justify-center items-center">
            <div class="bg-white modal-content p-6 flex flex-col items-center justify-between">
                <div>
                    <h2 class="text-lg text-gray-800 font-bold">Compostera ${compostera.id} </h2>
                </div>
                <div class="w-full main-modal${compostera.id}">
                    <p class="mt-4 text-sm text-gray-600">
                    </p>
                </div>
                <div class="mt-6 w-full flex justify-end">
                    <button 
                        id="closeModal${compostera.id}" 
                        type="button" 
                        class="rounded-full p-2 text-center text-sm font-semibold bg-white text-white  hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-black">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>

                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
        // Agrega el contenedor al DOM
        contMain.appendChild(contenedor);
        Xcontent.appendChild(contMain);

        // Modal donde se controla el agregar bolo agregar resgistro o terminar ciclo para pasarlo a otra compostera
        InCompostera(compostera.id, compostera.ocupado);

    });

}

async function InCompostera(compostId, compostOcupado) {

    const modal = document.getElementById(`modal${compostId}`);
    const mainModal = document.querySelector(`.main-modal${compostId}`);
    const openModalButton = document.getElementById(`openModal${compostId}`);
    const closeModalButton = document.getElementById(`closeModal${compostId}`);

    const formbolo = document.createElement("div");
    const startBolo = document.createElement("div");

    closeModalButton.addEventListener("click", () => {
        modal.classList.add("hidden");
        formbolo.remove();
        startBolo.remove();
    });


    openModalButton.addEventListener("click", async () => {

        if (compostId === 1 && compostOcupado == 0) {
            modal.classList.remove("hidden");
            // Mostrar formulario para crear un bolo
            formbolo.innerHTML = `
                <div class="modal-w">
                    <div class="sm:col-span-3 mb-2">
                        <label for="bolo-name" class="block text-sm/10 font-medium text-start text-gray-900">Nombre del Bolo</label>
                        <div class="mt-2">
                            <input type="text" name="bolo-name" id="bolo-name" class="formbolo block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                        </div>
                    </div>

        <div class="w-full col-span-full">
                        <label for="desc-bolo" class="block text-sm/10 font-medium text-start text-gray-900">Descripcion</label>
          <div class="mt-2">
            <textarea name="bolo-desc" id="bolo-desc" rows="3" class="block w-full rounded-md bg-gray-100 px-3 py-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"></textarea>
          </div>
        </div>
                </div>`;

            startBolo.innerHTML = `
                <button id="createBolo${compostId}" type="submit" class="mt-2 rounded-md bg-green-600 text-center w-full px-12 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
                    Crear Bolo
                </button>`;

            mainModal.appendChild(formbolo);
            mainModal.appendChild(startBolo);

            const createBoloButton = document.querySelector(`#createBolo${compostId}`);
            createBoloButton.addEventListener("click", async () => {
                try {
                    const nameBolo = document.querySelector("#bolo-name").value;
                    console.log("Nombre del bolo:", nameBolo);

                    const descBolo = document.querySelector("#bolo-desc").value;
                    console.log("Desc del bolo:", nameBolo);

                    // Crear el bolo
                    const bolo = await AnadirApisBolos(nameBolo, descBolo);
                    console.log("Bolo creado:", bolo);

                    modal.classList.add("hidden");
                    formbolo.remove();
                    startBolo.remove();

                    // Crear ciclo asociado al bolo
                    const ciclo = await AnadirApisCiclo(bolo.id, compostId);
                    console.log("Ciclo creado:", ciclo);

                    // Actualizar el estado de la compostera a ocupada
                    const dataActualizarCompostera = {
                        ocupado: 1, // Cambiar estado a ocupado
                    };
                    const actualizarCompostera = await actualizarApisCopost(compostId, dataActualizarCompostera);
                    console.log("Estado de la compostera actualizado:", actualizarCompostera);
                    modal.classList.add("hidden");
                    rutaComposteras();
                } catch (error) {
                    console.error("Error en la operación:", error);
                }
            });


        }

        else if (compostOcupado == 1) {

            window.history.replaceState(null, '', `/#datosCompostera${compostId}`);
            composteraOcupada(compostId);

        }

    });
}

export async function composteraOcupada(id) {

    const contMain = document.createElement("main");
    contMain.classList = `w-full`;
    Xcontent.innerHTML = "";  // Limpiar el contenido anterior

    const composteraActual = await siguienteCompostera(id);
    console.log(composteraActual);
    if (composteraActual.ocupado == 0) {
        contMain.innerHTML = `
        <div>
            COMPOSTERA VACIAS
        </div>`;

        // Añadir el contenedor con los botones al DOM
        Xcontent.appendChild(contMain);
    }
    else {

        //aca saco el dato del ciclo asociado a la compostera
        const cicloActual = await obtenerCiclosDeCompostera(id);
        const cicloActualID = cicloActual[0].id;
        const cicloActualBolo = cicloActual[0].bolo_id
        console.log(`Cargando la compostera con ID:${id}`);

        const siguienteComposteraId = +id + 1;
        console.log('SUIGUIENTE COMPOSTERA', siguienteComposteraId);
        //los datos de la compostera siguiente
        const composteraSiguiente = await siguienteCompostera(siguienteComposteraId);
        console.log("siguienteComposteraId:", composteraSiguiente);

        const addEndCiclo = document.createElement("div")
        addEndCiclo.classList = "add-end-ciclo p-5 flex flex-row justify-between";

        addEndCiclo.innerHTML = `
        <div class="title">
        <h1>Compostera - ${id}</h1>
        </div>

        <div>
            <button id="terminarCiclo" class="">
            <div class="flex flex-row justify-between">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
</svg>
                <p>Terminar Ciclo</p>
                </div>
            </button>
            <button id="agregarRegistro" class="">
            <div class="flex flex-row justify-between">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
            <p>Agregar Registro</p>
            </div>
            </button>
            </div>
        `;

        // contenedor de los registros generales
        const contentRegistro = document.createElement("div")
        contentRegistro.classList = "content-registro p-12 grid grid-cols-4 gap-4 ";

        // filtros
        const registroFiltro = document.createElement("div")
        registroFiltro.classList = "filter-registro p-2 flex flex-row";

        registroFiltro.innerHTML = `
        <button class="">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
          </svg>
        Fecha
        </button>
                <button class="usuarios">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"  class="size-6">
                   <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
        Usuario
        </button>
        `;
        // contenedor de los registros antes, durante y despues
        const contentRegistros = document.createElement("div")
        contentRegistros.classList = "contRegistros hidden";

        // registroBoton.classList.add("w-full", "p-12", "grid", "grid-cols-4", "gap-4")

        // model que esta dentro del contenedor de registro
        const modalRegistros = document.createElement("div")
        modalRegistros.classList = "modal-registros";

        // contenedor de modal que termina el ciclo 
        const contentTerminarCiclo = document.createElement("div")
        contentTerminarCiclo.classList = "contTerminarCiclo hidden";

        // model que esta dentro del contenedor de para finalizar ciclo
        const modalTerminarCiclo = document.createElement("div")
        modalTerminarCiclo.classList = "modal-terminarCiclo";

        modalTerminarCiclo.innerHTML = `
        <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3 class="text-base font-semibold text-gray-900" id="modal-title">¿Seguro que quieres terminar el ciclo?</h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">Terminar el ciclo implica pasar el bolo a la siguente compostera y no poder subir más registros a este ciclo</p>
              </div>
            </div>
          </div>
        </div>
      
        `;

        // boton de cerrado del model de registro 
        const CloseRegistros = document.createElement("div")
        CloseRegistros.classList = "close-registros";

        CloseRegistros.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>
        `;

        // boton de cerrado del model de terminar registro 
        const BtnTerminarCiclo = document.createElement("div")
        BtnTerminarCiclo.classList = "btn-terminarCiclo";

        BtnTerminarCiclo.innerHTML = `
          <button type="button" class="inline-flex w-full justify-center rounded-full bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Terminar</button>
                `;

        const CloseTerminarCiclo = document.createElement("div")
        CloseTerminarCiclo.classList = "close-terminarCiclo";

        CloseTerminarCiclo.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>
                `;

        // Mostrar los botones para terminar ciclo y agregar registro
        // Añadir el contenedor con los botones al DOM
        Xcontent.appendChild(contMain);
        contMain.appendChild(addEndCiclo);
        contMain.appendChild(registroFiltro);
        // modal registros 
        contMain.appendChild(contentRegistros);
        contentRegistros.appendChild(modalRegistros);
        // modal terminar ciclo
        contMain.appendChild(contentTerminarCiclo);
        contentTerminarCiclo.appendChild(modalTerminarCiclo);
        modalTerminarCiclo.appendChild(BtnTerminarCiclo);
        modalTerminarCiclo.appendChild(CloseTerminarCiclo);

        contMain.appendChild(contentRegistro);

        const registro = await consultaApisCompost(null, 'registro', null)
        console.log("registros :", registro)

        registro.forEach(async registro => {

            if (registro.ciclo_id == cicloActualID) {

                const users = await consultaApisCompost(null, 'users', null);
                const imgUser = users.find(user => user.id == registro.user_id);

                const registroBoton = document.createElement("div")

                registroBoton.innerHTML = `
                <div class="flex flex-row justify-between">
                     <div class="flex flex-row">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                     </svg>

                        <p class="ms-3"> Registro ${registro.id} </p>
                     </div>
                     <div>
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                     </svg>
                     </div>
                </div>
                <div class="flex flex-row">
                     <div class="text-gray-600 text-start">
                        Pulsa para ver todos el contenido de este registro en específico  
                     </div>
                </div>
                <div class="flex flex-row justify-between">
                     <div>
                     <img src="${imgUser.image ? imgUser.image : "https://cdn-icons-png.flaticon.com/512/1134/1134446.png"}" alt="imagen" id="user${registro.user_id}" class="size-6">
                     
                     <div class="name-user">${imgUser.name}</div>
                     </div>
                     <div class="flex flex-col justify-end ">
                     <div class="flex flex-row items-center ">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 me-4">
                       <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                    </svg>
                      <p class=" ms-3">${registro.fecha_hora.slice(0, 10)}</p>
                      </div>
                     </div>
                </div>
                `;

                CloseRegistros.addEventListener("click", () => {

                    modalRegistros.innerHTML = "";
                    contentRegistros.classList.add("hidden");
                });

                registroBoton.addEventListener("click", async () => {

                    const [registosAntes, registosDurante, registosDespues] = await Promise.all([
                        consultaApisCompost(registro.id, 'registro', 'registrosAntes'),
                        consultaApisCompost(registro.id, 'registro', 'registrosDurante'),
                        consultaApisCompost(registro.id, 'registro', 'registrosDespues')
                    ]);
                    const crearTabla = (registros, tipo) => {
                        return registros.map(reg => {
                            const contenedor = document.createElement("div");
                            contenedor.classList.add("tablas-registros");

                            if (tipo === 'antes') {
                                contenedor.innerHTML = `
                          <table class="min-w-full mt-6 table-auto border-collapse border border-gray-200">
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

                            modalRegistros.appendChild(contenedor);
                            contentRegistros.classList.remove("hidden");
                            modalRegistros.appendChild(CloseRegistros);
                        });
                    };

                    // Crear tablas
                    crearTabla(registosAntes, 'antes');
                    crearTabla(registosDurante, 'durante');
                    crearTabla(registosDespues, 'despues');
                });
                contentRegistro.appendChild(registroBoton);
            }
        });

        // Asegurarse de que los botones están disponibles antes de agregar los listeners
        const terminarCicloButton = document.querySelector("#terminarCiclo");
        const agregarRegistroButton = document.querySelector("#agregarRegistro");

        //Si no estamos en la ultima compostera y la compostera siguiente esta vacia
        if (terminarCicloButton && id !== 3 && composteraSiguiente.ocupado == 0) {

            CloseTerminarCiclo.addEventListener("click", () => {

                contentTerminarCiclo.classList.add("hidden");
            });

            terminarCicloButton.addEventListener("click", async () => {

                contentTerminarCiclo.classList.remove("hidden")
                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                // /////////////////////////////////////////////// MODAL CONFIRMAR TERMINAR CICLO ///////////////////////////////////////////////
                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                BtnTerminarCiclo.addEventListener("click", async () => {
                    try {

                        //actualizar el ciclo le ponemos fecha final.
                        const dataActualizarCicloActual = {
                            fecha_final: new Date('2024-12-31').toISOString().split('T')[0],  // Solo la fecha sin la hora
                        };
                        const ciclo = await actualizarApisCiclos(cicloActualID, dataActualizarCicloActual);


                        console.log("Ciclo Actualizado:", ciclo);

                        const dataActualizarComposteraActual = {
                            ocupado: 0, // Cambiar estado a libre
                        };

                        const dataActualizarComposteraSiguiente = {
                            ocupado: 1, // Cambiar estado a ocupada
                        };

                        const actualizarComposteraActual = await actualizarApisCopost(id, dataActualizarComposteraActual);
                        console.log("Estado de la compostera actualizado:", actualizarComposteraActual);


                        // Crear el nuevo ciclo asociado al bolo
                        const cicloNuevo = await AnadirApisCiclo(cicloActualBolo, siguienteComposteraId);
                        console.log("NUEVO CICLO asociado a la sieguiente compostera:", cicloNuevo);

                        //poner en estado ocupado el la compostera a la que le asiciamos ciclo
                        const actualizarComposteraSiguiente = await actualizarApisCopost(siguienteComposteraId, dataActualizarComposteraSiguiente);
                        console.log("Estado de la compostera a la que pasa el BOLO:", actualizarComposteraSiguiente);

                        window.history.replaceState(null, '', `/#compostera`);
                        rutaComposteras();

                    } catch (error) {
                        console.error("Error al terminar ciclo:", error);
                    }
                });
            });
        }
        else if (terminarCicloButton && id == 3) {

            CloseTerminarCiclo.addEventListener("click", () => {

                contentTerminarCiclo.classList.add("hidden");
            });

            terminarCicloButton.addEventListener("click", async () => {

                contentTerminarCiclo.classList.remove("hidden")

                BtnTerminarCiclo.addEventListener("click", async () => {
                    try {

                        //actualizar el ciclo le ponemos fecha final.
                        const dataActualizarCicloActual = {
                            fecha_final: new Date('2024-12-31').toISOString().split('T')[0],  // Solo la fecha sin la hora
                        };
                        const ciclo = await actualizarApisCiclos(cicloActualID, dataActualizarCicloActual);


                        console.log("Ciclo Actualizado:", ciclo);

                        const dataActualizarComposteraActual = {
                            ocupado: 0, // Cambiar estado a libre
                        };

                        const actualizarComposteraActual = await actualizarApisCopost(id, dataActualizarComposteraActual);
                        console.log("Estado de la compostera actualizado:", actualizarComposteraActual);
                        window.history.replaceState(null, '', `/#compostera`);
                        rutaComposteras();

                    } catch (error) {
                        console.error("Error al terminar ciclo:", error);
                    }
                });
            });

        }

        else if (terminarCicloButton && id !== 3 && composteraSiguiente.ocupado == 1) {

            terminarCicloButton.addEventListener("click", async () => {
                alert('La Compostera a la que se quiere pasar el bolo esta llena esta tendria que estar vacia para poder hacer la operacion');
            });
        }

        if (agregarRegistroButton) {
            agregarRegistroButton.addEventListener("click", async () => {
                try {

                    window.history.replaceState(null, '', `/#FormularioCompost${id}Ciclo${cicloActualID}`);
                    formularioDeCiclos(id, cicloActualID)

                } catch (error) {
                    console.error("Error al agregar registro:", error);
                }
            });
        }
    }
}

export function formularioDeCiclos(id, cicloActualID) {

    const contMain = document.createElement("main");
    contMain.classList.add("formulario", "text-start");

    const formAntes = document.createElement("div");
    formAntes.classList.add("form-antes");
    const formDurante = document.createElement("div");
    formDurante.classList.add("form-durante", "hidden");
    const formDespues = document.createElement("div");
    formDespues.classList.add("form-despues", "hidden");

    const botonNum = document.createElement("div");

    botonNum.innerHTML = `
        <div class="w-full flex flex-row registro-n">
         <div id="antes" class="bg-gray-800">1</div>
         <div id="durante" class="bg-gray-800">2</div>
         <div id="despues" class="bg-gray-800">3</div>
    </div>
    `;

    Xcontent.innerHTML = "";

    formAntes.innerHTML = `
    <h2>Registro Antes</h2>
    <div id="temp" class="w-full flex flex-row justify-center ">
    <div class="sm:col-span-3">
    <label for="temperatura-ambiente" class="block text-sm/10 font-medium text-white">Temperatura Ambiente</label>
    <div class="mt-2">
      <input type="number" step="0.1" name="tempAmb" id="tempAmb" class="block w-full rounded-md bg-white px-3 py-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
    </div>
  </div>

    <div  class="sm:col-span-3">
    <label for="temperatura-compostera" class="block text-sm/10 font-medium text-white">Temperatura Compostera</label>
    <div class="mt-2">
      <input type="number" step="0.1" name="tempCompost" id="tempCompost" class="block w-full rounded-md bg-white px-3 py-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
    </div>
  </div>
  </div>

  <div id="olorHumedad" class="w-full flex flex-row justify-center">
    <div class="sm:col-span-3">
    <label for="country" class="block text-sm/10 font-medium text-white">Humedad</label>
    <div class="mt-2 grid grid-cols-1">
      <select id="humedad" name="humedad" class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-3 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
<option value="Exceso">Exceso</option>
<option value="Buena">Buena</option>
<option value="Defecto">Defecto</option>
      </select>
    </div>
  </div>

      <div class=" sm:col-span-3">
    <label for="country" class="block text-sm/10 font-medium text-white">Olor</label>
    <div class="mt-2 grid grid-cols-1">
      <select id="olor" name="olor" class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-3 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
    <option value="Podrido">Podrido</option>
    <option value="Sin olor malo">Sin olor malo</option>
    <option value="Sin olor">Sin olor</option>
    <option value="Con olor bueno">Con olor bueno</option>
    <option value="Aromatico">Aromático</option>
      </select>
    </div>
  </div>
    </div>

        <div class="w-full sm:col-span-3">
    <label for="llenado-inicial" class="block text-sm/10 font-medium text-white">Llenado Inicial</label>
    <div class="mt-2">
      <input type="number" step="0.1" name="llenadoInicial" id="llenadoInicial" class="block w-full rounded-md bg-white px-3 py-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
    </div>
  </div>

        <div class="w-full col-span-full">
          <label for="observaciones-iniciales" class="block text-sm/10 font-medium text-white">Observaciones Iniciales</label>
          <div class="mt-2">
            <textarea name="observAntes" id="observAntes" rows="3" class="block w-full rounded-md bg-white px-3 py-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"></textarea>
          </div>
        </div>

        <div class="w-full flex flex-row mb-2">
          <div class="w-full">
    <form class=" max-w-lg">
  <input class="block w-52 text-sm px-3 py-3 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white dark:text-gray-700 focus:outline-none dark:bg-white dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="foto-inicial" id="fotoAntes" type="file">
  </form>
 </div>
    

            <div class="w-full col-span-full flex justify-end items-center gap-2">
     <div class=" mini-text relative flex items-center gap-x-3">
     <div class="flex h-6 items-center">
     <input id="insectos" name="insectos" type="checkbox"
     class="size-4 rounded border-gray-300 text-green-600 focus:ring-green-600">
     </div>
     <div class="">
     <label for="insectos"
     class="block text-sm/10 font-medium text-white">Presencia de insectos</label>
     </div>
     </div>
     </div>
    </div>

        <button id="siguenteAntes" type="submit" class="boton-siguente rounded-md text-center w-full px-12 py-3 text-sm/10 font-semibold text-white shadow-sm">
    Siguente 
    </button>
    `;
    formDurante.innerHTML = `
    <h2>Registro Durante</h2>

    <div id="verde" class="w-full flex flex-row justify-center ">
    <div class="sm:col-span-3">
    <label for="litros-verde" class="block text-sm/10 font-medium text-white">Litros Verde</label>
    <div class="mt-2">
      <input type="number" step="0.1" name="litroVerde" id="litroVerde" class="block w-full rounded-md bg-white px-3 py-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
    </div>
  </div>

    <div  class="sm:col-span-3">
    <label for="Tipo-AporteVerde" class="block text-sm/10 font-medium text-white">Tipo Aporte Verde</label>
    <div class="mt-2">
      <input type="text" step="0.1" name="tipoVerde" id="tipoVerde" class="block w-full rounded-md bg-white px-3 py-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
    </div>
  </div>
  </div>

      <div id="seco" class="w-full flex flex-row justify-center ">
    <div class="sm:col-span-3">
    <label for="aporte-seco" class="block text-sm/10 font-medium text-white">Aporte Seco</label>
    <div class="mt-2">
      <input type="number" step="0.1" name="aporteSeco" id="aporteSeco" class="block w-full rounded-md bg-white px-3 py-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
    </div>
  </div>

    <div  class="sm:col-span-3">
    <label for="Tipo-AporteSeco" class="block text-sm/10 font-medium text-white">Tipo Aporte Seco</label>
    <div class="mt-2">
      <input type="text" step="0.1" name="tipoSeco" id="tipoSeco" class="block w-full rounded-md bg-white px-3 py-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
    </div>
  </div>
  </div>

    <div class="w-full col-span-full">
    <label for="observaciones-Durante" class="block text-sm/10 font-medium text-white">Observaciones Durante</label>
    <div class="mt-2">
      <textarea name="observDurante" id="observDurante" rows="3" class="block w-full rounded-md bg-white px-3 py-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"></textarea>
    </div>
  </div>    

          <div class="w-full flex flex-row mb-2">
      <div class="w-full">
    <form class=" max-w-xl ">
  <label class="block mb-2 text-sm/10 font-medium text-gray-900 dark:text-white" for="foto-durante">Fotografía Durante</label>
  <input class="block w-52 text-sm px-3 py-3 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white dark:text-gray-700 focus:outline-none dark:bg-white dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="foto-durante" id="fotoDurante" type="file">
  </form>
 </div>

  <div id="riegoRevolver" class="w-full flex flex-col"> 
            <div class="col-span-full gap-2 flex justify-end me-5 ">
    <div class=" mini-text relative flex items-center gap-x-3">
    <div class="flex h-6 items-center">
    <input id="riego" name="riego" type="checkbox"
    class="size-4 rounded border-gray-300 text-green-600 focus:ring-green-600">
    </div>
    <div class="">
    <label for="riego"
    class="block text-sm/10 font-medium text-white">Riego</label>
    </div>
    </div>
    </div>

                <div class=" col-span-full gap-2  flex justify-end ">
    <div class=" mini-text relative flex items-center gap-x-3">
    <div class="flex h-6 items-center">
    <input id="revolver" name="revolver" type="checkbox"
    class="size-4 rounded border-gray-300 text-green-600 focus:ring-green-600">
    </div>
    <div class="">
    <label for="revolver"
    class="block text-sm/10 font-medium text-white">Revolver</label>
    </div>
    </div>
    </div>
      </div>
  </div>
            <button id="siguenteDurante" type="submit" class="boton-siguente rounded-md text-center w-full px-12 py-3 text-sm/10 font-semibold text-white shadow-sm">
    Siguente 
    </button>
    `;
    formDespues.innerHTML = `
        <h2>Registro Después</h2>

            <div class="w-full sm:col-span-3">
    <label for="nivel-llenadoFinal" class="block text-sm/10 font-medium text-white">Nivel de Llenado Final</label>
    <div class="mt-2">
      <input type="number" step="0.1" name="llenadoFinal" id="llenadoFinal" class="block w-full rounded-md bg-white px-3 py-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
    </div>
  </div>

        <div class="w-full col-span-full">
    <label for="observaciones-despues" class="block text-sm/10 font-medium text-white">Observaciones Finales</label>
    <div class="mt-2">
      <textarea name="observDespues" id="observDespues" rows="3" class="block w-full rounded-md bg-white px-3 py-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"></textarea>
    </div>
  </div>   

  <div class="w-full">
    <form class=" max-w-lg ">
  <label class="block mb-2 text-sm/10 font-medium text-gray-900 dark:text-white" for="foto-despues">Fotografía Final</label>
  <input class="block w-52 text-sm px-3 py-3 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white dark:text-gray-700 focus:outline-none dark:bg-white dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="foto-despues" id="fotoDespues" type="file">
  </form>
 </div>

    <button id="registro${cicloActualID}" type="submit" class="enviar-form rounded-full text-center w-full px-12 py-3 text-sm/10 font-semibold text-white shadow-sm">
    Enviar 
    </button>
    `;

    Xcontent.appendChild(contMain);

    contMain.appendChild(formAntes);
    contMain.appendChild(formDurante);
    contMain.appendChild(formDespues);

    contMain.insertAdjacentElement("afterbegin", botonNum);

    const rutaActual = window.location.href;
    generarCodigoQr(rutaActual, contMain)

    const botonA = document.querySelector(`#antes`);
    const botonDu = document.querySelector(`#durante`);
    const botonDes = document.querySelector(`#despues`);

    botonA.classList.add("bg-white")

    botonA.addEventListener("click", () => {

        botonA.classList.add("bg-white")
        botonDu.classList.remove("bg-white")
        botonDes.classList.remove("bg-white")

        formDespues.classList.add("hidden");
        formDurante.classList.add("hidden");
        formAntes.classList.remove("hidden");


    })

    botonDu.addEventListener("click", () => {

        botonA.classList.remove("bg-white")
        botonDu.classList.add("bg-white")
        botonDes.classList.remove("bg-white")

        formAntes.classList.add("hidden");
        formDespues.classList.add("hidden");
        formDurante.classList.remove("hidden");

    })

    botonDes.addEventListener("click", () => {

        botonA.classList.remove("bg-white")
        botonDu.classList.remove("bg-white")
        botonDes.classList.add("bg-white")

        formAntes.classList.add("hidden");
        formDurante.classList.add("hidden");
        formDespues.classList.remove("hidden");

    })


    const botonAntes = document.querySelector(`#siguenteAntes`);
    botonAntes.addEventListener("click", () => {

        botonA.classList.remove("bg-white")
        botonDu.classList.add("bg-white")

        formAntes.classList.add("hidden");
        formDurante.classList.remove("hidden");

        const botonDurante = document.querySelector(`#siguenteDurante`);
        botonDurante.addEventListener("click", () => {

            botonDu.classList.remove("bg-white");
            botonDes.classList.add("bg-white");

            formDurante.classList.add("hidden");
            formDespues.classList.remove("hidden");

            if (formDespues) {

                const botonFormulario = document.querySelector(`#registro${cicloActualID}`);
                botonFormulario.addEventListener('click', async () => {
                    botonFormulario.remove()

                    // crear registro
                    const registro = await AnadirApisRegistro(cicloActualID, id, user);
                    console.log("Registro agregado:", registro);

                    if (registro) {

                        // crear registro antes

                        const formulario = {
                            registroAntes: {
                                temperaturaAmbiente: parseFloat(document.getElementById('tempAmb').value),
                                temperaturaCompostera: parseFloat(document.getElementById('tempCompost').value),
                                humedad: document.getElementById('humedad').value,
                                olor: document.getElementById('olor').value,
                                presenciaInsectos: document.getElementById('insectos').checked,
                                fotografiasIniciales: document.getElementById('fotoAntes').value || "fotoAntes.jpg",
                                observacionesIniciales: document.getElementById('observAntes').value || "Sin observaciones.",
                                llenadoInicial: parseFloat(document.getElementById('llenadoInicial').value)
                            },
                            registroDurante: {
                                riego: document.getElementById('riego').checked,
                                revolver: document.getElementById('revolver').checked,
                                litrosVerde: parseInt(document.getElementById('litroVerde').value, 10),
                                tipoAporteVerde: document.getElementById('tipoVerde').value,
                                aporteSeco: parseInt(document.getElementById('aporteSeco').value, 10),
                                tipoAporteSeco: document.getElementById('tipoSeco').value,
                                fotografiasDurante: document.getElementById('fotoDurante').value || "fotoDurante.jpg",
                                observacionesDurante: document.getElementById('observDurante').value || "Sin observaciones."
                            },
                            registroDespues: {
                                nivelLlenadoFinal: parseFloat(document.getElementById('llenadoFinal').value),
                                fotografiasFinal: document.getElementById('fotoDespues').value || "fotoDespues.jpg",
                                observacionesFinal: document.getElementById('observDespues').value || "Sin observaciones."
                            }
                        };

                        const registroAntes = await AnadirApisRegistroAntes(
                            registro.id,
                            formulario.registroAntes.temperaturaAmbiente,
                            formulario.registroAntes.temperaturaCompostera,
                            formulario.registroAntes.humedad,
                            formulario.registroAntes.olor,
                            formulario.registroAntes.presenciaInsectos,
                            formulario.registroAntes.fotografiasIniciales,
                            formulario.registroAntes.observacionesIniciales,
                            formulario.registroAntes.llenadoInicial
                        );
                        const registroDurante = await AnadirApisRegistroDurante(
                            registro.id,
                            formulario.registroDurante.riego,
                            formulario.registroDurante.revolver,
                            formulario.registroDurante.litrosVerde,
                            formulario.registroDurante.tipoAporteVerde,
                            formulario.registroDurante.aporteSeco,
                            formulario.registroDurante.tipoAporteSeco,
                            formulario.registroDurante.fotografiasDurante,
                            formulario.registroDurante.observacionesDurante
                        );
                        const registroDespues = await AnadirApisRegistroDespues(
                            registro.id,
                            formulario.registroDespues.nivelLlenadoFinal,
                            formulario.registroDespues.fotografiasFinal,
                            formulario.registroDespues.observacionesFinal
                        );

                        console.log(
                            "Registro antes:", registroAntes,
                            "Registro Durante:", registroDurante,
                            "Registro despues:", registroDespues
                        );

                        window.history.replaceState(null, '', `/#compostera`);
                        rutaComposteras();

                    } else {

                        console.log("No existen Registro")
                    }

                });
            } else {

            }
        });
    });
}

function generarCodigoQr(texto, element) {

    if (element.querySelector(".QR")) {
        element.querySelector(".QR").remove();
    }

    var QR = new QRious({
        value: texto,
        size: 228
    });

    QR.image.classList.add("QR");
    element.appendChild(QR.image);
}

// Manejar cambios en la URL para actualizar la vista
window.addEventListener('hashchange', () => {
    const hash = window.location.hash;
    if (hash === '#composteras') {
        rutaComposteras();
    }
});

window.addEventListener('load', async () => {
    await consultaApisCompost(null, 'compostera', null);
    const hash = window.location.hash;
    if (hash === '#composteras') {
        rutaComposteras();
    }

});
