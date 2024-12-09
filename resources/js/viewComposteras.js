//  VISTA WEB DE LAS COMPOSTEREAS 

// api para obtener las composteras y insertar (registro, registroAntes, registroDurante, registroDespues)
// variables--->
import { logout } from "./noToken.js";

const Xcontent = document.querySelector(".main-container");
const user = JSON.parse(localStorage.getItem('user'));
const pantallaCarga = document.querySelector('.pantallaCarga');
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
        url = `http://ecompost.test/api/${resource1}`;

    } else if (resource2 === null) {
        url = `http://ecompost.test/api/${resource1}/${id}`;
        console.log(url);
    } else if (id && resource1 && resource2) {
        url = `http://ecompost.test/api/${resource1}/${id}/${resource2}`;
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

    let url = `http://ecompost.test/api/compostera/${id}`;
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
    const url = `http://ecompost.test/api/compostera/${idCompostera}`;

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
async function AnadirApisBolos(nombre) {

    const url = "http://ecompost.test/api/bolos";

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
                "comentario": null,
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

    const url = "http://ecompost.test/api/ciclos";

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
    const url = `http://ecompost.test/api/ciclos/${idCiclo}`;

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

    const url = "http://ecompost.test/api/registro";

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

    const url = `http://ecompost.test/api/registro/${registroId}/registrosAntes`;

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

    const url = `http://ecompost.test/api/registro/${registroId}/registrosDurante`;

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

    const url = `http://ecompost.test/api/registro/${registroId}/registrosDespues`;

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

    arrayElementComposteras = await consultaApisCompost(null, 'compostera', null);
    const contMain = document.createElement("main");
    contMain.classList.add("w-full", "p-12", "flex", "flex-row", "items-center", "justify-center");

    console.log(arrayElementComposteras)
    arrayElementComposteras.map(compostera => {

        Xcontent.innerHTML = "";

        const contenedor = document.createElement("div");
        contenedor.classList.add("w-full", "flex", "justify-center", "align-center", "mb-12", "overflow-x-auto");
        contenedor.innerHTML = `
        <div class="overflow-x-auto">
            <table class="table-auto border-collapse border border-gray-300 w-full text-sm text-left">
                <thead class="bg-white text-gray-700 uppercase">
                    <tr>
                        <th class="border border-gray-300 px-4 py-2">Campo</th>
                        <th class="border border-gray-300 px-4 py-2">Compostera</th>
                    </tr>
                </thead>
                <tbody class="bg-white">
                    <tr>
                        <td class="border border-gray-300 px-4 py-2">Centro ID</td>
                        <td class="border border-gray-300 px-4 py-2">${compostera.centro_id}</td>
                    </tr>
                    <tr>
                        <td class="border border-gray-300 px-4 py-2">Created At</td>
                        <td class="border border-gray-300 px-4 py-2">${compostera.created_at}</td>
                    </tr>
                    <tr>
                        <td class="border border-gray-300 px-4 py-2">ID</td>
                        <td class="border border-gray-300 px-4 py-2">${compostera.id}</td>
                    </tr>
                    <tr>
                        <td class="border border-gray-300 px-4 py-2">Imagen</td>
                        <td class="border border-gray-300 px-4 py-2">${compostera.imagen !== null ? compostera.imagen : "No disponible"}</td>
                    </tr>
                    <tr>
                        <td class="border border-gray-300 px-4 py-2">Tipo</td>
                        <td class="border border-gray-300 px-4 py-2">${compostera.tipo}</td>
                    </tr>
                    <tr>
                        <td class="border border-gray-300 px-4 py-2">Updated At</td>
                        <td class="border border-gray-300 px-4 py-2">${compostera.updated_at}</td>
                    </tr>
                    <tr>
                        <td class="border border-gray-300 px-4 py-2">Estado</td>
                        <td class="border border-gray-300 px-4 py-2">${compostera.ocupado ? "ocupado" : "libre"}</td>
                    </tr>
                </tbody>
            </table>
            <div class="mt-6">
                <button id="openModal${compostera.id}" type="submit"class="rounded-md bg-indigo-600 text-center w-full px-12 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Iniciar</button>
            </div>
        </div>
        
    <div id="modal${compostera.id}" class="absolute inset-0 z-50 items-center justify-center bg-black bg-opacity-50 hidden">
        <div class="bg-white w-full h-full">
            <div class="p-6 w-full h-full flex flex-col items-center justify-between">
                <div>
                    <h2 class="text-lg font-semibold text-gray-800">Compostera ${compostera.id} </h2>
                </div>
                <div class="main-modal${compostera.id}">
                    <p class="mt-4 text-sm text-gray-600">
                    </p>
                </div>
                <div class="mt-6 flex justify-end">
                    <button 
                        id="closeModal${compostera.id}" 
                        type="button" 
                        class="rounded-md bg-red-600 w-full px-4 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
                        Cerrar
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
                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="sm:col-span-3">
                        <label for="first-name" class="block text-sm/6 font-medium text-gray-900">Nombre del Bolo</label>
                        <div class="mt-2">
                            <input type="text" name="bolo-name" id="bolo-name" class="formbolo block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                        </div>
                    </div>
                </div>`;

            startBolo.innerHTML = `
                <button id="createBolo${compostId}" type="submit" class="rounded-md bg-indigo-600 text-center w-full px-12 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Crear Bolo
                </button>`;

            mainModal.appendChild(formbolo);
            mainModal.appendChild(startBolo);

            const createBoloButton = document.querySelector(`#createBolo${compostId}`);
            createBoloButton.addEventListener("click", async () => {
                try {
                    const nameBolo = document.querySelector("#bolo-name").value;
                    console.log("Nombre del bolo:", nameBolo);

                    // Crear el bolo
                    const bolo = await AnadirApisBolos(nameBolo);
                    console.log("Bolo creado:", bolo);

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

        // Mostrar los botones para terminar ciclo y agregar registro
        contMain.innerHTML = `
        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <button id="terminarCiclo" class="rounded-md bg-red-600 text-center w-full px-12 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                Terminar Ciclo
            </button>
            <button id="agregarRegistro" class="rounded-md bg-green-600 text-center w-full px-12 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 mt-4">
                Agregar Registro
            </button>
        </div>`;

        // Añadir el contenedor con los botones al DOM
        Xcontent.appendChild(contMain);

        // Asegurarse de que los botones están disponibles antes de agregar los listeners
        const terminarCicloButton = document.querySelector("#terminarCiclo");
        const agregarRegistroButton = document.querySelector("#agregarRegistro");

        //Si no estamos en la ultima compostera y la compostera siguiente esta vacia
        if (terminarCicloButton && id !== 3 && composteraSiguiente.ocupado == 0) {

            terminarCicloButton.addEventListener("click", async () => {
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
        }
        else if (terminarCicloButton && id == 3) {

            terminarCicloButton.addEventListener("click", async () => {
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

        }

        else if (terminarCicloButton && id !== 3 && composteraSiguiente.ocupado == 1) {

            terminarCicloButton.addEventListener("click", async () => {
                alert('La Compostera a la que se quiere pasar el bolo esta llena esta tendria que estar vacia para poder hacer la operacion');
            });
        }

        if (agregarRegistroButton) {
            agregarRegistroButton.addEventListener("click", async () => {
                try {

                    window.history.replaceState(null, '', `/#FormularioCiclo${cicloActualID}`);
                    formularioDeCiclos(id, cicloActualID)

                } catch (error) {
                    console.error("Error al agregar registro:", error);
                }
            });
        }

    }

}

function formularioDeCiclos(id, cicloActualID) {

    const contMain = document.createElement("main");
    contMain.classList.add("formulario", "text-start");

    const formAntes = document.createElement("div");
    formAntes.classList.add("form-antes");
    const formDurante = document.createElement("div");
    formDurante.classList.add("form-durante");
    const formDespues = document.createElement("div");
    formDespues.classList.add("form-despues");

    Xcontent.innerHTML = "";

    formAntes.innerHTML = `
    <div class="w-full flex flex-row registro-n">
         <div id="antes" class=" bg-white text-gray-900  ">1</div>
         <div id="durante" class="bg-gray-800">2</div>
         <div id="despues" class="bg-gray-800">3</div>
    </div>
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

          <div class="w-full">
    <form class=" max-w-lg mx-auto">
  <label class="block mb-2 text-sm/10 font-medium text-gray-900 dark:text-white" for="foto-inicial">Fotografía Inicial</label>
  <input class="block w-52 text-sm px-3 py-3 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white dark:text-gray-700 focus:outline-none dark:bg-white dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="foto-inicial" id="fotoAntes" type="file">
  </form>
 </div>
    

            <div class="w-full col-span-full gap-2">
    <div class=" mini-text relative flex gap-x-3">
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

        <button id="siguenteAntes" type="submit" class="boton-siguente rounded-md text-center w-full px-12 py-3 text-sm/10 font-semibold text-white shadow-sm">
    Siguente 
    </button>
    `;
    formDurante.innerHTML = `
        <div class="w-full flex flex-row registro-n">
         <div id="antes" class="bg-gray-800">1</div>
         <div id="durante" class=" bg-white text-gray-900 ">2</div>
         <div id="despues" class="bg-gray-800">3</div>
    </div>
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

      <div class="w-full">
    <form class=" max-w-lg mx-auto">
  <label class="block mb-2 text-sm/10 font-medium text-gray-900 dark:text-white" for="foto-durante">Fotografía Durante</label>
  <input class="block w-52 text-sm px-3 py-3 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white dark:text-gray-700 focus:outline-none dark:bg-white dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="foto-durante" id="fotoDurante" type="file">
  </form>
 </div>

  <div id="riegoRevolver" class="w-full flex flex-col "> 
            <div class="col-span-full gap-2">
    <div class=" mini-text relative flex gap-x-3">
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

                <div class=" col-span-full gap-2">
    <div class=" mini-text relative flex gap-x-3">
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

            <button id="siguenteDurante" type="submit" class="boton-siguente rounded-md text-center w-full px-12 py-3 text-sm/10 font-semibold text-white shadow-sm">
    Siguente 
    </button>
    `;
    formDespues.innerHTML = `
            <div class="w-full flex flex-row registro-n">
         <div id="antes" class="bg-gray-800">1</div>
         <div id="durante" class="bg-gray-800">2</div>
         <div id="despues" class="bg-white text-gray-900 ">3</div>
    </div>
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
    <form class=" max-w-lg mx-auto">
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


    const botonA = document.querySelector(`#antes`);
    const botonDu = document.querySelector(`#durante`);
    const botonDes = document.querySelector(`#despues`);

    console.log(botonA)
    console.log(botonDu)
    console.log(botonDes)


    botonA.addEventListener("click", () => {

        formDespues.classList.add("hidden");
        formDurante.classList.add("hidden");
        contMain.appendChild(formAntes);


    })

    botonDu.addEventListener("click", () => {

        formAntes.classList.add("hidden");
        formDespues.classList.add("hidden");
        contMain.appendChild(formDurante);


    })

    botonDes.addEventListener("click", () => {

        formAntes.classList.add("hidden");
        formDurante.classList.add("hidden");
        contMain.appendChild(formDespues);

    })


    const botonAntes = document.querySelector(`#siguenteAntes`);
    botonAntes.addEventListener("click", () => {

        formAntes.classList.add("hidden");
        contMain.appendChild(formDurante);

        const botonDurante = document.querySelector(`#siguenteDurante`);
        botonDurante.addEventListener("click", () => {

            formDurante.classList.add("hidden");
            contMain.appendChild(formDespues);


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

// Manejar cambios en la URL para actualizar la vista
window.addEventListener('hashchange', () => {
    const hash = window.location.hash;
    if (hash === '#composteras') {
        rutaComposteras();
    }

    else if (hash.startsWith('#datosCompostera')) {
        const id = hash.replace('#datosCompostera', '').trim();
        console.log(id);
        composteraOcupada(id);
    }

});

window.addEventListener('load', async () => {
    await consultaApisCompost(null, 'compostera', null);
    const hash = window.location.hash;
    if (hash === '#composteras') {
        rutaComposteras();
    }

});
