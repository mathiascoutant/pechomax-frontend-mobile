import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars'

export const Header = ({ menu, setMenu }: { menu: boolean, setMenu: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const toggleMenu = () => {
    setMenu(!menu); 
  };

  return (
    <View style={styles.container}>      
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={toggleMenu} style={styles.burgerButton}>
            <FontAwesomeIcon icon={faBars} size={25}/>
        </TouchableOpacity>
      </View>
      <View style={styles.rightContainer}>
        <TouchableOpacity>
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
    height: '10%',
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
});
