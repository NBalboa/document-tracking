<?php

namespace App\Http\Requests;

use App\Http\Enum\Role;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Enum;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::user()->role === Role::ADMIN->value || Auth::user()->role === Role::STAFF->value;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => ['required', 'string'],
            'last_name' => ['required', 'string'],
            'middle_name' => ['nullable', 'string'],
            'email' => ['required', 'string', 'email', 'unique:users,email'],
            'phone' => ['required', 'string', 'regex:/^[0-9]+$/', 'max:11', 'unique:users,phone'],
            'password' => ['required', 'string','min:8'],
            'confirm_password' => ['required', 'string','min:8', 'same:password'],
            'department' => ['required', 'numeric', 'exists:departments,id'],
            'role' => ['required', new Enum(Role::class)],
        ];
    }
}
