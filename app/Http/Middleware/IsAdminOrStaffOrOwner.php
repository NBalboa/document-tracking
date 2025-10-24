<?php

namespace App\Http\Middleware;

use App\Http\Enum\Role;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class IsAdminOrStaffOrOwner
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        $id = $request->route("id");
        if(Auth::check() &&
        (Auth::user()->role === Role::ADMIN->value ||
        Auth::user()->role === Role::STAFF->value ||
        $id == Auth::user()->id)
        ) {
            return $next($request);
        }

        return back()->with("error","Invalid Request");
    }
}
