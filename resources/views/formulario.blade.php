<x-app-layout>
    <!-- Main Content -->
    <div class="h-screen  flex flex-col bg-[#FFFFFF]">
        <!-- Header -->
        <header class="h-[10vh] w-full flex items-center p-2 bg-white text-black">
            <!-- Imagen a la izquierda -->
            <div class="ml-8 flex items-center justify-center h-16 w-16">
                <img class="h-full w-full object-contain rounded-full"
                    src="https://cdn.discordapp.com/attachments/1309702840175825049/1311400562150998046/logo.png?ex=674ab2b2&is=67496132&hm=33961d1eee5dcdfe20fef7709e77dab68619a4a95d58777e3cd2c4f65ed27781&"
                    alt="web-img">
            </div>
            <!-- Buscador centrado -->
            <div class="flex-grow text-center">
                <form class="flex items-center justify-center max-w-xs mx-auto w-3/4 sm:w-1/2 md:w-1/3">
                    <div class="relative flex items-center w-full">
                        <input type="search" id="default-search"
                            class="w-full p-2 pl-10 text-sm text-[#4F4F4F] border border-[#C2B280] rounded-lg bg-[#FFFFFF] focus:ring-green-500 focus:border-green-500 focus:outline-none"
                            placeholder="Buscar..." required />
                        <button type="submit"
                            class="ml-2 bg-green-600 hover:bg-green-700 focus:ring-4  focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-white focus:outline-none">
                            Buscar
                        </button>
                    </div>
                </form>
            </div>

            <!-- Nombre de la web a la derecha -->
            <div class="mr-8">
                <h1 class="text-lg font-bold">Formulario </h1>
            </div>
        </header>



        <!-- Main -->
        <main class="flex-grow flex flex-col text-[#4F4F4F] bg-[#FFFFFF] formulario mt-5">
            <!-- <h2 class="text-2xl">hola usuario</h2> -->
            <div class="w-full px-4 sm:px-6 lg:px-8 flex flex-wrap gap-6 justify-center">

                <div class="p-4 sm:p-8 sm:rounded-lg w-full">
                    <form class="w-full" action="">

                        <div class="w-full justify-between flex flex-row">
                            <!-- formulario antes  -->
                            <div class="bg-white p-12 rounded-lg space-y-12">
                                <div class="mb-10 relative flex gap-x-3 justify-center">
                                    <p class="text-2xl font-semibold text-gray-900">Registro Antes de</p>
                                </div>
                                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div class="sm:col-span-3">
                                        <label for="first-name"
                                            class="block text-sm/6 font-medium text-gray-900">Temperatura
                                            Ambiental (ºC)</label>
                                        <div class="mt-2">
                                            <input type="number" name="first-name" id="first-name"
                                                autocomplete="given-name"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6">
                                        </div>
                                    </div>

                                    <div class="sm:col-span-3">
                                        <label for="last-name"
                                            class="block text-sm/6 font-medium text-gray-900">Temperatura
                                            Compostera (ºC)</label>
                                        <div class="mt-2">
                                            <input type="number" name="last-name" id="last-name"
                                                autocomplete="family-name"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6">
                                        </div>
                                    </div>

                                    <div class="col-span-full">
                                        <label for="last-name" class="block text-sm/6 font-medium text-gray-900">Llenado
                                            Inicial
                                            (%)</label>
                                        <div class="mt-2">
                                            <input type="number" name="last-name" id="last-name"
                                                autocomplete="family-name"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6">
                                        </div>
                                    </div>

                                    <div class="sm:col-span-3">
                                        <label for="country"
                                            class="block text-sm/6 font-medium text-gray-900">Olor</label>
                                        <div class="mt-2">
                                            <select id="country" name="country" autocomplete="country-name"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6">
                                                <option>...</option>
                                                <option>Podrido</option>
                                                <option>Sin olor malo</option>
                                                <option>Aromatico</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="sm:col-span-3">
                                        <label for="country"
                                            class="block text-sm/6 font-medium text-gray-900">Humedad</label>
                                        <div class="mt-2">
                                            <select id="country" name="country" autocomplete="country-name"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6">
                                                <option>...</option>
                                                <option>Exceso</option>
                                                <option>Buena</option>
                                                <option>Defecto</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="col-span-full">
                                        <label for="about"
                                            class="block text-sm/6 font-medium text-gray-900">Observación</label>
                                        <div class="mt-2">
                                            <textarea id="about" name="about" rows="3"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"></textarea>
                                        </div>
                                        <p class="mt-3 text-sm/6 text-gray-600">Escribe una corta observación de lo
                                            realizado.
                                        </p>
                                    </div>

                                    <div class="col-span-full gap-2">
                                        <div class=" mini-text relative flex gap-x-3">
                                            <div class="flex h-6 items-center">
                                                <input id="comments" name="comments" type="checkbox"
                                                    class="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
                                            </div>
                                            <div class="">
                                                <label for="comments"
                                                    class="block text-sm/6 font-medium text-gray-900">Presencia de
                                                    insectos
                                                    (Si
                                                    / No)</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-span-full">
                                        <label for="cover-photo"
                                            class="block text-sm/6 font-medium text-gray-900">Fotografia
                                            Adjunta</label>
                                        <div
                                            class="mt-2 flex justify-center rounded-lg border bg-white border-dashed border-gray-600 px-6 py-10">
                                            <div class="text-center">
                                                <svg class="mx-auto size-0 text-gray-300" viewBox="0 0 24 24"
                                                    fill="currentColor" aria-hidden="true" data-slot="icon">
                                                    <path fill-rule="evenodd"
                                                        d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                                <div class="mt-4 flex text-sm/6 text-gray-600">
                                                    <label for="file-upload"
                                                        class="relative cursor-pointer rounded-md bg-blue-200 px-2 font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                                        <span>Upload a file</span>
                                                        <input id="file-upload" name="file-upload" type="file"
                                                            class="sr-only">
                                                    </label>
                                                    <p class="pl-1">or drag and drop</p>
                                                </div>
                                                <p class="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- formulario durante  -->
                            <div class="bg-white p-12 rounded-lg space-y-12">
                                <div class="mb-10 relative flex gap-x-3 justify-center">
                                    <p class="text-2xl font-semibold text-gray-900">Registro Durante de</p>
                                </div>
                                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div class="sm:col-span-3">
                                        <label for="first-name"
                                            class="block text-sm/6 font-medium text-gray-900">Aporte Verde (Kg)</label>
                                        <div class="mt-2">
                                            <input type="number" name="first-name" id="first-name"
                                                autocomplete="given-name"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6">
                                        </div>
                                    </div>

                                    <div class="sm:col-span-3">
                                        <label for="last-name"
                                            class="block text-sm/6 font-medium text-gray-900">Aporte seco(Kg)</label>
                                        <div class="mt-2">
                                            <input type="number" name="last-name" id="last-name"
                                                autocomplete="family-name"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6">
                                        </div>
                                    </div>

                                    <div class="col-span-full">
                                        <label for="about"
                                            class="block text-sm/6 font-medium text-gray-900">Tipo Verde</label>
                                        <div class="mt-2">
                                            <textarea id="about" name="about" rows="3"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"></textarea>
                                        </div>
                                        <p class="mt-3 text-sm/6 text-gray-600">Escribe una corta observación de lo
                                            realizado.
                                        </p>
                                    </div>

                                    <div class="col-span-full">
                                        <label for="about"
                                            class="block text-sm/6 font-medium text-gray-900">Tipo Seco</label>
                                        <div class="mt-2">
                                            <textarea id="about" name="about" rows="3"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"></textarea>
                                        </div>
                                        <p class="mt-3 text-sm/6 text-gray-600">Escribe una corta observación de lo
                                            realizado.
                                        </p>
                                    </div>
                                    

                                    <div class="col-span-full">
                                        <label for="about"
                                            class="block text-sm/6 font-medium text-gray-900">Observación</label>
                                        <div class="mt-2">
                                            <textarea id="about" name="about" rows="3"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"></textarea>
                                        </div>
                                        <p class="mt-3 text-sm/6 text-gray-600">Escribe una corta observación de lo
                                            realizado.
                                        </p>
                                    </div>

                                    <div class="col-span-full gap-2">
                                        <div class=" mini-text relative flex gap-x-3">
                                            <div class="flex h-6 items-center">
                                                <input id="comments" name="comments" type="checkbox"
                                                    class="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
                                            </div>
                                            <div class="">
                                                <label for="comments"
                                                    class="block text-sm/6 font-medium text-gray-900">riego
                                                    (Si
                                                    / No)</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-span-full gap-2">
                                        <div class=" mini-text relative flex gap-x-3">
                                            <div class="flex h-6 items-center">
                                                <input id="comments" name="comments" type="checkbox"
                                                    class="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
                                            </div>
                                            <div class="">
                                                <label for="comments"
                                                    class="block text-sm/6 font-medium text-gray-900">revoelto
                                                    (Si
                                                    / No)</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-span-full">
                                        <label for="cover-photo"
                                            class="block text-sm/6 font-medium text-gray-900">Fotografia
                                            Adjunta</label>
                                        <div
                                            class="mt-2 flex justify-center rounded-lg border bg-white border-dashed border-gray-600 px-6 py-10">
                                            <div class="text-center">
                                                <svg class="mx-auto size-0 text-gray-300" viewBox="0 0 24 24"
                                                    fill="currentColor" aria-hidden="true" data-slot="icon">
                                                    <path fill-rule="evenodd"
                                                        d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                                <div class="mt-4 flex text-sm/6 text-gray-600">
                                                    <label for="file-upload"
                                                        class="relative cursor-pointer rounded-md bg-blue-200 px-2 font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                                        <span>Upload a file</span>
                                                        <input id="file-upload" name="file-upload" type="file"
                                                            class="sr-only">
                                                    </label>
                                                    <p class="pl-1">or drag and drop</p>
                                                </div>
                                                <p class="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- formulario durante  -->
                            <div class="bg-white p-12 rounded-lg space-y-12">
                                <div class="mb-10 relative flex gap-x-3 justify-center">
                                    <p class="text-2xl font-semibold text-gray-900">Registro Despues de</p>
                                </div>
                                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div class="sm:col-span-3">
                                        <label for="first-name"
                                            class="block text-sm/6 font-medium text-gray-900">Nivel Llenado Final(%)</label>
                                        <div class="mt-2">
                                            <input type="number" name="first-name" id="first-name"
                                                autocomplete="given-name"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6">
                                        </div>
                                    </div>

                                    <div class="col-span-full">
                                        <label for="about"
                                            class="block text-sm/6 font-medium text-gray-900">Observación</label>
                                        <div class="mt-2">
                                            <textarea id="about" name="about" rows="3"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"></textarea>
                                        </div>
                                        <p class="mt-3 text-sm/6 text-gray-600">Escribe una corta observación de lo
                                            realizado.
                                        </p>
                                    </div>

                                    <div class="col-span-full">
                                        <label for="cover-photo"
                                            class="block text-sm/6 font-medium text-gray-900">Fotografia
                                            Adjunta</label>
                                        <div
                                            class="mt-2 flex justify-center rounded-lg border bg-white border-dashed border-gray-600 px-6 py-10">
                                            <div class="text-center">
                                                <svg class="mx-auto size-0 text-gray-300" viewBox="0 0 24 24"
                                                    fill="currentColor" aria-hidden="true" data-slot="icon">
                                                    <path fill-rule="evenodd"
                                                        d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                                <div class="mt-4 flex text-sm/6 text-gray-600">
                                                    <label for="file-upload"
                                                        class="relative cursor-pointer rounded-md bg-blue-200 px-2 font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                                        <span>Upload a file</span>
                                                        <input id="file-upload" name="file-upload" type="file"
                                                            class="sr-only">
                                                    </label>
                                                    <p class="pl-1">or drag and drop</p>
                                                </div>
                                                <p class="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mt-6 flex justify-center col-span-full gap-x-6">
                            <button type="submit"
                                class="rounded-md w-full bg-indigo-600 px-72 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Siguente</button>
                        </div>
                    </form>
                </div>
            </div>
        </main>

        <!-- Footer -->
        <footer class="h-[10vh] w-full text-center p-2 bg-[#FFFFFF] text-white">
            <p class="text-sm">nuestra información</p>
        </footer>
    </div>
</x-app-layout>