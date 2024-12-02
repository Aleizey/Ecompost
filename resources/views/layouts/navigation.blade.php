<!-- Icono superior -->
<div class="mb-4 w-full flex justify-center">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white"
        class="h-10 w-10">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
    </svg>
</div>

<!-- Enlaces de navegación -->
<div class="flex flex-col gap-6 mb-auto text-white w-full px-6 mt-10">

    <a href="#bolos"
        class="text-lg font-semibold py-2 px-4 bg-[#A8D5BA] hover:bg-green-500 hover:text-white rounded-lg transition-colors duration-300">
        Bolo
    </a>

    <a href="#composteras"
        class="text-lg font-semibold py-2 px-4 bg-[#A8D5BA] hover:bg-green-500 hover:text-white rounded-lg transition-colors duration-300">
        Composteras
    </a>

    <a href="#registros"
        class="text-lg font-semibold py-2 px-4 bg-[#A8D5BA] hover:bg-green-500 hover:text-white rounded-lg transition-colors duration-300">
        Registros
    </a>

    <a href="#informacion"
        class="text-lg font-semibold py-2 px-4 bg-[#A8D5BA] hover:bg-green-500 hover:text-white rounded-lg transition-colors duration-300">
        Informacion
    </a>

    @if(Auth::check() && Auth::user()->admin)
    <a href="/users"
        class="text-lg font-semibold py-2 px-4 bg-[#A8D5BA] hover:bg-green-500 hover:text-white rounded-lg transition-colors duration-300">
        Administracion
    </a>
    @endif


</div>

<!-- Imagen del usuario -->
<div class="image-container w-full mb-5">
    <a href="{{ route('profile.edit') }}">
        <img class="h-24 w-24 rounded-full hover:shadow-lg hover:shadow-green-400"
            src="https://i.pinimg.com/control2/474x/99/06/ac/9906ac83676244eb8260e62a902b4d98.jpg" alt="usuario-img">
    </a>

</div>

<div class="w-full flex justify-center mb-5">
    <form method="POST" action="{{ route('logout') }}">
        @csrf
        <a href="{{ route('logout') }}" onclick="event.preventDefault(); this.closest('form').submit();"
            class="rounded-md bg-red-500 p-3 px-12 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-800">
            {{ __('Log Out') }}
        </a>

    </form>
</div>