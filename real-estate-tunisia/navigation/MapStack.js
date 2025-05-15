import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from '../screens/MapScreen';

const Stack = createNativeStackNavigator();

const MapStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="MapMain" component={MapScreen} options={{ title: 'Carte des biens' }} />
  </Stack.Navigator>
);

export default MapStack;
