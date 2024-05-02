import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Linking } from 'react-native';
import { Input } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/Navigation';
import AxiosClient from '../hooks/axios';
import Toast from 'react-native-toast-message';

export default function Login() {
  type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false); 

  const handleLogin = async () => {
    try {
      const response = await AxiosClient.post(
        '/auth/login',
        JSON.stringify({
          credential,
          password,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );      

      if (response.data) {
        Toast.show({
          type: 'success',
          text1: 'Pêcheur connecté !',
          text2: 'Détendez-vous, ouvrez une bière et profitez de l\'application !',
        });
        navigation.navigate('Home');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Erreur de connexion',
          text2: 'Nom d\'utilisateur ou mot de passe incorrect',
        });
        setLoginError(true); 
      }
    } catch (error) {
      // @ts-ignore
      console.error('Erreur lors de la connexion :', error);
      Toast.show({
        type: 'error',
        text1: 'Erreur de connexion',
        text2: 'Nom d\'utilisateur ou mot de passe incorrect',
      });
      setLoginError(true); 
    }
  };

  return (
    <View style={styles.globalAuth}>
      <LinearGradient colors={['#c7f9cc', '#A7C4E4']} style={styles.background} />
      <Image style={styles.logo} source={require('../../assets/logo.png')} />

      <View style={styles.modale}>
        <Text style={styles.title}>Connexion</Text>
        {loginError && (
          <Text style={styles.errorMessage}>Nom d'utilisateur ou mot de passe incorrect</Text>
        )}
        <Input
          placeholder="Nom d'utilisateur / Email"
          value={credential}
          onChangeText={setCredential}
          style={[styles.input, loginError && styles.inputError]}
        />
        <Input
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={[styles.input, loginError && styles.inputError]}
        />
        <TouchableOpacity style={styles.forgetPasswordContainer} onPress={() => Linking.openURL('mailto:florian.mondaut@ynov.com') }>
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
    alignItems: 'center',
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
  input: {
    // padding: 10,
    // marginBottom: 10,
    width: '100%',
  },
  inputError: {
    borderWidth: 1,
    borderColor: 'red', 
    borderRadius: 5,
    padding: 10,
  },
  errorMessage: {
    color: 'red', 
    marginBottom: 10,
  },
});
