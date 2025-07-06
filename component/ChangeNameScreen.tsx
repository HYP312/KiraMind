import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { usePoints } from './PointContext';
import { useNavigation } from '@react-navigation/native';

const ChangeNameScreen = () => {
  const { name, setName } = usePoints();
  const [newName, setNewName] = useState(name);
  const navigation = useNavigation();

  const handleSave = () => {
    setName(newName);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter New Name</Text>
      <TextInput
        style={styles.input}
        value={newName}
        onChangeText={setNewName}
        placeholder="Your Name"
      />
      <Button title="Save Name" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 16, marginBottom: 10 },
  input: {
    borderWidth: 1, borderColor: '#ccc',
    borderRadius: 8, padding: 10,
    marginBottom: 20,
  }
});

export default ChangeNameScreen;
