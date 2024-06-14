import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from "react";
import { TextInput, View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const usuarios = [
    { matricula: '123000', nome: 'Fulano' },
    { matricula: '456001', nome: 'Ciclano' },
    { matricula: '789002', nome: 'Beltrano' },
];

export default function SignIn() {


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
    const [matricula, setMatricula] = useState('');
    const [nome, setNome] = useState('');

    const fazerLogin = async () => {
        const usuarioEncontrado = usuarios.find(
            user => user.matricula === matricula && user.nome === nome
        );

        if (usuarioEncontrado) {
            try {
                await AsyncStorage.setItem('isLoggedIn', 'true');
                await AsyncStorage.setItem('userData', JSON.stringify(usuarioEncontrado));
                alert(`Login bem-sucedido! Bem-vindo, ${usuarioEncontrado.nome}.`);
                navigation.navigate('TurmasScreen');
            } catch (error) {
                console.error('Erro ao armazenar o estado de login:', error);
            }
        } else {
            alert('Credenciais inválidas. Por favor, tente novamente.');
        }
    };

    return (
        <ImageBackground 
            source={require('../../assets/checklist.png')}
            style={styles.background}
            imageStyle={styles.imageStyle}
        >
            <View style={styles.header}>
                <Text style={styles.menssage}>Login</Text>
                <Image
                    source={require('../../assets/loginprof.png')}
                    style={styles.logo}
                />
            </View>
            <View style={styles.container}>
                <Animatable.View animation='fadeInUp' style={styles.containerForm}>
                    <Text style={styles.title}>Matrícula</Text>
                    <TextInput
                        placeholder='Digite sua matrícula'
                        style={styles.input}
                        onChangeText={text => setMatricula(text)}
                    />
                    <Text style={styles.title}>Nome</Text>
                    <TextInput
                        placeholder='Digite seu nome'
                        style={styles.input}
                        onChangeText={text => setNome(text)}
                    />
                    <TouchableOpacity style={styles.button} onPress={fazerLogin}>
                        <Text style={styles.buttonText}>Entrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { marginTop: 90 }]} onPress={() => navigation.navigate('Welcome')}>
                        <Text style={styles.buttonText}>Voltar</Text>
                    </TouchableOpacity>
                </Animatable.View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    imageStyle: {
        opacity: 0.3,
    },
    header: {
        marginTop: '10%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menssage: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#000000',
        textDecorationLine: 'underline',
    },
    logo: {
        width: 120,
        height: 120, 
        marginTop: 20, 
    },
    container: {
        flex: 1,
        backgroundColor: 'transparent', 
        justifyContent: 'center',
    },
    containerForm: {
        backgroundColor: '#bdebfa',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderTopStartRadius: 25,
        borderEndEndRadius: 25,
        paddingStart: '15%',
        paddingEnd: '15%',
        paddingTop: '5%', 
        flex: 1, 
        borderBottomWidth: 0,
        marginTop: '10%', 
    },
    title: {
        fontSize: 20,
        marginTop: 38,
        fontWeight: 'bold',
    },
    input: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 20,
    },
    button: {
        backgroundColor: '#ffff',
        width: '100%',
        borderRadius: 50,
        paddingVertical: 8,
        marginTop: 26,
        justifyContent: 'center',
        alignItems: 'center',
        width: '60%',
        alignSelf: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
