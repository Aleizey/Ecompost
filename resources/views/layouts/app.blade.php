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
    @vite(['resources/css/app.css', 'resources/css/principal.css',  'resources/js/web.js', 'resources/js/app.js' ])
</head>

<body class="h-screen flex bg-[#A8D5BA]">
    <!-- Aside -->
    <nav class="w-[344px] flex-shrink-0 max-lg:!hidden bg-[#438b35] flex flex-col items-center justify-between p-4 text-[#4F4F4F]">
        @include('layouts.navigation')
    </nav>

    <!-- Page Content -->
    <div class="w-full flex flex-col overflow-hidden bg-[#FFFFFF] ml-auto x-content-app">
        {{ $slot }}
    </div>

</body>

</html>