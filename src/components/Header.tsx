import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars'
import { Menu } from './Menu';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { LinearGradient } from 'expo-linear-gradient';

export const Header = ({ menu, setMenu }: { menu: boolean, setMenu: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const toggleMenu = () => {
    setMenu(!menu); 
  };

  return (
    <View style={styles.container}>      
    <LinearGradient
            colors={['#c7f9cc', '#A7C4E4']}
            style={styles.background}
        />
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={toggleMenu} style={styles.burgerButton}>
            <FontAwesomeIcon icon={faBars} size={25}/>
        </TouchableOpacity>
      </View>
      <View style={styles.rightContainer}>
        <TouchableOpacity>
            <Image style={styles.logo} source={require('../../assets/logo.png')} />        
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
    height: '12%',
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
    top: 10,
  },
  burgerButton: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
});
