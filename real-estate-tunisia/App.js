// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import PriceCheckScreen from './screens/PriceCheckScreen';
import AddPropertyScreen from './screens/AddPropertyScreen';
import PropertyListScreen from './screens/PropertyListScreen';
import PriceTrackingScreen from './screens/PriceTrackingScreen';
import ContactScreen from './screens/ContactScreen';
import MapScreen from './screens/MapScreen'; // N'oublie pas celui-là

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PriceCheck" component={PriceCheckScreen} />
        <Stack.Screen name="AddProperty" component={AddPropertyScreen} />
        <Stack.Screen name="PropertyList" component={PropertyListScreen} />
        <Stack.Screen name="PriceTracking" component={PriceTrackingScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

