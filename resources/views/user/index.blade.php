<x-app-layout>
    <!-- Main Content -->
    <div class="h-full w-full  flex flex-col">

        <!-- Main -->
        <main class="flex-grow h-screen flex flex-col overflow-auto lg:justify-center"
            style="height: calc(80vh - 60px);">

            <div class="py-12 h-full">
                <div class="max-w-full h-full mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div class="p-4 sm:p-8 text-[#352c07] bg-white h-full shadow sm:rounded-lg">
                        <div class="w-full">
                            <div class="sm:flex sm:items-center">
                                <div class="sm:flex-auto">
                                    <h1 class="text-base font-semibold leading-6 text-[#352c07]">Administración de {{ __('Users') }}</h1>
                                </div>
                                <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                                    <a type="button" href="{{ route('users.create') }}" class="block rounded-md bg-green-900 px-12 py-2 text-center text-sm font-semibold text-white shadow hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Add new</a>
                                </div>
                            </div>

                            <div class="flow-root">
                                <div class="mt-8 overflow-x-auto">
                                    <div class="inline-block min-w-full py-2 align-middle">
                                        <table class="w-full divide-y text-start divide-gray-300">
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
                                                    <td class="whitespace-nowrap px-3 py-4 text-sm ttext-[#352c07] bg-white">{{ $user->admin ? "Admin" : "Usuario"}}</td>
                                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-[#352c07] bg-white">{{ $user->centro_id }}</td>

                                                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-[#352c07] bg-white">
                                                        <form action="{{ route('users.destroy', $user->id) }}" method="POST">
                                                            <a href="{{ route('users.show', $user->id) }}" class="text-gray-700 bg-gray-300 px-7 rounded-full p-2 font-bold hover:text-black hover:bg-slate-400 mr-2 ">{{ __('Show') }}</a>
                                                            <a href="{{ route('users.edit', $user->id) }}" class="text-indigo-700 bg-indigo-300 p-2 px-7 rounded-full font-bold hover:text-indigo-600  mr-2">{{ __('Edit') }}</a>
                                                            @csrf
                                                            @method('DELETE')
                                                            <a href="{{ route('users.destroy', $user->id) }}" class="text-red-800 bg-red-400 p-2 px-7 rounded-full font-bold hover:text-red-600" onclick="event.preventDefault(); confirm('Are you sure to delete?') ? this.closest('form').submit() : false;">{{ __('Delete') }}</a>
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

    </div>
</x-app-layout>