let arrayElement = [];
let ApiElement = "http://ecompost.test/api/bolos";

function getAuthToken() {
    const token = "10|fvIkQEK2onR6L7uPzFAWr5A1S9JAbiZzu5QvdDxSfbf1e53a";
    return token;
}

async function consultaApi() {
    try {
        const token = getAuthToken();
        if (!token) {
            throw new Error("No se encontró el token de autenticación.");
        }

        const resultadoEnBruto = await fetch(ApiElement, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const resultadoJSON = await resultadoEnBruto.json();
        arrayElement = resultadoJSON.data;

    } catch (error) {
        console.log(`Error en la consulta de bolos: ${error}`);
    }
}

async function consultaApiBolosCiclos(id) {
    try {
        const token = getAuthToken();
        if (!token) {
            throw new Error("No se encontró el token de autenticación.");
        }

        const resultadoEnBruto = await fetch(`http://ecompost.test/api/bolos/${id}/ciclos`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const resultadoJSON = await resultadoEnBruto.json();
        return resultadoJSON.data;
    } catch (error) {
        console.log(`Error en la consulta de ciclos: ${error}`);
        return [];
    }
}

window.addEventListener('load', async () => {
    await consultaApi();
    addElement();
});

function addElement() {
    const prueba = document.querySelector(".pruebapro");

    arrayElement.forEach(bolos => {
        const div = document.createElement("div");
        div.classList.add("border-b");

        div.innerHTML = `
            <a href="#bolo${bolos.id}" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <p class="font-normal text-gray-700 dark:text-gray-400">${bolos.id}</p>
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${bolos.nombre}</h5>
                <p class="font-normal text-gray-700 dark:text-gray-400">${bolos.comentario}</p>
            </a>
        `;

        div.addEventListener("mouseover", async () => {
            const ciclos = await consultaApiBolosCiclos(bolos.id);
            showCiclos(ciclos);
        });

        prueba.append(div);
    });
}

function showCiclos(ciclos) {
    const prueba2 = document.querySelector(".pruebapro2");
    prueba2.innerHTML = "";

    ciclos.forEach(ciclo => {
        const cicloDiv = document.createElement("div");
        cicloDiv.classList.add("ciclo-item");

        cicloDiv.innerHTML = `
            <p>ID Ciclo: ${ciclo.id}</p>
            <p>Fecha Inicio: ${ciclo.fecha_inicio}</p>
            <p>Fecha Final: ${ciclo.fecha_final || "No disponible"}</p>
        `;

        prueba2.append(cicloDiv);
    });
}
