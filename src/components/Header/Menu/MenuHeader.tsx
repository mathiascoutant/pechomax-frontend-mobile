import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { BIG_TEXT_COLOR } from '../../../utils/colors';
import { User } from '../../../interfaces/User';
import CustomBorderBottom from '../../CustomBorderBottom';

const MenuHeader = ({ user, toggleMenu }: { user: User, toggleMenu: () => void }) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <View style={styles.profile}>
          <Image style={styles.profilePicture} source={{ uri: user?.profilePic }} />
          <View>
              <Text style={styles.name}>{user?.username}</Text>
              <Text style={styles.name}>{user?.score}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={toggleMenu} style={styles.closeButton}>
          <FontAwesomeIcon icon={faXmark} size={25} color={BIG_TEXT_COLOR}/>
        </TouchableOpacity>
      </View>
      <View style={styles.lastCatch}>
        <Text style={[styles.lastCatchText, {fontWeight: '600'}]}>Dernière prise :</Text>
        <Text style={styles.lastCatchText}>- Espèce</Text>
        <Text style={styles.lastCatchText}>- Lieu</Text>
        <Text style={styles.lastCatchText}>- Taille</Text>
        <Text style={styles.lastCatchText}>- Poids</Text>
      </View>
      <CustomBorderBottom />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: '13%',
    justifyContent: 'space-between',
    paddingBottom: '10%',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  lastCatch: {
    paddingHorizontal: '10%',
    paddingVertical: '5%',
    gap: 5,
  },
  lastCatchText: {
    fontWeight: '500',
    fontSize: 15,
    color: BIG_TEXT_COLOR,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
    color: BIG_TEXT_COLOR,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 50,
    margin: 10,
    right: 0,
  },
  closeButton: {
    borderRadius: 5,
    right: '15%',
  },
});

export default MenuHeader;
