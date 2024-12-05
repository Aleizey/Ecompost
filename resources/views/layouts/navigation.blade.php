<!-- Icono superior -->
<div class="mb-4 w-full flex justify-center">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white"
        class="h-10 w-10">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
    </svg>
</div>

<!-- Enlaces de navegación -->
<div class="flex flex-col gap-6 mb-auto efect-aside text-white w-full px-6 mt-10">


    <a href="#bolos" class="text-lg font-semibold">
        BOLO
    </a>

    <a href="#composteras" class="text-lg font-semibold">
        COMPOSTERA
    </a>

    <a href="#registros" class="text-lg font-semibold">
        REGISTRO
    </a>

    <a href="#informacion" class="text-lg font-semibold">
        INFORMACIÓN
    </a>


    @if(Auth::check() && Auth::user()->admin)

        <a href="/users" class="text-lg font-semibold py-2 px-4">
            Administracion
        </a>
    @endif


</div>

<!-- Imagen del usuario -->
<div class="w-full flex flex-col justify-center items-center">
    <div class="user-content image-container w-full mb-5">
        <a href="{{ route('profile.edit') }}">
            <img class="h-24 w-24 rounded-full hover:shadow-lg hover:shadow-green-400"
                src="https://i.pinimg.com/736x/88/47/aa/8847aab6964bbc54057ee4c5462e0d55.jpg" alt="usuario-img">
        </a>
        <div class="hidden">
            <p>{{ Auth::user()->name }}</p>
        </div>

    </div>

    <div class="w-full flex justify-center mb-5">

        <form method="POST" action="{{ route('logout') }}">
            @csrf
            <a href="{{ route('logout') }}" onclick="event.preventDefault(); this.closest('form').submit();"
                class="logout rounded-md p-3 px-12 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ">
                {{ __('Log Out') }}
            </a>

        </form>
    </div>

    <script>
        const nameimg = document.querySelector('.user-content');
        console.log(nameimg)


        nameimg.addEventListener("mouseover", () => {

            const nameLog = document.querySelector('.image-container > div');

            nameLog.classList.remove("hidden");
            nameLog.classList.add("flex");
        })

        nameimg.addEventListener("mouseleave", () => {

            const nameLog = document.querySelector('.image-container > div');

            nameLog.classList.remove("flex");
            nameLog.classList.add("hidden");
        })

    </script>
</div>