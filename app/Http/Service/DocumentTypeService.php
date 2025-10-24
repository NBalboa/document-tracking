<?php


namespace App\Http\Service;

use App\Models\Document;
use App\Models\DocumentType;

class DocumentTypeService {

    public function all() {
        return DocumentType::all();
    }

    public function create(string $name) {
        return DocumentType::firstOrCreate([
            "name" => $name
        ]);
    }
}
