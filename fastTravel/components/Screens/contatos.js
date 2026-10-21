import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { styles } from '../Styles/StyleContato.js';
import { usarUsuario } from '../contextos/usuarioContexto.js';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

const API_Contato = `http://seuip:8000/api/contatos`

export default function Contatos({ navigation }) {
  const { usuarioLogado } = usarUsuario()
  const [contato, setContato] = useState(false)
  const [carregando, setCarregando] = useState(false)

  const renderConversa = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('EditarContato', {
          contato: item
        })}
      style={styles.item}>
      <View style={styles.textos}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.fone}>{formatarTelefone(item.numTelefone)}</Text>
      </View>
    </TouchableOpacity>
  );


  const formatarTelefone = (telefone) => {
    if (!telefone) return '';

    const numeros = String(telefone).replace(/\D/g, '');

    if (numeros.length === 13){
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
            setLoading(false);
          })
      }, [])
    )

    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitulo}>Seus Contatos</Text>
        </View>

        {/* Lista de conversas */}
        <FlatList
          data={contato}
          keyExtractor={(item) => item.id}
          renderItem={renderConversa}
        />

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('AdicionarContato')
          }
          style={styles.button}
        >
          <Text style={styles.textButton}>+ Adicionar Contato</Text>
        </TouchableOpacity>
      </View>
    );
  }