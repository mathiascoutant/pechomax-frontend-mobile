import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState } from 'react';

import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';
import { Header } from "../components/Header/Header";
import { HeaderContainer } from '../components/Header/HeaderContainer';

const Stack = createStackNavigator();

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

const Navigation = () => {
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    console.log(menu ? 'ouvert' : 'fermé');
  }, [menu]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={Login}
          options={{
            title: 'Login',
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="Register" 
          component={Register}
          options={{
            title: 'Register',
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="Home" 
          component={Home}
          options={{
            title: 'Home',
            header: () => <HeaderContainer />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
