import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from 'styles';
import styles from './app-navigator.style';
import { centerStyle } from 'styles/mixins';

const Tab = createBottomTabNavigator();
function HomeScreen() {
  return (
    <View style={centerStyle()}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={centerStyle()}>
      <Text>Settings!</Text>
    </View>
  );
}

export default function AppNavigator(props) {
  return (
    <Tab.Navigator>
      <Tab.Screen
      options={{
        tabBarIcon: ({tintColor}) => (
          <Icon name={'home'} size={30} color={Colors.SECONDARY} />
        ),
      }}
      name="Home" 
      component={HomeScreen} 
      />
      <Tab.Screen
      options={{
        title:'',
        tabBarIcon: ({tintColor}) => (
          <View
            style={styles(props).midButtonContainer}>
                  <Icon name={'add'} size={30} color={Colors.WHITE} />
          </View>
        ),
      }}
      name="Center" 
      component={HomeScreen} 
      />
      <Tab.Screen 
       options={{
        tabBarIcon: ({tintColor}) => (
          <Icon name={'home'} size={30} color={Colors.SECONDARY} />
        ),
      }}
      name="Settings" 
      component={SettingsScreen} 
      />
    </Tab.Navigator>
  );
}