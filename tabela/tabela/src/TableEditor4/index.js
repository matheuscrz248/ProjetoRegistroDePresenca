import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  TextInput, 
  Modal 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const TableEditor4 = () => {


  const obterPermissao = async () => {

    const {granted} = await ImagePicker.requestCameraPermissionsAsync()

      if(!granted){
        alert('Você precisa dar permissão.')
      }
  }

  React.useEffect(() => {
    obterPermissao();
  }, [])



  const [alunos, setAlunos] = useState([]);
  const [nomeAluno, setNomeAluno] = useState('');
  const [idAlunoRemover, setIdAlunoRemover] = useState(null);
  const [exibirModalConfirmacao, setExibirModalConfirmacao] = useState(false);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const alunosArmazenados = await AsyncStorage.getItem('alunos_turma4');
      if (alunosArmazenados !== null) {
        setAlunos(JSON.parse(alunosArmazenados));
      } else {
        setAlunos([
          { id: 1, nome: 'Leonardo', faltas: [false, false], totalFaltas: 0 },
        ]);
      }
    } catch (error) {
      console.error('Erro ao carregar dados do AsyncStorage:', error);
    }
  };

  const salvarDados = async () => {
    try {
      await AsyncStorage.setItem('alunos_turma4', JSON.stringify(alunos));
      alert('Dados salvos com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar dados no AsyncStorage:', error);
    }
  };

  const marcarFalta = (alunoIndex, faltaIndex) => {
    const novosAlunos = [...alunos];
    const aluno = novosAlunos[alunoIndex];
    const faltaAnterior = aluno.faltas[faltaIndex];

    aluno.faltas[faltaIndex] = !faltaAnterior;
    aluno.totalFaltas += aluno.faltas[faltaIndex] ? 1 : -1;

    setAlunos(novosAlunos);
  };

  const retirarUmaFalta = (alunoIndex) => {
    const novosAlunos = [...alunos];
    const aluno = novosAlunos[alunoIndex];
  
    if (aluno.totalFaltas > 0) {
      const primeiraFaltaIndex = aluno.faltas.indexOf(true);
  
      if (primeiraFaltaIndex !== -1) {
        aluno.faltas[primeiraFaltaIndex] = false;
      }
  
      aluno.totalFaltas -= 1;
      setAlunos(novosAlunos);
    } else {
      alert('Não é possível retirar mais faltas.');
    }
  };
  
  
  

  const adicionarUmaFalta = (alunoIndex) => {
    const novosAlunos = [...alunos];
    const aluno = novosAlunos[alunoIndex];

    aluno.totalFaltas += 1;
    setAlunos(novosAlunos);
  };

  const cadastrarAluno = () => {
    const id = Date.now();
    const novoAluno = { id, nome: nomeAluno, faltas: [false, false], totalFaltas: 0 };
    setAlunos([...alunos, novoAluno]);
    setNomeAluno('');
    alert('Aluno cadastrado com sucesso!');
  };

  const confirmarRemocaoAluno = (id) => {
    setIdAlunoRemover(id);
    setExibirModalConfirmacao(true);
  };

  const removerAluno = (id) => {
    const novosAlunos = alunos.filter(aluno => aluno.id !== id);
    setAlunos(novosAlunos);
  };

  const navigation = useNavigation(); 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Planilha de Presença</Text>
      <ScrollView style={styles.tableContainer}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Nome do aluno(a)</Text>
            <Text style={styles.tableHeader}>Marcar falta</Text>
            <Text style={styles.tableHeader}>Total de faltas</Text>
            <Text style={styles.tableHeader}>Gerenciar faltas</Text>
          </View>
          {alunos.map((aluno, alunoIndex) => (
            <View key={aluno.id} style={styles.alunoContainer}>
              <Text style={styles.alunoNome}>{aluno.nome}</Text>
              <View style={styles.checkboxContainer}>
                {aluno.faltas.map((falta, faltaIndex) => (
                  <TouchableOpacity
                    key={faltaIndex}
                    onPress={() => marcarFalta(alunoIndex, faltaIndex)}
                  >
                    <View style={[styles.checkbox, falta ? styles.checkboxMarcada : null]} />
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={styles.totalFaltas}>{aluno.totalFaltas}</Text>
              <TouchableOpacity 
                style={styles.retirarButton} 
                onPress={() => retirarUmaFalta(alunoIndex)}
              >
                <Text style={styles.buttonText}> -1 </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.adicionarButton} 
                onPress={() => adicionarUmaFalta(alunoIndex)}
              >
                <Text style={styles.buttonText}> +1 </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.removerButton} 
                onPress={() => confirmarRemocaoAluno(aluno.id)}
              >
                <Text style={styles.buttonText}> X </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
      <Text style={styles.subtitle}>Cadastrar Novo Aluno</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nomeAluno}
        onChangeText={text => setNomeAluno(text)}
      />
      <TouchableOpacity style={styles.button} onPress={cadastrarAluno}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={salvarDados}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TurmasScreen')}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>

  <Modal
    visible={exibirModalConfirmacao}
    transparent={true}
    animationType='fade'
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalMessage}>Tem certeza que quer remover o aluno?</Text>
        <View style={styles.modalButtonsContainer}>
          <TouchableOpacity
            style={[styles.modalButton, styles.modalButtonSim]}
            onPress={() => {
              removerAluno(idAlunoRemover);
              setExibirModalConfirmacao(false);
            }}
          >
            <Text style={styles.modalButtonText}>Sim</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modalButton, styles.modalButtonCancelar]}
            onPress={() => {
              setIdAlunoRemover(null);
              setExibirModalConfirmacao(false);
            }}
          >
            <Text style={styles.modalButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
</View>

);
};

