// screens/PriceTrackingScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const PriceTrackingScreen = () => {
  const [city, setCity] = useState('Tunis');  // L'état pour la ville sélectionnée
  const [data, setData] = useState([]); // L'état pour les données des prix
  
  const cities = ['Tunis', 'Sfax', 'Sousse', 'Bizerte', 'Nabeul']; // Liste des villes

  // Exemple de données pour les prix du m²
  const sampleData = {
    Tunis: [
      { date: '2023-01', price: 2500 },
      { date: '2023-02', price: 2600 },
      { date: '2023-03', price: 2650 },
      { date: '2023-04', price: 2700 },
      { date: '2023-05', price: 2750 },
    ],
    Sfax: [
      { date: '2023-01', price: 1500 },
      { date: '2023-02', price: 1600 },
      { date: '2023-03', price: 1650 },
      { date: '2023-04', price: 1700 },
      { date: '2023-05', price: 1750 },
    ],
    Sousse: [
      { date: '2023-01', price: 2000 },
      { date: '2023-02', price: 2100 },
      { date: '2023-03', price: 2150 },
      { date: '2023-04', price: 2200 },
      { date: '2023-05', price: 2250 },
    ],
    Bizerte: [
      { date: '2023-01', price: 1800 },
      { date: '2023-02', price: 1900 },
      { date: '2023-03', price: 1950 },
      { date: '2023-04', price: 2000 },
      { date: '2023-05', price: 2050 },
    ],
    Nabeul: [
      { date: '2023-01', price: 2200 },
      { date: '2023-02', price: 2300 },
      { date: '2023-03', price: 2350 },
      { date: '2023-04', price: 2400 },
      { date: '2023-05', price: 2450 },
    ],
  };

  // Mise à jour des données chaque fois que la ville change
  useEffect(() => {
    if (sampleData[city]) {
      setData(sampleData[city]);
    } else {
      setData([]); // Si aucune donnée trouvée pour la ville, on met les données à vide
    }
  }, [city]);

  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        data: data.map((item) => item.price),
        strokeWidth: 2,
      },
    ],
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Suivi de l'Évolution des Prix de l'Immobilier</Text>
      
      <Text style={styles.label}>Sélectionnez une ville</Text>
      <Picker
        selectedValue={city}
        onValueChange={(itemValue) => setCity(itemValue)} // Met à jour la ville
        style={styles.picker}
      >
        {cities.map((cityName) => (
          <Picker.Item key={cityName} label={cityName} value={cityName} />
        ))}
      </Picker>

      <Text style={styles.subtitle}>Évolution des prix du m² à {city}</Text>
      
      {/* Vérifier que des données existent avant de rendre le graphique */}
      {data.length > 0 ? (
        <LineChart
          data={chartData}
          width={Dimensions.get('window').width - 40}
          height={220}
          yAxisLabel="TND"
          chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#eff3ff',
            backgroundGradientTo: '#eff3ff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
        />
      ) : (
        <Text style={styles.noDataText}>Aucune donnée disponible pour cette ville.</Text> // Message en cas de données manquantes
      )}
    </ScrollView>
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
    fontSize: 16,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
  },
  noDataText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'red',
    marginTop: 20,
  },
});

export default PriceTrackingScreen;
