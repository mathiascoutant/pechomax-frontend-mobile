import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import AddButton from '../components/AddButton';
import LastConversations from '../components/Home/LastConversations';
import { BACKGROUND_COLOR } from '../utils/colors';
import LastCacthes from '../components/Home/LastCatches';
import BestCatchesOfTheWeek from '../components/Home/BestCatches';
import Welcome from '../components/Home/Welcome';

const Home: React.FC = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.globalAuth}>
        <Welcome />
        <BestCatchesOfTheWeek />
        <LastCacthes />        
        <LastConversations />        
      </ScrollView>
      <AddButton />
    </View>
  );
}

const styles = StyleSheet.create({
  globalAuth: {
  },
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
});

export default Home;
