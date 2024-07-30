import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PaymentMethodScreen = ({ route, navigation }) => {
  const { orderDetails, specialInstructions, totalAmount } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Payment Methods</Text>
      <Text style={styles.totalAmount}>Total Amount: ₹{totalAmount}</Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('OnlinePaymentScreen', { totalAmount, orderDetails, specialInstructions })} 
      >
        <Icon name="payment" size={24} color="#fff" />
        <Text style={styles.buttonText}>Online Payment</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('CardPaymentScreen', { totalAmount, orderDetails, specialInstructions })} 
      >
        <Icon name="credit-card" size={24} color="#fff" />
        <Text style={styles.buttonText}>Card Payment</Text>
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
  totalAmount: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#000000',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E90FF',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
});

export default PaymentMethodScreen;
