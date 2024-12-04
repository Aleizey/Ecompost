//  VISTA WEB DE LAS COMPOSTEREAS 

// api para obtener las composteras y insertar (registro, registroAntes, registroDurante, registroDespues)
// variables--->
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
    } else {
        url = `http://ecompost.test/api/${resource1}/${id}/${resource2}`;
    }

    try {
        const token = getAuthToken();
        if (!token) {
            throw new Error("No se encontró el token de autenticación.");
        }

        const resultadoEnBruto = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const resultadoJSON = await resultadoEnBruto.json();
        arrayElementComposteras = [...resultadoJSON.data];
        return resultadoJSON.data;
    } catch (error) {
        console.log(`Error en la consulta de ciclos: ${error}`);
        return [];
    }
}

// Añadir falta refactorizar el codigo en una o pocas funciones 
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

// Llamada a la función para insertar los registros (antes, durante, despues)
async function AnadirApisRegistroAntes(registroId, tempAmb, tempCompost, humedad, olor, insectos, foto, observ) {

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


// contenido entero de la pagina 
// variables---> 
const Xcontent = document.querySelector(".main-container");

// funcion ---->
export function rutaComposteras() {

    Xcontent.innerHTML = ""; // vaciar el contenido de la pagina
    console.log(arrayElementComposteras)
    arrayElementComposteras.map(compostera => {
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
                </tbody>
            </table>
            <div class="mt-6">
                <button id="openModal${compostera.id}" type="submit"class="rounded-md bg-indigo-600 text-center w-full px-12 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Iniciar</button>
            </div>
        </div>
        
<div id="modal${compostera.id}" class=" bg-gray-500 absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 hidden">
    <div class="bg-white w-full h-full">
        <div class="p-6 w-full h-full flex flex-col items-center justify-between">
            <div>
               <h2 class="text-lg font-semibold text-gray-800">Compostera ${compostera.id}</h2>
            </div>
            <div class="main-modal${compostera.id}">
               <p class="mt-4 text-sm text-gray-600">
               </p>
            </div>
            <div class="mt-6 flex justify-end">
                <button 
                    id="closeModal${compostera.id}" 
                    type="button" 
                    class="rounded-md bg-red-600 text-center w-full px-4 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
                    Cerrar
                </button>
            </div>
        </div>
    `;
        // Agrega el contenedor al DOM
        Xcontent.appendChild(contenedor);
        // modal
        InCompostera(compostera.id)

    });
}

async function InCompostera(compostId) {

    const modal = document.getElementById(`modal${compostId}`);
    const mainModal = document.querySelector(`.main-modal${compostId}`)
    const openModalButton = document.getElementById(`openModal${compostId}`);
    const closeModalButton = document.getElementById(`closeModal${compostId}`);

    const startRegist = document.createElement("div");
    const formulario = document.createElement("div");

    closeModalButton.addEventListener("click", () => {
        modal.classList.add("hidden");
        formulario.remove();
    });

    openModalButton.addEventListener("click", async () => {
        modal.classList.remove("hidden");

        // crear ciclo
        const ciclo = await AnadirApisCiclo(6, compostId, 1);
        console.log("Ciclo recibido:", ciclo);

        startRegist.innerHTML = `
                <button id="ciclo${ciclo.id}" type="submit" class="rounded-md bg-indigo-600 text-center w-full px-12 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Añadir registro
                </button>
            `;

        mainModal.appendChild(startRegist);

        startRegist.addEventListener("click", async () => {

            startRegist.remove();
            formulario.classList.add("flex-grow", "formulario", "flex", "flex-col", "text-[#4F4F4F]", "bg-[#FFFFFF]")

            formulario.innerHTML = `
            <div class="w-full flex flex-wrap gap-6 justify-center">

                <div class="sm:p-8 sm:rounded-lg w-full">
                    <form class="w-full">

                        <div class="w-full justify-between flex flex-row">
                            <!-- formulario antes  -->
                            <div class="bg-white p-12 rounded-lg space-y-12">
                                <div class="mb-10 relative flex gap-x-3 justify-center">
                                    <p class="text-2xl font-semibold text-gray-900">Registro Antes de</p>
                                </div>
                                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div class="sm:col-span-3">
                                        <label for="first-name"
                                            class="block text-sm/6 font-medium text-gray-900">Temperatura
                                            Ambiental (ºC)</label>
                                        <div class="mt-2">
                                            <input type="number" name="first-name" id="first-name"
                                                autocomplete="given-name"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6">
                                        </div>
                                    </div>

                                    <div class="sm:col-span-3">
                                        <label for="last-name"
                                            class="block text-sm/6 font-medium text-gray-900">Temperatura
                                            Compostera (ºC)</label>
                                        <div class="mt-2">
                                            <input type="number" name="last-name" id="last-name"
                                                autocomplete="family-name"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6">
                                        </div>
                                    </div>

                                    <div class="col-span-full">
                                        <label for="last-name" class="block text-sm/6 font-medium text-gray-900">Llenado
                                            Inicial
                                            (%)</label>
                                        <div class="mt-2">
                                            <input type="number" name="last-name" id="last-name"
                                                autocomplete="family-name"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6">
                                        </div>
                                    </div>

                                    <div class="sm:col-span-3">
                                        <label for="country"
                                            class="block text-sm/6 font-medium text-gray-900">Olor</label>
                                        <div class="mt-2">
                                            <select id="country" name="country" autocomplete="country-name"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6">
                                                <option>...</option>
                                                <option>Podrido</option>
                                                <option>Sin olor malo</option>
                                                <option>Aromatico</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="sm:col-span-3">
                                        <label for="country"
                                            class="block text-sm/6 font-medium text-gray-900">Humedad</label>
                                        <div class="mt-2">
                                            <select id="country" name="country" autocomplete="country-name"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6">
                                                <option>...</option>
                                                <option>Exceso</option>
                                                <option>Buena</option>
                                                <option>Defecto</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="col-span-full">
                                        <label for="about"
                                            class="block text-sm/6 font-medium text-gray-900">Observación</label>
                                        <div class="mt-2">
                                            <textarea id="about" name="about" rows="3"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"></textarea>
                                        </div>
                                        <p class="mt-3 text-sm/6 text-gray-600">Escribe una corta observación de lo
                                            realizado.
                                        </p>
                                    </div>

                                    <div class="col-span-full gap-2">
                                        <div class=" mini-text relative flex gap-x-3">
                                            <div class="flex h-6 items-center">
                                                <input id="comments" name="comments" type="checkbox"
                                                    class="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
                                            </div>
                                            <div class="">
                                                <label for="comments"
                                                    class="block text-sm/6 font-medium text-gray-900">Presencia de
                                                    insectos
                                                    (Si
                                                    / No)</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-span-full">
                                        <label for="cover-photo"
                                            class="block text-sm/6 font-medium text-gray-900">Fotografia
                                            Adjunta</label>
                                        <div
                                            class="mt-2 flex justify-center rounded-lg border bg-white border-dashed border-gray-600 px-6 py-10">
                                            <div class="text-center">
                                                <svg class="mx-auto size-0 text-gray-300" viewBox="0 0 24 24"
                                                    fill="currentColor" aria-hidden="true" data-slot="icon">
                                                    <path fill-rule="evenodd"
                                                        d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                                <div class="mt-4 flex text-sm/6 text-gray-600">
                                                    <label for="file-upload"
                                                        class="relative cursor-pointer rounded-md bg-blue-200 px-2 font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                                        <span>Upload a file</span>
                                                        <input id="file-upload" name="file-upload" type="file"
                                                            class="sr-only">
                                                    </label>
                                                    <p class="pl-1">or drag and drop</p>
                                                </div>
                                                <p class="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- formulario durante  -->
                            <div class="bg-white p-12 rounded-lg space-y-12">
                                <div class="mb-10 relative flex gap-x-3 justify-center">
                                    <p class="text-2xl font-semibold text-gray-900">Registro Durante de</p>
                                </div>
                                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div class="sm:col-span-3">
                                        <label for="first-name"
                                            class="block text-sm/6 font-medium text-gray-900">Aporte Verde (Kg)</label>
                                        <div class="mt-2">
                                            <input type="number" name="first-name" id="first-name"
                                                autocomplete="given-name"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6">
                                        </div>
                                    </div>

                                    <div class="sm:col-span-3">
                                        <label for="last-name"
                                            class="block text-sm/6 font-medium text-gray-900">Aporte seco(Kg)</label>
                                        <div class="mt-2">
                                            <input type="number" name="last-name" id="last-name"
                                                autocomplete="family-name"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6">
                                        </div>
                                    </div>

                                    <div class="col-span-full">
                                        <label for="about"
                                            class="block text-sm/6 font-medium text-gray-900">Tipo Verde</label>
                                        <div class="mt-2">
                                            <textarea id="about" name="about" rows="3"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"></textarea>
                                        </div>
                                        <p class="mt-3 text-sm/6 text-gray-600">Escribe una corta observación de lo
                                            realizado.
                                        </p>
                                    </div>

                                    <div class="col-span-full">
                                        <label for="about"
                                            class="block text-sm/6 font-medium text-gray-900">Tipo Seco</label>
                                        <div class="mt-2">
                                            <textarea id="about" name="about" rows="3"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"></textarea>
                                        </div>
                                        <p class="mt-3 text-sm/6 text-gray-600">Escribe una corta observación de lo
                                            realizado.
                                        </p>
                                    </div>
                                    

                                    <div class="col-span-full">
                                        <label for="about"
                                            class="block text-sm/6 font-medium text-gray-900">Observación</label>
                                        <div class="mt-2">
                                            <textarea id="about" name="about" rows="3"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"></textarea>
                                        </div>
                                        <p class="mt-3 text-sm/6 text-gray-600">Escribe una corta observación de lo
                                            realizado.
                                        </p>
                                    </div>

                                    <div class="col-span-full gap-2">
                                        <div class=" mini-text relative flex gap-x-3">
                                            <div class="flex h-6 items-center">
                                                <input id="comments" name="comments" type="checkbox"
                                                    class="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
                                            </div>
                                            <div class="">
                                                <label for="comments"
                                                    class="block text-sm/6 font-medium text-gray-900">riego
                                                    (Si
                                                    / No)</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-span-full gap-2">
                                        <div class=" mini-text relative flex gap-x-3">
                                            <div class="flex h-6 items-center">
                                                <input id="comments" name="comments" type="checkbox"
                                                    class="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
                                            </div>
                                            <div class="">
                                                <label for="comments"
                                                    class="block text-sm/6 font-medium text-gray-900">revoelto
                                                    (Si
                                                    / No)</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-span-full">
                                        <label for="cover-photo"
                                            class="block text-sm/6 font-medium text-gray-900">Fotografia
                                            Adjunta</label>
                                        <div
                                            class="mt-2 flex justify-center rounded-lg border bg-white border-dashed border-gray-600 px-6 py-10">
                                            <div class="text-center">
                                                <svg class="mx-auto size-0 text-gray-300" viewBox="0 0 24 24"
                                                    fill="currentColor" aria-hidden="true" data-slot="icon">
                                                    <path fill-rule="evenodd"
                                                        d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                                <div class="mt-4 flex text-sm/6 text-gray-600">
                                                    <label for="file-upload"
                                                        class="relative cursor-pointer rounded-md bg-blue-200 px-2 font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                                        <span>Upload a file</span>
                                                        <input id="file-upload" name="file-upload" type="file"
                                                            class="sr-only">
                                                    </label>
                                                    <p class="pl-1">or drag and drop</p>
                                                </div>
                                                <p class="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- formulario durante  -->
                            <div class="bg-white p-12 rounded-lg space-y-12">
                                <div class="mb-10 relative flex gap-x-3 justify-center">
                                    <p class="text-2xl font-semibold text-gray-900">Registro Despues de</p>
                                </div>
                                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div class="sm:col-span-3">
                                        <label for="first-name"
                                            class="block text-sm/6 font-medium text-gray-900">Nivel Llenado Final(%)</label>
                                        <div class="mt-2">
                                            <input type="number" name="first-name" id="first-name"
                                                autocomplete="given-name"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6">
                                        </div>
                                    </div>

                                    <div class="col-span-full">
                                        <label for="about"
                                            class="block text-sm/6 font-medium text-gray-900">Observación</label>
                                        <div class="mt-2">
                                            <textarea id="about" name="about" rows="3"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"></textarea>
                                        </div>
                                        <p class="mt-3 text-sm/6 text-gray-600">Escribe una corta observación de lo
                                            realizado.
                                        </p>
                                    </div>

                                    <div class="col-span-full">
                                        <label for="cover-photo"
                                            class="block text-sm/6 font-medium text-gray-900">Fotografia
                                            Adjunta</label>
                                        <div
                                            class="mt-2 flex justify-center rounded-lg border bg-white border-dashed border-gray-600 px-6 py-10">
                                            <div class="text-center">
                                                <svg class="mx-auto size-0 text-gray-300" viewBox="0 0 24 24"
                                                    fill="currentColor" aria-hidden="true" data-slot="icon">
                                                    <path fill-rule="evenodd"
                                                        d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                                <div class="mt-4 flex text-sm/6 text-gray-600">
                                                    <label for="file-upload"
                                                        class="relative cursor-pointer rounded-md bg-blue-200 px-2 font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                                        <span>Upload a file</span>
                                                        <input id="file-upload" name="file-upload" type="file"
                                                            class="sr-only">
                                                    </label>
                                                    <p class="pl-1">or drag and drop</p>
                                                </div>
                                                <p class="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mt-6 flex justify-center col-span-full gap-x-6">
                            <button type="submit"
                                class="boton-formulario rounded-md w-full bg-indigo-600 px-72 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Siguente</button>
                        </div>
                    </form>
                </div>
            </div>
            `;
            mainModal.appendChild(formulario);

            const botonFormulario = document.querySelector('.boton-formulario');
            botonFormulario.addEventListener('click', async () => {

                // value de los input
                // Antes 
                const tempAmb = document.getElementById('first-name').value;
                const tempCompost = document.getElementById('last-name').value;
                const olor = document.getElementById('country').value;
                const humedad = document.getElementById('country').value;
                const observAntes = document.getElementById('about').value;
                const insectos = document.getElementById('comments').checked;

                // Durante
                const aporteVerde = document.getElementById('first-name').value;
                const aporteSeco = document.getElementById('last-name').value;
                const tipoVerde = document.getElementById('about').value;
                const tipoSeco = document.getElementById('about').value;
                const observDurante = document.getElementById('about').value;

                // Después
                const llenadoFinal = document.getElementById('first-name').value;
                const observDespues = document.getElementById('about').value;

                // Fotografía
                const fotoAntes = document.getElementById('file-upload').files[0];
                const fotoDurante = document.getElementById('file-upload').files[0];
                const fotoDespues = document.getElementById('file-upload').files[0];

                // crear registro
                const registro = await AnadirApisRegistro(ciclo.id, compostId, 1);
                console.log("registro recibido:", registro);

                // registros antes, durante, despues 
                if (registro) {
                    const registroAntes = await AnadirApisRegistroAntes(registro.id, tempAmb, tempCompost, humedad, olor, insectos, fotoAntes, observAntes);
                    const registroDurante = await AnadirApisRegistroDurante(registro.id, true, true, aporteVerde, tipoVerde, aporteSeco, tipoSeco, fotoDurante, observDurante);
                    const registroDespues = await AnadirApisRegistroDespues(registro.id, llenadoFinal, fotoDespues, observDespues);

                    console.log("Registro antes:", registroAntes, "Registro despues:", registroDurante, "Registro despues:", registroDespues);

                } else {

                    console.log("No existen Registro")
                }
            });
        });
    });
}

// Manejar cambios en la URL para actualizar la vista
window.addEventListener('hashchange', () => {
    rutaComposteras();
    // ...
});

window.addEventListener('load', async () => {
    await consultaApisCompost(null, 'compostera', null);

    const hash = window.location.hash;
    if (hash === '#composteras') {

        rutaComposteras();
    }
    // ...
});
