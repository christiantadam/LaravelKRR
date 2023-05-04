<?php

namespace App\Models\EDP;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class PerbaikanCartridge extends Authenticatable
{
    protected $connection = 'ConnEDP';
    protected $table = 'PerbaikanCartridge';
    protected $fillable = ['IdCartridge','IdPerbaikan','IdNotaCartridge','IdKodeBarang'];
    public $timestamps = false;
}
