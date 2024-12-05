<x-guest-layout>
    <!-- Session Status -->
    <x-auth-session-status class="mb-4" :status="session('status')" />

    <form method="POST" class="w-full" action="{{ route('login') }}">
        @csrf

        <div class="mb-10 relative flex gap-x-3 justify-center">
            <p class="text-lg text-gray-900">BIENVENIDO USUARIO </p>
        </div>

        <!-- Email Address -->
        <div class="col-span-full mb-8">
            <div class="mt-2 relative">
                <input id="email" type="email" name="email" :value="old('email')" required autofocus
                    autocomplete="username"
                    class="block w-full border-0 py-1.5 text-gray-900 text-lg border-b-2 border-gray-300 placeholder:text-gray-400 focus:border-gray-800">
                <x-input-error :messages="$errors->get('email')" class="mt-2" />
                <label for="email" :value="__('Email')"
                    class="absolute label-email left-0 top-0 text-lg text-gray-400 transition-all duration-200 transform translate-y-2.5 peer-placeholder-shown:translate-y-6 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-500">
                    EMAIL
                </label>
            </div>
        </div>

        <!-- Password -->

        <div class="col-span-full mb-3">
            <div class="mt-2 relative">
                <input type="password" name="password" id="password" required autocomplete="password"
                    class="block w-full text-lg border-0 py-1.5 text-gray-900 border-b-2 border-gray-300 placeholder-transparent focus:placeholder-gray-400 focus:border-gray-800" />
                <x-input-error :messages="$errors->get('password')" class="mt-2" />
                <label for="password" :value="__('Password')"
                    class="absolute label-password left-0 top-0 text-lg text-gray-400 transition-all duration-200 transform translate-y-2.5 peer-placeholder-shown:translate-y-6 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-500">
                    CONTRASEÑA
                </label>
            </div>
        </div>

        <!-- Remember Me -->
        <div class="grid grid-cols-2 gap">
            <div for="remember_me" class=" mini-text relative flex gap-x-3">
                <div class="flex h-6 items-center">
                    <input id="remember_me" type="checkbox"
                        class="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" name="remember">
                </div>
                <div class="">
                    <label for="comments" class=" text-gray-600">{{ __('Remember me') }}</label>
                </div>
            </div>

            @if (Route::has('password.request'))
                <div class="mini-text relative flex gap-x-3 justify-end">
                    <a class="text-gray-600" href="{{ route('password.request') }}">
                        {{ __('¿Has
                                    olvidado tu contraseña?') }}
                    </a>
                </div>
            @endif
        </div>


        <div class="mt-12 flex items-center justify-center gap-x-6">
            <button type="submit"
                class=" w-full boton-login bg-[#155946] px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{{ __('INICIAR SESIÓN') }}</button>
        </div>

    </form>
</x-guest-layout>