import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import PropertyStack from './PropertyStack';
import MapStack from './MapStack';
import ContactStack from './ContactStack';
import { Ionicons } from '@expo/vector-icons'; // ✅ Utilisation Expo-compatible

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Accueil') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Biens') {
          iconName = focused ? 'list' : 'list-outline';
        } else if (route.name === 'Carte') {
          iconName = focused ? 'map' : 'map-outline';
        } else if (route.name === 'Contact') {
          iconName = focused ? 'call' : 'call-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#007AFF',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name="Accueil" component={HomeStack} />
    <Tab.Screen name="Biens" component={PropertyStack} />
    <Tab.Screen name="Carte" component={MapStack} />
    <Tab.Screen name="Contact" component={ContactStack} />
  </Tab.Navigator>
);

export default TabNavigator;
