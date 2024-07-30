import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';

export default function Concierge() {
  const [searchQuery, setSearchQuery] = useState('');

  const cardData = [
    { name: 'Add Hotel', image: require('../assets/hotel1.png') },
    { name: 'Add Room', image: require('../assets/room2.png') },
    { name: 'Room Booking', image: require('../assets/book.png') },
    { name: 'Manage Room', image: require('../assets/mr.png') },
    { name: 'Regular Customer', image: require('../assets/rc.png') },
    { name: 'Events', image: require('../assets/event.png') },
    { name: 'Stock Management', image: require('../assets/sm.png') },
    { name: 'House Keeping', image: require('../assets/hk1.png') },
    { name: 'Order Product', image: require('../assets/op.png') },
    { name: 'HealNGlow Product', image: require('../assets/hng.png') },
    { name: 'File Manager', image: require('../assets/file.png') },
    { name: 'Invoice', image: require('../assets/invoice.png') },
    { name: 'Inventory', image: require('../assets/inv.png') },
    { name: 'Reports', image: require('../assets/report.png') },
  ];

  const filteredCardData = cardData.filter(card =>
    card.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        placeholderTextColor="#aaa"
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      <Text style={styles.welcomeText}>Free To</Text>
      <Text style={styles.locationText}>Search</Text>
      <ScrollView contentContainerStyle={styles.grid}>
        {filteredCardData.map((card, index) => (
          <TouchableOpacity key={index} style={styles.card}>
            <Image source={card.image} style={styles.cardImage} />
            <Text style={styles.cardText}>{card.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#f8f8f8',
    marginBottom: 20,
  },
  welcomeText: {
    marginTop: 20,
    fontSize: 18,
    color: '#aaa',
    textAlign: 'center',
  },
  locationText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  card: {
    width: '48%',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  cardImage: {
    width: 50,
    height: 50,
  },
  cardText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardSubText: {
    marginTop: 5,
    fontSize: 12,
    color: '#aaa',
  },
});
