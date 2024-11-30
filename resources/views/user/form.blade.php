<div class="space-y-6">

    <div>
        <x-input-label for="name" :value="__('Name')" />
        <x-text-input id="name" name="name" type="text" class="mt-1 block w-full" :value="old('name', $user?->name)"
            autocomplete="name" placeholder="Name" />
        <x-input-error class="mt-2" :messages="$errors->get('name')" />
    </div>
    <div>
        <x-input-label for="email" :value="__('Email')" />
        <x-text-input id="email" name="email" type="text" class="mt-1 block w-full" :value="old('email', $user?->email)"
            autocomplete="email" placeholder="Email" />
        <x-input-error class="mt-2" :messages="$errors->get('email')" />
    </div>

    <div>
        <x-input-label for="centro_id" :value="__('Centro')" />
        <select id="centro_id" name="centro_id"
            class="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-500 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm ">
            <option value="" class="" selected disabled>Centros...</option>
            @foreach($centros as $centro)
                <option value="{{ $centro->id }}" {{ old('centro_id', $user?->centro_id) == $centro->id ? 'selected' : '' }}>
                    {{ $centro->nombre }}
                </option>
            @endforeach
        </select>
        <x-input-error class="mt-2" :messages="$errors->get('centro_id')" />
    </div>
    <div>
        <x-input-label for="admin" :value="__('Admin')" />
        <x-text-input id="admin" name="admin" type="text" class="mt-1 block w-full" :value="old('admin', $user?->admin)"
            autocomplete="admin" placeholder="Admin" />
        <x-input-error class="mt-2" :messages="$errors->get('admin')" />
    </div>
    <x-input-error class="mt-2" :messages="$errors->get('admin')" />

    <div class="flex items-center gap-4">
        <x-primary-button>Submit</x-primary-button>
    </div>

</div>