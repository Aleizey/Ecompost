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
            @if (session('token'))
                <script>
                    sessionStorage.setItem('apiToken', @json(session('token')))
                </script>
            @endif
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
                <h1 class="text-lg font-bold">Ecompost</h1>
            </div>
        </header>



        <!-- Main -->
        <main class="flex-grow flex justify-center items-center text-center text-[#4F4F4F] bg-[#FFFFFF] overflow-y-auto"
            style="height: calc(80vh - 60px);">
            <!-- <h2 class="text-2xl">hola usuario</h2> -->

        </main>

        <!-- Footer -->
        <footer class="h-[10vh] w-full text-center p-2 bg-[#FFFFFF] text-white">
            <p class="text-sm">nuestra información</p>
        </footer>
    </div>
</x-app-layout>