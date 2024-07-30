import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CardPaymentScreen = ({ route, navigation }) => {
  const { totalAmount } = route.params;
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');

  const handleConfirmPayment = () => {
    if (!cardNumber || !expiryDate || !cvv || !cardHolderName) {
      Alert.alert('Error', 'Please fill in all the card details.');
      return;
    }
    Alert.alert('Payment Successful', 'Your card payment was successful!', [
      { text: 'OK', onPress: () => navigation.navigate('HNGProduct') },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Card Payment</Text>
      <Text style={styles.text}>Total Price: ₹{totalAmount}</Text>
      <View style={styles.inputContainer}>
        <Icon name="credit-card" size={24} color="#1E90FF" />
        <TextInput
          style={styles.input}
          placeholder="Card Number"
          value={cardNumber}
          onChangeText={setCardNumber}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="date-range" size={24} color="#1E90FF" />
        <TextInput
          style={styles.input}
          placeholder="Expiry Date (MM/YY)"
          value={expiryDate}
          onChangeText={setExpiryDate}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock" size={24} color="#1E90FF" />
        <TextInput
          style={styles.input}
          placeholder="CVV"
          value={cvv}
          onChangeText={setCvv}
          keyboardType="numeric"
          secureTextEntry
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="person" size={24} color="#1E90FF" />
        <TextInput
          style={styles.input}
          placeholder="Card Holder Name"
          value={cardHolderName}
          onChangeText={setCardHolderName}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleConfirmPayment}>
        <Text style={styles.buttonText}>Confirm Payment</Text>
      </TouchableOpacity>
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
  },
  input: {
    height: 40,
    flex: 1,
    marginLeft: 10,
    color: '#000000',
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default CardPaymentScreen;
