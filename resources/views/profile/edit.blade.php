<x-app-layout>
    <div class="h-screen flex flex-col">
        <!-- Header -->
        <header class="h-[10vh] w-full flex items-center p-2 text-black">
            <!-- Imagen a la izquierda -->
            <div class="ml-8 flex items-center justify-center h-16 w-16">
                <img class="h-full w-full object-contain rounded-full"
                    src="https://cdn.discordapp.com/attachments/1309702840175825049/1311400562150998046/logo.png?ex=674ab2b2&is=67496132&hm=33961d1eee5dcdfe20fef7709e77dab68619a4a95d58777e3cd2c4f65ed27781&"
                    alt="web-img">
            </div>

            <!-- Nombre del usuario centrado -->
            <div class="flex-grow text-center">
                <p class="text-sm text-[#4F4F4F] font-medium">Hola, {{ auth()->user()->name }}!</p>
            </div>

            <!-- Nombre de la web a la derecha -->
            <div class="mr-8">
                <h1 class="text-lg font-bold">Ecompost</h1>
            </div>
        </header>

        <!-- Main -->
        <main class="flex-grow flex flex-col overflow-auto mt-5 lg:justify-center">
            <div class="w-full px-4 sm:px-6 lg:px-8 flex flex-wrap gap-6 justify-center">
                <!-- Primer formulario -->
                <div class="p-4 sm:p-8 shadow sm:rounded-lg w-full lg:w-[45%]">
                    <div class="max-w-full bg-white">
                        @include('profile.partials.update-profile-information-form')
                    </div>
                </div>

                <!-- Segundo formulario -->
                <div class="p-4 sm:p-8 shadow sm:rounded-lg w-full lg:w-[45%]">
                    <div class="max-w-full bg-white">
                        @include('profile.partials.update-password-form')
                    </div>
                </div>
            </div>

            <!-- DONDE SE SUPONE QUE VAN LAS IMG
            <div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                <div class="max-w-xl">
                    @include('profile.partials.update-profile-image-form')
                </div>
            </div> 
            -->

        </main>



        <!-- Footer -->
        <footer class="h-[10vh] w-full text-center p-2 text-black">
            <p class="text-sm">nuestra información</p>
        </footer>
    </div>
</x-app-layout>