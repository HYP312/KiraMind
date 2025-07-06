// Updated AccountScreen with Change Name and Change Password Subpages

import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { usePoints } from './PointContext';


export type AccountStackParamList = {
  AccountScreen: undefined;
  ChangeName: undefined;
  ChangePassword: undefined;
};
const AccountScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<AccountStackParamList>>();
  const { name } = usePoints();
  const { points } = usePoints();

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', marginBottom: 16 }}>
      <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: '#dfe6e9', marginBottom: 8 }} />
      <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#2c3e50' }}>{name}</Text>
  </View> 
      <Text style={{ textAlign: 'center', fontSize: 18, marginBottom: 12 }}>Current Points: {points}</Text>

      <View style={styles.headerContainer}>
        <Text style={styles.title}>Account Settings</Text>
      </View>

      <View style={styles.additionalOptionsContainer}>
        <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('ChangeName')}>
          <Text style={styles.optionText}>Change Name</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('ChangePassword')}>
          <Text style={styles.optionText}>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Change Email</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.optionButton, styles.logoutButton]}>
          <Text style={[styles.optionText, styles.logoutText]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f3f6',
    padding: 20,
  },
  headerContainer: {
    backgroundColor: '#f1f3f6',
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#ffffff',
    shadowOffset: { width: -8, height: -8 },
    shadowOpacity: 0.7,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
  },
  additionalOptionsContainer: {
    backgroundColor: '#f1f3f6',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#ffffff',
    shadowOffset: { width: -6, height: -6 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 6,
  },
  optionButton: {
    backgroundColor: '#f1f3f6',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#ffffff',
    shadowOffset: { width: -4, height: -4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 3,
  },
  optionText: {
    fontSize: 16,
    color: '#34495e',
    fontWeight: '500',
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    marginTop: 10,
  },
  logoutText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default AccountScreen;
