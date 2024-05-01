import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSignOut } from '@fortawesome/free-solid-svg-icons/faSignOut';

const MenuLogOut = ({ handleLogOut }: { handleLogOut: () => void }) => {
    return (
        <View style={styles.logOut}>
            <TouchableOpacity style={styles.logOutContainer} onPress={handleLogOut}>
                <Text style={styles.logOutText}>Quitter le spot</Text>
                <FontAwesomeIcon style={styles.logOutText} icon={faSignOut} size={25}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
  logOut: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: '5%',
    paddingTop: '22%',
    height: '10%',
    alignItems: 'center',
  }, 
  logOutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logOutText: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default MenuLogOut;
