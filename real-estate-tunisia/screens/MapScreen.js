import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

const MapScreen = () => {
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [properties, setProperties] = useState([]);
  const mapRef = useRef(null);

  useEffect(() => {
    // Remplace par l'IP de ton serveur / port
    axios.get('http://192.168.1.14:3000/api/properties')
      .then(res => {
        // Transforme les propriétés pour ajouter lat/lng
        // Assure-toi que tes données contiennent latitude et longitude (ou gmaps_link_property à parser)
        const propsWithCoords = res.data.map(p => {
          // Supposons que tu as latitude et longitude en base, sinon parse gmaps_link_property
          // Exemple de parsing si gmaps_link_property = "https://maps.google.com/?q=36.8065,10.1815"
          let latitude = 0;
          let longitude = 0;
          if (p.gmaps_link_property) {
            const match = p.gmaps_link_property.match(/q=([\d.-]+),([\d.-]+)/);
            if (match) {
              latitude = parseFloat(match[1]);
              longitude = parseFloat(match[2]);
            }
          }

          return {
            id: p.id_property,
            title: p.name_property,
            latitude,
            longitude,
            gouvernorat: p.name_governorate,
            description: p.description_property,
            price: p.price_property.toLocaleString() + ' TND',
            type: p.type_property.toLowerCase(), // Pour matcher avec les icones
          };
        });

        setProperties(propsWithCoords);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur fetch propriétés:', err);
        setLoading(false);
      });
  }, []);

  const handleMarkerPress = (property) => {
    setSelectedProperty(property);
    if (mapRef.current && property.latitude && property.longitude) {
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
          {properties.map((property) =>
            property.latitude && property.longitude ? (
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
            ) : null
          )}
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
  container: { flex: 1 },
  map: { flex: 1, width: '100%' },
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
  iconImage: { width: 28, height: 28 },
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
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  modalDescription: { fontSize: 14, marginBottom: 10 },
  modalPrice: { fontSize: 16, color: 'green', marginBottom: 15 },
  closeButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  closeButtonText: { color: 'white', fontSize: 14 },
});

export default MapScreen;
