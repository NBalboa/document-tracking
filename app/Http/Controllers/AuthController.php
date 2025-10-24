<?php

namespace App\Http\Controllers;

use App\Http\Enum\IsDeleted;
use App\Http\Enum\Role;
use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function index() {

        return Inertia::render('Auth/Login');
    }

    public function login(LoginRequest $request) {
        $credentials = $request->validated();

        if(Auth::attempt($credentials)){
            /** @var \Illuminate\Http\Request $request */
            $request->session()->regenerate();

           if(Auth::user()->is_deleted === IsDeleted::YES->value){
                Auth::logout();
                return redirect()->route('login')->withErrors([
                    'email' => 'Invalid credentials'
                ]);
           }

           if(Auth::user()->role === Role::ADMIN->value || Auth::user()->role === Role::STAFF->value){
               return redirect()->route('dashboard');
           }

           return redirect()->route('documents');
        }

        return redirect()->route('login')->withErrors([
            'email' => 'Invalid credentials'
        ]);
    }

    public function logout(Request $request) {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerate();

        return redirect('/');
    }
}
