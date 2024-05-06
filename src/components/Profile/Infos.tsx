import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/Navigation';
import { getSelf } from '../../hooks/users/getSelf';
import { User } from '../../interfaces/User';
import CustomBorderBottom from '../CustomBorderBottom';
import { BIG_TEXT_COLOR, PRIMARY_COLOR, TEXT_COLOR } from '../../utils/colors';

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
        <Image style={styles.profilePic} source={{ uri: user?.profilePic}} />
        <View>
          <Text style={styles.name}>{user ? user.username : 'Non défini'}</Text>
          <Text style={styles.level}>Niveau: {user ? user.level?.title : 'Non défini'}</Text>
          
          <View style={styles.infos}>
            <View style={styles.cityInfos}>
                {!(user?.city && user?.region && user?.zipCode) ? (
                    <Text style={styles.cityInfosText}>Localisation non définie</Text>
                ) : (
                    <>
                        {!!user.city && <Text style={styles.cityInfosText}>{user.city},</Text>}
                        {!!user.region && <Text style={styles.cityInfosText}>{user.region},</Text>}
                        {!!user.zipCode && <Text style={styles.cityInfosText}>{user.zipCode}</Text>}
                    </>
                )}
            </View>
            <Text style={styles.cityInfosText}>{user ? user.email : 'Pas d\'adresse mail'}</Text>
            <Text style={styles.cityInfosText}>{user?.phoneNumber ?? 'Pas de numéro de téléphone'}</Text>
          </View>
          
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
            <Text style={styles.editButton}>Modifier le profil</Text>
          </TouchableOpacity>
        </View>
      </View>
      <CustomBorderBottom />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
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
    color: BIG_TEXT_COLOR,
  },
  editButton: {
    color: PRIMARY_COLOR,
    fontSize: 16,
  },
  level: {
    fontWeight: 'bold',
    marginRight: 5,
    color: BIG_TEXT_COLOR,
  },
  cityInfos: {
    flexDirection: 'row',
    gap: 5,
    flexWrap: 'wrap',
  },
  cityInfosText: {
    color: TEXT_COLOR,
  },
  infos: {
    marginBottom: 10,
  }
});