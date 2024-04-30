import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/Navigation';
import { getSelf } from '../hooks/users/getSelf';
import { User } from '../interfaces/User';
import AddButton from '../components/AddButton';
import Infos from '../components/Profile/Infos';
import Catches from '../components/Profile/Catches/Catches';
import Posts from '../components/Profile/Posts/Posts';

export default function Profile() {
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
      <ScrollView>
        <Infos />
        <Catches />
        <Posts />        
      </ScrollView>
      <AddButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
