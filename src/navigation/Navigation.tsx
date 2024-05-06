import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile';
import Conversation from '../screens/Conversation';

import { HeaderContainer } from '../components/Header/HeaderContainer';
import ConversationsList from '../screens/ConversationsList';
import UserCatchesPage from '../screens/Catches';
import CatchDetails from '../screens/CatchDetails';
import NewLocation from '../screens/NewLocation';
import Locations from '../screens/Locations';
import Wiki from '../screens/Wiki';
import WikiArticle from '../screens/WikiArticle';
import LoadingScreen from '../screens/LoadingScreen';
import { Article } from '../interfaces/Article';

const Stack = createStackNavigator();

export type RootStackParamList = {
  Loading: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Profile: undefined;
  EditProfile: undefined;
  ConversationsList: undefined;
  Conversation: { id: string };
  UserCatchesPage: undefined;
  CatchDetails: { id: string };
  NewLocation: undefined;
  Locations: undefined;
  Wiki: undefined;
  WikiArticle: { articleTitle: Article };
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"LoadingScreen"}>
        <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
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
        <Stack.Screen 
          name="ConversationsList" 
          component={ConversationsList}
          options={{
            title: 'ConversationsList',
            header: () => <HeaderContainer />,
          }}
        />
        <Stack.Screen 
          name="UserCatchesPage" 
          component={UserCatchesPage}
          options={{
            title: 'UserCatchesPage',
            header: () => <HeaderContainer />,
          }}
        />
        <Stack.Screen 
          name="CatchDetails" 
          component={CatchDetails}
          options={{
            title: 'CatchDetails',
            header: () => <HeaderContainer />,
          }}
        />
        <Stack.Screen 
          name="NewLocation" 
          component={NewLocation}
          options={{
            title: 'NewLocation',
            header: () => <HeaderContainer />,
          }}
        />
        <Stack.Screen 
          name="Locations" 
          component={Locations}
          options={{
            title: 'Locations',
            header: () => <HeaderContainer />,
          }}
        />
         <Stack.Screen 
          name="Wiki" 
          component={Wiki}
          options={{
            title: 'Wiki',
            header: () => <HeaderContainer />,
          }}
        />
        <Stack.Screen 
          name="WikiArticle" 
          component={WikiArticle}
          options={{
            title: 'WikiArticle',
            header: () => <HeaderContainer />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
