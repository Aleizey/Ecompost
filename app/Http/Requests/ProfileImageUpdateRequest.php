<?php
// app/Http/Requests/ProfileImageUpdateRequest.php
namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;
class ProfileImageUpdateRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }
    public function rules()
    {
        return [
            'image' => ['nullable', 'file', 'image', 'max:200'],
        ];
    }
}