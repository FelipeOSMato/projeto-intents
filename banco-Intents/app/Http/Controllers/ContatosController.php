<?php

namespace App\Http\Controllers;
use App\Models\Contatos;

use Illuminate\Http\Request;

class ContatosController extends Controller
{

    public function contatosApi(string $idUsuario)
    {
        $contatos = Contatos::where('usuario_id', '=', $idUsuario)->get();

        return $contatos;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function createAPI(Request $request, string $idUsuario)
    {
        $contatos = new Contatos();

        $contatos->nome = $request->nome;
        $contatos->numTelefone = $request->telefone;
        $contatos->usuario_id = $idUsuario;

        $contatos->save();

        return response()->json([
            'idContato' => $contatos->id,
            'nomeContato' => $contatos->nome,
            'telefoneContato' => $contatos->numTelefone,
            'idDoUsuario' => $contatos->usuario_id,
        ], 201);
    }


    public function atualizarContatoAPI(Request $request, string $id)
    {
        $validarDados = $request->validate([
            'nome' => 'min:3',
        ]);

        $contatos = Contatos::findOrFail($id);

        $contatos->numTelefone = $request->telefone;

        $contatos->update($validarDados);

        return response()->json($contatos, 201);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function deletarAPI( string $id)
    {
        Contatos::where('id', '=', $id)->delete();

        return response()->json([
            'message' => "Contato excluído",
            'code' => 200
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
