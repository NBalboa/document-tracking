<?php

namespace App\Http\Requests;

use App\Http\Enum\Role;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdatePasswordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check() &&
        (Auth::user()->role === Role::ADMIN->value ||
        Auth::user()->role === Role::STAFF->value);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "password" => ['required', 'string', 'min:8'],
            "confirm_password" => ['required', 'string','min:8', 'same:password']
        ];
    }
}
