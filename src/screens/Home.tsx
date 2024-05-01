import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AddButton from '../components/AddButton';
import { getSelf } from '../hooks/users/getSelf';
import NewDiscussionModal from '../components/Modals/NewDiscussionModal';
import NewConversations from '../components/Home/NewConversations';
import { BACKGROUND_COLOR } from '../utils/colors';

const Home: React.FC = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.globalAuth}>
        <NewConversations />        
      </ScrollView>
      <AddButton />
      <NewDiscussionModal onCreateDiscussion={(_conversation, _message) => {}} />
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
