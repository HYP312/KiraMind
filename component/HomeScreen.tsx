import * as React from 'react';

import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { TasksStackParamList } from './TaskStack';
import { usePoints } from './PointContext';
 

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  priority: 'low' | 'medium' | 'high';
}

// Gunakan tipe yang diimport dari AppNavigator
type HomeScreenNavigationProp = StackNavigationProp<TasksStackParamList, 'HomeScreen'>;


const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { name } = usePoints();
  const [tasks, setTasks] = React.useState<Task[]>([]);

const handleTaskPress = (task: Task) => {
navigation.navigate('TaskDetails', {
  task,
  onToggle: (updated: Task) => {
    setTasks(prev => prev.filter(t => t.id !== updated.id));
  },
});

};


  const handleAddTask = () => {
    navigation.navigate('AddTask', {
      onSave: (newTask: Task) => {
        setTasks(prev => [
          ...prev,
          { ...newTask, id: String(prev.length + 1), completed: true, createdAt: new Date(), updatedAt: new Date() }
        ]);
      }
    });
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return '#ff4757';
      case 'medium': return '#ffa502';
      case 'low': return '#2ed573';
      default: return '#57606f';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Hey {name}, good afternoon!</Text>
      <Text style={styles.header}>My Tasks</Text>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleTaskPress(item)}
            style={styles.taskCard}
            activeOpacity={0.7}
          >
            <View style={styles.taskContent}>
              <View style={styles.taskHeader}>
                <Text style={styles.taskTitle}>{item.title}</Text>
                <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(item.priority) }]}> 
                  <Text style={styles.priorityText}>{item.priority}</Text>
                </View>
              </View>
              <Text style={styles.taskDescription}>{item.description}</Text>
              <View style={styles.taskFooter}>
                <Text style={[styles.statusText, { color: item.completed ? '#2ed573' : '#57606f' }]}> 
                  {item.completed ? 'Completed' : 'Pending'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddTask} activeOpacity={0.7}>
        <Ionicons name="add" size={32} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f1f3f6',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  taskCard: {
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: '#f1f3f6',
    shadowColor: '#ffffff',
    shadowOffset: { width: -6, height: -6 },
    shadowOpacity: 0.7,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  taskContent: {
    padding: 16,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
    textTransform: 'uppercase',
  },
  taskDescription: {
    fontSize: 14,
    color: '#57606f',
    marginBottom: 12,
    lineHeight: 20,
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2e86de',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  welcome: {
  fontSize: 20,
  fontWeight: '600',
  color: '#2c3e50',
  marginBottom: 16,
  textAlign: 'center',
},
});

export default HomeScreen;
