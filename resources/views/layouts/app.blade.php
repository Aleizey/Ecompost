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
    @vite(['resources/css/app.css', 'resources/css/principal.css', 'resources/js/web.js', 'resources/js/app.js'])
</head>

<body class="h-screen flex bg-[#e2e8f0]">

    <!-- Aside -->
    <nav
        class="w-[344px] flex-shrink-0 max-lg:!hidden bg-[#438b35] nav-app flex flex-col items-center justify-between p-4 text-[#4F4F4F]">
        @include('layouts.navigation')
    </nav>

    <!-- Page Content -->
    <div class="w-full flex relative flex-col overflow-hidden bg-[#f1f1f1] ml-auto x-content-app">
        <div class="h-screen  flex flex-col">
            <!-- bg-[#e2e8f0] -->
            <!-- Header -->
            <header class="h-[10vh] w-full flex items-center justify-between p-2 text-black bg-white shadow-lg z-20">
                <!-- Imagen a la izquierda -->

                <div class="ml-8 flex items-center justify-center shrink-0 h-16 w-16">

                    <x-application-logo />
                </div>
                <!-- Buscador centrado -->
                <div id="divForm" class="flex-grow text-center form-div max-sm:!hidden">
                    <h1 class="font-bold text-xl">{{ Auth::user()->name}}</h1>
                </div>

                <!-- Nombre de la web a la derecha -->
                <div class="mr-8">
                    <h1 class="text-lg font-bold">Ecompost</h1>
                </div>
            </header>

            <div class="scroll flex-grow flex justify-center items-center text-center text-[#4F4F4F] overflow-y-auto 
            main-container" style="height: calc(80vh - 60px);">

                {{ $slot }}

            </div>

        </div>
    </div>

</body>

</html>