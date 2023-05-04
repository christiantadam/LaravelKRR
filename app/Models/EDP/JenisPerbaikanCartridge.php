<?php

namespace App\Models\EDP;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class JenisPerbaikanCartridge extends Authenticatable
{
    protected $connection = 'ConnEDP';
    protected $table = 'JenisPerbaikanCartridge';
    protected $fillable = ['perbaikan'];
    public $timestamps = false;
}
