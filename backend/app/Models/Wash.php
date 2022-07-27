<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wash extends Model
{
    use HasFactory;

    protected $fillable = [ 'cost', 'user_id', 'program_id', 'length', 'program_name', 'payment_provider' ];
}
