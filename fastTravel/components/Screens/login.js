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

export default function Login({ navigation }) {

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [mostrarSenha, setMostrarSenha] = useState(false)
    const [carregando, setCarregando] = useState(false)
    const [ModalErroVisible, setModalErroVisible] = useState(false)
    const [mensagemErro, setMensagemErro] = useState('')

    const logar = async () => {
        if (!email.trim() || !senha) {
            setMensagemErro("Preencha o email e a senha !")
            setModalErroVisible(true)
            return
        }

        try {
            setCarregando(true)
            const response = await fetch(
                `http://seuip:8000/api/entrar/${encodeURIComponent(email.trim())}/${encodeURIComponent(senha)}`
            )

            const data = await response.json()

            if (!response.ok) {
                setMensagemErro("Email ou senha incorretos!")
                setModalErroVisible(true)
                return
            }

            console.log('Usuario logado com sucesso:', data)

            navigation.navigate('HomeTabs', {
                usuarioLogado: data
            })

        } catch (error) {
            console.log('Erro ao logar', error)

            setMensagemErro("Não foi possível conectar ao servidor.")
            setModalErroVisible(true)

        } finally {
            setCarregando(false)
        }

    }

    return (
        <View style={styles.container}>

            <View style={styles.inicio}>
                <StatusBar style="auto" />
                <Image source={require('../../assets/fastTravelLogo.png')} style={styles.logo} />
                <Text style={styles.title}>Bem vindo!</Text>
                <Text style={styles.subtitle}>faça seu login para continuar!</Text>
            </View>


                <View style={styles.form}>
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

                    <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                        <Text style={styles.link1}>Cadastre-se!</Text>
                    </TouchableOpacity>

                </View>

            <View style={styles.links}>
                <TouchableOpacity
                    onPress={logar}
                    style={styles.button}
                    disabled={carregando}>
                    <Text style={styles.textButton}>Entrar</Text>
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
        </View >
    );
}

