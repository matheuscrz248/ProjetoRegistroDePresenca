import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { StatusBar } from 'react-native';
import Routes from './src/routes';
import { NavigationContainer } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker'


export default function App() {

  const obterPermissao = async () => {

    const {granted} = await ImagePicker.requestCameraRollPermissionsAsync()

      if(!granted){
        alert('Você precisa dar permissão.')
      }
  }

  React.useEffect(() => {
    obterPermissao();
  }, [])

  return (
  <NavigationContainer>
    <StatusBar backgroundColor="#ADD8E6" barStyle="light-content"/>
    <Routes/>
  </NavigationContainer>
  );
}

