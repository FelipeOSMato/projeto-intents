import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from '../Styles/StyleContato'
import axios from 'axios';

const API_URL = `http://seuip:8000/api/atualizar-contato`
const API_DELETE = `http://seuip:8000/api/excluir-contato`

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

export default function EditarContatos({ navigation }) {
  const route = useRoute()
  const { contato } = route.params
  const [nomeContato, setNomeContato] = useState(contato.nome)
  const [telefone, setTelefone] = useState(formatarTelefone(contato.numTelefone))
  const [podeAcompanhar, setPodeAcompanhar] = useState(false);
  const [mensagemErro, setMensagemErro] = useState('');
  const [modalErroVisible, setModalErroVisible] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const telefoneSemFormatacao = (telefone) =>
    String(telefone || '').replace(/\D/g, '');



  const handleTelefoneChange = (telefone) => {
    const numeros = telefone.replace(/\D/g, '').slice(0, 14);
    setTelefone(formatarTelefone(numeros));
  };

  const excluirContato = async () => {
    try {
      await axios.delete(`${API_DELETE}/${contato.id}`);

      console.log('Contato excluído com sucesso!');

      navigation.goBack()

      setDeleteModalVisible(false) 
    } catch (error) {

      console.log(error)
      setMensagemErro('Erro ao excluir contato!')
      setModalErroVisible(true)
    }
  }

  const EditarContato = () => {

    if (!nomeContato.trim() || !telefoneSemFormatacao(telefone)) {
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


    if (!contato.id) {
      setMensagemErro('Não foi possível identificar o usuário.');
      setModalErroVisible(true);
      return;
    }
    setCarregando(true)

    const dados = {
      nome: nomeContato.trim(),
      telefone: telefoneSemFormatacao(telefone)
    }

    axios.put(`${API_URL}/${contato.id}`, dados)
      .then((response) => {
        setNomeContato('')
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

        <TextInput
          style={styles.input}
          placeholder="Seu Nome..."
          placeholderTextColor={"#0d2a40a0"}
          value={nomeContato}
          color={"#3084ab"}
          onChangeText={setNomeContato}
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

        <TouchableOpacity
          onPress={EditarContato}
          style={styles.buttonExcluirDetalhe}>
          <Text style={styles.textButtonExcluir}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setDeleteModalVisible(true)
          }}
          style={styles.buttonExcluirDetalhe}>
          <Text style={styles.textButtonExcluir}>Excluir</Text>
        </TouchableOpacity>

      </View>

      <Modal
        visible={deleteModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.deleteModal}>

            <Text style={styles.modalTitle}>
              Deseja Excluir esse contato?
            </Text>

            <Text style={styles.modalText}>
              Ao excluir o contato, você não terá mais acesso ao mesmo.
            </Text>

            <View style={styles.buttonSection}>

              <TouchableOpacity
                style={styles.buttonExcluir}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={styles.textButtonExcluir}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonEditar}
                onPress={excluirContato}
              >
                <Text style={styles.textButtonEditar}>Excluir</Text>
              </TouchableOpacity>

            </View>

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