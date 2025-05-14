// screens/ContactScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

// Si tu veux utiliser Axios, tu peux l'installer avec 'npm install axios' ou 'yarn add axios'
// import axios from 'axios';

const ContactScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    // Vérification si tous les champs sont remplis
    if (!name || !email || !message) {
      Alert.alert('Erreur', 'Tous les champs sont requis');
      return;
    }

    // Créer un objet avec les données à envoyer
    const formData = {
      name,
      email,
      message,
    };

    try {
      // Envoyer les données via Fetch (ou Axios) à ton backend
      const response = await fetch('https://ton-api-url.com/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        // Si la réponse est correcte, on alerte l'utilisateur
        Alert.alert('Succès', 'Votre message a été envoyé avec succès !');
        // Réinitialiser le formulaire
        setName('');
        setEmail('');
        setMessage('');
      } else {
        // Si l'API renvoie une erreur
        Alert.alert('Erreur', result.message || 'Une erreur est survenue.');
      }
    } catch (error) {
      // En cas d'erreur de connexion
      Alert.alert('Erreur', 'Impossible d\'envoyer le message, vérifiez votre connexion.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contactez-nous</Text>

      <Text style={styles.label}>Nom</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrez votre nom"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrez votre email"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Message</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Entrez votre message"
        value={message}
        onChangeText={setMessage}
        multiline
      />

      <Button title="Envoyer" onPress={handleSubmit} />
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
  label: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: '600',
    color: '#444',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
  },
});

export default ContactScreen;
