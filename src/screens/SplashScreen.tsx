import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/Navigation';

const SplashScreenComponent = ({ setReplaceFunction }) => {
type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const navigation = useNavigation<RegisterScreenNavigationProp>();
  useEffect(() => {
    setReplaceFunction(navigation.replace);
  }, []);

  useEffect(() => {
    const autoLogin = async () => {
      try {
        // Votre logique de connexion automatique ici
        // Si la connexion automatique réussit, utilisez la fonction replace pour naviguer vers Home
      } catch (error) {
        console.error('Auto login error:', error);
        // Si la connexion automatique échoue, utilisez la fonction replace pour naviguer vers Login
      }
    };

    autoLogin();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
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

export default SplashScreenComponent;
