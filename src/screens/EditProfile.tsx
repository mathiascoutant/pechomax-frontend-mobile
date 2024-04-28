import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/Navigation';
import { getSelf } from '../hooks/users/getSelf';
import { User } from '../interfaces/User';
import AddButton from '../components/AddButton';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faCity, faMapLocation, faMapPin, faPhone } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';

export default function EditProfile() {
  type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const [user, setUser] = useState<User | null>(null);
  const [editedUser, setEditedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getSelf();
        setUser(userData);
        setEditedUser(userData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    try {
        const { updatedAt, createdAt, id, ...newUser } = editedUser || {};

        console.log('newUser', newUser);

        if ((newUser as User)?.username?.includes('@')) {
          alert('Le nom d\'utilisateur ne doit pas contenir de \'@\'');
          return;
        }

        const response = await axios.put(`https://pechomax-backend.mrt-juillardfo.workers.dev/users/update/self`,
          newUser
          , {
            headers: {
              'Content-Type': 'application/json'
            },
          });
        console.log('*************', response.data);
        console.log('Saving edited user data:', newUser);
        navigation.navigate('Profile');
    } catch (error) {
        console.error(error);
        }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.profilePic} source={{ uri: 'https://picsum.photos/200/300' }} />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{user ? user.username : 'Non défini'}</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.infoContainer}>
          <FontAwesomeIcon icon={faUser} size={25}/>
          <TextInput
            style={styles.input}
            value={editedUser ? editedUser.username : ''}
            placeholder='Pseudo'
            onChangeText={text => setEditedUser(prevState => ({ ...prevState, username: text }))}
          />
        </View>
        <View style={styles.infoContainer}>
          <FontAwesomeIcon icon={faEnvelope} size={25}/>
          <TextInput
            style={styles.input}
            value={editedUser ? editedUser.email : ''}
            placeholder='Email'
            onChangeText={text => setEditedUser(prevState => ({ ...prevState, email: text }))}
          />
        </View>
        <View style={styles.infoContainer}>
          <FontAwesomeIcon icon={faPhone} size={25}/>
          <TextInput
            style={styles.input}
            value={editedUser ? editedUser.phoneNumber || '' : ''}
            placeholder='Téléphone'
            onChangeText={text => setEditedUser(prevState => ({ ...prevState, phoneNumber: text }))}
          />
        </View>
        <View style={styles.infoContainer}>
          <FontAwesomeIcon icon={faCity} size={25}/>
          <TextInput
            style={styles.input}
            value={editedUser ? editedUser.city : ''}
            placeholder='Ville'
            onChangeText={text => setEditedUser(prevState => ({ ...prevState, city: text }))}
          />
        </View>
        <View style={styles.infoContainer}>
          <FontAwesomeIcon icon={faMapLocation} size={25}/>
          <TextInput
            style={styles.input}
            value={editedUser ? editedUser.region || '' : ''}
            placeholder='Région'
            onChangeText={text => setEditedUser(prevState => ({ ...prevState, region: text }))}
          />
        </View>
        <View style={styles.infoContainer}>
          <FontAwesomeIcon icon={faMapPin} size={25}/>
          <TextInput
            style={styles.input}
            value={editedUser ? editedUser.zipCode || '' : ''}
            placeholder='Code postal'
            onChangeText={text => setEditedUser(prevState => ({ ...prevState, zipCode: text }))}
          />
        </View>
        <Pressable onPress={handleSave} style={styles.editButton}>
            <LinearGradient
                colors={['#c7f9cc', '#A7C4E4']}
                style={styles.background}
            />
            <Text style={styles.buttonText}>Enregistrer les modifications</Text>
        </Pressable>
      </ScrollView>
      <AddButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginRight: 20,
    marginTop: 10,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  infoLabel: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  info: {
    fontSize: 18,
  },
  editButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 30,
  },  
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  }  
});
