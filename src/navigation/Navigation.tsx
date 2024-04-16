import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';

const Stack = createStackNavigator();

const Navigation = () => {
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
             headerShown: false,
            }}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
