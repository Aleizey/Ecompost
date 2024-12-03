//  VISTA WEB DE LOS BOLOS 

// api para obtener los bolos y sus derivados (ciclos, registros, composteras)
// variables--->
// let arrayElementRegistros = [];
// let ApiRegistros = "http://ecompost.test/api/Registros";

// funcion ---->
// async function consultApiRegistros() {
//     try {
//         const token = getAuthToken();
//         if (!token) {
//             throw new Error("No se encontró el token de autenticación.");
//         }

//         const resultadoEnBruto = await fetch(ApiRegistros, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`,
//             },
//         });

//         const resultadoJSON = await resultadoEnBruto.json();
//         arrayElementRegistros = resultadoJSON.data;

//     } catch (error) {
//         console.log(`Error en la consulta de bolos: ${error}`);
//     }
// }

// contenido entero de la pagina 
// variables---> 
const Xcontent = document.querySelector(".main-container");

// funcion ---->
export function rutaRegistros() {

    Xcontent.innerHTML = ""; // vaciar el contenido de la pagina
    const contenedor = document.createElement("div");

    contenedor.innerHTML = `c`;

    // Agrega el contenedor al DOM
    Xcontent.appendChild(contenedor);
}