import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Input } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import AxiosClient from '../hooks/axios';
import { RootStackParamList } from '../navigation/Navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';

export default function Register() {
  type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
  
  const navigation = useNavigation<RegisterScreenNavigationProp>();


  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleRegister = async () => {
    try {
      console.log('username', username);
      console.log('email', email);
      console.log('password', password);
      console.log('DOT ENV', process.env.EXPO_PUBLIC_BASE_URL);
      if (username.includes('@')) {
        alert('Le nom d\'utilisateur ne doit pas contenir de @');
        return;
      }

      const response = await AxiosClient.post('/auth/register', JSON.stringify({
        username,
        email,
        password
      }), {
        headers: {
          'Content-Type': 'application/json'
        },
      });
      Toast.show({
        type: 'success',
        text1: 'Poisson créé !',
        text2: 'Détendez-vous, ouvrez une bière et profitez de l\'application !',
      });      
      navigation.navigate('Home');
    } catch (error) {      
      Toast.show({
        type: 'error',
        text1: 'Erreur de connexion',
        text2: 'Nom d\'utilisateur ou adresse mail déjà utilisé',
      });    }
  };
    

  return (
    <ScrollView contentContainerStyle={styles.globalAuth}>
      <LinearGradient
        colors={['#c7f9cc', '#A7C4E4']}
        style={styles.background}
      />
      <Image style={styles.logo} source={require('../../assets/logo.png')} />

      <View style={styles.modale}>
        <Text style={styles.title}>Inscription</Text>
        <Input
          placeholder="Nom d'utilisateur"
          value={username}
          onChangeText={setUsername}
        />
        <Input
          placeholder="Adresse mail"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.connectButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.connectText}>Vous avez déjà un compte ? Ferrez-le !</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logupButton} onPress={handleRegister}>
            <Text>S'inscrire</Text>
          </TouchableOpacity>
        </View>
      </View> 
    </ScrollView>
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
  buttons: {
    flexDirection: 'row',
    width: '94%',
  },
  logupButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  connectButton: {
    width: '85%',
  },
  connectText: {
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  logo: {
    width: '50%',
    height: '30%',
    marginTop: 60,
  }
});