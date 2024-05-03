import React from 'react';
import { StyleSheet, View } from 'react-native';
import RNActionButton from 'react-native-action-button-warnings-fixed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFish, faMessage, faWater } from '@fortawesome/free-solid-svg-icons';
import { useModalCatch, useModalConversation } from '../contexts/ModalContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/Navigation';

const AddButton: React.FC = () => {
  type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { toggleModalConversation } = useModalConversation();
  const { toggleModalCatch } = useModalCatch();

  return (
    <View style={styles.container}>
      <RNActionButton buttonColor="rgba(231,76,60,1)">
        <RNActionButton.Item style={styles.firstAction} buttonColor='#c7f9cc' title="Nouvelle prise" onPress={toggleModalCatch}>
          <FontAwesomeIcon icon={faFish} size={25}/>
        </RNActionButton.Item>
        <RNActionButton.Item buttonColor='#A7C4E4' title="Nouveau coin de pêche" onPress={() => navigation.navigate("NewLocation")}>
          <FontAwesomeIcon icon={faWater} size={25}/>
        </RNActionButton.Item>
        <RNActionButton.Item buttonColor='#B7DEE3' title="Nouvelle discussion" onPress={toggleModalConversation}>
          <FontAwesomeIcon icon={faMessage} size={25}/>
        </RNActionButton.Item>
      </RNActionButton>
    </View>
  );
};

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
    position: 'absolute',
  },
  container: {
    bottom: '13%',
  },
  firstAction: {
    position: 'absolute',
    right: 100,
  }
});

export default AddButton;
