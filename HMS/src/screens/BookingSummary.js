import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, ScrollView, Alert } from 'react-native';

const BookingSummary = ({ route, navigation }) => {
  const { roomNumber, roomType, name, customerId, maleCount, femaleCount, childrenCount, address, phoneNumber, checkInDate, checkOutDate, price, discount, gstPercentage, additionalInfo, totalGuests, bookingType, checkInTime } = route.params;
  const [calculatedPrice, setCalculatedPrice] = useState(0);

  useEffect(() => {
    calculateTotalPrice();
  }, [checkInDate, checkOutDate, price, discount, gstPercentage]);

  const calculateTotalPrice = () => {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 3600 * 24)) || 1; // Ensure at least 1 night is counted
    const totalAmount = parseFloat(price) * nights;
    const totalDiscount = (totalAmount * (parseFloat(discount) / 100)) || 0;
    const amountAfterDiscount = totalAmount - totalDiscount;
    const gst = gstPercentage ? (amountAfterDiscount * (parseFloat(gstPercentage) / 100)) : 0;
    const finalAmount = amountAfterDiscount + gst;
    setCalculatedPrice(finalAmount);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Booking Summary</Text>
        <Image source={require('../../assets/a11.jpg')} style={styles.image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.text}>Booking Date: {new Date().toLocaleDateString()}</Text>
          <Text style={styles.text}>Check-in: {new Date(checkInDate).toLocaleDateString()} at {checkInTime}</Text>
          <Text style={styles.text}>Check-out: {new Date(checkOutDate).toLocaleDateString()}</Text>
          <Text style={styles.text}>Guests: {totalGuests}</Text>
          <Text style={styles.text}>Room Number: {roomNumber}</Text>
          <Text style={styles.text}>Room Type: {roomType}</Text>
          <Text style={styles.text}>Name: {name}</Text>
          <Text style={styles.text}>ID: {customerId}</Text>
          <Text style={styles.text}>Address: {address}</Text>
          <Text style={styles.text}>Phone Number: {phoneNumber}</Text>
          <Text style={styles.text}>Price per Night: ₹{price}</Text>
          <Text style={styles.text}>Discount: {discount}%</Text>
          <Text style={styles.text}>GST: {gstPercentage}%</Text>
          {calculatedPrice !== undefined ? (
            <Text style={styles.totalAmountText}>Total Amount: ₹{calculatedPrice.toFixed(2)}</Text>
          ) : (
            <Text style={styles.totalAmountText}>Total Amount: Calculating...</Text>
          )}
          <Text style={styles.text}>Additional Information: {additionalInfo}</Text>
          <Text style={styles.text}>Booking Type: {bookingType}</Text>
        </View>
        <View style={styles.buttonWrapper}>
          <Button 
            title="Continue to Payment" 
            onPress={() => navigation.navigate('PaymentMethodScreen', {
              totalPrice: calculatedPrice.toFixed(2),
              roomNumber,
              roomType,
              name,
              customerId,
              maleCount,
              femaleCount,
              childrenCount,
              address,
              phoneNumber,
              checkInDate,
              checkOutDate,
              price,
              discount,
              gstPercentage,
              additionalInfo,
              bookingType,
              checkInTime
            })} 
          />
          <Button 
            title="View Invoice"
            onPress={() => navigation.navigate('InvoicePrint', {
              bookingDetails: {
                roomNumber,
                roomType,
                name,
                checkInDate,
                checkOutDate,
                price,
                discount,
                gstPercentage,
                status: 'Unpaid',
                calculatedPrice: calculatedPrice.toFixed(2),
                bookingType,
                checkInTime
              }
            })}
          />
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
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
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

export default BookingSummary;
