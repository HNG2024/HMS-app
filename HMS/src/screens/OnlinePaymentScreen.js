import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button, Alert } from 'react-native';

const OnlinePaymentScreen = ({ route, navigation }) => {
  const { totalAmount } = route.params;

  const handleConfirmPayment = () => {
    Alert.alert('Payment Confirmed', 'Your payment was successful!', [
      { text: 'OK', onPress: () => navigation.navigate('HNGProduct') },
    ]);
  };

  const handleCancelPayment = () => {
    Alert.alert('Payment Cancelled', 'Your payment has been cancelled.', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Online Payment</Text>
        <Text style={styles.totalPrice}>₹{totalAmount}</Text>
        <Text style={styles.paymentMethod}>Scan to pay with any UPI app</Text>
        <Image source={require('../../assets/g1.png')} style={styles.qrCode} />
        <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>
            <Button title="Confirm Payment" onPress={handleConfirmPayment} />
          </View>
          <View style={styles.buttonWrapper}>
            <Button title="Cancel Payment" onPress={handleCancelPayment} color="red" />
          </View>
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
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#1E90FF',
  },
  totalPrice: {
    fontSize: 36,
    textAlign: 'center',
    color: '#0000ff',
    marginBottom: 10,
  },
  paymentMethod: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    color: '#000000',
  },
  qrCode: {
    width: '100%',
    height: 340,
    aspectRatio: 1,
    marginTop: 15,
  },
  buttonContainer: {
    marginTop: 20,
  },
  buttonWrapper: {
    marginBottom: 10,
  },
});

export default OnlinePaymentScreen;
