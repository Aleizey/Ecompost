<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileImageUpdateRequest;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\View\View;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): View
    {
        return view('profile.edit', [
            'user' => $request->user(),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit')->with('status', 'profile-updated');
    }

    public function updateImage(ProfileImageUpdateRequest $request)
    {
        $user = $request->user();
        // Verifica si se subió una imagen
        if ($request->hasFile('image')) {
            // Elimina la imagen anterior si existe
            if ($user->image) {
                Storage::disk('public')->delete($user->image);
            }
            // Guarda la nueva imagen en el disco 'public' y actualiza el path en el usuario
            $path = $request->file('image')->store('profile-images', 'public');
            $user->image = $path;
            $user->save();
        }
        return redirect()->route('profile.edit')->with('status', 'image-updated');
    }


    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validateWithBag('userDeletion', [
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
