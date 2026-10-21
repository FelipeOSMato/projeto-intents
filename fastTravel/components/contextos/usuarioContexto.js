import React, {createContext, useContext, useState} from "react"

const UsuarioContexto = createContext(null)

export function ProvedorUsuario({ children, usuarioLogado: usuarioInicial}){
    const [usuarioLogado, setUsuarioLogado] = useState (usuarioInicial)

    const atualizarUsuario = (dados)=>{
        setUsuarioLogado((usuarioAtual)=>({
            ...usuarioAtual, ...dados
        }))
    }

    const sairDaConta = ()=> {
        setUsuarioLogado(null)
    }
    return(
        <UsuarioContexto.Provider value={{usuarioLogado, atualizarUsuario, sairDaConta}}>
            {children}
        </UsuarioContexto.Provider>
    )
}

export function usarUsuario(){
    const contexto = useContext(UsuarioContexto)

    if(!contexto){
        throw new Error (
            'UsarUsuario deve ser usado dentro de um provedor do Usuario'
        )
    }   
    return contexto
}