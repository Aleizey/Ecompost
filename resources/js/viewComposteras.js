//  VISTA WEB DE LOS BOLOS 

// api para obtener los Composteras y sus derivados (ciclos, registros)
// variables--->
// let arrayElementCompost = [];
// let ApiCompost = "http://ecompost.test/api/composteras";

// funcion ---->
// async function consultApiComposteras() {
//     try {
//         const token = getAuthToken();
//         if (!token) {
//             throw new Error("No se encontró el token de autenticación.");
//         }

//         const resultadoEnBruto = await fetch(ApiCompost, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`,
//             },
//         });

//         const resultadoJSON = await resultadoEnBruto.json();
//         arrayElementCompost = resultadoJSON.data;

//     } catch (error) {
//         console.log(`Error en la consulta de bolos: ${error}`);
//     }
// }

// contenido entero de la pagina 
// variables---> 
const Xcontent = document.querySelector(".x-content-app");

// funcion ---->
export function rutaComposteras() {

    Xcontent.innerHTML = ""; // vaciar el contenido de la pagina
    const contenedor = document.createElement("div");

    contenedor.innerHTML = `b`;

    // Agrega el contenedor al DOM
    Xcontent.appendChild(contenedor);
}