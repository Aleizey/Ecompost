//  VISTA WEB DE LOS BOLOS 

// api para obtener los bolos y sus derivados (ciclos, registros, composteras)
// variables--->
let arrayElementRegistros = [];
const user = JSON.parse(localStorage.getItem('user'));

// optener el token
function getAuthToken() {
    const token = sessionStorage.getItem('apiToken');
    return token;
}

// funcion ---->
async function consultaApisViewRegistro(id = null, resource1, resource2 = null) {

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
        arrayElementRegistros = [...resultadoJSON.data];
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
export function rutaRegistros() {

    Xcontent.innerHTML = ""; // vaciar el contenido de la pagina

    // const contenedor = document.createElement("div");
    const main = document.querySelector("main");
    main.classList.add("w-full", "flex", "flex-col");

    arrayElementRegistros.map(async registro => {

        if (registro.user_id == user) {
            const registosAntes = await consultaApisViewRegistro(registro.id, 'registro', 'registrosAntes');
            const registosDurante = await consultaApisViewRegistro(registro.id, 'registro', 'registrosDurante');
            const registosDespues = await consultaApisViewRegistro(registro.id, 'registro', 'registrosDespues');

            registosAntes.map(async antes => {
                registosDurante.map(async durante => {
                    registosDespues.map(async despues => {

                        if (antes) {
                            // const antesCont = document.createElement("div");
                            const contenedor = document.createElement("div");
                            contenedor.classList.add("tablas-registros");

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
                          <td class="px-4 py-2 border border-gray-300">${antes.id}</td>
                          <td class="px-4 py-2 border border-gray-300">${antes.registro_id}</td>
                          <td class="px-4 py-2 border border-gray-300">${antes.humedad}</td>
                          <td class="px-4 py-2 border border-gray-300">${antes.observaciones_iniciales}</td>
                          <td class="px-4 py-2 border border-gray-300">${antes.temperatura_ambiente}</td>
                          <td class="px-4 py-2 border border-gray-300">${antes.olor}</td>
                          <td class="px-4 py-2 border border-gray-300">${antes.presencia_insectos ? 'Sí' : 'No'}</td>
                          <td class="px-4 py-2 border border-gray-300">${antes.temperatura_compostera}</td>
                          <td class="px-4 py-2 border border-gray-300"><p class="text-blue-500">${antes.fotografias_iniciales}</p></td>
                          <td class="px-4 py-2 border border-gray-300">${antes.fecha}</td>
                        </tr>
                      </tbody>
                    </table>
                  `;
                            Xcontent.appendChild(contenedor)
                        } else { }

                        if (durante) {
                            // const antesCont = document.createElement("div");
                            const durantes = document.createElement("div");
                            durantes.classList.add("tablas-registros");

                            durantes.innerHTML = `
            <table class="min-w-full table-auto border-collapse border border-gray-200">
              <thead class="bg-gray-500 text-white">
                <tr>
                  <th class="px-4 py-2 border border-gray-300 ">Id Durante</th>
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
                  <td class="px-4 py-2 border border-gray-300">${durante.id}</td>
                  <td class="px-4 py-2 border border-gray-300">${durante.registro_id}</td>
                  <td class="px-4 py-2 border border-gray-300">${durante.riego ? "SI" : "NO"}</td>
                  <td class="px-4 py-2 border border-gray-300">${durante.revolver ? "SI" : "NO"}</td>
                  <td class="px-4 py-2 border border-gray-300">${durante.litros_verde}</td>
                  <td class="px-4 py-2 border border-gray-300">${durante.tipo_aporte_verde}</td>
                  <td class="px-4 py-2 border border-gray-300">${durante.aporte_seco}</td>
                  <td class="px-4 py-2 border border-gray-300">${durante.tipo_aporte_seco}</td>
                  <td class="px-4 py-2 border border-gray-300"><p class="text-blue-500">${durante.fotografias_durante}</p></td>
                  <td class="px-4 py-2 border border-gray-300">${durante.observaciones_durante}</td>
                </tr>
              </tbody>
            </table>
`;
                            Xcontent.appendChild(durantes)
                        } else { }

                        if (despues) {
                            // const antesCont = document.createElement("div");
                            const despue = document.createElement("div");
                            despue.classList.add("tablas-registros");

                            despue.innerHTML = `
            <table class="min-w-full table-auto border-collapse border border-gray-200">
              <thead class="bg-gray-500 text-white">
                <tr>
                  <th class="px-4 py-2 border border-gray-300 ">Id Despues</th>
                  <th class="px-4 py-2 border border-gray-300">Id Registro</th>
                  <th class="px-4 py-2 border border-gray-300">Nivel Llenado</th>
                  <th class="px-4 py-2 border border-gray-300">Fotografías Despues</th>
                  <th class="px-4 py-2 border border-gray-300">observacion_final</th>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-white hover:bg-gray-200">
                  <td class="px-4 py-2 border border-gray-300">${despues.id}</td>
                  <td class="px-4 py-2 border border-gray-300">${despues.registro_id}</td>
                  <td class="px-4 py-2 border border-gray-300">${despues.nivel_llenado_final}</td>
                  <td class="px-4 py-2 border border-gray-300"><p class="text-blue-500">${despues.fotografias_final}</p></td>
                  <td class="px-4 py-2 border border-gray-300">${despues.observaciones_final}</td>
                </tr>
              </tbody>
            </table>
`;
                            Xcontent.appendChild(despue)
                        } else { }

                    });
                });
            });
        } else {}
    });
}


// Manejar cambios en la URL para actualizar la vista
window.addEventListener('hashchange', () => {
    rutaRegistros();
    // ...
});

window.addEventListener('load', async () => {
    await consultaApisViewRegistro(null, 'registro', null);

    const hash = window.location.hash;
    if (hash === '#registros') {

        rutaRegistros();
    }
    // ...
});