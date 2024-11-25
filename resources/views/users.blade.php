<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Administracion de Usuarios') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    {{ __("CRUD") }}

                    <div class="container mx-auto p-6">
                        <h1 class="text-2xl font-bold mb-6">Gestión de Usuarios</h1>

                        <!-- Botón para abrir el modal -->
                        <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Nuevo Usuario
                        </button>

                        <!-- Tabla de usuarios -->
                        <div class="mt-6">
                            <table class="min-w-full bg-black border border-gray-200 rounded-lg shadow">
                                <thead class="bg-gray-600">
                                    <tr>
                                        <th class="py-3 px-6 text-left">#</th>
                                        <th class="py-3 px-6 text-left">Nombre</th>
                                        <th class="py-3 px-6 text-left">Email</th>
                                        <th class="py-3 px-6 text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody class="prueba">
                                    <!--  -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</x-app-layout>