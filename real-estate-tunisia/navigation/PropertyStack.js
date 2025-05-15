import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PropertyListScreen from '../screens/PropertyListScreen';

const Stack = createNativeStackNavigator();

const PropertyStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="PropertyList" component={PropertyListScreen} options={{ title: 'Liste des biens' }} />
  </Stack.Navigator>
);

export default PropertyStack;
