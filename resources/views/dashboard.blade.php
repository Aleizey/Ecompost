<x-app-layout>

    @if (session('token'))
        <script>
            sessionStorage.setItem('apiToken', @json(session('token')))
        </script>
    @endif

</x-app-layout>