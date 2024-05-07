import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { BIG_TEXT_COLOR, TEXT_COLOR } from '../../utils/colors';
import { getSelf } from '../../hooks/users/getSelf';
import { User } from '../../interfaces/User';

export default function Welcome() {
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
  }, [user]);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bienvenue sur Pechomax !</Text> 
      <Text style={styles.littleText}>{user?.username},</Text>
      <Text style={styles.littleText}>
        Bienvenue sur Pechomax ! LE forum de pêche du moment ! Ici, vous pourrez partager vos prises, vos techniques, vos spots de pêche, et bien plus encore. 
        Vous êtes prêt à partager votre passion pour la pêche ? Alors, c'est parti ! 🎣
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: '5%',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: BIG_TEXT_COLOR,
    paddingBottom: '5%',
  },
  littleText: {
    fontSize: 16,
    color: TEXT_COLOR,
    left: '3%',
    right: '3%',
  },   
});
