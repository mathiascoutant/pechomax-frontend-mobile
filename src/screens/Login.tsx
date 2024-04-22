import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Input } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/Navigation';
import axios from 'axios';


export default function Login() {
  type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
  
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const [credential, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {    
    try {
      console.log('credential', credential);
      console.log('password', password);

      const response = await axios.post('https://pechomax-backend.mrt-juillardfo.workers.dev/auth/login', JSON.stringify({
        credential,
        password
      }), {
        headers: {
          'Content-Type': 'application/json'
        },
      });
      console.log(response.data);
      console.log('User logged in');
      navigation.navigate('Home');
    } catch (error) {    
      console.error(error);      
    }  };

  return (
    <View style={styles.globalAuth}>
      <LinearGradient
        colors={['#c7f9cc', '#A7C4E4']}
        style={styles.background}
      />
      <Image style={styles.logo} source={require('../../assets/logo.png')} /> 

      <View style={styles.modale}>
        <Text style={styles.title}>Connexion</Text>
        <Input
          placeholder="Nom d'utilisateur / Email"
          value={credential}
          onChangeText={setUsername}
        />
        <Input
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.forgetPasswordContainer}>
          <Text style={styles.forgetPassword}>Mot de passe oublié ?</Text>
        </TouchableOpacity>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.logupButton} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.login}>Vous n'avez pas de compte ? Pêchez-en un !</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.connectButton} onPress={handleLogin}>
            <Text>Se connecter</Text>
          </TouchableOpacity>
        </View>
      </View> 
    </View>
  );
}

const styles = StyleSheet.create({
  globalAuth: {
    flex: 1,
    alignItems: 'center',
    gap: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modale: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center'
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  logo: {
    width: '50%',
    height: '30%',
    marginTop: 60,
  },
  forgetPasswordContainer: {
    marginTop: -20,
    marginBottom: 20,    
    marginLeft: -123,
  },
  forgetPassword: {
    textDecorationLine: 'underline',
    fontWeight: '500',
    fontSize: 12,
  },
  buttons: {
    marginTop: 10,
    flexDirection: 'row',
    width: '92%',
  },
  logupButton: {
    width: '70%',
  },
  login: {
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  connectButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    marginTop: 15,
  },
});