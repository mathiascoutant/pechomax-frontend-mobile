import React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as SplashScreen from 'expo-splash-screen';
import AppNavigator from "./src/navigation/Navigation";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View } from 'react-native';
import { ModalProvider } from './src/contexts/ModalContext';
import Toast from 'react-native-toast-message';
import { StatusBar } from 'expo-status-bar';
import NewDiscussionModal from './src/components/Modals/NewDiscussionModal';
import NewCatchModal from './src/components/Modals/NewCatchModal';

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 2000);
const queryClient = new QueryClient();

const App = () => {
  return (
    <GestureHandlerRootView>
      <View style={{ height: "100%", width: "100%" }}>
        <QueryClientProvider client={queryClient}>
          <ModalProvider>
            <AppNavigator />
            <NewDiscussionModal onCreateDiscussion={(_conversation, _message) => {}} />
            <NewCatchModal />
            <Toast />
            <StatusBar style="light" />
          </ModalProvider>
        </QueryClientProvider>
      </View>
    </GestureHandlerRootView>
  );
};

export default App;
