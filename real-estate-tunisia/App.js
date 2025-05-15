// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Ou autre lib d’icônes

import HomeScreen from './screens/HomeScreen';
import PriceTrackingScreen from './screens/PriceTrackingScreen';
import AddPropertyScreen from './screens/AddPropertyScreen';
import PriceCheckScreen from './screens/PriceCheckScreen';
import PropertyListScreen from './screens/PropertyListScreen';
import ContactScreen from './screens/ContactScreen';
import MapScreen from './screens/MapScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Stack pour chaque onglet si besoin
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Accueil" component={HomeScreen} />
    </Stack.Navigator>
  );
}

function PropertyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Biens" component={PropertyListScreen} />
      <Stack.Screen name="Ajouter" component={AddPropertyScreen} />
      <Stack.Screen name="Carte" component={MapScreen} />
    </Stack.Navigator>
  );
}

function PriceStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Suivi des prix" component={PriceTrackingScreen} />
      <Stack.Screen name="Vérification de prix" component={PriceCheckScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            switch (route.name) {
              case 'Accueil':
                iconName = 'home';
                break;
              case 'Biens':
                iconName = 'business';
                break;
              case 'Prix':
                iconName = 'trending-up';
                break;
              case 'Contact':
                iconName = 'call';
                break;
              default:
                iconName = 'ellipse';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Accueil" component={HomeStack} />
        <Tab.Screen name="Biens" component={PropertyStack} />
        <Tab.Screen name="Prix" component={PriceStack} />
        <Tab.Screen name="Contact" component={ContactScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
