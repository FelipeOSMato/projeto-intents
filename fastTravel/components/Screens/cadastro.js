import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    Alert,
    Modal,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState, useEffect, useCallback } from 'react';
import { styles } from '../Styles/StyleLogin.js';
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker'

const AXIOS_IMGURL = `http://seuip:8000/api/atualizar-foto`
const API_URL = `http://seuip:8000/api/cadastrar-usuario`

export default function Cadastro({ navigation }) {

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [erroImagem, setErroImagem] = useState(false)
    const [imagem, setImagem] = useState(null);
    const [confirmarSenha, setConfirmarSenha] = useState('')
    const [mostrarSenha, setMostrarSenha] = useState(false)
    const [mostrarSenhaSegundo, setMostrarSenhaSegundo] = useState(false)
    const [carregando, setCarregando] = useState(false)
    const [ModalErroVisible, setModalErroVisible] = useState(false)
    const [mensagemErro, setMensagemErro] = useState('')
    const [modalImagemVisible, setModalImagemVisible] = useState(false)

    const atualizarImagem = async (idUsuario, imagemSelecionada) => {
        try {
            const formData = new FormData()

            formData.append('imagem', {
                uri: imagemSelecionada.uri,
                name: imagemSelecionada.fileName || 'foto-perfil.jpg',
                type: imagemSelecionada.mimeType || 'image/jpeg',
            })

            const response = await axios.post(
                `${AXIOS_IMGURL}/${idUsuario}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
            )


            console.log('Resposta da imagem:', response.data)
            atualizarUsuario({
                fotoUsuario: response.data.fotoUsuario
            })

            setImagem(imagemSelecionada)
            setErroImagem(false)


        } catch (error) {
            console.log('STATUS:', error.response?.status);
            console.log('RESPOSTA:', JSON.stringify(
                error.response?.data,
                null,
                2
            ));
        }
    }


    const escolherImagem = async (origem) => {
        try {
            if (origem === "galeria") {
                const permissaoImagem = await ImagePicker.requestMediaLibraryPermissionsAsync();

                if (!permissaoImagem.granted) {
                    setModalErroVisible(true)
                    setMensagemErro('Permissão Necessária!',
                        'Precisamos de acesso à galeria para escolher a foto.')
                    return
                }
            } else {
                const permissaoImagem = await ImagePicker.requestCameraPermissionsAsync()

                if (!permissaoImagem.granted) {
                    setModalErroVisible(true)
                    setMensagemErro('Permissão Necessária!',
                        'Precisamos de acesso à câmera para escolher a foto'
                    )
                }
            }
            const resultadoGaleria = origem === 'galeria'
                ? await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ['images'],
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 0.8
                })
                : await ImagePicker.launchCameraAsync({
                    mediaTypes: ['images'],
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 0.8
                })

            if (!resultadoGaleria.canceled) {
                const foto = resultadoGaleria.assets[0]
                setImagem(foto)
                setErroImagem(false)
            }
        } catch (erro) {
            setMensagemErro('Não foi possível selecionar a imagem')
            setModalErroVisible(true)
        }
    }

    const enviarDadosUsuario = () => {

        if (!nome.trim() || !senha || !email.trim() || !confirmarSenha) {
            setMensagemErro('Não deixe os campos em branco!')
            setModalErroVisible(true)
            return
        }

        if (senha !== confirmarSenha) {
            setMensagemErro('As senhas não coincidem!');
            setModalErroVisible(true);
            return;
        }

        setCarregando(true)

        const dados = {
            nome: nome.trim(),
            email: email.trim(),
            senha: senha
        }

        axios.post(`${API_URL}`, dados)
            .then((response) => {

                const idUsuario = response.data.idUsuario

                if (imagem && idUsuario) {
                    return atualizarImagem(idUsuario, imagem)
                        .then(() => {
                            finalizarCadastro()
                        })
                }
                finalizarCadastro()
            })
            .catch((err) => {
                console.log("Erro no cadastro:", err.message);
                console.log("Status HTTP:", err.response?.status);
                console.log("Resposta do Laravel:", err.response?.data);

                setMensagemErro(
                    err.response?.data?.message ||
                    "Não foi possível cadastrar seus dados."
                );

                setModalErroVisible(true);
            })
            .finally(() => {
                setCarregando(false);
            });

    }

    const finalizarCadastro = () => {
        setNome('');
        setSenha('');
        setEmail('');
        setConfirmarSenha('')
        setImagem(null)

        navigation.goBack();
    }

    return (
        <View style={styles.container}>

            <View style={styles.inicio}>

                <StatusBar style="auto" />
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.voltar}>
                    <Ionicons name="arrow-back" size={40} color="#3084ab" />
                </TouchableOpacity>
                <Text style={styles.title}>Cadastre-se</Text>
                <Text style={styles.subtitle}>Insira seus dados </Text>
            </View>

            <ScrollView>

                <View style={styles.centerFotos}>
                    <View style={styles.containerFoto}>
                        <TouchableOpacity onPress={() => setModalImagemVisible(true)}>
                            <Image
                                source={
                                    imagem
                                        ? { uri: imagem.uri }
                                        : require('../../assets/img_sem_foto.jpg')
                                }
                                onError={() => setErroImagem(true)}
                                style={styles.fotoCont} />
                            <View style={styles.mudarFoto}>
                                <Ionicons name="create-outline" size={25} color={"#3084ab"}></Ionicons>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <Ionicons name="person" size={24} color="#3084ab" style={styles.icon} />
                        <TextInput style={styles.input}
                            placeholder="Seu Nome..."
                            placeholderTextColor={"#0d2a40a0"}
                            value={nome}
                            color={"#3084ab"}
                            onChangeText={setNome}
                            autoCapitalize='none'
                        ></TextInput>
                    </View>
                    <View style={styles.inputContainer}>
                        <Ionicons name="mail" size={24} color="#3084ab" style={styles.icon} />
                        <TextInput style={styles.input}
                            placeholder="Seu Email..."
                            placeholderTextColor={"#0d2a40a0"}
                            value={email}
                            color={"#3084ab"}
                            onChangeText={setEmail}
                            autoCapitalize='none'
                            keyboardType='email-address'
                        ></TextInput>
                    </View>
                    <View style={styles.inputContainer}>
                        <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
                            <Ionicons name={mostrarSenha ? "eye-off" : "eye"} size={24} color="#3084ab" style={styles.icon} />
                        </TouchableOpacity>
                        <TextInput style={styles.input}
                            placeholder="Senha..."
                            placeholderTextColor={"#0d2a40a0"}
                            value={senha}
                            color={"#3084ab"}

                            onChangeText={setSenha}
                            secureTextEntry={!mostrarSenha}
                        ></TextInput>
                    </View>
                    <View style={styles.inputContainer}>
                        <TouchableOpacity onPress={() => setMostrarSenhaSegundo(!mostrarSenhaSegundo)}>
                            <Ionicons name={mostrarSenhaSegundo ? "eye-off" : "eye"} size={24} color="#3084ab" style={styles.icon} />
                        </TouchableOpacity>
                        <TextInput style={styles.input}
                            placeholder="Confirmar senha..."
                            placeholderTextColor={"#0d2a40a0"}
                            value={confirmarSenha}
                            color={"#3084ab"}
                            onChangeText={setConfirmarSenha}
                            secureTextEntry={!mostrarSenhaSegundo}
                        ></TextInput>
                    </View>

                </View>
            </ScrollView>

            <View style={styles.links}>
                <TouchableOpacity
                    onPress={enviarDadosUsuario}
                    style={styles.button}
                    disabled={carregando}>
                    <Text style={styles.textButton}>Cadastrar</Text>
                </TouchableOpacity>
            </View>


            <Modal
                visible={ModalErroVisible} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.deleteModal}>

                        <Text style={styles.modalTitle}>
                            Erro ao Fazer o Login.
                        </Text>

                        <Text style={styles.modalText}>
                            {mensagemErro}
                        </Text>

                        <View style={styles.buttonSection}>

                            <TouchableOpacity
                                style={styles.buttonCancelar}
                                onPress={() => setModalErroVisible(false)}
                            >
                                <Text style={styles.textButtonCancelar}>OK</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </View>
            </Modal>
            <Modal
                visible={modalImagemVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setModalImagemVisible(false)}
            >
                <View style={styles.fundoModal}>
                    <View style={styles.modalImagem}>
                        <Text style={styles.tituloModal}>Alterar foto</Text>
                        <Text style={styles.textoModal}>
                            Como você deseja escolher sua foto?
                        </Text>

                        <TouchableOpacity
                            style={styles.opcaoModal}
                            onPress={() => {
                                setModalImagemVisible(false);
                                escolherImagem('camera');
                            }}
                        >
                            <Ionicons name="camera" size={22} color="#3084ab" />
                            <Text style={styles.textoOpcao}>Tirar foto</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.opcaoModal}
                            onPress={() => {
                                setModalImagemVisible(false);
                                escolherImagem('galeria');
                            }}
                        >
                            <Ionicons name="image" size={22} color="#3084ab" />
                            <Text style={styles.textoOpcao}>Escolher da galeria</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setModalImagemVisible(false)}
                        >
                            <Text style={styles.cancelarModal}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

