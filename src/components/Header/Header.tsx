import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/Navigation';
import { useNavigation } from '@react-navigation/native';

export const Header = ({ menu, setMenu }: { menu: boolean, setMenu: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const toggleMenu = () => {
    setMenu(!menu); 
  };

  type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

  const navigation = useNavigation<RegisterScreenNavigationProp>();

  return (
    <View style={[styles.container, {backgroundColor: menu ? 'black' : 'white'}, {opacity: menu ? 0.7 : 1}]}>
    <View style={styles.leftContainer}>
        <TouchableOpacity onPress={toggleMenu} style={styles.burgerButton}>
            <FontAwesomeIcon icon={faBars} size={25}/>
        </TouchableOpacity>
      </View>
      <View style={styles.rightContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image style={styles.logo} source={require('../../../assets/logo.png')} />        
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    height: '100%',
  },
  leftContainer: {
    alignItems: 'flex-start',
    top: 50,
    paddingLeft: '2%',
  },
  rightContainer: {
    flex: 1,
    paddingRight: 40,
    top: 30,
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 50,
    top: 20,
  },
  burgerButton: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    top: 5,
  },
});
