import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LineChart } from 'react-native-chart-kit';

// ⚠️ Import de l’image locale
import TunisiaImage from '../assets/images/tunisia.png';

const HomeScreen = () => {
  const navigation = useNavigation();

  const sampleData = {
    labels: ['Jan', 'Fév', 'Mars', 'Avr', 'Mai'],
    datasets: [
      {
        data: [2000, 2200, 2500, 2300, 2600],
        strokeWidth: 2,
      },
    ],
  };

  const properties = [
    { id: '1', name: 'Terrain à Tunis', price: 120000 },
    { id: '2', name: 'Maison à Sfax', price: 240000 },
    { id: '3', name: 'Local à Sousse', price: 180000 },
  ];

  const renderProperty = ({ item }) => (
    <View style={styles.propertyCard}>
      <Text style={styles.propertyName}>{item.name}</Text>
      <Text style={styles.propertyPrice}>{item.price} TND</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Image source={TunisiaImage} style={styles.image} resizeMode="cover" />

      <Text style={styles.title}>Prix moyen du m² en Tunisie</Text>

      <LineChart
        data={sampleData}
        width={Dimensions.get('window').width - 40}
        height={220}
        yAxisLabel="TND "
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
          labelColor: () => '#000',
          style: { borderRadius: 8 },
        }}
        bezier
        style={{ marginBottom: 20 }}
      />

      <Button
        title="Suivre l'Évolution des Prix"
        onPress={() => navigation.navigate('PriceTracking')}
      />
      <View style={{ marginVertical: 10 }} />
      <Button
        title="Vérifier le Prix d’un Bien"
        onPress={() => navigation.navigate('PriceCheck')}
      />

      <Text style={styles.subtitle}>Biens Récents</Text>
      <FlatList
        data={properties}
        renderItem={renderProperty}
        keyExtractor={(item) => item.id}
        scrollEnabled={false} // 👈 Important pour éviter le conflit avec ScrollView
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 20,
  },
  propertyCard: {
    padding: 15,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 10,
  },
  propertyName: {
    fontSize: 16,
    fontWeight: '500',
  },
  propertyPrice: {
    fontSize: 14,
    color: '#666',
  },
});

export default HomeScreen;
