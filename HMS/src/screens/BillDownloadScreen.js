import React, { useEffect, useState } from 'react';
import { Button, View, Text, Alert, FlatList } from 'react-native';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';

const downloadBill = async (customerId) => {
  try {
    const response = await axios.get(`http://192.168.29.174:3000/generate-bill/${customerId}`, {
      responseType: 'blob',
    });

    if (response.status === 200) {
      const fileUri = `${FileSystem.documentDirectory}bill_${customerId}.pdf`;

      await FileSystem.writeAsStringAsync(fileUri, response.data, {
        encoding: FileSystem.EncodingType.Base64,
      });

      Alert.alert('Success', 'Bill downloaded successfully!');
    } else {
      Alert.alert('Error', 'Failed to download the bill');
    }
  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'Failed to download the bill');
  }
};

const BillDownloadScreen = () => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    // Fetch the list of bills from the server
    axios.get('http://192.168.29.174:3000/bills')
      .then(response => {
        setBills(response.data);
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Error', 'Failed to fetch bills');
      });
  }, []);

  const renderBillItem = ({ item }) => (
    <View style={{ padding: 10, borderBottomWidth: 1 }}>
      <Text>Customer ID: {item.customerId}</Text>
      <Text>Customer Name: {item.customerName}</Text>
      <Button title="Download Bill" onPress={() => downloadBill(item.customerId)} />
    </View>
  );

  return (
    <View>
      <FlatList
        data={bills}
        keyExtractor={item => item.customerId}
        renderItem={renderBillItem}
      />
    </View>
  );
};

export default BillDownloadScreen;
