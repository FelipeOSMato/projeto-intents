
import React, { useEffect, useState, useRef, useCallback } from 'react';

import {
    View,
    Text,
    StyleSheet,
    Pressable,
    TextInput,
    Animated,
    ScrollView,
    Modal,
    FlatList,
    Linking,
    TouchableOpacity
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { styles } from '../Styles/StyleHome';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { usarUsuario } from '../contextos/usuarioContexto';

const API_Contato = `http://seuip:8000/api/contatos`

export default function Home() {

    const { usuarioLogado } = usarUsuario()
    const [mensagemPadrao, setMensagemPadrao] = useState('Estou usando FastTravel!')
    const [modalContatosVisible, setModalContatosVisible] = useState(false);
    const [contato, setContato] = useState('')
    const [carregando, setCarregando] = useState(false)
    const [error, setError] = useState('')
    const [mensagemErro, setMensagemErro] = useState('')
    const [modalErroVisible, setModalErroVisible] = useState(false)
    const [atalhoSelecionado, setAtalhoSelecionado] = useState(false)


    const formatarTelefone = (telefone) => {
        if (!telefone) return '';

        const numeros = String(telefone).replace(/\D/g, '');

        if (numeros.length === 13) {
            return numeros.replace(
                /^(\d{2})(\d{2})(\d{5})(\d{4})$/,
                '+$1 ($2) $3-$4'
            )
        }

        if (numeros.length === 11) {
            return numeros.replace(
                /^(\d{2})(\d{5})(\d{4})$/,
                '($1) $2-$3'
            );
        }

        if (numeros.length === 10) {
            return numeros.replace(
                /^(\d{2})(\d{4})(\d{4})$/,
                '($1) $2-$3'
            );
        }

        return telefone
    }
    useFocusEffect(
        useCallback(() => {
            axios.get(`${API_Contato}/${usuarioLogado.idUsuario}`)
                .then((response) => {
                    setContato(response.data)
                    setCarregando(false)
                })
                .catch((err) => {
                    console.error("Erro na requisição Axios:", err);
                    setError('Não foi possível carregar os contatos.');
                    setCarregando(false);
                })
        }, [usuarioLogado?.idUsuario])
    )

    const renderConversa = ({ item }) => (
        <Pressable
            onPress={() =>
                escolherAtalho(item)}
            style={({ pressed }) => [
                styles.item,
                pressed && { opacity: 0.2 },
            ]}>
            <View style={styles.itemContato}>
                <Text style={styles.nomeContato}>{item.nome}</Text>
                <Text style={styles.telefoneContato}>{formatarTelefone(item.numTelefone)}</Text>
            </View>
        </Pressable>
    );

    const escolherAtalho = async (item) => {
        const numeros = String(item.numTelefone || '').replace(/\D/g, '');

        if (!numeros) {
            setMensagemErro('Esse contato não possui telefone.');
            setModalErroVisible(true);
            return;
        }

        const telefone = numeros.length === 10 || numeros.length === 11
            ? `55${numeros}`
            : numeros;

        let url = '';

        if (atalhoSelecionado == 'whatsapp') {
            url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagemPadrao)}`
            const supported = await Linking.canOpenURL(url)

            if (supported) {
                await Linking.openURL(url)
            } else {
                setMensagemErro('Não foi possível abrir esse atalho')
                setModalErroVisible(true)
            }
        } else if (atalhoSelecionado == 'sms') {
            url = `sms:${telefone}?body=${encodeURIComponent(mensagemErro)}`
            const supported = await Linking.canOpenURL(url)

            if (supported) {
                await Linking.openURL(url)
            } else {
                setMensagemErro('Não foi possível abrir esse atalho')
                setModalErroVisible(true)
            }
        } else if (atalhoSelecionado == 'telefone') {
            url = `tel:${telefone}`
            const supported = await Linking.canOpenURL(url)

            if (supported) {
                await Linking.openURL(url)
            } else {
                setMensagemErro('Não foi possível abrir esse atalho')
                setModalErroVisible(true)
            }
        }


    }



    const abrirURl = async (url) => {
        const supported = await Linking.canOpenURL(url)

        if (supported) {
            await Linking.openURL(url)
        } else {
            setMensagemErro('Não foi possível abrir esse atalho')
            setModalErroVisible(true)
        }
    }

    return (

        <View style={styles.container}>

            <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', }}>

                <View style={styles.inicio}>
                    <Text style={styles.titulo}>Bem vindo ao fastTravel!</Text>
                    <Text style={styles.subTitulo}>Acesse seus atalhos ao clicar em um dos botões abaixo</Text>
                </View>

                <View style={styles.centerInput}>
                    <Text style={styles.tituloMensagem}>Digite a mensagem que você deseja enviar</Text>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.input}
                            placeholder="Sua mensagem padrão..."
                            placeholderTextColor={"#0d2a40a0"}
                            value={mensagemPadrao}
                            color={"#3084ab"}

                            onChangeText={setMensagemPadrao}
                        ></TextInput>
                    </View>

                </View>

                <View style={styles.centerAcesso}>
                    <View style={styles.acesso}>
                        <Text style={styles.textAcesso}>Seus Atalhos</Text>
                        <View style={styles.viewAcesso}>

                            <View style={styles.buttonSection}>
                                <Pressable style={({ pressed }) => [
                                    styles.chamar,
                                    pressed && { opacity: 0.2 },
                                ]} onPress={() => {
                                    setAtalhoSelecionado('sms')
                                    setModalContatosVisible(true)
                                }}>
                                    <Ionicons name="chatbox" size={32} color="#FEF9FB" />
                                </Pressable>
                                <Text style={styles.textBotao}>SMS</Text>
                            </View>

                            <View style={styles.buttonSection}>
                                <Pressable style={({ pressed }) => [
                                    styles.chamar,
                                    pressed && { opacity: 0.2 },
                                ]} onPress={() => {
                                    setAtalhoSelecionado('telefone')
                                    setModalContatosVisible(true)
                                }}>
                                    <MaterialIcons name="phone" size={32} color="#FEF9FB" />
                                </Pressable>
                                <Text style={styles.textBotao}>Telefone</Text>
                            </View>

                        </View>

                        <View style={styles.viewAcesso}>

                            <View style={styles.buttonSection}>
                                <Pressable style={({ pressed }) => [
                                    styles.chamar,
                                    pressed && { opacity: 0.2 },
                                ]} onPress={() => {
                                    setAtalhoSelecionado('whatsapp')
                                    setModalContatosVisible(true)
                                }}>
                                    <Ionicons name="logo-whatsapp" size={32} color={"#FEF9FB"}></Ionicons>
                                </Pressable>
                                <Text style={styles.textBotao}>whatsapp</Text>
                            </View>

                            <View style={styles.buttonSection}>
                                <Pressable style={({ pressed }) => [
                                    styles.chamar,
                                    pressed && { opacity: 0.2 },
                                ]} onPress={() => abrirURl('https://www.google.com/maps')}>
                                    <Ionicons name="map" size={32} color={"#FEF9FB"}></Ionicons>
                                </Pressable>
                                <Text style={styles.textBotao}>Mapa</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>


            <Modal
                visible={modalContatosVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setModalContatosVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContatos}>
                        <Text style={styles.tituloModal}>
                            Selecione um contato
                        </Text>

                            <FlatList
                                data={contato}
                                keyExtractor={(item) => item.id}
                                renderItem={renderConversa}
                            />

                        <Pressable
                            style={({ pressed }) => [
                                styles.botaoFechar,
                                pressed && { opacity: 0.2 },
                            ]}
                            onPress={() => setModalContatosVisible(false)}
                        >
                            <Text style={styles.textoBotaoFechar}>
                                Cancelar
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <Modal
                visible={modalErroVisible} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.deleteModal}>

                        <Text style={styles.modalTitle}>
                            Erro ao Fazer o Login.
                        </Text>

                        <Text style={styles.modalText}>
                            {mensagemErro}
                        </Text>

                        <View style={styles.buttonSectionCancelar}>

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

        </View>

    );
}

