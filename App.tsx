import React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as SplashScreen from 'expo-splash-screen';
import { Layout } from './src/components/Layout';
import AppNavigator from "./src/navigation/Navigation";
import 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 2000);
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout >
        <AppNavigator />
      </Layout >
    </QueryClientProvider>
  );
};

export default App;
