// screens/AddPropertyScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📌 Ajouter un Bien en Tunisie</Text>
      <Text style={styles.subtitle}>
        Contribuez à la transparence du marché immobilier 🇹🇳
      </Text>

      <Text style={styles.label}>Type de bien</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={propertyType}
          style={styles.picker}
          onValueChange={(itemValue) => setPropertyType(itemValue)}
        >
          <Picker.Item label="Maison" value="Maison" />
          <Picker.Item label="Terrain" value="Terrain" />
          <Picker.Item label="Local commercial" value="Local" />
          <Picker.Item label="Appartement" value="Appartement" />
        </Picker>
      </View>

      <Text style={styles.label}>Prix (en TND)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Ex : 250000"
        value={price}
        onChangeText={setPrice}
      />

      <Text style={styles.label}>Surface (m²)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Ex : 120"
        value={surface}
        onChangeText={setSurface}
      />

      <Text style={styles.label}>Ville</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex : Sfax, Nabeul, etc."
        value={city}
        onChangeText={setCity}
      />

      <Text style={styles.label}>Lien de l’annonce (si applicable)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex : lien Tayara ou Facebook"
        value={link}
        onChangeText={setLink}
      />

      <Text style={styles.label}>Localisation du bien</Text>
      <TextInput
        style={styles.input}
        placeholder="Adresse ou lien Google Maps"
        value={location}
        onChangeText={setLocation}
      />

      <TouchableOpacity style={styles.button} onPress={handleAddProperty}>
        <Text style={styles.buttonText}>✅ Enregistrer le bien</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFF5F5',
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#C72C41',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 25,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: '600',
    color: '#444',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  pickerWrapper: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  button: {
    backgroundColor: '#C72C41',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default AddPropertyScreen;
