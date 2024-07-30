import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, TouchableOpacity, Text, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const AddProduct = ({ navigation, route }) => {
  const addProduct = route.params.addProduct;

  const [newProductName, setNewProductName] = useState('');
  const [newProductSizes, setNewProductSizes] = useState('');
  const [newProductRate, setNewProductRate] = useState('');

  const handleAddProduct = () => {
    if (newProductName && newProductSizes && newProductRate) {
      addProduct(newProductName, newProductSizes.split(',').map(size => size.trim()), 0, parseFloat(newProductRate));
      navigation.goBack();
    } else {
      Alert.alert("Error", "Please fill out all fields to add a new product.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Product Name"
          value={newProductName}
          onChangeText={setNewProductName}
        />
        <TextInput
          style={styles.input}
          placeholder="Product Sizes (comma to add another Size)"
          value={newProductSizes}
          onChangeText={setNewProductSizes}
        />
        <TextInput
          style={styles.input}
          placeholder="Product Rate"
          value={newProductRate}
          onChangeText={setNewProductRate}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
          <Text style={styles.buttonText}>Add Product</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form: {
    padding: 25,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 4,
    width: width * 0.8,
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddProduct;
