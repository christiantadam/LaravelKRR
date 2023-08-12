<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class TestController extends Controller
{
    public function index()
    {
		User::where('NomorUser', '4384')
       ->update(['password' => Hash::make('adam123')]);
	  //return view('home');
	    $test=Hash::make('Kerta1234');

		// if (User::where('kd_user','4335')->where('Password',bcrypt('Kerta1234'))->exists()) {
		// 	$test='benar';
		// }
		// else {
		// 	$test=bcrypt('Kerta1234');
		// }

        return view('home2',compact('test'));
    }
}
