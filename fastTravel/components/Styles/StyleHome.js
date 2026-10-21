import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0edff',
    padding: 8,
  },

  button: {
    backgroundColor: '#3084ab',
    height: 200,
    width: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 30,
    color: '#4b5075',
    textAlign: 'center',
  },
  subTitulo: {
    fontSize: 18,
    marginTop: 5,
    color: '#a6aed7',
    textAlign: 'center',
  },
  centerAcesso: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  acesso: {
    position: 'relative',
    bottom: 2,
    backgroundColor: '#f5faff',
    borderRadius: 10,
    padding: 20,
    minHeight: 170,
    elevation: 2,
    marginVertical: 20,
    width: '90%',
    maxWidth: 700
  },
  textAcesso: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4b5075'
  },
  viewAcesso: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    marginTop: 15,
  },

  chamar: {
    backgroundColor: '#3084ab',
    elevation: 2,
    padding: 10,
    width: 90,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "black",
  },
  buttonSection: {
    width: 90,
    alignItems: 'center',
  },
  textBotao: {
    textAlign: 'center',
    color: "#4b5075",
    marginTop: 5,
    width: 90
  },
  textMainHome: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: '90%',
    color: '#C8AEBB'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginVertical: 8,
    elevation: 3,
    width: '95%',
    backgroundColor: '#f5faff',
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 20,
  },
  tituloMensagem: {
    fontSize: 18,
    color: '#4b5075'
  },
  centerInput: {
    justifyContent: 'center',
    alignItems:'center'
  },

modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
},

modalContatos: {
  width: '100%',
  maxHeight: '75%',
  backgroundColor: '#FEF9FB',
  borderRadius: 20,
  padding: 20,
},

tituloModal: {
  fontSize: 22,
  fontWeight: 'bold',
  color: '#50333D',
  marginBottom: 16,
  textAlign: 'center',
},

itemContato: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingVertical: 15,
  paddingHorizontal: 12,
  borderBottomWidth: 1,
  borderBottomColor: '#E8DDE2',
},

infoContato: {
  flex: 1,
},

nomeContato: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#50333D',
},

telefoneContato: {
  fontSize: 14,
  color: '#777',
  marginTop: 4,
},

contatosVazios: {
  textAlign: 'center',
  color: '#777',
  padding: 20,
},

botaoFechar: {
  backgroundColor: '#3084ab',
  padding: 13,
  borderRadius: 12,
  alignItems: 'center',
  marginTop: 16,
},

textoBotaoFechar: {
  color: '#FEF9FB',
  fontWeight: 'bold',
  fontSize: 16,
},

});
