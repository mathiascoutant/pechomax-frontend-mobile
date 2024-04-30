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
import { faCamera, faCity, faMapLocation, faMapPin, faPhone } from '@fortawesome/free-solid-svg-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AxiosClient from '../hooks/axios';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';

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

        if ((newUser as User)?.username?.includes('@')) {
            alert('Le nom d\'utilisateur ne doit pas contenir de \'@\'');
            return;
        }

        const formData = new FormData();
        Object.entries(newUser).forEach(([key, value]) => {
            if (value !== null && value !== undefined && key !== 'profilePic') {
                formData.append(key, value);
            }
        });

        console.log('editedUser', editedUser);
        

        if (editedUser && editedUser.profilePic !== user?.profilePic) {
            const uriParts = editedUser.profilePic.split('.');
            const fileType = uriParts[uriParts.length - 1];
            formData.append('profilePic', {
                uri: editedUser.profilePic,
                name: `profilePic.${fileType}`,
                type: `image/${fileType}`,
            });
        }

        console.log('formData', formData);
        

        await AxiosClient.put('/users/update/self', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        Toast.show({
            type: 'success',
            text1: 'Profil modifié',
            text2: 'Votre poisson a bien été écaillé ! 🐟',
        });
        navigation.navigate('Profile');
    } catch (error) {
        Toast.show({
            type: 'error',
            text1: 'Profil non modifié',
            text2: 'Erreur lors de la modification de votre profil',
        });
        // @ts-ignore
        console.error('Error saving edited user data:', error);
    }
};

  

  const openImagePicker = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permissionResult.granted) {
        alert('Permission to access camera roll is required!');
        return;
      }
  
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      if (!pickerResult.canceled) {
        setEditedUser(prevState => {
          if (prevState === null) return null;
          return { ...prevState, profilePic: pickerResult.assets[0].uri };
        });
      }
    } catch (error) {
      console.error('Error picking image: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.profilePicContainer} onPress={openImagePicker}>
          <Image style={styles.profilePic} source={{ uri: editedUser?.profilePic || user?.profilePic }} />
          <Pressable style={styles.cameraIcon}>
            <FontAwesomeIcon icon={faCamera} size={15} color='#fff' />
          </Pressable>
          <View style={styles.overlay} />
        </Pressable>
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
            onChangeText={text => setEditedUser(prevState => {
              if (prevState === null) return null;
              return { ...prevState, username: text };
            })} />
        </View>
        <View style={styles.infoContainer}>
          <FontAwesomeIcon icon={faEnvelope} size={25}/>
          <TextInput
            style={styles.input}
            value={editedUser ? editedUser.email : ''}
            placeholder='Email'
            onChangeText={text => setEditedUser(prevState => {
              if (prevState === null) return null;
              return { ...prevState, email: text };
            })} />
        </View>
        <View style={styles.infoContainer}>
          <FontAwesomeIcon icon={faPhone} size={25}/>
          <TextInput
            style={styles.input}
            value={editedUser ? editedUser.phoneNumber || '' : ''}
            placeholder='Téléphone'
            onChangeText={text => setEditedUser(prevState => {
              if (prevState === null) return null;
              return { ...prevState, phoneNumber: text };
            })} />
        </View>
        <View style={styles.infoContainer}>
          <FontAwesomeIcon icon={faCity} size={25}/>
          <TextInput
            style={styles.input}
            value={editedUser ? editedUser.city : ''}
            placeholder='Ville'
            onChangeText={text => setEditedUser(prevState => {
              if (prevState === null) return null;
              return { ...prevState, city: text };
            })} />
        </View>
        <View style={styles.infoContainer}>
          <FontAwesomeIcon icon={faMapLocation} size={25}/>
          <TextInput
            style={styles.input}
            value={editedUser ? editedUser.region || '' : ''}
            placeholder='Région'
            onChangeText={text => setEditedUser(prevState => {
              if (prevState === null) return null;
              return { ...prevState, region: text };
            })} 
          />
        </View>
        <View style={styles.infoContainer}>
          <FontAwesomeIcon icon={faMapPin} size={25}/>
          <TextInput
            style={styles.input}
            value={editedUser ? editedUser.zipCode || '' : ''}
            placeholder='Code postal'
            onChangeText={text => setEditedUser(prevState => {
              if (prevState === null) return null;
              return { ...prevState, zipCode: text };
            })} 
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
  },
  profilePicContainer: {
    marginTop: 10,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 20,
    backgroundColor: '#A7C4E4',
    padding: 10,
    borderRadius: 60,
    zIndex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: 120,
    height: 120,
    borderRadius: 60,
    marginRight: 20,
    marginTop: 10,
  },
  
});