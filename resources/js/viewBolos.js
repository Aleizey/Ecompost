//  VISTA WEB DE LOS BOLOS 

// api para obtener los bolos y sus derivados (ciclos, registros, composteras)
// variables--->
let arrayElementBolos = [];

// optener el token
function getAuthToken() {
    const token = "****";
    return token;
}

// funcion ---->
async function consultaApiBolosCiclos(id = null, resource1, resource2 = null) {

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
        arrayElementBolos = [...resultadoJSON.data];
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
export async function rutaBolos() {

    Xcontent.innerHTML = ""; // vaciar el contenido de la pagina


    const contMain = document.createElement("main"); // MAIN 
    contMain.classList.add("w-full", "p-12", "mt-5", "grid", "grid-cols-4", "gap-4");

    // optener la ruta actual 
    const hash = window.location.hash;
    let rutaFound = false;

    arrayElementBolos.map(bolo => {

        switch (hash) {
            case `#bolos?bolo${bolo.id}`:
                // contenedor de cada bolo
                rutaAllBolos(bolo.id);
                rutaFound = true;
                break;
        }

        if (!rutaFound) {

            // ////////////////////////////////////////////// MAIN ////////////////////////////////////////////// -->
            const boloCont = document.createElement("div");
            boloCont.classList.add("w-full", "flex", "justify-center", "mb-12");

            boloCont.innerHTML = `

            <a href="#bolos?bolo${bolo.id}" class="model-bolo rounded-lg shadow-lg w-full h-full p-5 flex flex-col justify-between items-center" >

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
                    <img
                    src="https://png.pngtree.com/png-clipart/20230915/original/pngtree-cartoon-of-compost-manhole-container-with-vegetables-and-plants-vector-png-image_12170171.png"
                    alt="">
                </div>
                <div class="grid grid-cols-4 gap-2">

                    <div class="bg-green-500 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 fill-green-500">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>

                    <h5>${bolo.fecha_final ? 'Finalizado' : 'Activo'}</h5>
                    <div class="bg-blue-500 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                        </svg>
                    </div>
                    <h5>${bolo.fecha_inicio.split(' ', (1))}</h5>

                </div>
                
            </a>`

            contMain.appendChild(boloCont)
        }
    })

    // Agrega el contenedor al DOM
    Xcontent.appendChild(contMain);

}

async function rutaAllBolos(id) {

    const ciclos = await consultaApiBolosCiclos(id, 'bolos', 'ciclos');

    console.log(Xcontent);
    Xcontent.innerHTML = ""; // vaciar el contenido de la pagina

    // contenedor general de cada pagina
    const contenedorGeneral = document.createElement("div"); // GENERAL 
    contenedorGeneral.classList.add("w-screen", "h-screen", "flex", "flex-col", "justify-between", "items-center");

    // contenedor de la barra de navegacion
    const contHeader = document.createElement("header"); // HEADER 
    const contMain = document.createElement("main"); // MAIN 
    contMain.classList.add("w-full", "p-12", "grid", "grid-cols-4", "gap-4");
    const contFooter = document.createElement("footer"); // FOOTER 

    // ////////////////////////////////////////////// HEADER ////////////////////////////////////////////// -->
    contHeader.innerHTML = `hola`

    // ////////////////////////////////////////////// MAIN ////////////////////////////////////////////// -->
    ciclos.map(async ciclo => {

        // CICLOS INFO /////////////////////////////////////////// -->
        const cicloCont = document.createElement("div");
        cicloCont.classList.add("w-full", "flex", "justify-center", "mb-12", "ciclos");

        cicloCont.innerHTML = `<div>
        <p>Id ciclo :${ciclo.id}</p>
        <p>Bolo :${ciclo.bolo_id}</p>
        <p>Fecha Inicio :${ciclo.fecha_inicio}</p>
        <p> Fecha Final :${ciclo.fecha_final ? "activo" : "inactivo"}</p>
        </div>`

        contMain.appendChild(cicloCont)
        // FIN CICLOS INFO /////////////////////////////////////////// -->

        // REGISTRO INFO /////////////////////////////////////////// -->
        const registos = await consultaApiBolosCiclos(ciclo.id, 'ciclo', 'registros');
        registos.map(async registro => {

            const registosAntes = await consultaApiBolosCiclos(registro.id, 'registro', 'registrosAntes');
            const registosDurante = await consultaApiBolosCiclos(registro.id, 'registro', 'registrosDurante');
            const registosDespues = await consultaApiBolosCiclos(registro.id, 'registro', 'registrosDespues');
            // console.log(registosDurante)
            // console.log(registosDespues)
            registosAntes.map(async antes => {

                const antesCont = document.createElement("div");
                antesCont.classList.add("w-full", "flex", "justify-center", "mb-12", "ciclos");
                antesCont.innerHTML = `<div>
                <p>Id Antes:${antes.id}</p>
                <p>Id Registro:${antes.registro_id}</p>
                <p>Humedad :${antes.humedad}</p>
                <p>observaciones iniciales :${antes.observaciones_iniciales}</p>
                <p> temperatura ambiente :${antes.temperatura_ambiente} °C</p>
                <p> Olor :${antes.olor}</p>
                <p> presencia insectos :${antes.presencia_insectos ? "Si" : "No"}</p>
                <p> temperatura compostera :${antes.temperatura_compostera} ºC</p>
                <img src="${antes.fotografias_iniciales}" alt="imagen>
                <p> fecha :${antes.fotografias_iniciales}</p>
                </div>`

                contMain.appendChild(antesCont)
            });
        });
        // FIN CICLOS INFO /////////////////////////////////////////// -->
    })


    // Agrega el contenedor al DOM
    Xcontent.appendChild(contMain);
    
}

// Manejar cambios en la URL para actualizar la vista
window.addEventListener('hashchange', () => {
    rutaBolos();
    // ...
});

window.addEventListener('load', async () => {
    await consultaApiBolosCiclos(null, 'bolos', null);
    // ...
});