// navigation/ContactStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContactScreen from '../screens/ContactScreen';

const Stack = createNativeStackNavigator();

const ContactStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="ContactMain"
      component={ContactScreen}
      options={{ title: 'Contact' }}
    />
  </Stack.Navigator>
);

export default ContactStack;
