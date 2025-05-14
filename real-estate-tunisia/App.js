// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native'; // Pour une meilleure gestion de l'espace

import HomeScreen from './screens/HomeScreen';
import PriceCheckScreen from './screens/PriceCheckScreen';
import AddPropertyScreen from './screens/AddPropertyScreen';
import PropertyListScreen from './screens/PropertyListScreen';
import PriceTrackingScreen from './screens/PriceTrackingScreen'; // Ajout de l'écran de suivi des prix

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}> {/* SafeAreaView pour éviter que l'UI ne soit masquée par la barre du téléphone */}
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="PriceCheck" component={PriceCheckScreen} />
          <Stack.Screen name="AddProperty" component={AddPropertyScreen} />
          <Stack.Screen name="PropertyList" component={PropertyListScreen} />
          <Stack.Screen name="PriceTracking" component={PriceTrackingScreen} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}
