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
    @vite(['resources/css/app.css', 'resources/css/principal.css', 'resources/js/app.js', 'resources/js/crud.js' ])
</head>

<body class="h-screen flex overflow-hidden bg-[#A8D5BA]">
    <!-- Aside -->
    <nav class="w-[15%] bg-[#438b35] flex flex-col items-center p-4 text-[#4F4F4F]">
        @include('layouts.navigation')
    </nav>

    <!-- Page Content -->
    <div class="w-[85%] flex flex-col bg-[#FFFFFF] ml-auto">
        {{ $slot }}
    </div>

</body>

</html>