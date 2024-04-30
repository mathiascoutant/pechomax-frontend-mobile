import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/Navigation';
import { getSelf } from '../../hooks/users/getSelf';
import { User } from '../../interfaces/User';

export default function Infos() {
  type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const [user, setUser] = useState<User | null>(null);

  const fetchData = async () => {
    try {
      const userData = await getSelf();
      setUser(userData);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const userInfos = navigation.addListener('focus', () => {
      fetchData();
    });

    return userInfos;
  }, [navigation]);

  return (
    <View>
      <View style={styles.header}>
        <Image style={styles.profilePic} source={{ uri: 'https://picsum.photos/200/300' }} />
        <View>
          <Text style={styles.name}>{user ? user.username : 'Non défini'}</Text>
          <Text style={styles.level}>Niveau: {user ? user.score : 'Non défini'}</Text>
          
          <View style={styles.infos}>
            <View style={styles.cityInfos}>
                {!(user?.city && user?.region && user?.zipCode) ? (
                    <Text>Localisation non définie</Text>
                ) : (
                    <>
                        {!!user.city && <Text>{user.city},</Text>}
                        {!!user.region && <Text>{user.region},</Text>}
                        {!!user.zipCode && <Text>{user.zipCode}</Text>}
                    </>
                )}
            </View>
            <Text>{user ? user.email : 'Pas d\'adresse mail'}</Text>
            <Text>{user?.phoneNumber ?? 'Pas de numéro de téléphone'}</Text>
          </View>
          
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
            <Text style={styles.editButton}>Modifier le profil</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
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
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  editButton: {
    color: 'blue',
    fontSize: 16,
  },
  level: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  cityInfos: {
    flexDirection: 'row',
    gap: 5,
    flexWrap: 'wrap',
  },
  infos: {
    marginBottom: 10,
  }
});