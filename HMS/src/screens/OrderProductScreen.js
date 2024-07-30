import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import OtherProductModal from './OtherProductModal';  // Import the OtherProductModal component

const OrderProductScreen = ({ route, navigation }) => {
  const { roomNumber } = route.params || {};

  const [order, setOrder] = useState({
    bedsheetAndTowelQty: '',
    healNGlowProductsQty: '',
    otherProductQty: '',
    roomNumber: roomNumber || '',
    customerName: '',
    otherProductName: ''
  });

  const [isModalVisible, setModalVisible] = useState(false);

  const handleChange = (name, value) => {
    setOrder(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSaveOtherProduct = (name, quantity) => {
    setOrder(prevState => ({
      ...prevState,
      otherProductName: name,
      otherProductQty: quantity
    }));
  };

  const handleOrder = () => {
    navigation.navigate('OrderDetailScreen', {
      roomNumber: order.roomNumber,
      customerName: order.customerName,
    });
  };

  const handleHNGClick = () => {
    navigation.navigate('HNGProduct', {
      healNGlowProductsQty: order.healNGlowProductsQty
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.productList}>
        <ProductItem
          icon="bed-empty"
          title="Bedsheet & Towel"
          qty={order.bedsheetAndTowelQty}
          onQtyChange={(value) => handleChange('bedsheetAndTowelQty', value)}
        />
        <ProductItem
          icon="flask-outline"
          title="HNG"
          qty={order.healNGlowProductsQty}
          onQtyChange={(value) => handleChange('healNGlowProductsQty', value)}
          onOtherProductClick={handleHNGClick}
        />
        <ProductItem
          icon="cube-outline"
          title="Other Product"
          qty={order.otherProductQty}
          onQtyChange={(value) => handleChange('otherProductQty', value)}
          onOtherProductClick={() => setModalVisible(true)}
        />
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Room Number"
          value={order.roomNumber}
          onChangeText={(value) => handleChange('roomNumber', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Customer Name"
          value={order.customerName}
          onChangeText={(value) => handleChange('customerName', value)}
        />
        <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
          <Text style={styles.buttonText}>Order</Text>
        </TouchableOpacity>
      </View>
      <OtherProductModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveOtherProduct}
      />
    </ScrollView>
  );
};

const ProductItem = ({ icon, title, qty, onQtyChange, onOtherProductClick }) => {
  return (
    <View style={styles.productItem}>
      <MaterialCommunityIcons name={icon} size={24} color="black" />
      <Text style={styles.productText}>{title}</Text>
      {onOtherProductClick && (
        <TouchableOpacity onPress={onOtherProductClick}>
          <Text style={styles.linkText}>Click</Text>
        </TouchableOpacity>
      )}
      <TextInput
        style={styles.qtyInput}
        placeholder="Qty"
        keyboardType="numeric"
        value={qty}
        onChangeText={onQtyChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  productList: {
    marginTop: 20,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginTop: 10,
  },
  productText: {
    flex: 1,
    marginLeft: 10,
  },
  qtyInput: {
    width: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    marginLeft: 10,
  },
  form: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop: 10,
  },
  orderButton: {
    backgroundColor: '#6f42c1',
    padding: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginLeft: 10,
  },
});

export default OrderProductScreen;
