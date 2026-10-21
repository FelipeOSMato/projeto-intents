<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//Usuario

Route::get('/entrar/{email}/{senha}', 'App\Http\Controllers\UsuarioController@entrarApi');
Route::post('/cadastrar-usuario', 'App\Http\Controllers\UsuarioController@cadastrarAPI');
Route::post('/atualizar-foto/{id}', 'App\Http\Controllers\UsuarioController@atualizarImagemAPI');
Route::put('/atualizar-usuario/{id}', 'App\Http\Controllers\UsuarioController@atualizarAPI');

//Contatos

Route::get('/contatos/{usuario_id}', 'App\Http\Controllers\ContatosController@contatosApi');
Route::post('/criar-contato/{idUsuario}', 'App\Http\Controllers\ContatosController@createAPI');
Route::put('/atualizar-contato/{id}', 'App\Http\Controllers\ContatosController@atualizarContatoAPI');
Route::delete('/excluir-contato/{id}', 'App\Http\Controllers\ContatosController@deletarAPI');
