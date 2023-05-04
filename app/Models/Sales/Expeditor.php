<?php

namespace App\Models\Sales;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Expeditor extends Authenticatable
{
    protected $connection = 'ConnSales';
    protected $table = 'T_Expeditor';
    protected $primaryKey = 'IDExpeditor';
    protected $fillable = [
        'IDExpeditor',
        'NamaExpeditor',
        'ContactPerson',
        'Alamat',
        'Kota',
        'Propinsi',
        'Negara',
        'KodePos',
        'NoTelp1',
        'NoTelp2',
        'NoFax1',
        'NoFax2',
        'NoHp1',
        'NoHp2',
        'NoTelex',
        'Email',
        'IsActive',
    ];
    protected $casts = [
        'IDExpeditor' => 'string',
    ];
    public $timestamps = false;
}
