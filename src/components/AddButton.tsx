import React from 'react';
import { StyleSheet, View } from 'react-native';
import RNActionButton from 'react-native-action-button-warnings-fixed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFish, faMessage, faWater } from '@fortawesome/free-solid-svg-icons';
import { useModal } from '../contexts/ModalContext';

const AddButton: React.FC = () => {
  const { toggleModal } = useModal();

  return (
    <View style={styles.container}>
      <RNActionButton buttonColor="rgba(231,76,60,1)">
        <RNActionButton.Item style={styles.firstAction} buttonColor='#c7f9cc' title="Nouvelle prise" onPress={() => console.log("Belle prise bogoss")}>
          <FontAwesomeIcon icon={faFish} size={25}/>
        </RNActionButton.Item>
        <RNActionButton.Item buttonColor='#A7C4E4' title="Nouveau coin de pêche" onPress={() => console.log("Beau lac bogoss")}>
          <FontAwesomeIcon icon={faWater} size={25}/>
        </RNActionButton.Item>
        <RNActionButton.Item buttonColor='#B7DEE3' title="Nouvelle discussion" onPress={toggleModal}>
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
