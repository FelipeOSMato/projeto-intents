import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#f0edff',
    padding: 10,
  },
  logo: {
    width: 300,
    height: 200,
    alignSelf: 'center',
    marginTop: 20
  },
  button: {
    backgroundColor: '#3084ab',
    borderRadius: 50,
    elevation: 3,
    padding: 15,
  },
  textButton: {
    fontSize: 20,
    textAlign: 'center',
    color: '#ffffff',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4b5075',
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    color: '#a6aed7',
  },
  link1: {
    fontSize: 20,
    color: '#4b5075',
  },
  link2: {
    fontSize: 20,
    textAlign: 'center',
    color: '#3084ab',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginVertical: 8,
    elevation: 3,
    backgroundColor: '#f5faff',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 20,
  },
  links: {
    height: "25%",
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    marginBottom: 35
  },
  form: {
    height: "25%",
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  voltar: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 15,
    width: '20%'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4b5075",
    textAlign: 'center'
  },

  modalLabel: {
    fontSize: 13,
    color: "#777",
    marginTop: 10
  },

  modalText: {
    fontSize: 14,
    marginTop: 3,
    color: "#777777",
  },
  deleteModal: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
  },

  buttonCancelar: {
    backgroundColor: '#3084ab',
    borderRadius: 20,
    marginVertical: 10,
    padding: 15,
    elevation: 2,
    alignItems: 'center'
  },
  textButtonCancelar: {
    fontSize: 20,
    textAlign: 'center',
    color: '#FEF9FB',
    fontWeight: 'bold'
  },
  mudarFoto: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#FEF9FB",
    padding: 3,
    borderRadius: 50,
    borderWidth: 0,
    elevation:4
  },
  fotoCont: {
    width: 100,
    height: 100,
    borderRadius: 100,
    elevation:3
  },
  containerFoto: {
    position: "relative",
  },
  centerFotos: {
    alignItems: 'center',
    marginVertical:10
  },

fundoModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  modalImagem: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: '#FEF9FB',
    borderRadius: 18,
    padding: 24,
  },

  tituloModal: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#50333D',
    marginBottom: 8,
  },

  textoModal: {
    fontSize: 14,
    color: '#3084ab',
    marginBottom: 18,
  },

  opcaoModal: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#EADDE3',
  },

  textoOpcao: {
    fontSize: 16,
    color: '#3084ab',
  },

  cancelarModal: {
    textAlign: 'center',
    color: '#3084ab',
    fontWeight: 'bold',
    marginTop: 14,
  },
});