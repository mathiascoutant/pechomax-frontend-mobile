import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Input } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function Login() {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
  };

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
          value={username}
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
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.login}>Vous n'avez pas de compte ? Pêchez-en un !</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
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
  buttons: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    width: '100%',
  },
  logo: {
    width: '50%',
    height: '30%',
    marginTop: 60,
  },
  forgetPasswordContainer: {
    marginTop: -20,
    marginBottom: 20,    
    marginLeft: -110,
  },
  forgetPassword: {
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
  login: {
    paddingLeft: 50,
    textDecorationLine: 'underline',
    fontWeight: '500',
    width: '60%',
  },
});