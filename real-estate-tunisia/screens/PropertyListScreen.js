import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';

const PropertyListScreen = () => {
  const [gouvOpen, setGouvOpen] = useState(false);
  const [villeOpen, setVilleOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);

  const [selectedGouv, setSelectedGouv] = useState(null);
  const [selectedVille, setSelectedVille] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const [governorates, setGovernorates] = useState([]);
  const [cities, setCities] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch governorates on mount
  useEffect(() => {
    axios.get('http://192.168.1.14:3000/api/governorates')
      .then(res => setGovernorates(res.data))
      .catch(err => console.error(err));
  }, []);

  // Fetch cities when governorate is selected
  useEffect(() => {
    if (selectedGouv) {
      axios.get(`http://192.168.1.14:3000/api/cities/${selectedGouv}`)
        .then(res => setCities(res.data))
        .catch(err => console.error(err));
    } else {
      setCities([]);
      setSelectedVille(null);
    }
  }, [selectedGouv]);

  // Fetch properties when filters change
  useEffect(() => {
    setLoading(true);
    let query = `http://192.168.1.14:3000/api/properties?`;
    if (selectedGouv) query += `id_governorate=${selectedGouv}&`;
    if (selectedVille) query += `id_city=${selectedVille}&`;
    if (selectedType) query += `type=${selectedType}&`;

    axios.get(query)
      .then(res => {
        setProperties(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [selectedGouv, selectedVille, selectedType]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Biens Immobiliers</Text>

      {/* Gouvernorat */}
      <DropDownPicker
        open={gouvOpen}
        setOpen={setGouvOpen}
        value={selectedGouv}
        setValue={setSelectedGouv}
        items={governorates.map((g) => ({
          label: g.name_governorate,
          value: g.id_governorate,
        }))}
        placeholder="Choisir un gouvernorat"
        zIndex={3000}
        zIndexInverse={1000}
        style={styles.dropdown}
      />

      {/* Ville */}
      <DropDownPicker
        open={villeOpen}
        setOpen={setVilleOpen}
        value={selectedVille}
        setValue={setSelectedVille}
        items={cities.map((c) => ({
          label: c.name_city,
          value: c.id_city,
        }))}
        placeholder="Choisir une ville"
        disabled={!selectedGouv}
        zIndex={2000}
        zIndexInverse={2000}
        style={styles.dropdown}
      />

      {/* Type de bien */}
      <DropDownPicker
        open={typeOpen}
        setOpen={setTypeOpen}
        value={selectedType}
        setValue={setSelectedType}
        items={[
          { label: 'Maison', value: 'Maison' },
          { label: 'Appartement', value: 'Appartement' },
          { label: 'Terrain', value: 'Terrain' },
          { label: 'Local', value: 'Local' },
        ]}
        placeholder="Choisir un type"
        zIndex={1000}
        zIndexInverse={3000}
        style={styles.dropdown}
      />

      {/* Liste */}
      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 30 }} />
      ) : (
        <FlatList
          data={properties}
          keyExtractor={(item) => item.id_property.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card}>
              <Text style={styles.cardTitle}>{item.name_property}</Text>
              <Text>{item.type_property} • {item.surface_property} m²</Text>
              <Text>{item.price_property.toLocaleString()} TND</Text>
              <Text>{item.description_property}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Aucun bien trouvé.</Text>}
        />
      )}
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
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  dropdown: {
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 6,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PropertyListScreen;
