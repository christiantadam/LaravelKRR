<?php

namespace App\Models\EDP;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class JurnalKelompok extends Authenticatable
{
    protected $connection = 'ConnEDP';
    protected $table = 'Jurnal_Kelompok';
    protected $primaryKey = 'IdKelompok';
    protected $fillable = ['Kelompok'];
    public $timestamps = false;
}
