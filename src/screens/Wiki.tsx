import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/Navigation';
import { useNavigation } from '@react-navigation/native';
import { BACKGROUND_COLOR, BIG_TEXT_COLOR, TEXT_COLOR } from '../utils/colors';
import AddButton from '../components/AddButton';
import { articles } from '../data/articles';
import { Article } from '../interfaces/Article';
  
const Wiki: React.FC<{}> = () => {
  type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const renderItem = ({ item }: { item: Article }) => (
    <TouchableOpacity onPress={() => navigation.navigate('WikiArticle', {articleTitle: item})}>
      <View style={styles.item}>
        <Text style={styles.title}>{item.display_title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titleWiki}>Wiki</Text>
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
  titleWiki: {
    fontSize: 24,
    color: BIG_TEXT_COLOR,
    textAlign: 'center',
    marginTop: 30,
    marginHorizontal: 20,
    paddingBottom: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});

export default Wiki;
