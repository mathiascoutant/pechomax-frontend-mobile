import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AddButton from '../components/AddButton';
import { getSelf } from '../hooks/users/getSelf';
import NewDiscussionModal from '../components/Modals/NewDiscussionModal';
import LastConversations from '../components/Home/LastConversations';
import { BACKGROUND_COLOR } from '../utils/colors';
import LastCacthes from '../components/Home/LastCatches';
import BestCatchesOfTheWeek from '../components/Home/BestCatches';

const Home: React.FC = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.globalAuth}>
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