const styles = StyleSheet.create({
container: {
flex: 1,
padding: 20,
backgroundColor: '#fff',
},
title: {
fontSize: 24,
fontWeight: 'bold',
marginBottom: 20,
},
subtitle: {
fontSize: 20,
fontWeight: 'bold',
marginTop: 20,
marginBottom: 10,
},
tableContainer: {
marginBottom: 20,
},
table: {
borderWidth: 1,
borderColor: '#dddddd',
},
tableRow: {
flexDirection: 'row',
borderBottomWidth: 1,
borderBottomColor: '#dddddd',
alignItems: 'center',
},
tableHeader: {
flex: 1,
padding: 8,
backgroundColor: '#f2f2f2',
textAlign: 'center',
},
checkboxContainer: {
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'center',
},
checkbox: {
width: 24,
height: 24,
marginHorizontal: 4,
borderWidth: 1,
borderColor: '#000000',
},
checkboxMarcada: {
backgroundColor: 'red',
},
alunoContainer: {
flexDirection: 'row',
alignItems: 'center',
paddingVertical: 8,
borderBottomWidth: 1,
borderBottomColor: '#dddddd',
},
alunoNome: {
flex: 1,
textAlign: 'center',
},
totalFaltas: {
flex: 1,
textAlign: 'center',
},
input: {
borderWidth: 1,
borderColor: '#cccccc',
padding: 10,
marginBottom: 10,
},
button: {
backgroundColor: '#007bff',
paddingVertical: 10,
borderRadius: 5,
alignItems: 'center',
marginBottom: 10,
},
buttonText: {
color: '#fff',
fontSize: 16,
fontWeight: 'bold',
},
retirarButton: {
backgroundColor: '#dc3545',
paddingVertical: 8,
borderRadius: 5,
alignItems: 'center',
marginTop: 5,
marginBottom: 10,
},
adicionarButton: {
backgroundColor: '#007bff',
paddingVertical: 8,
borderRadius: 5,
alignItems: 'center',
marginTop: 5,
marginBottom: 10,
marginLeft: 10,
},
removerButton: {
backgroundColor: '#dc3545',
paddingVertical: 8,
borderRadius: 5,
alignItems: 'center',
marginTop: 5,
marginBottom: 10,
marginLeft: 10,
},
modalContainer: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
modalContent: {
backgroundColor: '#fff',
borderRadius: 10,
padding: 20,
width: '80%',
},
modalMessage: {
fontSize: 18,
marginBottom: 20,
textAlign: 'center',
},
modalButtonsContainer: {
flexDirection: 'row',
justifyContent: 'space-around',
},
modalButton: {
paddingHorizontal: 20,
paddingVertical: 10,
borderRadius: 5,
},
modalButtonSim: {
backgroundColor: '#007bff',
},
modalButtonCancelar: {
backgroundColor: '#dc3545',
},
modalButtonText: {
color: '#fff',
fontSize: 16,
fontWeight: 'bold',
},
});

export default TableEditor4;
