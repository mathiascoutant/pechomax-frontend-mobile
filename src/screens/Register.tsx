import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Input } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';


export default function Register() {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
  };

//   useEffect(() => {
//     console.log(username, email, password);
//   }, [username, email, password]);
    

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
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
            <Text>Se connecter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
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
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  logo: {
    width: '50%',
    height: '30%',
    marginTop: 60,
  }
});