import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from '../Styles/StyleContato'
import { usarUsuario } from '../contextos/usuarioContexto';
import axios from 'axios';

const API_URL = `http://seuip:8000/api/criar-contato`


const formatarTelefone = (telefone) => {
  if (!telefone) return '';

  const numeros = String(telefone || '')
    .replace(/\D/g, '')
    .slice(0, 14);

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

export default function AdicionarContato({ navigation }) {
  const { usuarioLogado } = usarUsuario()
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [mensagemErro, setMensagemErro] = useState('');
  const [modalErroVisible, setModalErroVisible] = useState(false);
  const [carregando, setCarregando] = useState(false);


  const telefoneSemFormatacao = (telefone) =>
    String(telefone || '').replace(/\D/g, '');

  const handleTelefoneChange = (telefone) => {
    const numeros = telefone.replace(/\D/g, '').slice(0, 14);
    setTelefone(formatarTelefone(numeros));
  };

  const AdicionarContato = () => {

    if (!nome.trim() || !telefoneSemFormatacao(telefone)) {
      setMensagemErro('Não deixe os campos em branco!')
      setModalErroVisible(true)
      return
    }

    const numeros = telefoneSemFormatacao(telefone);

    if (numeros.length !== 10 && numeros.length !== 11 && numeros.length !== 13) {
      setMensagemErro('Informe um telefone válido com DDD.');
      setModalErroVisible(true);
      return;
    }


    if (!usuarioLogado?.idUsuario) {
      setMensagemErro('Não foi possível identificar o usuário.');
      setModalErroVisible(true);
      return;
    }
    setCarregando(true)

    const dados = {
      nome: nome.trim(),
      telefone: telefoneSemFormatacao(telefone),
      usuario_id: usuarioLogado.idUsuario
    }

    axios.post(`${API_URL}/${usuarioLogado.idUsuario}`, dados)
      .then((response) => {
        setNome('')
        setTelefone('')

        navigation.goBack()

      })
      .catch((err) => {
        console.log("Erro no cadastro:", err.message);
        console.log("Status HTTP:", err.response?.status);
        console.log("Resposta do Laravel:", err.response?.data);

        setMensagemErro(
          "Não foi possível adicionar esse contato."
        );

        setModalErroVisible(true);
      })
      .finally(() => {
        setCarregando(false);
      });

  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.voltar}>
        <TouchableOpacity onPress={() => navigation.goBack()} >
          <Ionicons name='arrow-back' size={40} color={'#50333D'} />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>

        <View style={styles.principalCard}>
          <Text style={styles.nomeCard}>Editar Contato</Text>
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
            placeholderTextColor={"#915e0d2a40a070"}
            placeholder="Telefone..."
            color={"#3084ab"}
            value={telefone}
            onChangeText={handleTelefoneChange}
            keyboardType="numeric"
            maxLength={19}
          />

        </View>

        <View style={styles.buttonSection}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.buttonExcluir}>
            <Text style={styles.textButtonExcluir}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={AdicionarContato} style={styles.buttonEditar} disabled={carregando}>
            <Text style={styles.textButtonEditar}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>

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