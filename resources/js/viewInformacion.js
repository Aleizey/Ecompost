import { logout } from "./noToken.js";

const Xcontent = document.querySelector(".main-container");

// funcion ---->
export function rutaInformacion() {

    const divForm = document.querySelector("#divForm");

    divForm.innerHTML = `Información`;

    Xcontent.innerHTML = ""; // vaciar el contenido de la pagina
    const contenedor = document.createElement("div");
    contenedor.classList = " p-2 w-full h-full flex justify-between flex-col items-center";

    const header = document.createElement("div");
    header.classList = `header-compost bg-white w-full p-3 text-lg font-bold`;
    header.innerHTML = `<p>Información Sobre El Compostaje</p>`;

    const main = document.createElement("div");
    main.classList = `main-compost`;
    main.innerHTML = `vdaasdsa`;

    const footer = document.createElement("div");
    footer.classList = `footer-compost`;
    footer.innerHTML = `vasdas`;
    
    // contenedor.innerHTML = `informacion`;

    // Agrega el contenedor al DOM
    Xcontent.appendChild(contenedor);
    contenedor.appendChild(header);
    contenedor.appendChild(main);
    contenedor.appendChild(footer);
}