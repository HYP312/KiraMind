
import * as React from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Platform
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { scheduleTaskNotification } from './Notifications'; 


import { Picker } from '@react-native-picker/picker';

type TaskPriority = 'low' | 'medium' | 'high';

interface AddTaskParams {
  onSave: (task: {
    title: string;
    description: string;
    completed: boolean;
    priority: TaskPriority;
    reminder?: Date;
  }) => void;
}

type RouteProps = RouteProp<Record<string, AddTaskParams>, string>;

const AddTaskScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProps>();
  const { onSave } = route.params;

  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [priority, setPriority] = React.useState<TaskPriority>('low');
  const [showPicker, setShowPicker] = React.useState(false);
  const [reminder, setReminder] = React.useState<Date>(new Date());

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Validation', 'Title tidak boleh kosong');
      return;
    }

    // Schedule native notification if reminder set
    try {
      await scheduleTaskNotification(
        String(Date.now()),
        `🔔 ${title}`,
        description || 'Time to complete your task!',
        reminder.getTime()
      );
    } catch (error) {
      console.warn('Failed to schedule notification:', error);
    }

    onSave({ title, description, completed: false, priority, reminder });
    navigation.goBack();
  };

  const onChangeDate = (_: any, selected?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (selected) {
      setReminder(selected);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task title"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Enter task description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Priority</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={priority}
          onValueChange={(v: TaskPriority) => setPriority(v)}
        >
          <Picker.Item label="Low" value="low" />
          <Picker.Item label="Medium" value="medium" />
          <Picker.Item label="High" value="high" />
        </Picker>
      </View>

      <Text style={styles.label}>Reminder Time</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowPicker(true)}
      >
        <Text style={styles.dateButtonText}>{reminder.toLocaleString()}</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={reminder}
          mode="datetime"
          display="default"
          onChange={onChangeDate}
        />
      )}

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSave}
        activeOpacity={0.7}
      >
        <Text style={styles.saveButtonText}>Save Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#2c3e50' },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    padding: 12, marginBottom: 16, backgroundColor: '#f9f9f9',
  },
  pickerContainer: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    marginBottom: 16, overflow: 'hidden',
  },
  dateButton: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    padding: 12, marginBottom: 24, backgroundColor: '#f9f9f9',
  },
  dateButtonText: { fontSize: 14, color: '#2c3e50' },
  saveButton: {
    backgroundColor: '#2e86de', paddingVertical: 14,
    borderRadius: 8, alignItems: 'center',
  },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default AddTaskScreen;
