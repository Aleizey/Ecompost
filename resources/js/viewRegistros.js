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

  // Mostrar pantalla de carga
  Xcontent.appendChild(pantallaCarga);

  try {
    // Recuperar datos
    const arrayElementRegistros = await consultaApisViewRegistro(null, 'registro', null);
    console.log(arrayElementRegistros);

    // Crear contenedor principal
    const contMain = document.createElement("main");
    contMain.classList.add("w-full", "p-12", "mt-5");

    Xcontent.innerHTML = ""; // Limpiar contenido anterior

    // Filtrar y procesar registros
    arrayElementRegistros.forEach(async (registro) => {
      if (registro.user_id === user) {
        const [registosAntes, registosDurante, registosDespues] = await Promise.all([
          consultaApisViewRegistro(registro.id, 'registro', 'registrosAntes'),
          consultaApisViewRegistro(registro.id, 'registro', 'registrosDurante'),
          consultaApisViewRegistro(registro.id, 'registro', 'registrosDespues'),
        ]);

        // Crear y añadir tablas al contenedor
        crearTabla(registosAntes, 'antes', contMain);
        crearTabla(registosDurante, 'durante', contMain);
        crearTabla(registosDespues, 'despues', contMain);
      }
    });

    Xcontent.appendChild(contMain);
  } catch (error) {
    console.error("Error al cargar registros:", error);
    Xcontent.innerHTML = "<p class='text-red-500'>Error al cargar registros. Inténtalo de nuevo.</p>";
  }
}

// Función para crear tablas
function crearTabla(registros, tipo, contenedor) {
  registros.forEach((reg) => {
    const tabla = document.createElement("div");
    tabla.classList.add("tablas-registros");
    tabla.innerHTML = generarHTMLTabla(reg, tipo);
    contenedor.appendChild(tabla);
  });
}

// Generar HTML para una tabla según el tipo
function generarHTMLTabla(reg, tipo) {
  const commonHeaderStyles = "px-4 py-2 border border-gray-300 text-center text-sm font-semibold";
  const commonCellStyles = "px-4 py-2 border border-gray-300 text-center";

  if (tipo === "antes") {
    return `
      <table class="min-w-full table-auto border-collapse border border-gray-200 shadow-lg rounded-lg overflow-hidden">
        <thead class="bg-green-600 text-white">
          <tr>
            <th class="${commonHeaderStyles}">Id Antes</th>
            <th class="${commonHeaderStyles}">Id Registro</th>
            <th class="${commonHeaderStyles}">Humedad</th>
            <th class="${commonHeaderStyles}">Observaciones Inicial</th>
            <th class="${commonHeaderStyles}">Temperatura Ambiente</th>
            <th class="${commonHeaderStyles}">Olor</th>
            <th class="${commonHeaderStyles}">Presencia Insectos</th>
            <th class="${commonHeaderStyles}">Temperatura Compostera</th>
            <th class="${commonHeaderStyles}">Fotografías Iniciales</th>
            <th class="${commonHeaderStyles}">Fecha</th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white hover:bg-gray-100 transition duration-150 ease-in-out">
            <td class="${commonCellStyles}">${reg.id}</td>
            <td class="${commonCellStyles}">${reg.registro_id}</td>
            <td class="${commonCellStyles}">${reg.humedad}</td>
            <td class="${commonCellStyles}">${reg.observaciones_iniciales}</td>
            <td class="${commonCellStyles}">${reg.temperatura_ambiente}</td>
            <td class="${commonCellStyles}">${reg.olor}</td>
            <td class="${commonCellStyles}">${reg.presencia_insectos ? "Sí" : "No"}</td>
            <td class="${commonCellStyles}">${reg.temperatura_compostera}</td>
            <td class="${commonCellStyles}"><a href="#" class="text-blue-500 hover:underline">${reg.fotografias_iniciales}</a></td>
            <td class="${commonCellStyles}">${reg.fecha}</td>
          </tr>
        </tbody>
      </table>
    `;
  }

  if (tipo === "durante") {
    return `
      <table class="min-w-full table-auto border-collapse border border-gray-200 shadow-lg rounded-lg overflow-hidden">
        <thead class="bg-blue-600 text-white">
          <tr>
            <th class="${commonHeaderStyles}">Id Durante</th>
            <th class="${commonHeaderStyles}">Id Registro</th>
            <th class="${commonHeaderStyles}">Riego</th>
            <th class="${commonHeaderStyles}">Revolver</th>
            <th class="${commonHeaderStyles}">Litros Verde</th>
            <th class="${commonHeaderStyles}">Tipo Verde</th>
            <th class="${commonHeaderStyles}">Aporte Seco</th>
            <th class="${commonHeaderStyles}">Tipo Seco</th>
            <th class="${commonHeaderStyles}">Fotografías Durante</th>
            <th class="${commonHeaderStyles}">Observación</th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white hover:bg-gray-100 transition duration-150 ease-in-out">
            <td class="${commonCellStyles}">${reg.id}</td>
            <td class="${commonCellStyles}">${reg.registro_id}</td>
            <td class="${commonCellStyles}">${reg.riego ? "Sí" : "No"}</td>
            <td class="${commonCellStyles}">${reg.revolver ? "Sí" : "No"}</td>
            <td class="${commonCellStyles}">${reg.litros_verde}</td>
            <td class="${commonCellStyles}">${reg.tipo_aporte_verde}</td>
            <td class="${commonCellStyles}">${reg.aporte_seco}</td>
            <td class="${commonCellStyles}">${reg.tipo_aporte_seco}</td>
            <td class="${commonCellStyles}"><a href="#" class="text-blue-500 hover:underline">${reg.fotografias_durante}</a></td>
            <td class="${commonCellStyles}">${reg.observaciones_durante}</td>
          </tr>
        </tbody>
      </table>
    `;
  }

  if (tipo === "despues") {
    return `
      <table class="min-w-full table-auto border-collapse border border-gray-200 shadow-lg rounded-lg overflow-hidden">
        <thead class="bg-red-600 text-white">
          <tr>
            <th class="${commonHeaderStyles}">Id Después</th>
            <th class="${commonHeaderStyles}">Id Registro</th>
            <th class="${commonHeaderStyles}">Nivel Llenado</th>
            <th class="${commonHeaderStyles}">Fotografías Después</th>
            <th class="${commonHeaderStyles}">Observación Final</th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white hover:bg-gray-100 transition duration-150 ease-in-out">
            <td class="${commonCellStyles}">${reg.id}</td>
            <td class="${commonCellStyles}">${reg.registro_id}</td>
            <td class="${commonCellStyles}">${reg.nivel_llenado_final}</td>
            <td class="${commonCellStyles}"><a href="#" class="text-blue-500 hover:underline">${reg.fotografias_final}</a></td>
            <td class="${commonCellStyles}">${reg.observaciones_final}</td>
          </tr>
        </tbody>
      </table>
    `;
  }

  // Si no se especifica un tipo válido
  return `<p class="text-red-500">Error: Tipo de tabla no definido.</p>`;
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
