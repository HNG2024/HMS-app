import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const HistoryScreen = ({ navigation }) => {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const existingOrders = await AsyncStorage.getItem('orders');
      const orders = existingOrders ? JSON.parse(existingOrders) : [];
      setHistoryData(orders);
    };

    fetchHistory();
  }, []);

  const clearHistory = async () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to clear the history?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: async () => {
            await AsyncStorage.removeItem('orders');
            setHistoryData([]);
          }
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Date</Text>
          <Text style={styles.tableHeaderText}>Product</Text>
          <Text style={styles.tableHeaderText}>Quantity</Text>
          <Text style={styles.tableHeaderText}>Rate</Text>
          <Text style={styles.tableHeaderText}>Size</Text>
          <Text style={styles.tableHeaderText}>Total</Text>
        </View>
        {historyData.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableRowText}>{item.date}</Text>
            <Text style={styles.tableRowText}>{item.product}</Text>
            <Text style={styles.tableRowText}>{item.quantity}</Text>
            <Text style={styles.tableRowText}>{item.rate}</Text>
            <Text style={styles.tableRowText}>{item.size}</Text>
            <Text style={styles.tableRowText}>{item.totalAmount}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.clearButton} onPress={clearHistory}>
          <MaterialIcons name="delete-forever" size={24} color="white" />
          <Text style={styles.clearButtonText}>Clear History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quotationButton} onPress={() => navigation.navigate('QuotationScreen')}>
          <MaterialIcons name="description" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    padding: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#ddd',
    marginTop: 20,
    width: width - 40,
    alignSelf: 'center',
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: width - 40,
    alignSelf: 'center',
  },
  tableRowText: {
    flex: 1,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  clearButton: {
    flexDirection: 'row',
    backgroundColor: 'red',
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginRight: 10,
    flex: 1,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 5,
  },
  quotationButton: {
    backgroundColor: 'blue',
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    width: 60,
  },
});

export default HistoryScreen;
