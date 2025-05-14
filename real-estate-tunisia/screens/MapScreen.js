// screens/MapScreen.js

import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';

// Liste des propriétés (avec des données supplémentaires)
const properties = [
  {
    id: 1,
    title: 'Maison à Tunis',
    latitude: 36.8065,
    longitude: 10.1815,
    gouvernorat: 'Tunis',
  },
  {
    id: 2,
    title: 'Appartement à Sfax',
    latitude: 34.7406,
    longitude: 10.7603,
    gouvernorat: 'Sfax',
  },
  {
    id: 3,
    title: 'Villa à Nabeul',
    latitude: 36.4500,
    longitude: 10.7380,
    gouvernorat: 'Nabeul',
  },
  // D'autres propriétés...
];

// Exemple des frontières des gouvernorats sous forme de polygones (ces coordonnées sont fictives, tu devrais utiliser un fichier GeoJSON réel)
const governorateBorders = {
  Tunis: [
    { latitude: 36.800, longitude: 10.150 },
    { latitude: 36.800, longitude: 10.220 },
    { latitude: 36.850, longitude: 10.220 },
    { latitude: 36.850, longitude: 10.150 },
  ],
  Sfax: [
    { latitude: 34.700, longitude: 10.700 },
    { latitude: 34.700, longitude: 10.800 },
    { latitude: 34.750, longitude: 10.800 },
    { latitude: 34.750, longitude: 10.700 },
  ],
  Nabeul: [
    { latitude: 36.400, longitude: 10.700 },
    { latitude: 36.400, longitude: 10.800 },
    { latitude: 36.450, longitude: 10.800 },
    { latitude: 36.450, longitude: 10.700 },
  ],
};

const MapScreen = () => {
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
        {/* Affichage des frontières des gouvernorats */}
        {Object.keys(governorateBorders).map((gouvernorat) => (
          <Polygon
            key={gouvernorat}
            coordinates={governorateBorders[gouvernorat]}
            strokeColor="rgba(0, 0, 0, 0.5)"
            fillColor="rgba(0, 255, 0, 0.1)"
            strokeWidth={2}
          />
        ))}

        {/* Affichage des propriétés */}
        {properties.map((property) => (
          <Marker
            key={property.id}
            coordinate={{
              latitude: property.latitude,
              longitude: property.longitude,
            }}
            title={property.title}
            description={`Gouvernorat: ${property.gouvernorat}`}
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
