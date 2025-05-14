// screens/MapScreen.js

import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = () => {
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null); // Pour stocker la propriété sélectionnée
  const mapRef = useRef(null); // Référence de la carte pour l'animation

  const properties = [
    {
      id: 1,
      title: 'Maison à Tunis',
      latitude: 36.8065,
      longitude: 10.1815,
      gouvernorat: 'Tunis',
      description: 'Belle maison au cœur de Tunis avec jardin et terrasse.',
      price: '250 000 TND',
    },
    {
      id: 2,
      title: 'Appartement à Sfax',
      latitude: 34.7406,
      longitude: 10.7603,
      gouvernorat: 'Sfax',
      description: 'Appartement moderne à Sfax, avec vue sur la mer.',
      price: '150 000 TND',
    },
    {
      id: 3,
      title: 'Villa à Nabeul',
      latitude: 36.4576,
      longitude: 10.7408,
      gouvernorat: 'Nabeul',
      description: 'Grande villa avec piscine à Nabeul.',
      price: '450 000 TND',
    },
    {
      id: 4,
      title: 'Studio à Monastir',
      latitude: 35.7622,
      longitude: 10.8280,
      gouvernorat: 'Monastir',
      description: 'Studio cosy à Monastir, idéal pour les étudiants.',
      price: '80 000 TND',
    },
    {
      id: 5,
      title: 'Appartement à Bizerte',
      latitude: 37.2750,
      longitude: 9.8730,
      gouvernorat: 'Bizerte',
      description: 'Appartement avec vue sur le port de Bizerte.',
      price: '200 000 TND',
    },
    {
      id: 6,
      title: 'Maison à Sousse',
      latitude: 35.8256,
      longitude: 10.6361,
      gouvernorat: 'Sousse',
      description: 'Maison spacieuse avec jardin à Sousse.',
      price: '300 000 TND',
    },
    {
      id: 7,
      title: 'Penthouse à Hammamet',
      latitude: 36.4025,
      longitude: 10.6186,
      gouvernorat: 'Nabeul',
      description: 'Penthouse luxueux à Hammamet avec vue imprenable.',
      price: '600 000 TND',
    },
    {
      id: 8,
      title: 'Appartement à Kairouan',
      latitude: 35.6743,
      longitude: 9.8766,
      gouvernorat: 'Kairouan',
      description: 'Appartement au centre de Kairouan, proche des commerces.',
      price: '120 000 TND',
    },
    {
      id: 9,
      title: 'Maison à Gabès',
      latitude: 33.8830,
      longitude: 10.1000,
      gouvernorat: 'Gabès',
      description: 'Maison familiale à Gabès avec un grand jardin.',
      price: '180 000 TND',
    },
    {
      id: 10,
      title: 'Villa à Tozeur',
      latitude: 33.9181,
      longitude: 8.1266,
      gouvernorat: 'Tozeur',
      description: 'Villa avec piscine et vue sur le désert à Tozeur.',
      price: '550 000 TND',
    },
  ];

  useEffect(() => {
    setLoading(false); // Suppression du chargement, plus besoin de récupérer les données GeoJSON
  }, []);

  const handleMarkerPress = (property) => {
    setSelectedProperty(property); // Affiche les détails de la propriété sélectionnée

    // Zoom sur la position du marqueur
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: property.latitude,
        longitude: property.longitude,
        latitudeDelta: 0.005, // Niveau de zoom (ajuste selon tes besoins)
        longitudeDelta: 0.005, // Niveau de zoom (ajuste selon tes besoins)
      }, 1000); // Animation sur 1 seconde
    }
  };

  const closeModal = () => {
    setSelectedProperty(null); // Ferme le modal en réinitialisant la propriété sélectionnée
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <MapView
          ref={mapRef} // Attache la référence à la carte
          style={styles.map}
          initialRegion={{
            latitude: 34.8,
            longitude: 10.2,
            latitudeDelta: 5,
            longitudeDelta: 5,
          }}
          mapType="satellite" // Vue satellite
        >
          {properties.map(property => (
            <Marker
              key={property.id}
              coordinate={{
                latitude: property.latitude,
                longitude: property.longitude,
              }}
              title={property.title}
              description={`Gouvernorat: ${property.gouvernorat}`}
              onPress={() => handleMarkerPress(property)} // Appel lors du clic
            />
          ))}
        </MapView>
      )}

      {selectedProperty && (
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{selectedProperty.title}</Text>
          <Text style={styles.modalDescription}>{selectedProperty.description}</Text>
          <Text style={styles.modalPrice}>{selectedProperty.price}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeButtonText}>Fermer</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    width: '100%',
  },
  modalContent: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 14,
    marginBottom: 10,
  },
  modalPrice: {
    fontSize: 16,
    color: 'green',
    marginBottom: 15,
  },
  closeButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 14,
  },
});

export default MapScreen;
