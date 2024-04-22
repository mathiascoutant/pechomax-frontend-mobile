import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Header } from './Header';
import { Menu } from './Menu';
import AddButton from "./../AddButton";

export const HeaderContainer = () => {
  const [menu, setMenu] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.parentContainer}>
        <Header menu={menu} setMenu={setMenu} />

        {menu && <Menu menu={menu} setMenu={setMenu} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'red',
    height: '10%',
    // position: 'absolute',
    width: '100%',
  },
  parentContainer: {
    flexDirection: 'column',
    height: 1000,
    position: 'absolute',
    width: '100%',
  }
});

