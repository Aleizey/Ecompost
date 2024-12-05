//  VISTA WEB DE LOS Registros 

// api para obtener los registros y sus derivados (ciclos, registros, composteras)
// variables--->

import { logout } from "./noToken.js";

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

  } else if (id && resource2 === null) {
    url = `http://ecompost.test/api/${resource1}/${id}`;

  } else if (id && resource1 && resource2) {
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

    if (!resultadoEnBruto.ok) {
      if (resultadoEnBruto.status === 401) {
        logout(); // Manejar expiración de token o no autorizado.
      }
      throw new Error(`Error ${resultadoEnBruto.status} en la API`);
    }

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


// función ---->
export async function rutaRegistros() {

  Xcontent.innerHTML = ""; // vaciar el contenido de la pagina

  for (let registro of arrayElementRegistros) {
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

          Xcontent.appendChild(contenedor);
        });
      };


      // Crear tablas
      crearTabla(registosAntes, 'antes');
      crearTabla(registosDurante, 'durante');
      crearTabla(registosDespues, 'despues');
    }
  }
}

// Manejar cambios en la URL para actualizar la vista
window.addEventListener('hashchange', () => {
  const hash = window.location.hash;
  if (hash === '#registros') {
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
