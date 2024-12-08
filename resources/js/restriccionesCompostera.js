async function InCompostera(compostId) {

    const modal = document.getElementById(`modal${compostId}`);
    const mainModal = document.querySelector(`.main-modal${compostId}`)
    const openModalButton = document.getElementById(`openModal${compostId}`);
    const closeModalButton = document.getElementById(`closeModal${compostId}`);

    const startRegist = document.createElement("div");
    const formbolo = document.createElement("div");
    const startBolo = document.createElement("div");
    const startCiclo = document.createElement("div");
    const formulario = document.createElement("div");

    closeModalButton.addEventListener("click", async () => {
        modal.classList.add("hidden");
        formulario.remove();
    });

    openModalButton.addEventListener("click", async () => {
        modal.classList.remove("hidden");

        const compostera = await consultaApisCompost(null, 'compostera', null);

        if (compostId === 1) {

            if (compostera[0].id == 1 && compostera[0].ocupado == 0) {

                formbolo.innerHTML = `            
        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div class="sm:col-span-3">
            <label for="first-name" class="block text-sm/6 font-medium text-gray-900">First name</label>
            <div class="mt-2">
            <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="formbolo block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
            </div>
        </div>`;

                startBolo.innerHTML = `
        <button id="ciclo${compostId}" type="submit" class="rounded-md bg-indigo-600 text-center w-full px-12 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Crear Bolo
        </button>
    `;

                mainModal.appendChild(formbolo);
                mainModal.appendChild(startBolo);



                startBolo.addEventListener("click", async () => {

                    const nameBolo = document.querySelector(".formbolo").value;
                    const bolo = await AnadirApisBolos(nameBolo);

                    formbolo.remove()
                    startBolo.remove()

                    startCiclo.innerHTML = `
            <button id="ciclo${bolo.id}" type="submit" class="rounded-md bg-indigo-600 text-center w-full px-12 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Empezar ciclo
            </button>
        `;

                    mainModal.appendChild(startCiclo);

                    startCiclo.addEventListener("click", async () => {

                        const ciclo = await AnadirApisCiclo(bolo.id, compostId);
                        console.log("Ciclo recibido:", ciclo);

                        startCiclo.remove()

                        startRegist.innerHTML = `
        <button id="ciclo${ciclo.id}" type="submit" class="rounded-md bg-indigo-600 text-center w-full px-12 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Añadir registro
        </button>
        `;
                        mainModal.appendChild(startRegist);

                        startRegist.addEventListener("click", async () => {

                            startRegist.remove();
                            formulario.classList.add("compostForm", "w-full");

                            formulario.innerHTML = `
                    <h2>Registro Antes</h2>
        <label>Temperatura Ambiente:</label>
        <input type="number" step="0.1" id="tempAmb" required><br>
        
        <label>Temperatura Compostera:</label>
        <input type="number" step="0.1" id="tempCompost" required><br>
        
        <label>Humedad:</label>
        <select id="humedad" required>
            <option value="Exceso">Exceso</option>
            <option value="Buena">Buena</option>
            <option value="Defecto">Defecto</option>
        </select><br>
        
        <label>Olor:</label>
        <select id="olor" required>
            <option value="Podrido">Podrido</option>
            <option value="Sin olor malo">Sin olor malo</option>
            <option value="Sin olor">Sin olor</option>
            <option value="Con olor bueno">Con olor bueno</option>
            <option value="Aromatico">Aromático</option>
        </select><br>
        
        <label>Presencia de Insectos:</label>
        <input type="checkbox" id="insectos"><br>
        
        <label>Fotografía Inicial:</label>
        <input type="text" id="fotoAntes" placeholder="Nombre del archivo"><br>
        
        <label>Observaciones Iniciales:</label>
        <textarea id="observAntes"></textarea><br>
        
        <label>Llenado Inicial:</label>
        <input type="number" step="0.1" id="llenadoInicial" required><br>
        
        <h2>Registro Durante</h2>
        <label>Riego:</label>
        <input type="checkbox" id="riego"><br>
        
        <label>Revolver:</label>
        <input type="checkbox" id="revolver"><br>
        
        <label>Litros Verde:</label>
        <input type="number" step="1" id="litroVerde" required><br>
        
        <label>Tipo Aporte Verde:</label>
        <select id="tipoVerde" required>
            <option value="Hojas verdes">Hojas verdes</option>
            <option value="Residuos orgánicos">Residuos orgánicos</option>
            <option value="Pasto fresco">Pasto fresco</option>
        </select><br>
        
        <label>Aporte Seco:</label>
        <input type="number" step="1" id="aporteSeco" required><br>
        
        <label>Tipo Aporte Seco:</label>
        <select id="tipoSeco" required>
            <option value="Paja">Paja</option>
            <option value="Cartón">Cartón</option>
            <option value="Serrín">Serrín</option>
        </select><br>
        
        <label>Fotografía Durante:</label>
        <input type="text" id="fotoDurante" placeholder="Nombre del archivo"><br>
        
        <label>Observaciones Durante:</label>
        <textarea id="observDurante"></textarea><br>
        
        <h2>Registro Después</h2>
        <label>Nivel de Llenado Final:</label>
        <input type="number" step="0.1" id="llenadoFinal" required><br>
        
        <label>Fotografía Final:</label>
        <input type="text" id="fotoDespues" placeholder="Nombre del archivo"><br>
        
        <label>Observaciones Finales:</label>
        <textarea id="observDespues"></textarea><br>
        
            <button id="registro${ciclo.id}" type="submit" class="rounded-md bg-indigo-600 text-center w-full px-12 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Enviar 
            </button>`;

                            mainModal.appendChild(formulario);

                            const botonFormulario = document.querySelector(`#registro${ciclo.id}`);
                            botonFormulario.addEventListener('click', async () => {
                                botonFormulario.remove()
                                modal.classList.add("hidden");

                                // crear registro
                                const registro = await AnadirApisRegistro(ciclo.id, compostId, user);
                                console.log("registro recibido:", registro);

                                if (registro) {

                                    // (FALTA CAMBIAR LA LOGICA PARA QUE SEA  CON DATOS DE FORMULARIO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!)
                                    // /////////////////////////////////////////////////////////////////////////////////////////////
                                    // /////////////////////////////////////////////////////////////////////////////////////////////

                                    // crear registro antes

                                    const formulario = {
                                        registroAntes: {
                                            temperaturaAmbiente: parseFloat(document.getElementById('tempAmb').value),
                                            temperaturaCompostera: parseFloat(document.getElementById('tempCompost').value),
                                            humedad: document.getElementById('humedad').value,
                                            olor: document.getElementById('olor').value,
                                            presenciaInsectos: document.getElementById('insectos').checked,
                                            fotografiasIniciales: document.getElementById('fotoAntes').value || "fotoAntes.jpg",
                                            observacionesIniciales: document.getElementById('observAntes').value || "Sin observaciones.",
                                            llenadoInicial: parseFloat(document.getElementById('llenadoInicial').value)
                                        },
                                        registroDurante: {
                                            riego: document.getElementById('riego').checked,
                                            revolver: document.getElementById('revolver').checked,
                                            litrosVerde: parseInt(document.getElementById('litroVerde').value, 10),
                                            tipoAporteVerde: document.getElementById('tipoVerde').value,
                                            aporteSeco: parseInt(document.getElementById('aporteSeco').value, 10),
                                            tipoAporteSeco: document.getElementById('tipoSeco').value,
                                            fotografiasDurante: document.getElementById('fotoDurante').value || "fotoDurante.jpg",
                                            observacionesDurante: document.getElementById('observDurante').value || "Sin observaciones."
                                        },
                                        registroDespues: {
                                            nivelLlenadoFinal: parseFloat(document.getElementById('llenadoFinal').value),
                                            fotografiasFinal: document.getElementById('fotoDespues').value || "fotoDespues.jpg",
                                            observacionesFinal: document.getElementById('observDespues').value || "Sin observaciones."
                                        }
                                    };

                                    const registroAntes = await AnadirApisRegistroAntes(
                                        registro.id,
                                        formulario.registroAntes.temperaturaAmbiente,
                                        formulario.registroAntes.temperaturaCompostera,
                                        formulario.registroAntes.humedad,
                                        formulario.registroAntes.olor,
                                        formulario.registroAntes.presenciaInsectos,
                                        formulario.registroAntes.fotografiasIniciales,
                                        formulario.registroAntes.observacionesIniciales,
                                        formulario.registroAntes.llenadoInicial
                                    );
                                    const registroDurante = await AnadirApisRegistroDurante(
                                        registro.id,
                                        formulario.registroDurante.riego,
                                        formulario.registroDurante.revolver,
                                        formulario.registroDurante.litrosVerde,
                                        formulario.registroDurante.tipoAporteVerde,
                                        formulario.registroDurante.aporteSeco,
                                        formulario.registroDurante.tipoAporteSeco,
                                        formulario.registroDurante.fotografiasDurante,
                                        formulario.registroDurante.observacionesDurante
                                    );
                                    const registroDespues = await AnadirApisRegistroDespues(
                                        registro.id,
                                        formulario.registroDespues.nivelLlenadoFinal,
                                        formulario.registroDespues.fotografiasFinal,
                                        formulario.registroDespues.observacionesFinal
                                    );

                                    console.log(
                                        "Registro antes:", registroAntes,
                                        "Registro Durante:", registroDurante,
                                        "Registro despues:", registroDespues
                                    );
                                    // /////////////////////////////////////////////////////////////////////////////////////////////
                                    // /////////////////////////////////////////////////////////////////////////////////////////////
                                    // (FIN FALTA CAMBIAR LA LOGICA PARA QUE SEA  CON DATOS DE FORMULARIO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!)

                                } else {

                                    console.log("No existen Registro")
                                }
                            });
                        });
                    });
                });
            }
        }
        else if (compostId.id === 2) {

        } else if (compostId.id === 3) { }

    });
}