import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Header } from './Header';
import { Menu } from './Menu';

export const HeaderContainer = () => {
  const [menu, setMenu] = useState(false);

  return (
    <View style={styles.container}>
      <View style={[styles.parentContainer, { height: menu ? 1000 : 110 }]}>
        <Header menu={menu} setMenu={setMenu} />

        {menu && <Menu menu={menu} setMenu={setMenu} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    height: '10%',
    width: '100%',
  },
  parentContainer: {
    flexDirection: 'column',
    position: 'absolute',
    width: '100%',
  }
});
