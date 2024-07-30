import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Alert } from 'react-native';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { REACT_APP_API_URL } from '@env';
import { getUid } from '../storageUtils'; // Adjust the path as necessary

const InvoiceScreen = ({ route, navigation }) => {
  const { bookingDetails } = route.params;

  if (!bookingDetails) {
    Alert.alert('Error', 'Booking details are missing');
    navigation.goBack();
    return null;
  }

  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserId = await getUid();
      console.log('Fetched userId:', storedUserId);
      setUserId(storedUserId);
    };

    fetchUserId();
   
  }, []);

  // Add userId to bookingDetails
  const updatedBookingDetails = { ...bookingDetails, setUserId };

  const {
    roomNumber, roomType, customerId, name, maleCount, femaleCount, childrenCount,
    address, phoneNumber, checkInDate, checkOutDate, price, discount, gstPercentage,
    status, calculatedPrice, bookingType, checkInTime, idType, idNumber, passportNumber,
    totalGuests, aadhaarImage, panImage, passportImage,
  } = updatedBookingDetails;

  const handleSyncWithBackend = async () => {
    try {
      await axios.post(`${REACT_APP_API_URL}/api/bookRoom`, updatedBookingDetails, {
      });

      Alert.alert('Success', 'Booking saved successfully');
      navigation.navigate('BookingSummary', { bookingDetails });
    } catch (error) {
      console.error('Failed to sync with backend:', error);
      Alert.alert('Error', 'Failed to sync booking with the backend.');
    }
  };

  const handlePrint = async () => {
    const htmlContent = `
      <html>
      <body>
        <h1>Booking Invoice</h1>
        <p><strong>Booking Date:</strong> ${new Date().toLocaleDateString()}</p>
        <p><strong>Check-in Date:</strong> ${new Date(checkInDate).toLocaleDateString()} at ${checkInTime}</p>
        <p><strong>Check-out Date:</strong> ${new Date(checkOutDate).toLocaleDateString()}</p>
        <p><strong>Room Number:</strong> ${roomNumber}</p>
        <p><strong>Room Type:</strong> ${roomType}</p>
        <p><strong>Guest Name:</strong> ${name}</p>
        <p><strong>Price per Night:</strong> ₹${price}</p>
        <p><strong>Discount:</strong> ${discount}%</p>
        <p><strong>GST:</strong> ${gstPercentage}%</p>
        <p><strong>Status:</strong> ${status}</p>
        <p><strong>Booking Type:</strong> ${bookingType}</p>
        <h2>Total Amount: ₹${calculatedPrice}</h2>
      </body>
      </html>
    `;

    try {
      await Print.printAsync({ html: htmlContent });
    } catch (error) {
      Alert.alert('Error', 'Failed to print the invoice.');
    }
  };

  const handleDownload = async () => {
    const htmlContent = `
      <html>
      <body>
        <h1>Booking Invoice</h1>
        <p><strong>Booking Date:</strong> ${new Date().toLocaleDateString()}</p>
        <p><strong>Check-in Date:</strong> ${new Date(checkInDate).toLocaleDateString()} at ${checkInTime}</p>
        <p><strong>Check-out Date:</strong> ${new Date(checkOutDate).toLocaleDateString()}</p>
        <p><strong>Room Number:</strong> ${roomNumber}</p>
        <p><strong>Room Type:</strong> ${roomType}</p>
        <p><strong>Guest Name:</strong> ${name}</p>
        <p><strong>Price per Night:</strong> ₹${price}</p>
        <p><strong>Discount:</strong> ${discount}%</p>
        <p><strong>GST:</strong> ${gstPercentage}%</p>
        <p><strong>Status:</strong> ${status}</p>
        <p><strong>Booking Type:</strong> ${bookingType}</p>
        <h2>Total Amount: ₹${calculatedPrice}</h2>
      </body>
      </html>
    `;

    const { uri } = await Print.printToFileAsync({ html: htmlContent });

    const dest = `${FileSystem.documentDirectory}invoice.pdf`;

    await FileSystem.moveAsync({
      from: uri,
      to: dest,
    });

    await Sharing.shareAsync(dest, {
      mimeType: 'application/pdf',
      dialogTitle: 'Download Invoice',
      UTI: 'com.adobe.pdf',
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Booking Invoice</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.text}>Booking Date: {new Date().toLocaleDateString()}</Text>
          <Text style={styles.text}>Check-in Date: {new Date(checkInDate).toLocaleDateString()} at {checkInTime}</Text>
          <Text style={styles.text}>Check-out Date: {new Date(checkOutDate).toLocaleDateString()}</Text>
          <Text style={styles.text}>Room Number: {roomNumber}</Text>
          <Text style={styles.text}>Room Type: {roomType}</Text>
          <Text style={styles.text}>Guest Name: {name}</Text>
          <Text style={styles.text}>Price per Night: ₹{price}</Text>
          <Text style={styles.text}>Discount: {discount}%</Text>
          <Text style={styles.text}>GST: {gstPercentage}%</Text>
          <Text style={styles.text}>Status: {status}</Text>
          <Text style={styles.text}>Booking Type: {bookingType}</Text>
          <Text style={styles.totalAmountText}>Total Amount: ₹{calculatedPrice}</Text>
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Print Invoice" onPress={handlePrint} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Download Invoice" onPress={handleDownload} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Sync with Backend" onPress={handleSyncWithBackend} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 50,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#1E90FF',
  },
  detailsContainer: {
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: '#000000',
  },
  buttonWrapper: {
    marginTop: 20,
  },
  totalAmountText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default InvoiceScreen;
