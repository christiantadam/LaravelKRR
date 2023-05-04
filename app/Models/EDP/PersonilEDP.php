<?php

namespace App\Models\EDP;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class PersonilEDP extends Authenticatable
{
    protected $connection = 'ConnEDP';
    protected $table = 'Personil_EDP';
    //protected $fillable = ['User','Type'];
    public $timestamps = false;
}
