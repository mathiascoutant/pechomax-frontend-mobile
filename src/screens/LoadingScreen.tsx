import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import AxiosClient from '../hooks/axios';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

type LoadingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home' | 'Login'>;

interface LoadingScreenProps {
  navigation: LoadingScreenNavigationProp;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const response = await AxiosClient.get('/auth/login');
      if (response.data) {
        setIsLoggedIn(true);
        navigation.replace('Home');
      } else {
        setIsLoggedIn(false);
        navigation.replace('Login');
      }
    } catch (error) {
      navigation.replace('Login');
    }
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingScreen;
