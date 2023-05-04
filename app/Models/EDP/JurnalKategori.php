<?php

namespace App\Models\EDP;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class JurnalKategori extends Authenticatable
{
    protected $connection = 'ConnEDP';
    protected $table = 'Jurnal_Kategori';
    protected $primaryKey = 'IdKategori';
    protected $fillable = ['Kategori'];
    public $timestamps = false;
}
