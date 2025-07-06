import * as React from 'react';
import * as Notifications from 'expo-notifications';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';
import AppNavigator from './component/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PointProvider } from './component/PointContext';


// Configure handler supaya notif tampil saat app foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,   
    shouldShowList: true,     
  }),
});

export default function App() {
    React.useEffect(() => {
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('task-reminders', {
        name: 'Task Reminders',
        importance: Notifications.AndroidImportance.HIGH,
      });
    }
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PointProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </PointProvider>
    </GestureHandlerRootView>
  );
}
 

