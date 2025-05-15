import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddPropertyScreen from '../screens/AddPropertyScreen';
import PriceCheckScreen from '../screens/PriceCheckScreen';

import PriceTrackingScreen from '../screens/PriceTrackingScreen';


const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="HomeMain" component={HomeScreen} options={{ title: 'Real Estate Tunisia' }} />
    <Stack.Screen name="AddProperty" component={AddPropertyScreen} options={{ title: 'Ajouter un bien' }} />
    <Stack.Screen name="PriceCheck" component={PriceCheckScreen} options={{ title: 'Vérifier un prix' }} />

    <Stack.Screen
        name="PriceTracking"
        component={PriceTrackingScreen}
        options={{ title: "Suivi des prix" }}
    />

  </Stack.Navigator>
);

export default HomeStack;
