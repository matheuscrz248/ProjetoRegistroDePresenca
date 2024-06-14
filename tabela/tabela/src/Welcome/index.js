import React from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

export default function Welcome() { 
    const navigation = useNavigation();

    const obterPermissao = async () => {

        const {granted} = await ImagePicker.requestCameraPermissionsAsync()
    
          if(!granted){
            alert('Você precisa dar permissão.')
          }
      }
    
      React.useEffect(() => {
        obterPermissao();
      }, [])

      

    return (
        <ImageBackground 
            source={require('../../assets/checklist.png')}
            style={styles.background}
            imageStyle={styles.imageStyle}
        >
            <View style={styles.container}>
                <View style={styles.containerLogo}>
                    <Animatable.Image
                        animation='zoomIn'
                        source={require('../../assets/Logolol.png')}
                        style={{width: '100%'}}
                        resizeMode="contain"
                    />
                </View>
                <Animatable.View delay={700} animation="fadeInUp" style={styles.containerForm}>
                    <Text style={styles.title}>Seja bem-vindo!</Text>
                    <Text style={styles.text}>Faça o login para começar.</Text>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => navigation.navigate('SignIn')}
                    >
                        <Text style={styles.buttontext}>Login</Text>
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
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    containerLogo: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    containerForm: {
        flex: 1,
        backgroundColor: '#ADD8E6',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '15%',
        paddingEnd: '10%',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 28,
        marginBottom: 12,
    },
    text: {
        color: 'black',
        fontSize: 18,
    },
    button: {
        position: 'absolute',
        backgroundColor: 'white',
        borderRadius: 50,
        paddingVertical: 8,
        width: '60%',
        alignSelf: 'center',
        bottom: '15%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttontext: {
        fontSize: 18,
        fontWeight: 'bold',
    }
});
