import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/Navigation';
import { getSelf } from '../../hooks/users/getSelf';
import { User } from '../../interfaces/User';

export default function Catches() {
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
    <View style={styles.container}>
        <View style={styles.catches}>
            <Text style={styles.title}>Mes prises</Text>
            <View style={styles.catch}>
                <Image style={styles.catchPic} source={{ uri: 'https://picsum.photos/200/300' }} />
                <View style={styles.catchInfos}>
                    <Text style={styles.catchName}>Nom de la prise</Text>
                    <Text style={styles.catchDate}>Date de la prise</Text>
                    <Text style={styles.catchLocation}>Lieu de la prise</Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('EditCatch')}>
            <Text style={styles.edit}>Modifier</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
  },
  catches: {
    padding: '5%',
  },
  title: {
      fontSize: 20,
      fontWeight: '600',
      marginBottom: 10,
  },
  catch: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
  },

  
});
