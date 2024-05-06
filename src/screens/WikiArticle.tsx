import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, ScrollView, Linking, StyleSheet, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/Navigation';
import { RouteProp } from '@react-navigation/native';
import { BACKGROUND_COLOR, BIG_TEXT_COLOR, TEXT_COLOR } from '../utils/colors';
import AddButton from '../components/AddButton';
import { Article } from '../interfaces/Article';

export interface WikiArticleProps {
  route?: RouteProp<RootStackParamList, 'WikiArticle'> | undefined;
}

const WikiArticle: React.FC<WikiArticleProps> = ({ route }: { route?: { params?: { articleTitle: Article } } }) => {
  const { articleTitle } = route?.params ?? { articleTitle: {} as Article };
  const [loading, setLoading] = useState(true);
  const [articleInfo, setArticleInfo] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string | undefined>();

  useEffect(() => {
    const fetchArticleInfo = async () => {
      try {
        const response = await fetch(
          `https://fr.wikipedia.org/w/api.php?action=query&format=json&prop=extracts|pageimages&exintro&titles=${articleTitle.title}&pithumbsize=300`
        );
        const data = await response.json();
        const pageId = Object.keys(data.query.pages)[0];
        const extract = data.query.pages[pageId].extract;
        const cleanedText = extract.replace(/<[^>]+>/g, '');
        setArticleInfo(cleanedText);
        const thumbnail = data.query.pages[pageId].thumbnail?.source;
        setImageUrl(thumbnail);
      } catch (error) {
        console.error('Error fetching article info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticleInfo();
  }, [articleTitle]);

  const openWikipediaPage = () => {
    Linking.openURL(`https://fr.wikipedia.org/wiki/${articleTitle.title}`);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
        <Text style={styles.title}>{articleTitle.display_title}</Text>
        <Text style={styles.content}>{articleInfo}</Text>
        <Text style={styles.link} onPress={openWikipediaPage}>
          Voir sur Wikipedia
        </Text>
      </ScrollView>
      <AddButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: BIG_TEXT_COLOR,
  },
  content: {
    marginBottom: 20,
    color: TEXT_COLOR,
  },
  link: {
    color: 'blue',
  },
});

export default WikiArticle;
