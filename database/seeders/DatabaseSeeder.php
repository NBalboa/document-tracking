<?php

namespace Database\Seeders;

use App\Http\Enum\Role;
use App\Models\Department;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $department = Department::create([
            'name' => "Admin"
        ]);

        User::create([
            "department_id" => $department->id,
            "first_name" => "Test",
            "last_name" => "Admin",
            "email" => "test@gmail.com",
            "phone" => "09123456789",
            "password" => Hash::make('password'),
            'role' => Role::ADMIN->value,
            'remember_token' => Str::random(10),
        ]);
    }
}
