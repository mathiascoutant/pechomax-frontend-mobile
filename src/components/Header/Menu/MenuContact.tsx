import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Linking } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faWarning } from '@fortawesome/free-solid-svg-icons/faWarning';
import Toast from 'react-native-toast-message';
import CustomBorderBottom from '../../CustomBorderBottom';

const MenuContact = () => {
  return (
    <View style={styles.contact}>
      <FontAwesomeIcon icon={faWarning} size={25} color='red'/>
      <TouchableOpacity onPress={() => {
        Linking.openURL('mailto:florian.mondaut@ynov.com');
        Toast.show({
            type: 'info',
            text1: 'Un problème avec l\'applications ?',
            text2: 'On espère que ce n\'est pas un poisson d\'avril !',
        })}}>
        <Text style={styles.contactText}>Contacter le support</Text>
      </TouchableOpacity>
      <CustomBorderBottom />
    </View>
  );
};

const styles = StyleSheet.create({
  contact: {
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  contactText: {
    fontWeight: '500',
    fontSize: 15,
    color: 'red',
  }
});

export default MenuContact;
