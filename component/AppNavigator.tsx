import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';

import TasksStackNavigator from './TaskStack';
import AccountScreen from './AccountScreen';
import ChangeNameScreen from './ChangeNameScreen';
import ChangePasswordScreen from './ChangePasswordScreen';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  priority: 'low' | 'medium' | 'high';
}

export type RootBottomParamList = {
  Home: undefined;
  AccountStack: undefined;
};

const Tab = createBottomTabNavigator<RootBottomParamList>();
const AccountStack = createStackNavigator();

function AccountStackNavigator() {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen name="Account" component={AccountScreen} options={{ title: 'Account Settings' }} />
      <AccountStack.Screen name="ChangeName" component={ChangeNameScreen} options={{ title: 'Change Name' }} />
      <AccountStack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ title: 'Change Password' }} />
    </AccountStack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }: { route: RouteProp<RootBottomParamList, keyof RootBottomParamList> }) => ({
        tabBarIcon: ({ color, size }: { color: string; size: number }) => {
          let iconName: React.ComponentProps<typeof Ionicons>['name'] = 'home-outline';
          if (route.name === 'Home') iconName = 'home-outline';
          else if (route.name === 'AccountStack') iconName = 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
      })}
    >
      <Tab.Screen
        name="Home"
        component={TasksStackNavigator}
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="AccountStack"
        component={AccountStackNavigator}
        options={{
          tabBarLabel: 'Account',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
