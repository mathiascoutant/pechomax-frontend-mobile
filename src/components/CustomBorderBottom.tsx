import React from 'react';
import { View, StyleSheet } from 'react-native';

const CustomBorderBottom = () => {
  return (
    <View style={styles.borderBottom}></View>
  );
};

const styles = StyleSheet.create({
  borderBottom: {
    borderBottomColor: '#414E51',
    borderBottomWidth: 1,
    width: '94%',
    position: 'absolute',
    bottom: 0,
    left: '3%',
  },
});

export default CustomBorderBottom;