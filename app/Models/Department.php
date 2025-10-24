<?php

namespace App\Models;

use App\Http\Enum\IsDeleted;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    protected $fillable = [
        'name',
        'is_deleted'
    ];


    public function users() {
        return $this->belongsToMany(User::class);
    }

    public function scopeIsNotDeleted($query) {
        return $query->where('is_deleted', IsDeleted::NO->value);
    }
}
