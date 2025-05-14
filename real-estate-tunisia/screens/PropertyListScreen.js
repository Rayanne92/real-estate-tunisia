// screens/PropertyListScreen.js

import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

// Données en dur pour les biens immobiliers
const biensImmobiliers = [
  {
    id: '1',
    type: 'Maison',
    prix: '150 000 TND',
    surface: '120 m²',
    localisation: 'Tunis',
    lienAnnonce: 'https://example.com/annonce1',
  },
  {
    id: '2',
    type: 'Terrain',
    prix: '80 000 TND',
    surface: '500 m²',
    localisation: 'Sousse',
    lienAnnonce: 'https://example.com/annonce2',
  },
  {
    id: '3',
    type: 'Local',
    prix: '200 000 TND',
    surface: '80 m²',
    localisation: 'Sfax',
    lienAnnonce: 'https://example.com/annonce3',
  },
];

const PropertyListScreen = () => {
  // Fonction de rendu pour chaque bien immobilier
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.title}>{item.type}</Text>
      <Text>Prix: {item.prix}</Text>
      <Text>Surface: {item.surface}</Text>
      <Text>Localisation: {item.localisation}</Text>
      <Text>Lien: {item.lienAnnonce}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des Biens Immobiliers</Text>
      <FlatList
        data={biensImmobiliers}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});

export default PropertyListScreen;
