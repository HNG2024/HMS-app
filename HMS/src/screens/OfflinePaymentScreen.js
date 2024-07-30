import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

const OfflinePaymentScreen = ({ route, navigation }) => {
  const { totalPrice, roomNumber, roomType, name, id, maleCount, femaleCount, childrenCount, address, phoneNumber, checkInDate, checkOutDate, price, discount, gstPercentage, additionalInfo, bookingType, checkInTime } = route.params;

  const handleConfirmPayment = () => {
    navigation.navigate('InvoicePrint', {
      bookingDetails: {
        roomNumber,
        roomType,
        name,
        checkInDate,
        checkOutDate,
        price,
        discount,
        gstPercentage,
        status: 'Paid',
        calculatedPrice: totalPrice,
        bookingType,
        checkInTime,
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Offline Payment</Text>
      <Text style={styles.text}>Total Price: ₹{totalPrice}</Text>
      <Text style={styles.text}>Please visit our office to make the payment.</Text>
      <View style={styles.buttonWrapper}>
        <Button title="Confirm Payment" onPress={handleConfirmPayment} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#1E90FF',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center',
  },
  buttonWrapper: {
    marginTop: 20,
  },
});

export default OfflinePaymentScreen;
