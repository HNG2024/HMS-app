import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // Import useNavigation

const StockCheckScreen = () => {
  const navigation = useNavigation();  // Get navigation object
  const stocks = [
    { id: '001', name: 'Soap', count: '001' },
    { id: '002', name: 'Shampoo', count: '001' },
    { id: '003', name: 'Conditioner', count: '001' },
    { id: '004', name: 'Shower Gel', count: '001' },
    // Additional items...
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Stock View</Text>
      </View>
      <ScrollView>
        <View style={styles.tableHeader}>
          <Text style={styles.headerCell}>ID</Text>
          <Text style={styles.headerCell}>Name</Text>
          <Text style={styles.headerCell}>Count</Text>
        </View>
        {stocks.map((stock) => (
          <View key={stock.id} style={styles.row}>
            <Text style={styles.cell}>{stock.id}</Text>
            <Text style={styles.cell}>{stock.name}</Text>
            <Text style={styles.cell}>{stock.count}</Text>
          </View>
        ))}
      </ScrollView>
      {/* Wrap the Image in a TouchableOpacity to handle navigation */}
      <TouchableOpacity onPress={() => navigation.navigate('OrderProductScreen')}>
      <Image source={require('../../assets/order Product.png')} style={styles.logo} /> 
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    position: 'relative',
  },
  header: {
    backgroundColor: '#6f42c1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingTop: 40,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  logo: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
    backgroundColor: '#e9ecef',
    paddingVertical: 10,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
    color: '#495057',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
    backgroundColor: '#fff',
  },
  cell: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
    color: '#495057',
    fontSize: 16,
  },
});

export default StockCheckScreen;
