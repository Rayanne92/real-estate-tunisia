// navigation/AddPropertyStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddPropertyScreen from '../screens/AddPropertyScreen';

const Stack = createNativeStackNavigator();

const AddPropertyStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="AddPropertyMain" component={AddPropertyScreen} options={{ title: 'Ajouter un Bien' }} />
  </Stack.Navigator>
);

export default AddPropertyStack;
