<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use App\Http\Controllers\HakAksesController;

class CheckProgramAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle($request, Closure $next, $program)
    {
        $result = (new HakAksesController)->HakAksesProgram($program);

        if ($result > 0) {
            return $next($request);
        }

        return Redirect::to('home')->with('status', "Anda Tidak Memiliki Hak Akses Program {$program}!");
    }
}
