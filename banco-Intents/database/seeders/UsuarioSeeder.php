<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('usuario')->insert([
            [
                'nome' => 'Felipe',
                'foto' => null,
                'email' => 'felipedasilva21@gmail.com', //esse email é ficticio
                'senha' => hash::make('123141'),
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'nome' => 'Vitor Scapamento 2º',
                'foto' => null,
                'email' => 'vitinScapamentin@gmail.com', //esse email é ficticio
                'senha' => hash::make('abc123423'),
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ]
        ]);
    }
}
