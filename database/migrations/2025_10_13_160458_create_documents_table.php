<?php

use App\Http\Enum\IsDeleted;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use function Laravel\Prompts\table;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->string('id')->unique();
            $table->foreignId('user_id');
            $table->foreignId('document_type_id');
            $table->string('name');
            $table->string('description')->nullable();
            $table->string('others')->nullable();
            $table->integer('is_deleted')->default(IsDeleted::NO->value);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
