import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

export default function TurmasScreen() {


    const obterPermissao = async () => {

        const {granted} = await ImagePicker.requestCameraPermissionsAsync()
    
          if(!granted){
            alert('Você precisa dar permissão.')
          }
      }
    
      React.useEffect(() => {
        obterPermissao();
      }, [])

    const navigation = useNavigation();
    const [usuario, setUsuario] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useFocusEffect(
        React.useCallback(() => {
            verificarLogin();
        }, [])
    );

    const verificarLogin = async () => {
        try {
            const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
            if (isLoggedIn === 'true') {
                const userData = await AsyncStorage.getItem('userData');
                if (userData) {
                    const usuarioEncontrado = JSON.parse(userData);
                    setUsuario(usuarioEncontrado);
                } else {
                    Alert.alert('Erro', 'Usuário não encontrado.');
                    navigation.navigate('SignIn');
                }
            } else {
                Alert.alert('Erro', 'Usuário não logado.');
                navigation.navigate('SignIn');
            }
        } catch (error) {
            console.error('Erro ao verificar o estado de login:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const verificarPermissao = (turma) => {
        if (turma === 'TableEditor1') {
            return true;
        }
        if (!usuario) {
            Alert.alert('Erro', 'Usuário não logado.');
            return false;
        }
        switch (turma) {
            case 'TableEditor2':
                return usuario.matricula === '123000';
            case 'TableEditor3':
                return usuario.matricula === '123000' || usuario.matricula === '789002';
            case 'TableEditor4':
                return usuario.matricula === '123000';
            case 'TableEditor5':
                return usuario.matricula === '456001' || usuario.matricula === '789002';
            case 'TableEditor6':
                return usuario.matricula === '456001' || usuario.matricula === '789002';
            default:
                return false;
        }
    };

    const navegarParaTurma = (turma) => {
        if (verificarPermissao(turma)) {
            navigation.navigate(turma);
        } else {
            Alert.alert('Erro', 'Você não tem permissão para acessar esta turma.');
        }
    };

    const fazerLogout = async () => {
        try {
            await AsyncStorage.removeItem('isLoggedIn');
            await AsyncStorage.removeItem('userData');
            navigation.navigate('SignIn');
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text>Carregando...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Suas turmas</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navegarParaTurma('TableEditor1')}>
                <Text style={styles.buttonText}>Turma 1</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navegarParaTurma('TableEditor2')}>
                <Text style={styles.buttonText}>Turma 2</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navegarParaTurma('TableEditor3')}>
                <Text style={styles.buttonText}>Turma 3</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navegarParaTurma('TableEditor4')}>
                <Text style={styles.buttonText}>Turma 4</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navegarParaTurma('TableEditor5')}>
                <Text style={styles.buttonText}>Turma 5</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navegarParaTurma('TableEditor6')}>
                <Text style={styles.buttonText}>Turma 6</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} onPress={fazerLogout}>
                <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#A39EAF',
        padding: 20,
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#ADD8E6',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginVertical: 10,
        alignItems: 'center',
        width: '80%',
    },
    logoutButton: {
        backgroundColor: '#ADD8E6',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginTop: 20,
        position: 'absolute',
        bottom: 30,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
