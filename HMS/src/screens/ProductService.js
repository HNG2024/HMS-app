import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, ScrollView, Alert, TouchableOpacity, Text, Dimensions, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const ProductService = ({ navigation }) => {
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [selectedSizes, setSelectedSizes] = useState({
    Soap: '15g',
    Shampoo: '10ml',
    Conditioner: '10ml',
    Moisturizer: '10ml',
    TalcumPowder: '10g',
    
  });
  const [products, setProducts] = useState({
    Soap: 0,
    Shampoo: 0,
    Conditioner: 0,
    Moisturizer: 0,
    TalcumPowder: 0,
  });
  const [rates, setRates] = useState({
    Soap: 10,
    Shampoo: 5,
    Conditioner: 5,
    Moisturizer: 8,
    TalcumPowder: 7,
  });
  const [sizes, setSizes] = useState({
    Soap: ['15g', '20g'],
    Shampoo: ['10ml', '15ml', '20ml', '30ml'],
    Conditioner: ['10ml', '15ml', '20ml', '30ml'],
    Moisturizer: ['10ml', '15ml', '20ml', '30ml'],
    TalcumPowder: ['10g', '15g', '20g'],
  });
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const total = Object.keys(products).reduce((sum, product) => {
      return sum + (products[product] * rates[product]);
    }, 0);
    setTotalAmount(total);
  }, [products, rates]);

  const handleIncrement = (product) => {
    setProducts({ ...products, [product]: products[product] + 1 });
  };

  const handleDecrement = (product) => {
    setProducts({ ...products, [product]: Math.max(0, products[product] - 1) });
  };

  const handleAddProduct = (name, sizesArray, quantity, rate) => {
    setProducts({ ...products, [name]: quantity });
    setSizes({ ...sizes, [name]: sizesArray });
    setSelectedSizes({ ...selectedSizes, [name]: sizesArray[0] });
    setRates({ ...rates, [name]: rate });
  };

  const handleDeleteProduct = (product) => {
    const updatedProducts = { ...products };
    const updatedSizes = { ...sizes };
    const updatedSelectedSizes = { ...selectedSizes };
    const updatedRates = { ...rates };

    delete updatedProducts[product];
    delete updatedSizes[product];
    delete updatedSelectedSizes[product];
    delete updatedRates[product];

    setProducts(updatedProducts);
    setSizes(updatedSizes);
    setSelectedSizes(updatedSelectedSizes);
    setRates(updatedRates);
  };

  const handleSubmit = async () => {
    if (totalAmount === 0) {
      Alert.alert('Error', 'Please select at least one product.');
      return;
    }

    const orderDate = new Date().toLocaleDateString();

    const orderDetails = Object.keys(products)
      .filter(product => products[product] > 0)
      .map(product => ({
        type: 'Order',
        product: product,
        quantity: products[product],
        rate: rates[product],
        size: selectedSizes[product],
        date: orderDate,
        totalAmount: products[product] * rates[product],
      }));

    const existingOrders = await AsyncStorage.getItem('orders');
    const orders = existingOrders ? JSON.parse(existingOrders) : [];
    await AsyncStorage.setItem('orders', JSON.stringify([...orders, ...orderDetails]));

    navigation.navigate('PaymentMethodScreen', {
      orderDetails: orderDetails.map(order => `${order.product} (${order.size}): ${order.quantity} @ ${order.rate}/unit`).join('\n'),
      totalAmount,
      specialInstructions
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {Object.keys(products).map((product) => (
          <View key={product} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.productText}>{product}</Text>
              <TouchableOpacity onPress={() => Alert.alert(
                'Remove Product',
                `Are you sure you want to remove ${product}?`,
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'OK', onPress: () => handleDeleteProduct(product) },
                ],
                { cancelable: false }
              )}>
                <MaterialIcons name="delete" size={24} color="red" />
              </TouchableOpacity>
            </View>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedSizes[product]}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedSizes({ ...selectedSizes, [product]: itemValue })}
              >
                {sizes[product].map((size) => (
                  <Picker.Item key={size} label={size} value={size} />
                ))}
              </Picker>
              <Text style={styles.productRate}>Rate: ₹{rates[product]}</Text>
            </View>
            <View style={styles.counter}>
              <TouchableOpacity onPress={() => handleDecrement(product)} style={styles.counterButton}>
                <Icon name="remove-circle" size={24} color="red" />
              </TouchableOpacity>
              <Text style={styles.productCount}>{products[product]}</Text>
              <TouchableOpacity onPress={() => handleIncrement(product)} style={styles.counterButton}>
                <Icon name="add-circle" size={24} color="green" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <TextInput
          style={styles.input}
          placeholder="Special Instructions"
          value={specialInstructions}
          onChangeText={setSpecialInstructions}
        />
      </ScrollView>
      <Text style={styles.totalAmountText}>Total Amount: ₹{totalAmount}</Text>
      <TouchableOpacity style={styles.orderButton} onPress={handleSubmit}>
        <Text style={styles.orderButtonText}>Order Now</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddProduct', { addProduct: handleAddProduct })}>
        <Icon name="add-circle" size={48} color="green" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 80, // To ensure space for the button
  },
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    elevation: 3, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 }, // Add shadow for iOS
    shadowOpacity: 0.25, // Add shadow for iOS
    shadowRadius: 3.84, // Add shadow for iOS
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  productText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  picker: {
    height: 35,
    flex: 1,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  productRate: {
    fontSize: 16,
    color: '#000',
    marginLeft: 10,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  productCount: {
    fontSize: 18,
    marginHorizontal: 10, // Adjust space between the count and buttons
  },
  counterButton: {
    paddingHorizontal: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 4,
    width: '100%',
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 90,
    right: 20,
  },
  orderButton: {
    backgroundColor: '#1E90FF', // Slightly transparent blue
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginHorizontal: 20,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalAmountText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: 'black',
    padding: 10,
    borderRadius: 4,
    position: 'absolute',
    bottom: 70,
    left: 80,
    right: 80,
  },
});

export default ProductService;
