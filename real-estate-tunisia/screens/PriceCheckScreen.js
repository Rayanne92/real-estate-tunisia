// screens/PriceCheckScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const PriceCheckScreen = () => {
  const [price, setPrice] = useState('');
  const [surface, setSurface] = useState('');
  const [city, setCity] = useState('Tunis');
  const [message, setMessage] = useState('');

  const cities = ['Tunis', 'Sfax', 'Sousse', 'Bizerte', 'Nabeul']; // Liste des villes

  const handleCheckPrice = () => {
    // Logique de vérification ici
    // Par exemple, calculer le prix moyen dans la ville et comparer avec le prix proposé
    const pricePerM2 = {
      Tunis: 2500,
      Sfax: 1500,
      Sousse: 2000,
      Bizerte: 1800,
      Nabeul: 2200,
    };

    const proposedPrice = parseFloat(price);
    const proposedSurface = parseFloat(surface);

    if (isNaN(proposedPrice) || isNaN(proposedSurface)) {
      setMessage('Veuillez entrer des valeurs valides pour le prix et la surface.');
      return;
    }

    const marketPrice = pricePerM2[city] * proposedSurface;

    if (proposedPrice > marketPrice * 1.2) {
      setMessage('Le prix est trop élevé ! Cela pourrait être une arnaque.');
    } else if (proposedPrice < marketPrice * 0.8) {
      setMessage('Le prix est trop bas ! Soyez prudent.');
    } else {
      setMessage('Le prix semble correct.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vérification du prix d'un bien immobilier</Text>

      <Text>Prix proposé :</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Entrez le prix du bien"
        value={price}
        onChangeText={setPrice}
      />

      <Text>Surface (en m²) :</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Entrez la surface du bien"
        value={surface}
        onChangeText={setSurface}
      />

      <Text>Ville :</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrez la ville"
        value={city}
        onChangeText={setCity}
      />

      <Button title="Vérifier le prix" onPress={handleCheckPrice} />

      {message && <Text style={styles.message}>{message}</Text>}
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
  message: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
    color: 'green',
  },
});

export default PriceCheckScreen;
