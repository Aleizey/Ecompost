<section class="bg-white shadow  sm:rounded-lg p-6">
    <!-- Encabezado -->
    <header class="mb-6 text-left">
        <h2 class="text-xl font-semibold text-[#352c07]">
            {{ __('Profile Information') }}
        </h2>
        <p class="mt-2 text-sm text-[#352c07]">
            {{ __("Update your account's profile information and email address.") }}
        </p>
    </header>

    <!-- Formulario de verificación (invisible) -->
    <form id="send-verification" method="post" action="{{ route('verification.send') }}">
        @csrf
    </form>

    <!-- Formulario principal -->
    <form method="post" action="{{ route('profile.update') }}" class="text-[#352c07] space-y-4 text-left">
        @csrf
        @method('patch')

        <!-- Campo: Nombre -->
        <div>
            <x-input-label for="name" :value="__('Name')" class="text-[#352c07]" />
            <x-text-input
                id="name"
                name="name"
                type="text"
                class="mt-1 w-full max-w-md border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-[#352c07]"
                :value="old('name', $user->name)"
                required
                autofocus
                autocomplete="name" />
            <x-input-error class="mt-2" :messages="$errors->get('name')" />
        </div>

        <!-- Campo: Email -->
        <div>
            <x-input-label for="email" :value="__('Email')" class="text-[#352c07]" />
            <x-text-input
                id="email"
                name="email"
                type="email"
                class="mt-1 w-full max-w-md border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                :value="old('email', $user->email)"
                required
                autocomplete="username" />
            <x-input-error class="mt-2" :messages="$errors->get('email')" />

            @if ($user instanceof \Illuminate\Contracts\Auth\MustVerifyEmail && ! $user->hasVerifiedEmail())
            <div class="mt-3 text-sm text-[#352c07]">
                <p>
                    {{ __('Your email address is unverified.') }}
                    <button
                        form="send-verification"
                        class="ml-2 underline text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200">
                        {{ __('Click here to re-send the verification email.') }}
                    </button>
                </p>

                @if (session('status') === 'verification-link-sent')
                <p class="mt-2 font-medium text-sm text-green-600 dark:text-green-400">
                    {{ __('A new verification link has been sent to your email address.') }}
                </p>
                @endif
            </div>
            @endif
        </div>

        <!-- Botón Guardar -->
        <div class="flex items-center text-[#352c07] gap-4">
            <x-primary-button class="text-white bg-[#352c07] hover:bg-[#2b2406]">
                {{ __('Save') }}
            </x-primary-button>

            <!-- Mensaje de confirmación -->
            @if (session('status') === 'profile-updated')
            <p
                x-data="{ show: true }"
                x-show="show"
                x-transition
                x-init="setTimeout(() => show = false, 2000)"
                class="text-sm text-green-600 dark:text-green-400">
                {{ __('Saved.') }}
            </p>
            @endif
        </div>
    </form>
</section>