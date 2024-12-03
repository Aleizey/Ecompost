//  VISTA WEB DE LAS COMPOSTEREAS 

// api para obtener las composteras y insertar (registro, registroAntes, registroDurante, registroDespues)
// variables--->
let arrayElementComposteras = [];

// optener el token
function getAuthToken() {
    const token = "****";
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

async function AnadirApisCiclo(boloId, CompstId) {

    const url = "http://ecompost.test/api/ciclos";

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
        
        <div id="modal${compostera.id}" class="absolute inset-0 z-50 items-center justify-center bg-opacity-50 hidden">
            <div class="bg-[#e2e8f0] w-full h-full">
                <div class="p-6 w-full h-full flex flex-col items-center justify-between">
                    <div>
                        <h2 class="text-lg font-semibold text-gray-800">Compostera ${compostera.id}</h2>
                    </div>
                    <div class="main-modal${compostera.id}">
                        <p class="mt-4 text-sm text-gray-600">
                            Este es el contenido del modal. Puedes personalizar este texto según tus necesidades.
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
        Xcontent.appendChild(contenedor);

        const modal = document.getElementById(`modal${compostera.id}`);
        const mainModal = document.querySelector(`.main-modal${compostera.id}`)
        const openModalButton = document.getElementById(`openModal${compostera.id}`);
        const closeModalButton = document.getElementById(`closeModal${compostera.id}`);

        openModalButton.addEventListener("click", async () => {

            modal.classList.remove("hidden");

            const ciclo = await AnadirApisCiclo(6, compostera.id, 1);
            console.log("Ciclo recibido:", ciclo);

            const startRegist = document.createElement("div");
            startRegist.innerHTML = `
                    <button id="ciclo${ciclo.id}" type="submit" class="rounded-md bg-indigo-600 text-center w-full px-12 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Añadir registro
                    </button>
                `;

            mainModal.appendChild(startRegist);

            startRegist.addEventListener("click", async () => {
                const registro = await AnadirApisRegistro(ciclo.id, compostera.id, 1);
                console.log("Registro recibido:", registro);
            });

        });


        closeModalButton.addEventListener("click", () => {
            modal.classList.add("hidden");
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
    // ...
});
