import React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { Layout } from './src/components/Layout';
import AppNavigator from "./src/navigation/Navigation";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View } from 'react-native';

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 2000);
const queryClient = new QueryClient();

const App = () => {
  return (
    <GestureHandlerRootView>
      <View style={{ height: "100%", width: "100%" }}>
        <QueryClientProvider client={queryClient}>
          <AppNavigator />
        </QueryClientProvider>
      </View>
    </GestureHandlerRootView>
  );
};

export default App;
