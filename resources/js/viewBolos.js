//  VISTA WEB DE LOS BOLOS 

// api para obtener los bolos y sus derivados (ciclos, registros, composteras)
// variables--->
// let arrayElementBolos = [];
// let ApiBolos = "http://ecompost.test/api/bolos";

// function getAuthToken() {
//     const token = "12|3xxEo7Mq5UDi8On9aynQe4Zqj98a37n0mFB2RKUl4f74a8a8";
//     return token;
// }

// funcion ---->
// async function consultApiBolos() {
//     try {
//         const token = getAuthToken();
//         if (!token) {
//             throw new Error("No se encontró el token de autenticación.");
//         }

//         const resultadoEnBruto = await fetch(ApiBolos, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`,
//             },
//         });

//         const resultadoJSON = await resultadoEnBruto.json();
//         arrayElementBolos = resultadoJSON.data;

//     } catch (error) {
//         console.log(`Error en la consulta de bolos: ${error}`);
//     }
// }

// await consultApiBolos();

// contenido entero de la pagina 
// variables---> 
const Xcontent = document.querySelector(".x-content-app");

// funcion ---->
export function rutaBolos() {

    Xcontent.innerHTML = ""; // vaciar el contenido de la pagina

    // contenedor general de cada pagina
    const contenedorGeneral = document.createElement("div"); // GENERAL 
    contenedorGeneral.classList.add("w-screen", "h-screen", "flex", "flex-col", "justify-between", "items-center");

    // contenedor de la barra de navegacion
    const contHeader = document.createElement("header"); // HEADER 
    const contMain = document.createElement("main"); // MAIN 
    const contFooter = document.createElement("footer"); // FOOTER 

    arrayElementBolos.forEach(bolos => {
        contHeader.innerHTML = `hola`
        contMain.innerHTML = `${bolos.nombre} : a`
        contFooter.innerHTML = `perro`
    });

    // Agrega el contenedor al DOM
    Xcontent.appendChild(contenedorGeneral);

    contenedorGeneral.appendChild(contHeader);
    contenedorGeneral.appendChild(contMain);
    contenedorGeneral.appendChild(contFooter);


}