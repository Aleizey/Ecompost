const Xcontent = document.querySelector(".main-container");

// funcion ---->
export function rutaInformacion() {

    Xcontent.innerHTML = ""; // vaciar el contenido de la pagina
    const contenedor = document.createElement("div");

    contenedor.innerHTML = `informacion`;

    // Agrega el contenedor al DOM
    Xcontent.appendChild(contenedor);
}