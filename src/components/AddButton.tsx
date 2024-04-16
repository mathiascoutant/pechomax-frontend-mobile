import React, { useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
// import { useSharedValue } from 'react-native-reanimated';

export const AddButton = () => {
 
  const DURATION = 400;
  const STRANSLATE_Y = -80;
  const isOpened = useRef(false);
//   const transYCamera = useSharedValue(0);

  function handlePress() {
    if (isOpened.current) {

    } else {

    }
    isOpened.current = !isOpened.current;
    console.log(isOpened.current);
  }

  return (
    <View style={styles.container}>      
        <Pressable 
            onPress={handlePress}
            style={({pressed}) => pressed ? [styles.plusButton, {transform: [{scale: 0.9}]}] : styles.plusButton}>
            <AntDesignIcons name="plus" size={36} color="white" />
        </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 50,
    right: 30,
    },
  plusButton: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
},
});
