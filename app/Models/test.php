<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Test extends Authenticatable
{
    protected $table = 'YTRANSBL';
    protected $fillable = ['Tgl_batal_Acc','Batal_acc','Direktur','Dir_Agree','Tgl_Direktur'];
    public $timestamps = false;
}
