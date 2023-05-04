<?php

namespace App\Models\EDP;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class NotaPerbaikanCartridge extends Authenticatable
{
    protected $connection = 'ConnEDP';
    protected $table = 'NotaPerbaikanCartridge';
    protected $fillable = ['NoNota','Tanggal'];
    public $timestamps = false;
}
