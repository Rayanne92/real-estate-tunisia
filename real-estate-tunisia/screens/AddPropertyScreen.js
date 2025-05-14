// screens/AddPropertyScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const AddPropertyScreen = () => {
  const [propertyType, setPropertyType] = useState('Maison');
  const [price, setPrice] = useState('');
  const [surface, setSurface] = useState('');
  const [city, setCity] = useState('Tunis');
  const [link, setLink] = useState('');
  const [location, setLocation] = useState('');

  const handleAddProperty = () => {
    console.log({
      propertyType,
      price,
      surface,
      city,
      link,
      location,
    });

    setPropertyType('Maison');
    setPrice('');
    setSurface('');
    setCity('Tunis');
    setLink('');
    setLocation('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter un Bien</Text>

      <Text>Type de bien :</Text>
      <TextInput
        style={styles.input}
        value={propertyType}
        onChangeText={setPropertyType}
      />

      <Text>Prix (en TND) :</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Ex : 250000"
        value={price}
        onChangeText={setPrice}
      />

      <Text>Surface (m²) :</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Ex : 120"
        value={surface}
        onChangeText={setSurface}
      />

      <Text>Ville :</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex : Sfax, Nabeul, etc."
        value={city}
        onChangeText={setCity}
      />

      <Text>Lien de l’annonce (si applicable) :</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex : lien Tayara ou Facebook"
        value={link}
        onChangeText={setLink}
      />

      <Text>Localisation du bien :</Text>
      <TextInput
        style={styles.input}
        placeholder="Adresse ou lien Google Maps"
        value={location}
        onChangeText={setLocation}
      />

      <Button title="Enregistrer le bien" onPress={handleAddProperty} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
});

export default AddPropertyScreen;
