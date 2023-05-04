<?php

namespace App\Models\EDP;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Cartridge extends Authenticatable
{
    protected $connection = 'ConnEDP';
    protected $table = 'ListCartridge';
    protected $fillable = ['User','Type'];
    public $timestamps = false;
}
