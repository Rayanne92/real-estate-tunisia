import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const ContactScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email || !message) {
      Alert.alert('Erreur', 'Tous les champs sont requis');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://192.168.1.14:3000/api/contact', {
        name,
        email,
        message,
      });

      if (response.status === 200) {
        Alert.alert('Succès', 'Votre message a été envoyé avec succès !');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        Alert.alert('Erreur', 'Une erreur est survenue, veuillez réessayer.');
      }
    } catch (error) {
      Alert.alert('Erreur', 'Impossible d\'envoyer le message, vérifiez votre connexion.');
      console.error(error);
    } finally {
      setLoading(false);
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
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Message</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Entrez votre message"
        value={message}
        onChangeText={setMessage}
        multiline
      />

      <Button title={loading ? 'Envoi en cours...' : 'Envoyer'} onPress={handleSubmit} disabled={loading} />
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
