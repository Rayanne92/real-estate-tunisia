// screens/MapScreen.js

import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = () => {
  const properties = [
    {
      id: 1,
      title: 'Maison à Tunis',
      latitude: 36.8065,
      longitude: 10.1815,
    },
    {
      id: 2,
      title: 'Appartement à Sfax',
      latitude: 34.7406,
      longitude: 10.7603,
    },
    // Ajoute d'autres biens ici
  ];

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 34.8,
          longitude: 10.2,
          latitudeDelta: 5,
          longitudeDelta: 5,
        }}
      >
        {properties.map((property) => (
          <Marker
            key={property.id}
            coordinate={{
              latitude: property.latitude,
              longitude: property.longitude,
            }}
            title={property.title}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
