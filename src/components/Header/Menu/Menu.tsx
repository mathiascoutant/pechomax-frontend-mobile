import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/Navigation';
import { getSelf } from '../../../hooks/users/getSelf';
import MenuHeader from './MenuHeader';
import MenuCategories from './MenuCategories';
import MenuContact from './MenuContact';
import MenuLogOut from './MenuLogOut';
import { BACKGROUND_COLOR } from '../../../utils/colors';
import { User } from '../../../interfaces/User';
import AxiosClient from '../../../hooks/axios';

type MenuNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Menu = ({ menu, setMenu }: { menu: boolean, setMenu: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getSelf();
        setUser(userData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  
  const navigation = useNavigation<MenuNavigationProp>();

  const toggleMenu = () => {
    setMenu(!menu); 
  };

  const handleLogOut = async () => {
    try {
      const response = await AxiosClient.get('/auth/logout');
      navigation.navigate('Home');
    } catch (error) {      
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
      {user && <MenuHeader user={user} toggleMenu={toggleMenu} />}
      <MenuCategories navigation={navigation} setMenu={setMenu}/>
      <MenuContact />
      <MenuLogOut handleLogOut={handleLogOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND_COLOR,
    width: '80%',
    height: '100%',
    top: 0,
    bottom: 0,
    position: 'absolute',
    zIndex: 100,
  },
});

export default Menu;
