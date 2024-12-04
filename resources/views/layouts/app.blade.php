<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Scripts -->
    @vite(['resources/css/app.css', 'resources/css/principal.css', 'resources/js/web.js', 'resources/js/app.js' ])
</head>

<body class="h-screen flex bg-[#e2e8f0]">
    <!-- Aside -->
    <nav class="w-[344px] flex-shrink-0 max-lg:!hidden bg-[#438b35] flex flex-col items-center justify-between p-4 text-[#4F4F4F]">
        @include('layouts.navigation')
    </nav>

    <!-- Page Content -->
    <div class="w-full flex relative mt-5 flex-col overflow-hidden bg-[#e2e8f0] ml-auto x-content-app">
        <div class="h-screen  flex flex-col">

            <!-- Header -->
            <header class="h-[10vh] w-full flex items-center p-2 text-black">
                <!-- Imagen a la izquierda -->
                <div class="ml-8 flex items-center justify-center h-16 w-16">
                    <x-application-logo />
                </div>
                <!-- Buscador centrado -->
                <div class="flex-grow text-center form-div">
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

            <div class="flex-grow flex justify-center items-center text-center text-[#4F4F4F] overflow-y-auto 
            main-container"
                style="height: calc(80vh - 60px);">

                {{ $slot }}

            </div>


            <footer class="h-[10vh] w-full text-center p-2  text-white">
                <p class="text-sm">nuestra información</p>
            </footer>
        </div>
    </div>

</body>

</html>