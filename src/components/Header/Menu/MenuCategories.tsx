import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome, faUser, faWater, faBars, faFish } from '@fortawesome/free-solid-svg-icons';
import { faWikipediaW } from '@fortawesome/free-brands-svg-icons';
import { BIG_TEXT_COLOR } from '../../../utils/colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/Navigation';
import CustomBorderBottom from '../../CustomBorderBottom';

type MenuNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const MenuCategories = ({ navigation }: { navigation: MenuNavigationProp }) => {
  return (
    <View style={styles.categories}>
      <TouchableOpacity style={styles.category} onPress={() => navigation.navigate('Home')}>
        <FontAwesomeIcon icon={faHome} size={25} color={BIG_TEXT_COLOR}/>
        <Text style={styles.titleCategory}>Accueil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.category} onPress={() => navigation.navigate('Profile')}>
        <FontAwesomeIcon icon={faUser} size={25} color={BIG_TEXT_COLOR}/>
        <Text style={styles.titleCategory}>Profil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.category} onPress={() => navigation.navigate('Home')}>
        <FontAwesomeIcon icon={faWater} size={25} color={BIG_TEXT_COLOR}/>
        <Text style={styles.titleCategory}>Où pêcher ?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.category} onPress={() => navigation.navigate('Home')}>
        <FontAwesomeIcon icon={faWikipediaW} size={25} color={BIG_TEXT_COLOR}/>
        <Text style={styles.titleCategory}>Wiki</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.category} onPress={() => navigation.navigate('ConversationsList')}>
        <FontAwesomeIcon icon={faBars} size={25} color={BIG_TEXT_COLOR}/>
        <Text style={styles.titleCategory}>Forums</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.category} onPress={() => navigation.navigate('UserCatchesPage')}>
        <FontAwesomeIcon icon={faFish} size={25} color={BIG_TEXT_COLOR}/>
        <Text style={styles.titleCategory}>Mes prises</Text>
      </TouchableOpacity>    
      <CustomBorderBottom />
    </View>
  );
};

const styles = StyleSheet.create({
  categories: {
    paddingVertical: '10%',
    justifyContent: 'space-between',
  },
  category: {
    padding: 10,
    flexDirection: 'row',
    left: '5%',
  },
  titleCategory: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingLeft: 10,
    color: BIG_TEXT_COLOR,
  },
});

export default MenuCategories;
