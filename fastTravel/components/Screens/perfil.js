import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from '../Styles/StylePerfil.js';
import { Ionicons } from '@expo/vector-icons';
import { usarUsuario } from '../contextos/usuarioContexto.js';


export default function Perfil({ navigation }) {
    const { usuarioLogado, sairDaConta } = usarUsuario()
    console.log('NOME:', usuarioLogado?.nomeUsuario);
    console.log('EMAIL:', usuarioLogado?.emailUsuario);
    const [erroImagem, setErroImagem] = useState(false)
    const urlImagem = usuarioLogado?.fotoUsuario
        ? `http://seuip:8000/storage/${usuarioLogado.fotoUsuario}`
        : null

    console.log('Imagem salva:', usuarioLogado?.fotoUsuario)
    console.log('URL da imagem:', urlImagem)

    const sair = () => {

        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }]
        });

        sairDaConta();

    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitulo}>Seu Perfil</Text>
                </View>

                <View style={styles.cont}>
                    <View style={styles.principalCont}>
                        <View style={styles.containerFoto}>
                            <Image
                                source={urlImagem && !erroImagem
                                    ? { uri: urlImagem }
                                    : require('../../assets/img_sem_foto.jpg')
                                }
                                onError={() => setErroImagem(true)}
                                style={styles.fotoCont} />
                        </View>
                        <Text style={styles.nomeCont}>{usuarioLogado?.nomeUsuario}</Text>
                    </View>
                    <Text style={styles.foneCont}>{usuarioLogado?.emailUsuario}</Text>

                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('EditarPerfil')
                        }
                        style={styles.Exitbutton}>
                        <Text style={styles.textExitButton}>Editar Perfil</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={sair}
                        style={styles.Exitbutton}>
                        <Text style={styles.textExitButton}>Sair</Text>
                    </TouchableOpacity>
                </View>

                <Text style={{color: "#8e8b8b", textAlign:'center'}}>todos os direitos reservados aos Cabrunquios©</Text>

            </ScrollView>
        </View>
    );
}