<?php

namespace App\Models;

use App\Http\Enum\IsDeleted;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{

    //

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        "id",
        "user_id",
        "document_type_id",
        "name",
        "description",
        "is_deleted",
        "others"
    ];

    public function documentType() {
        return $this->belongsTo(DocumentType::class, "document_type_id")->without("document");
    }

    public function user() {
        return $this->belongsTo(User::class,"user_id");
    }

    public function tracks() {
        return $this->hasMany(Track::class,"document_id","id")->without('document');
    }

    public function latestTrack(){
        return $this->hasOne(Track::class)->latestOfMany()->without('document');;
    }

    public function scopeIsNotDeleted($query) {
        return $query->where('is_deleted', IsDeleted::NO->value);
    }
}
