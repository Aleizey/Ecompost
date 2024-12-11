<x-app-layout>

    @if (session('token'))
        <script>
            sessionStorage.setItem('apiToken', @json(session('token')))
            const user = @json(Auth::user()->id ?? null);
            localStorage.setItem('user', JSON.stringify(user));
        </script>
    @endif

    <script src="https://cdn.jsdelivr.net/npm/qrious"></script>
</x-app-layout>