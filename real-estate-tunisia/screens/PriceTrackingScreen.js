// screens/PriceTrackingScreen.js

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { LineChart } from 'react-native-chart-kit';

const sampleData = {
  Tunis: {
    Tunis: [
      { year: 2020, price: 2500 },
      { year: 2021, price: 2600 },
      { year: 2022, price: 2700 },
      { year: 2023, price: 2800 },
    ],
    LeKram: [
      { year: 2020, price: 2200 },
      { year: 2021, price: 2300 },
      { year: 2022, price: 2400 },
      { year: 2023, price: 2500 },
    ],
    LaMarsa: [
      { year: 2020, price: 3000 },
      { year: 2021, price: 3100 },
      { year: 2022, price: 3200 },
      { year: 2023, price: 3300 },
    ],
  },
  Ariana: {
    ArianaVille: [
      { year: 2020, price: 2100 },
      { year: 2021, price: 2200 },
      { year: 2022, price: 2300 },
      { year: 2023, price: 2400 },
    ],
    LaSoukra: [
      { year: 2020, price: 2700 },
      { year: 2021, price: 2800 },
      { year: 2022, price: 2900 },
      { year: 2023, price: 3000 },
    ],
    Raoued: [
      { year: 2020, price: 1800 },
      { year: 2021, price: 1900 },
      { year: 2022, price: 2000 },
      { year: 2023, price: 2100 },
    ],
  },
  Sousse: {
    SousseVille: [
      { year: 2020, price: 2000 },
      { year: 2021, price: 2100 },
      { year: 2022, price: 2200 },
      { year: 2023, price: 2300 },
    ],
    HammamSousse: [
      { year: 2020, price: 1900 },
      { year: 2021, price: 2000 },
      { year: 2022, price: 2100 },
      { year: 2023, price: 2200 },
    ],
    Akouda: [
      { year: 2020, price: 1700 },
      { year: 2021, price: 1800 },
      { year: 2022, price: 1900 },
      { year: 2023, price: 2000 },
    ],
  },
  Sfax: {
    SfaxVille: [
      { year: 2020, price: 1600 },
      { year: 2021, price: 1700 },
      { year: 2022, price: 1800 },
      { year: 2023, price: 1900 },
    ],
    SakietEzzit: [
      { year: 2020, price: 1400 },
      { year: 2021, price: 1500 },
      { year: 2022, price: 1600 },
      { year: 2023, price: 1700 },
    ],
    Thyna: [
      { year: 2020, price: 1300 },
      { year: 2021, price: 1400 },
      { year: 2022, price: 1500 },
      { year: 2023, price: 1600 },
    ],
  },
  Nabeul: {
    NabeulVille: [
      { year: 2020, price: 2100 },
      { year: 2021, price: 2200 },
      { year: 2022, price: 2300 },
      { year: 2023, price: 2400 },
    ],
    Hammamet: [
      { year: 2020, price: 2800 },
      { year: 2021, price: 2900 },
      { year: 2022, price: 3000 },
      { year: 2023, price: 3100 },
    ],
    Kelibia: [
      { year: 2020, price: 1800 },
      { year: 2021, price: 1900 },
      { year: 2022, price: 2000 },
      { year: 2023, price: 2100 },
    ],
  },
};

const PriceTrackingScreen = () => {
  const [governorateOpen, setGovernorateOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [governorate, setGovernorate] = useState(null);
  const [city, setCity] = useState(null);
  const [cities, setCities] = useState([]);
  const [data, setData] = useState([]);

  const governorates = Object.keys(sampleData).map((g) => ({
    label: g,
    value: g,
  }));

  useEffect(() => {
    if (governorate) {
      const cityList = Object.keys(sampleData[governorate]).map((c) => ({
        label: c,
        value: c,
      }));
      setCities(cityList);
      setCity(null); // reset ville
    }
  }, [governorate]);

  useEffect(() => {
    if (governorate) {
      if (city && sampleData[governorate][city]) {
        setData(sampleData[governorate][city]);
      } else {
        // Moyenne des prix dans le gouvernorat
        const allPrices = Object.values(sampleData[governorate]).flat();
        const years = [...new Set(allPrices.map((e) => e.year))];
        const averaged = years.map((year) => {
          const yearPrices = allPrices
            .filter((e) => e.year === year)
            .map((e) => e.price);
          const avg =
            yearPrices.reduce((sum, val) => sum + val, 0) / yearPrices.length;
          return { year, price: Math.round(avg) };
        });
        setData(averaged);
      }
    } else {
      setData([]);
    }
  }, [governorate, city]);

  const chartData = {
    labels: data.map((item) => item.year.toString()),
    datasets: [
      {
        data: data.map((item) => item.price),
        strokeWidth: 2,
      },
    ],
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={styles.title}>Suivi de l'Évolution des Prix de l'Immobilier</Text>

      <Text style={styles.label}>Sélectionnez un gouvernorat</Text>
      <DropDownPicker
        open={governorateOpen}
        setOpen={setGovernorateOpen}
        value={governorate}
        setValue={setGovernorate}
        items={governorates}
        placeholder="Choisir un gouvernorat"
        style={styles.dropdown}
        dropDownContainerStyle={{ zIndex: 1000 }}
        zIndex={3000}
      />

      <Text style={styles.label}>Sélectionnez une ville (optionnel)</Text>
      <DropDownPicker
        open={cityOpen}
        setOpen={setCityOpen}
        value={city}
        setValue={setCity}
        items={cities}
        placeholder="Choisir une ville"
        style={styles.dropdown}
        dropDownContainerStyle={{ zIndex: 900 }}
        zIndex={2000}
        disabled={!governorate}
      />

      {data.length > 0 ? (
        <>
          <Text style={styles.subtitle}>
            Évolution du prix moyen du m² à {city || governorate}
          </Text>
          <LineChart
            data={chartData}
            width={Dimensions.get('window').width - 40}
            height={220}
            yAxisLabel="TND "
            yAxisSuffix=""
            yAxisInterval={1}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              propsForDots: {
                r: '4',
                strokeWidth: '2',
                stroke: '#007AFF',
              },
            }}
            style={{
              marginVertical: 20,
              borderRadius: 16,
            }}
            fromZero
          />
        </>
      ) : (
        <Text style={styles.noDataText}>Aucune donnée disponible.</Text>
      )}
    </KeyboardAvoidingView>
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
    marginTop: 10,
    marginBottom: 5,
  },
  dropdown: {
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
  },
  noDataText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'red',
    marginTop: 20,
  },
});

export default PriceTrackingScreen;
