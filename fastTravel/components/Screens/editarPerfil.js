import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, TextInput, Alert, KeyboardAvoidingView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from '../Styles/StylePerfil'
import axios from "axios";
import { ScrollView } from 'react-native-gesture-handler';
import { usarUsuario } from '../contextos/usuarioContexto.js';
import * as ImagePicker from 'expo-image-picker';

const API_URL = 'http://seuip:8000/api/atualizar-usuario'

export default function DadosPessoais({ navigation }) {
    const { usuarioLogado, atualizarUsuario } = usarUsuario()
    const [nome, setNome] = useState(usuarioLogado.nomeUsuario)
    const [email, setEmail] = useState(usuarioLogado.emailUsuario)
    const [carregando, setCarregando] = useState(false)
    const [saveModalVisible, setSaveModalVisible] = useState(false)
    const [erroImagem, setErroImagem] = useState(false)
    const [imagem, setImagem] = useState(null);
    const [ModalErroVisible, setModalErroVisible] = useState(false)
    const [modalImagemVisible, setModalImagemVisible] = useState(false)
    const [mensagemErro, setMensagemErro] = useState('')



    const urlImagem = usuarioLogado?.fotoUsuario ? `http://seuip:8000/storage/${usuarioLogado.fotoUsuario}` : null
    const AXIOS_IMGURL = 'http://seuip:8000/api/atualizar-foto'

    const atualizarImagem = async (imagemSelecionada) => {
        try {
            const formData = new FormData()

            formData.append('imagem', {
                uri: imagemSelecionada.uri,
                name: imagemSelecionada.fileName || 'foto-perfil.jpg',
                type: imagemSelecionada.mimeType || 'image/jpeg',
            })

            const response = await axios.post(
                `${AXIOS_IMGURL}/${usuarioLogado.idUsuario}`, formData, {
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
            console.error(
                'Erro ao atualizar imagem:',
                error.response?.data || error.message
            );

            setModalErroVisible(true)
            setMensagemErro('Não foi possível atualizar sua imagem.')
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
                await atualizarImagem(foto);
            }
        } catch (erro) {
            setMensagemErro('Não foi possível selecionar a imagem')
            setModalErroVisible(true)
        }
    }

    const enviarDados = () => {

        if (!nome || !email) {
            setMensagemErro('Não deixe os campos em branco!')
            setSaveModalVisible(false)
            setModalErroVisible(true)
            return
        }

        setCarregando(true)

        const dados = {
            nomeUsuario: nome,
            emailUsuario: email,
        }

        axios.put(`${API_URL}/${usuarioLogado.idUsuario}`, dados)
            .then((response) => {
                setNome('');
                setEmail('');
                atualizarUsuario({
                    nomeUsuario: nome,
                    emailUsuario: email,
                });
                navigation.goBack();
            })
            .catch((err) => {
                console.error('Mensagem:', err.message);
                console.error('Status HTTP:', err.response?.status);
                console.error('Resposta Laravel:', err.response?.data);
                console.error("Erro na requisição PUT Axios:", err);
                setModalErroVisible(true)
                setMensagemErro("Não foi possível atualizar seus dados. Verifique a conexão e tente novamente.")
            })
            .finally(() => {
                setCarregando(false);
            });


    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    {/* Header */}
                    <View style={styles.voltar}>
                        <TouchableOpacity onPress={() => navigation.goBack()} >
                            <Ionicons name='arrow-back' size={40} color={'#50333D'} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.header}>
                        <Text style={styles.headerTitulo}>Seus Dados</Text>
                    </View>

                    <View style={styles.card}>

                        <View style={styles.principalCont}>
                            <View style={styles.containerFoto}>
                                <TouchableOpacity onPress={() => setModalImagemVisible(true)}>
                                    <Image
                                        source={
                                            imagem
                                                ? { uri: imagem.uri }
                                                : urlImagem && !erroImagem
                                                    ? { uri: urlImagem }
                                                    : require('../../assets/img_sem_foto.jpg')
                                        }
                                        onError={() => setErroImagem(true)}
                                        style={styles.fotoCont} />
                                    <View style={styles.mudarFoto}>
                                        <Ionicons name="create" size={25} color={"#3084ab"}></Ionicons>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>


                        <View style={styles.form}>
                            <TextInput
                                style={styles.input}
                                placeholder="Seu Nome..."
                                placeholderTextColor={"#0d2a40a0"}
                                value={nome}
                                color={"#3084ab"}
                                onChangeText={setNome}
                                autoCapitalize='none'
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Email..."
                                placeholderTextColor={"#0d2a40a0"}
                                value={email}
                                color={"#3084ab"}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.buttonSection}>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.goBack()
                                }}
                                style={styles.buttonExcluir}>
                                <Text style={styles.textButtonExcluir}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setSaveModalVisible(true)} style={styles.buttonEditar}>
                                <Text style={styles.textButtonEditar}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <Modal
                visible={saveModalVisible} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.deleteModal}>

                        <Text style={styles.modalTitle}>
                            Deseja Salvar esse contato?
                        </Text>

                        <Text style={styles.modalText}>
                            Ao salvar o contato os dados atuais serão substituidos pelos dados escolhidos.
                        </Text>

                        <View style={styles.buttonSection}>

                            <TouchableOpacity
                                style={styles.buttonExcluir}
                                onPress={() => setSaveModalVisible(false)}
                            >
                                <Text style={styles.textButtonExcluir}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => enviarDados()}
                                style={styles.buttonEditar}
                            >
                                <Text style={styles.textButtonEditar}>Salvar</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </View>
            </Modal>
            <Modal
                visible={ModalErroVisible} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.deleteModal}>

                        <Text style={styles.modalTitle}>
                            Erro ao Atualizar.
                        </Text>

                        <Text style={styles.modalText}>
                            {mensagemErro}
                        </Text>

                        <TouchableOpacity
                            style={styles.buttonCancelar}
                            onPress={() => [
                                setSaveModalVisible(false),
                                setModalErroVisible(false)]}
                        >
                            <Text style={styles.textButtonCancelar}>OK</Text>
                        </TouchableOpacity>

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
        </View >
    );
}