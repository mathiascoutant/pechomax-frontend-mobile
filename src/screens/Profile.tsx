import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/Navigation';
import { getSelf } from '../hooks/users/getSelf';
import { User } from '../interfaces/User';
import AddButton from '../components/AddButton';

export default function Profile() {
  type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getSelf();
        setUser(userData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.profilePic} source={{ uri: 'https://picsum.photos/200/300' }} />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{user ? user.username : 'Non défini'}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
            <Text style={styles.editButton}>Modifier le profil</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.info}>{user ? user.email : 'Non défini'}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Téléphone:</Text>
          <Text style={styles.info}>{user?.phone_number ?? 'Non défini'}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Ville:</Text>
          <Text style={styles.info}>{user?.city ?? 'Non défini'}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Région:</Text>
          <Text style={styles.info}>{user?.region ?? 'Non défini'}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Code postal:</Text>
          <Text style={styles.info}>{user?.zip_code ?? 'Non défini'}</Text>
        </View>
        <Text style={styles.info}>Score: {user ? user.score : 'Non défini'}</Text>
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
  editButton: {
    color: 'blue',
    fontSize: 16,
  },
  scrollContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoLabel: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  info: {
    fontSize: 18,
  },
});
