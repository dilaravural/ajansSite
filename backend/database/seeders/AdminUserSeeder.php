<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Admin',
            'email' => 'admin@enkimedia.com',
            'password' => Hash::make('password'), // Change this in production!
            'email_verified_at' => now(),
        ]);
    }
}
