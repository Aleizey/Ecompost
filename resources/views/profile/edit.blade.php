<x-app-layout>
    <div class="h-screen w-full flex flex-col">

        <!-- Main -->
        <main class="flex-grow w-full flex flex-col overflow-auto mt-5 lg:justify-center">
            <div class="w-full flex flex-col items-center justify-center ">

                <div class="p-2 sm:rounded-lg w-full lg:w-[50%]">
                    <div class="max-x-full bg-white p-4 rounded-lg shadow text-ellipsis text-gray-900 font-bold text-2xl">
                    <p>Perfil de {{Auth::user()->name}}</p>
                    </div>
                </div>
                <!-- Primer formulario -->
                <div class="p-2 sm:rounded-lg w-full lg:w-[50%]">
                    <div class="max-w-full bg-white">
                        @include('profile.partials.update-profile-information-form')
                    </div>
                </div>

                <!-- Segundo formulario -->
                <div class="p-2 sm:rounded-lg w-full lg:w-[50%]">
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

    </div>
</x-app-layout>