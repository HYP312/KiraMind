import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Define the navigation type to help TypeScript understand our navigation structure
type NavigationProp = {
  navigate: (routeName: string) => void;
};

const BottomNav: React.FC = () => {
  // Use the useNavigation hook with explicit typing
  const navigation = useNavigation<NavigationProp>();
  const [selectedTab, setSelectedTab] = React.useState('Home');

  const handleTabPress = (routeName: string) => {
    setSelectedTab(routeName);
    navigation.navigate(routeName);
  };

  const renderIcon = (routeName: string, isSelected: boolean) => {
    const color = isSelected ? '#007AFF' : '#8E8E93';
    
    if (routeName === 'Home') {
      return <Ionicons name={isSelected ? "home" : "home-outline"} size={24} color={color} />;
    } else if (routeName === 'Account') {
      return <Ionicons name={isSelected ? "person" : "person-outline"} size={24} color={color} />;
    }
    return null;
  };

  const renderLabel = (routeName: string) => {
    if (routeName === 'Home') {
      return 'Home';
    } else if (routeName === 'Account') {
      return 'Account';
    }
    return '';
  };

  return (
    <View style={styles.container}>
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.tabButton}
          onPress={() => handleTabPress('Home')}
          activeOpacity={0.7}
        >
          <View style={[styles.tabButtonContent, selectedTab === 'Home' && styles.selected]}>
            {renderIcon('Home', selectedTab === 'Home')}
            <Text style={[styles.tabLabel, selectedTab === 'Home' && styles.selectedLabel]}>
              {renderLabel('Home')}
            </Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabButton}
          onPress={() => handleTabPress('Account')}
          activeOpacity={0.7}
        >
          <View style={[styles.tabButtonContent, selectedTab === 'Account' && styles.selected]}>
            {renderIcon('Account', selectedTab === 'Account')}
            <Text style={[styles.tabLabel, selectedTab === 'Account' && styles.selectedLabel]}>
              {renderLabel('Account')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E7',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
  },
  tabButtonContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    minWidth: 60,
  },
  selected: {
    backgroundColor: '#E3F2FD',
  },
  tabLabel: {
    color: '#8E8E93',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  selectedLabel: {
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default BottomNav;