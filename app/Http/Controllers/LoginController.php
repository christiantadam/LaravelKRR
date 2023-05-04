<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Auth;
use Validator;

class LoginController extends Controller
{
	public function index()
    {
        if(Auth::guest())
        {
            return view('auth.login');
        }
        else
        {
            return redirect('/home');
        }
    }

    public function login(Request $request)
    {
        $rules = [
            'username'      => 'required',
            'password'      => 'required'
        ];

        $messages = [
            'username.required'     => 'Username wajib diisi',
            'password.required'     => 'Password wajib diisi',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if($validator->fails()){
            return redirect()->back()->withErrors($validator)->withInput($request->all);
        }
    //     $user = User::where('kd_user', $request->input('username'))->first();
    //     if(!empty($user))
    //     {
    //     	if(Hash::check($request->input('password'), $user->password)==true)
    //     	{
				// return redirect()->route('home');
    //     	}
    //     	else
    //     	{
    //     		return redirect()->route('login')->withInput()->withErrors(['error' => 'Password Salah!']);
    //     	}
    //     }
    //     else
    //     {
    //     	return redirect()->route('login')->withInput()->withErrors(['error' => 'Username tidak ditemukan!']);
    //     }


        $data = [
            'NomorUser'     => $request->input('username'),
            'password'  => $request->input('password'),
        ];

        Auth::attempt($data);

        if (Auth::check()) {
            return redirect()->route('home');
        } else {
            return redirect()->route('login')->withInput()->withErrors(['error' => 'Username atau Password tidak ditemukan!']);
        }
    }
    public function logout(Request $request) {
  		Auth::logout();
  		return redirect('/login');
	}

}
