import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/Navigation';
import { useNavigation } from '@react-navigation/native';
import { BACKGROUND_COLOR, TEXT_COLOR } from '../utils/colors';
import AddButton from '../components/AddButton';

interface Article {
    title: string;
}
  
const Wiki: React.FC<{}> = () => {
  type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const articles: Article[] = [
    { title: 'Saumon' },
    { title: 'Truite_arc-en-ciel' },
    { title: 'Pêche_sous-marine' },
    { title: 'Appât' },
    { title: 'Pêche_(halieutique)' },
    { title: 'Pêcheur' },
    { title: 'Poisson' },
    { title: 'Crustacés' },
    { title: 'Canne_à_pêche' },
    { title: 'Mer' },
    { title: 'Bateau' },
    { title: 'Pêche_à_la_mouche' },
  ];

  const renderItem = ({ item }: { item: Article }) => (
    <TouchableOpacity onPress={() => navigation.navigate('WikiArticle', {articleTitle: item.title})}>
      <View style={styles.item}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
      />
      <AddButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 16,
    color: TEXT_COLOR,
  },
});

export default Wiki;
