
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';

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

type TaskDetailsRouteProp = RouteProp<TasksStackParamList, 'TaskDetails'>;

const TaskDetailsScreen: React.FC = () => {
  const route = useRoute<TaskDetailsRouteProp>();
  const navigation = useNavigation();
  const { task, onToggle } = route.params;
  const { addPoints } = usePoints(); 

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return '#ff4757';
      case 'medium': return '#ffa502';
      case 'low': return '#2ed573';
      default: return '#57606f';
    }
  };

  const handleComplete = () => {
    const updated = { ...task, completed: true };
    let earnedPoints = 0;
    if (task.priority === 'high') earnedPoints = 100;
    else if (task.priority === 'medium') earnedPoints = 50;
    else if (task.priority === 'low') earnedPoints = 20;
    addPoints(earnedPoints);
    onToggle(updated);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.description}>{task.description}</Text>
      <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(task.priority) }]}> 
        <Text style={styles.priorityText}>{task.priority}</Text>
      </View>
      <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
        <Text style={styles.buttonText}>Mark as Completed</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f3f6',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2c3e50'
  },
  description: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 20,
  },
  priorityBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 20,
  },
  priorityText: {
    color: '#fff',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  completeButton: {
    backgroundColor: '#27ae60',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default TaskDetailsScreen;
