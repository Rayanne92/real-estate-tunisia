// screens/MapScreen.js

import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = () => {
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const mapRef = useRef(null);

  const properties = [
    {
      id: 1,
      title: 'Maison à Tunis',
      latitude: 36.8065,
      longitude: 10.1815,
      gouvernorat: 'Tunis',
      description: 'Belle maison au cœur de Tunis avec jardin.',
      price: '250 000 TND',
      type: 'maison',
    },
    {
      id: 2,
      title: 'Appartement à Sfax',
      latitude: 34.7406,
      longitude: 10.7603,
      gouvernorat: 'Sfax',
      description: 'Appartement moderne à Sfax.',
      price: '150 000 TND',
      type: 'appartement',
    },
    {
      id: 3,
      title: 'Terrain à Nabeul',
      latitude: 36.4510,
      longitude: 10.7356,
      gouvernorat: 'Nabeul',
      description: 'Terrain constructible à Nabeul.',
      price: '100 000 TND',
      type: 'terrain',
    },
    {
      id: 4,
      title: 'Local à Sousse',
      latitude: 35.8256,
      longitude: 10.6084,
      gouvernorat: 'Sousse',
      description: 'Local commercial spacieux à Sousse.',
      price: '300 000 TND',
      type: 'local',
    },
    {
    id: 5,
    title: 'Maison à Djerba',
    latitude: 33.8076,
    longitude: 10.8452,
    gouvernorat: 'Medenine',
    description: 'Charmante maison traditionnelle à Djerba.',
    price: '180 000 TND',
    type: 'maison',
    },
    {
    id: 6,
    title: 'Terrain à Kairouan',
    latitude: 35.6781,
    longitude: 10.0963,
    gouvernorat: 'Kairouan',
    description: 'Terrain agricole bien situé.',
    price: '70 000 TND',
    type: 'terrain',
    },
    {
    id: 7,
    title: 'Appartement à Bizerte',
    latitude: 37.2744,
    longitude: 9.8739,
    gouvernorat: 'Bizerte',
    description: 'Appartement avec vue sur la mer.',
    price: '200 000 TND',
    type: 'appartement',
    },
    {
    id: 8,
    title: 'Local à Gabès',
    latitude: 33.8818,
    longitude: 10.0982,
    gouvernorat: 'Gabès',
    description: 'Local commercial bien placé.',
    price: '250 000 TND',
    type: 'local',
    },
    {
    id: 9,
    title: 'Maison à Monastir',
    latitude: 35.7770,
    longitude: 10.8262,
    gouvernorat: 'Monastir',
    description: 'Maison avec piscine à Monastir.',
    price: '320 000 TND',
    type: 'maison',
    },
    {
    id: 10,
    title: 'Terrain à Tataouine',
    latitude: 32.9297,
    longitude: 10.4518,
    gouvernorat: 'Tataouine',
    description: 'Grand terrain dans le sud tunisien.',
    price: '60 000 TND',
    type: 'terrain',
    },
    {
    id: 11,
    title: 'Appartement à Ariana',
    latitude: 36.8665,
    longitude: 10.1647,
    gouvernorat: 'Ariana',
    description: 'Appartement familial à Ariana.',
    price: '175 000 TND',
    type: 'appartement',
    },
    {
    id: 12,
    title: 'Local à Gafsa',
    latitude: 34.4250,
    longitude: 8.7842,
    gouvernorat: 'Gafsa',
    description: 'Local spacieux au centre-ville.',
    price: '210 000 TND',
    type: 'local',
    },

  ];

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleMarkerPress = (property) => {
    setSelectedProperty(property);
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: property.latitude,
          longitude: property.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        800
      );
    }
  };

  const closeModal = () => {
    setSelectedProperty(null);
  };

  const getIconByType = (type) => {
    switch (type) {
      case 'maison':
        return require('../assets/icons/house.png');
      case 'appartement':
        return require('../assets/icons/apartment.png');
      case 'terrain':
        return require('../assets/icons/land.png');
      case 'local':
        return require('../assets/icons/shop.png');
      default:
        return require('../assets/icons/house.png');
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: 34.8,
            longitude: 10.2,
            latitudeDelta: 5,
            longitudeDelta: 5,
          }}
          mapType="satellite"
        >
          {properties.map((property) => (
            <Marker
              key={property.id}
              coordinate={{
                latitude: property.latitude,
                longitude: property.longitude,
              }}
              onPress={() => handleMarkerPress(property)}
            >
              <View style={styles.iconContainer}>
                <Image
                  source={getIconByType(property.type)}
                  style={styles.iconImage}
                  resizeMode="contain"
                />
              </View>
            </Marker>
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
  },
  map: {
    flex: 1,
    width: '100%',
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  iconImage: {
    width: 28,
    height: 28,
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
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 14,
  },
});

export default MapScreen;
