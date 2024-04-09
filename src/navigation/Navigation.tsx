import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/Login';
import Register from '../screens/Register';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
