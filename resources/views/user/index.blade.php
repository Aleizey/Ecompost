<x-app-layout>
    <!-- Main Content -->
    <div class="h-screen  flex flex-col">
        <!-- Header -->
        <header class="h-[10vh] w-full flex items-center p-2 text-black">
            <!-- Imagen a la izquierda -->
            <div class="ml-8 flex items-center justify-center h-16 w-16">
                <img class="h-full w-full object-contain rounded-full"
                    src="https://cdn.discordapp.com/attachments/1309702840175825049/1311400562150998046/logo.png?ex=674ab2b2&is=67496132&hm=33961d1eee5dcdfe20fef7709e77dab68619a4a95d58777e3cd2c4f65ed27781&"
                    alt="web-img">
            </div>
            @if (session('token'))
            <p>Token: {{ session('token') }}</p>
            @endif
            <!-- Buscador centrado -->
            <div class="flex-grow text-center">
                <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                    {{ __('Usuarios') }}
                </h2>
            </div>

            <!-- Nombre de la web a la derecha -->
            <div class="mr-8">
                <h1 class="text-lg font-bold">Ecompost</h1>
            </div>
        </header>



        <!-- Main -->
        <main class="flex-grow flex flex-col overflow-auto mt-5 lg:justify-center"
            style="height: calc(80vh - 60px);">

            <div class="py-12">
                <div class="max-w-full mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div class="p-4 sm:p-8 text-[#352c07] bg-white shadow sm:rounded-lg">
                        <div class="w-full">
                            <div class="sm:flex sm:items-center">
                                <div class="sm:flex-auto">
                                    <h1 class="text-base font-semibold leading-6 text-[#352c07]">{{ __('Users') }}</h1>
                                    <p class="mt-2 text-sm text-[#352c07]">A list of all the {{ __('Users') }}.</p>
                                </div>
                                <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                                    <a type="button" href="{{ route('users.create') }}" class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add new</a>
                                </div>
                            </div>

                            <div class="flow-root">
                                <div class="mt-8 overflow-x-auto">
                                    <div class="inline-block min-w-full py-2 align-middle">
                                        <table class="w-full divide-y divide-gray-300">
                                            <thead>
                                                <tr>
                                                    <th scope="col" class="py-3 pl-4 pr-3 text-left text-xs font-semibold uppercase tracking-wide text-[#352c07] bg-white">No</th>

                                                    <th scope="col" class="py-3 pl-4 pr-3 text-left text-xs font-semibold uppercase tracking-wide text-[#352c07] bg-white">Name</th>
                                                    <th scope="col" class="py-3 pl-4 pr-3 text-left text-xs font-semibold uppercase tracking-wide text-[#352c07] bg-white">Email</th>
                                                    <th scope="col" class="py-3 pl-4 pr-3 text-left text-xs font-semibold uppercase tracking-wide text-[#352c07] bg-white">Admin</th>
                                                    <th scope="col" class="py-3 pl-4 pr-3 text-left text-xs font-semibold uppercase tracking-wide text-[#352c07] bg-white">Centro Id</th>

                                                    <th scope="col" class="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#352c07] bg-white"></th>
                                                </tr>
                                            </thead>
                                            <tbody class="divide-y divide-gray-200 text-[#352c07] bg-white">
                                                @foreach ($users as $user)
                                                <tr class="even:bg-gray-50">
                                                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-semibold text-[#352c07] bg-white">{{ ++$i }}</td>

                                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-[#352c07] bg-white">{{ $user->name }}</td>
                                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-[#352c07] bg-white">{{ $user->email }}</td>
                                                    <td class="whitespace-nowrap px-3 py-4 text-sm ttext-[#352c07] bg-white">{{ $user->admin }}</td>
                                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-[#352c07] bg-white">{{ $user->centro_id }}</td>

                                                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-[#352c07] bg-white">
                                                        <form action="{{ route('users.destroy', $user->id) }}" method="POST">
                                                            <a href="{{ route('users.show', $user->id) }}" class="text-gray-500 font-bold hover:text-black mr-2 ">{{ __('Show') }}</a>
                                                            <a href="{{ route('users.edit', $user->id) }}" class="text-indigo-400 font-bold hover:text-indigo-600  mr-2">{{ __('Edit') }}</a>
                                                            @csrf
                                                            @method('DELETE')
                                                            <a href="{{ route('users.destroy', $user->id) }}" class="text-red-500 font-bold hover:text-red-600" onclick="event.preventDefault(); confirm('Are you sure to delete?') ? this.closest('form').submit() : false;">{{ __('Delete') }}</a>
                                                        </form>
                                                    </td>
                                                </tr>
                                                @endforeach
                                            </tbody>
                                        </table>

                                        <div class="mt-4 px-4">
                                            {!! $users->withQueryString()->links() !!}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </main>

        <!-- Footer -->
        <footer class="h-[10vh] w-full text-center p-2 text-black">
            <p class="text-sm">nuestra información</p>
        </footer>
    </div>
</x-app-layout>