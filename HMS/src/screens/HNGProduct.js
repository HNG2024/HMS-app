import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const ProductService = ({ navigation }) => {
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [selectedSizes, setSelectedSizes] = useState({
    soap: '15g',
    shampoo: '10ml',
    conditioner: '10ml',
    moisturizer: '10ml',
    talcumPowder: '10g',
  });
  const [products, setProducts] = useState({
    Soap: 0,
    Shampoo: 0,
    Conditioner: 0,
    Moisturizer: 0,
    TalcumPowder: 0,
  });
  const [sizes, setSizes] = useState({
    Soap: ['15g', '20g'],
    Shampoo: ['10ml', '15ml', '20ml', '30ml'],
    Conditioner: ['10ml', '15ml', '20ml', '30ml'],
    Moisturizer: ['10ml', '15ml', '20ml', '30ml'],
    TalcumPowder: ['10g', '15g', '20g'],
  });

  const handleIncrement = (product) => {
    setProducts({ ...products, [product]: products[product] + 1 });
  };

  const handleDecrement = (product) => {
    setProducts({ ...products, [product]: Math.max(0, products[product] - 1) });
  };

  const handleAddProduct = (name, sizesArray, quantity) => {
    setProducts({ ...products, [name]: quantity });
    setSizes({ ...sizes, [name]: sizesArray });
    setSelectedSizes({ ...selectedSizes, [name]: sizesArray[0] });
  };

  const handleDeleteProduct = (product) => {
    const updatedProducts = { ...products };
    const updatedSizes = { ...sizes };
    const updatedSelectedSizes = { ...selectedSizes };

    delete updatedProducts[product];
    delete updatedSizes[product];
    delete updatedSelectedSizes[product];

    setProducts(updatedProducts);
    setSizes(updatedSizes);
    setSelectedSizes(updatedSelectedSizes);
  };

  const handleSubmit = () => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      Alert.alert(
        "Order Submitted",
        "Your order has been submitted successfully.",
        [{ text: "OK" }]
      );
    } else {
      console.log("Order Submitted: Your order has been submitted successfully.");
    }
    console.log({
      products,
      selectedSizes,
      specialInstructions,
    });
  };

  return (
    <View style={styles.container}>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {Object.keys(products).map((product) => (
          <View key={product} style={styles.productContainer}>
            <Text style={styles.productText}>{product}</Text>
            <Picker
              selectedValue={selectedSizes[product]}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedSizes({ ...selectedSizes, [product]: itemValue })}
            >
              {sizes[product].map((size) => (
                <Picker.Item key={size} label={size} value={size} />
              ))}
            </Picker>
            <View style={styles.counter}>
              <TouchableOpacity onPress={() => handleIncrement(product)} style={styles.counterButton}>
                <Icon name="add-circle" size={24} color="green" />
              </TouchableOpacity>
              <Text style={styles.productCount}>{products[product]}</Text>
              <TouchableOpacity onPress={() => handleDecrement(product)} style={styles.counterButton}>
                <Icon name="remove-circle" size={24} color="red" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteProduct(product)} style={styles.counterButton}>
                <Icon name="trash-bin" size={24} color="gray" />
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

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Order Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: 'green',
    borderRadius: 50,
    justifyContent: 'space-between',
    },
  navButton: {
    marginRight: 15,
     },
  navTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 80, // To ensure space for the button
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 4,
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,
  },
  productText: {
    fontSize: 16,
    width:75, // This makes the product text take up available space
  },
  picker: {
    height: 35,
    width: width * 0.3,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productCount: {
    fontSize: 18,
    marginHorizontal: 10, // Adjust space between the count and buttons
    paddingLeft:0,
  },
  counterButton: {
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductService;
