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
    @vite(['resources/css/app.css' , 'resources/css/test.css', 'resources/js/app.js', 'resources/js/login.js'])

</head>

<body class="bg-white flex flex-wrap justify-center content-center h-screen">
    <div class="grid grid-cols-2 gap-2 w-full h-full">
        <div class="login-img "></div>
        <div class="pad-media flex flex-wrap justify-center content-center p-12">
            <div class="flex flex-wrap justify-center content-center p-5 w-full h-full">

                <div>
                    <a href="/">
                        <x-application-logo />
                    </a>
                </div>

                {{ $slot }}


            </div>
        </div>
    </div>
</body>

</html>