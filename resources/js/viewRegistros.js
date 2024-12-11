//  VISTA WEB DE LOS Registros 

// api para obtener los registros y sus derivados (ciclos, registros, composteras)
// variables--->

import { logout } from "./noToken.js";

// contenido entero de la pagina 
const Xcontent = document.querySelector(".main-container");

const user = JSON.parse(localStorage.getItem('user'));

const pantallaCarga = document.createElement('div');
pantallaCarga.classList = `pantallaCarga`;
pantallaCarga.innerHTML = `       
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="animate-spin size-72">
             <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>

        </div>`

let arrayElementRegistros = [];
// optener el token
function getAuthToken() {
  const token = sessionStorage.getItem('apiToken');
  return token;
}

// funcion ---->
async function consultaApisViewRegistro(id = null, resource1, resource2 = null) {

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
    arrayElementRegistros = [...datos];

    if (resultadoJSON.data) {

      pantallaCarga.remove()
      return datos;
    }

  } catch (error) {
    console.log(`Error en la consulta de ciclos: ${error}`);
    return [];
  }
}

// función ---->
export async function rutaRegistros() {

  const divForm = document.querySelector("#divForm");

  divForm.innerHTML = `
<form class="flex items-center justify-center max-w-xs mx-auto w-3/4 sm:w-1/2 md:w-1/3">
   <div class="relative flex items-center w-full">
      <input type="search" id="filter-registro"
          class="w-full p-2 pl-10 text-sm text-[#4F4F4F] border border-[#C2B280] rounded-full bg-[#FFFFFF] focus:ring-green-500 focus:border-green-500 focus:outline-none"
          placeholder="Buscar..." required />
      <button type="submit"
          class="ml-2 bg-green-900 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-4 py-2 text-white focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
      </button>
  </div>
</form>           
  `;

  Xcontent.appendChild(pantallaCarga)

  arrayElementRegistros = await consultaApisViewRegistro(null, 'registro', null);
  const contMain = document.createElement("main");
  contMain.classList.add("w-full", "p-12", "mt-5");

  console.log(arrayElementRegistros)
  arrayElementRegistros.map(async registro => {

    Xcontent.innerHTML = "";

    if (registro.user_id == user) {
      const [registosAntes, registosDurante, registosDespues] = await Promise.all([
        consultaApisViewRegistro(registro.id, 'registro', 'registrosAntes'),
        consultaApisViewRegistro(registro.id, 'registro', 'registrosDurante'),
        consultaApisViewRegistro(registro.id, 'registro', 'registrosDespues')
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

          contMain.appendChild(contenedor);
        });
      };

      // Crear tablas
      crearTabla(registosAntes, 'antes');
      crearTabla(registosDurante, 'durante');
      crearTabla(registosDespues, 'despues');

    }
  });

  Xcontent.appendChild(contMain);
}

// Manejar cambios en la URL para actualizar la vista
window.addEventListener('hashchange', async () => {
  await consultaApisViewRegistro(null, 'registro', null);
  const hash = window.location.hash;
  if (hash === '#registros') {
    // window.location.reload();
    rutaRegistros();
  }
});

// Solo llama a rutaRegistros si el hash es #registros
window.addEventListener('load', async () => {
  await consultaApisViewRegistro(null, 'registro', null);

  const hash = window.location.hash;
  if (hash === '#registros') {
    rutaRegistros();
  }
});
