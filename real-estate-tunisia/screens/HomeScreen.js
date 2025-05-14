// screens/HomeScreen.js

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue dans l'application Immobilière</Text>

      <Button
        title="Suivi de l'Évolution des Prix"
        onPress={() => navigation.navigate('PriceTracking')}
      />
      <Button
        title="Ajouter un Bien"
        onPress={() => navigation.navigate('AddProperty')}
      />
      <Button
        title="Vérifier le Prix du Bien"
        onPress={() => navigation.navigate('PriceCheck')}
      />
      <Button
        title="Liste des Biens"
        onPress={() => navigation.navigate('PropertyList')}
      />
      <Button
        title="Contact"
        onPress={() => navigation.navigate('Contact')}
      />
      <Button
        title="Carte des Biens"
        onPress={() => navigation.navigate('Map')}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
});

export default HomeScreen;
