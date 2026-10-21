<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UsuarioController extends Controller
{

    //API

    public function entrarAPI(string $email, string $senha)
    {
        $usuario = Usuario::where('email', '=', $email)->first();

        if (!$usuario || !hash::check($senha, $usuario->senha)) {
            return response()->json([
                'message' => 'Email ou senha incorretos'
            ], 401);
        }

        return response()->json([
            'idUsuario' => $usuario->id,
            'nomeUsuario' => $usuario->nome,
            'emailUsuario' => $usuario->email,
            'fotoUsuario' => $usuario->foto
        ]);
    }

    public function cadastrarAPI(Request $request)
    {
        $usuario = new Usuario();

        $usuario->nome = $request->nome;
        $usuario->email = $request->email;
        $usuario->senha = Hash::make($request->senha);
        $usuario->foto = null;

        $usuario->save();

        return response()->json([
            'idUsuario' => $usuario->id,
            'nomeUsuario' => $usuario->nome,
            'emailUsuario' => $usuario->email,
            'fotoUsuario' => $usuario->foto,
        ], 201);
    }

    public function atualizarAPI(Request $request, string $id)
    {
        $validarDados = $request->validate([
            'nomeUsuario' => 'min:3',
            'emailUsuario' => 'max:200',
        ]);
        $usuario = Usuario::findOrFail($id);

        $usuario->update($validarDados);

        return response()->json($usuario, 201);
    }


    public function atualizarImagemAPI(Request $request, string $id)
    {
        $validarDados = $request->validate([
            'imagem' => [
                'required',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:5048',
            ],
        ]);

        $usuario = Usuario::findOrFail($id);

        $imagemNova = $request->file('imagem')->store(
            'usuario',
            'public'
        );

        if (!$imagemNova) {
            return response()->json([
                'message' => 'Não foi possível salvar a nova imagem.',
            ], 500);
        }

        $imagemAntiga = $usuario->foto;

        try {
            $usuario->update([
                'foto' => $imagemNova,
            ]);
        } catch (\Throwable $e) {
            Storage::disk('public')->delete($imagemNova);

            throw $e;
        }

        if (
            $imagemAntiga &&
            !filter_var($imagemAntiga, FILTER_VALIDATE_URL)
        ) {
            Storage::disk('public')->delete($imagemAntiga);
        }

        return response()->json([
            'message' => 'Imagem atualizada com sucesso!',
            'fotoUsuario' => $usuario->foto,
            'urlImagem' => asset('storage/' . $usuario->foto),
        ], 200);
    }


    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
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
