// navigation/TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import PropertyStack from './PropertyStack';
import MapStack from './MapStack';
import ContactStack from './ContactStack';
import AddPropertyStack from './AddPropertyStack';
import { Ionicons } from '@expo/vector-icons'; // ou ton package d’icônes

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ color, size }) => {
        let iconName;

        switch (route.name) {
          case 'Accueil':
            iconName = 'home';
            break;
          case 'Biens':
            iconName = 'list';
            break;
          case 'Ajouter':
            iconName = 'add';
            break;
          case 'Carte':
            iconName = 'map';
            break;
          case 'Contact':
            iconName = 'call';
            break;
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#007AFF',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name="Accueil" component={HomeStack} />
    <Tab.Screen name="Biens" component={PropertyStack} />
    <Tab.Screen name="Ajouter" component={AddPropertyStack} />
    <Tab.Screen name="Carte" component={MapStack} />
    <Tab.Screen name="Contact" component={ContactStack} />
  </Tab.Navigator>
);

export default TabNavigator;
