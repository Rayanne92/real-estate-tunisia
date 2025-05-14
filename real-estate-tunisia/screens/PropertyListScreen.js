// screens/PropertyListScreen.js

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const gouvernorats = {
  Tunis: ['Tunis', 'La Marsa', 'Le Bardo'],
  Sousse: ['Sousse', 'Hammam Sousse', 'Akouda'],
  Sfax: ['Sfax Ville', 'Sakiet Ezzit', 'Thyna'],
  Nabeul: ['Nabeul', 'Hammamet', 'Dar Chaabane'],
};

const biensImmobiliers = [
  {
    id: '1',
    type: 'Maison',
    prix: 150000,
    surface: 120,
    localisation: 'Tunis',
    gouvernorat: 'Tunis',
    lienAnnonce: 'https://example.com/annonce1',
  },
  {
    id: '2',
    type: 'Terrain',
    prix: 80000,
    surface: 500,
    localisation: 'Sousse',
    gouvernorat: 'Sousse',
    lienAnnonce: 'https://example.com/annonce2',
  },
  {
    id: '3',
    type: 'Local',
    prix: 200000,
    surface: 80,
    localisation: 'Sfax Ville',
    gouvernorat: 'Sfax',
    lienAnnonce: 'https://example.com/annonce3',
  },
  {
    id: '4',
    type: 'Appartement',
    prix: 120000,
    surface: 100,
    localisation: 'Hammamet',
    gouvernorat: 'Nabeul',
    lienAnnonce: 'https://example.com/annonce4',
  },
  {
    id: '5',
    type: 'Maison',
    prix: 180000,
    surface: 150,
    localisation: 'La Marsa',
    gouvernorat: 'Tunis',
    lienAnnonce: 'https://example.com/annonce5',
  },
];

const PropertyListScreen = () => {
  const [selectedGouv, setSelectedGouv] = useState(null);
  const [selectedVille, setSelectedVille] = useState(null);
  const [minPrix, setMinPrix] = useState('');
  const [maxPrix, setMaxPrix] = useState('');
  const [minSurface, setMinSurface] = useState('');
  const [maxSurface, setMaxSurface] = useState('');
  const [gouvOpen, setGouvOpen] = useState(false);
  const [villeOpen, setVilleOpen] = useState(false);
  const [filteredBiens, setFilteredBiens] = useState(biensImmobiliers);

  useEffect(() => {
    filterBiens();
  }, [selectedGouv, selectedVille, minPrix, maxPrix, minSurface, maxSurface]);

  const filterBiens = () => {
    const result = biensImmobiliers.filter((item) => {
      const matchGouv = selectedGouv ? item.gouvernorat === selectedGouv : true;
      const matchVille = selectedVille ? item.localisation === selectedVille : true;
      const matchMinPrix = minPrix ? item.prix >= parseInt(minPrix) : true;
      const matchMaxPrix = maxPrix ? item.prix <= parseInt(maxPrix) : true;
      const matchMinSurface = minSurface ? item.surface >= parseInt(minSurface) : true;
      const matchMaxSurface = maxSurface ? item.surface <= parseInt(maxSurface) : true;

      return (
        matchGouv &&
        matchVille &&
        matchMinPrix &&
        matchMaxPrix &&
        matchMinSurface &&
        matchMaxSurface
      );
    });
    setFilteredBiens(result);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des Biens Immobiliers</Text>

      {/* Filtre Gouvernorat */}
      <Text style={styles.label}>Gouvernorat</Text>
      <DropDownPicker
        open={gouvOpen}
        setOpen={setGouvOpen}
        value={selectedGouv}
        setValue={setSelectedGouv}
        items={Object.keys(gouvernorats).map((gouv) => ({
          label: gouv,
          value: gouv,
        }))}
        placeholder="Choisir un gouvernorat"
        style={styles.dropdown}
        dropDownContainerStyle={{ zIndex: 1000 }}
      />

      {/* Filtre Ville */}
      <Text style={styles.label}>Ville</Text>
      <DropDownPicker
        open={villeOpen}
        setOpen={setVilleOpen}
        value={selectedVille}
        setValue={setSelectedVille}
        items={
          selectedGouv
            ? gouvernorats[selectedGouv].map((ville) => ({
                label: ville,
                value: ville,
              }))
            : []
        }
        placeholder="Choisir une ville"
        style={styles.dropdown}
        dropDownContainerStyle={{ zIndex: 900 }}
        disabled={!selectedGouv}
      />

      {/* Filtre Prix */}
      <View style={styles.filterRow}>
        <TextInput
          style={styles.input}
          placeholder="Prix min"
          keyboardType="numeric"
          value={minPrix}
          onChangeText={setMinPrix}
        />
        <TextInput
          style={styles.input}
          placeholder="Prix max"
          keyboardType="numeric"
          value={maxPrix}
          onChangeText={setMaxPrix}
        />
      </View>

      {/* Filtre Surface */}
      <View style={styles.filterRow}>
        <TextInput
          style={styles.input}
          placeholder="Surface min"
          keyboardType="numeric"
          value={minSurface}
          onChangeText={setMinSurface}
        />
        <TextInput
          style={styles.input}
          placeholder="Surface max"
          keyboardType="numeric"
          value={maxSurface}
          onChangeText={setMaxSurface}
        />
      </View>

      {/* Liste filtrée */}
      <FlatList
        data={filteredBiens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardTitle}>{item.type}</Text>
            <Text>Prix : {item.prix.toLocaleString()} TND</Text>
            <Text>Surface : {item.surface} m²</Text>
            <Text>Localisation : {item.localisation}</Text>
            <Text style={{ color: 'blue' }}>{item.lienAnnonce}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Aucun bien trouvé.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 22,
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  label: {
    fontWeight: '600',
    marginTop: 10,
  },
  dropdown: {
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  filterRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  card: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default PropertyListScreen;
