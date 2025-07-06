
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, TextInput, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Define TypeScript interfaces for tasks and app state
interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface AppState {
  tasks: Task[];
  newTaskText: string;
}

// Neumorphic styles
const NeumorphicStyles = StyleSheet.create({
  container: {
    backgroundColor: '#ECF0F3',
  },
  neumorphicBox: {
    padding: 16,
    borderRadius: 8,
    overflow: 'hidden',
    boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.05), inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
    backgroundColor: '#FFFFFF',
  },
  neumorphicInput: {
    ...NeumorphicStyles.neumorphicBox,
    borderRadius: 24,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  completedTask: {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
  trashIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
});

// Home Screen Component
const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');

  const addTask = () => {
    if (newTaskText.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        text: newTaskText,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setNewTaskText('');
    }
  };

  const toggleComplete = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <View style={NeumorphicStyles.container}>
      <TextInput
        style={NeumorphicStyles.neumorphicInput}
        placeholder="Add a new task"
        value={newTaskText}
        onChangeText={setNewTaskText}
      />
      <Button title="Add Task" onPress={addTask} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[NeumorphicStyles.neumorphicBox, { marginBottom: 16 }]} >
            <Text style={[item.completed && NeumorphicStyles.completedTask]}>
              {item.text}
            </Text>
            <Ionicons name="md-trash-can" style={NeumorphicStyles.trashIcon} onPress={() => deleteTask(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

// Account Screen Component (placeholder)
const AccountScreen = () => {
  return (
    <View style={NeumorphicStyles.container}>
      <Text>Account Screen</Text>
    </View>
  );
};

// Bottom Navigation
const Tab = createBottomTabNavigator();

const AppStack = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Account" component={AccountScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

// Main App Component
const App = () => {
  return (
    <View style={NeumorphicStyles.container}>
      <AppStack />
    </View>
  );
};

export default App;
