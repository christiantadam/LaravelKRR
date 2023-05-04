<?php

namespace App\Models\EDP;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Jurnal extends Authenticatable
{
    protected $connection = 'ConnEDP';
    protected $table = 'Jurnal_Personil';
    protected $primaryKey = 'IdJurnal';
    protected $fillable = ['Id_PersonilJurnal','Tgl_Lapor','Tgl_Selesai','Pelapor','Pelaksana','DetailPermasalahan','Solusi','Id_Kelompok','Id_Kategori'];
    public $timestamps = false;
}
