<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Categorie;
use App\Models\Question;

class QuizSeeder extends Seeder
{
    public function run()
    {
        $questions = json_decode(file_get_contents(database_path('data/questions.json')), true, 512, JSON_THROW_ON_ERROR);
        foreach ($questions as $question) {
            Categorie::firstOrCreate(['categorie' => $question['categorie']]);
            Question::updateOrCreate(
                ['categorie' => $question['categorie'], 'question' => $question['question']],
                $question
            );
        }
    }
}
