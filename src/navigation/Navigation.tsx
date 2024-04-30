import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState } from 'react';

import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile';
import Conversation from '../screens/Conversation';

import { Header } from "../components/Header/Header";
import { HeaderContainer } from '../components/Header/HeaderContainer';

const Stack = createStackNavigator();

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Profile: undefined;
  EditProfile: undefined;
  Conversation: { id: string };
};

const Navigation = ({}) => {
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
        <Stack.Screen 
          name="Profile" 
          component={Profile}
          options={{
            title: 'Profile',
            header: () => <HeaderContainer />,
          }}
        />
        <Stack.Screen 
          name="EditProfile" 
          component={EditProfile}
          options={{
            title: 'EditProfile',
            header: () => <HeaderContainer />,
          }}
        />
        <Stack.Screen 
          name="Conversation" 
          component={Conversation}
          options={{
            title: 'Conversation',
            header: () => <HeaderContainer />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
