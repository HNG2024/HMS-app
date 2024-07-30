import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { REACT_APP_API_URL } from '@env';
import { getUid } from '../storageUtils'; // Adjust the path as necessary

const ManageRoomBooking = ({ route, navigation }) => {
  const { bookingId } = route.params;
  const [bookingDetails, setBookingDetails] = useState(null);
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    customerName: '',
    checkinDate: '',
    checkoutDate: '',
    // Add more fields as needed
  });

  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserId = await getUid();
      setUserId(storedUserId);
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(`${REACT_APP_API_URL}/api/editBookingInfo/${bookingId}`, {
          headers: { userId: userId },
        });
        setBookingDetails(response.data);
        setFormData({
          customerName: response.data.customerName,
          checkinDate: response.data.checkinDate,
          checkoutDate: response.data.checkoutDate,
          // Populate more fields as needed
        });
      } catch (error) {
        console.error('Error fetching booking details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchBookingDetails();
    }
  }, [userId]);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(`${REACT_APP_API_URL}/api/editBookingInfo/${bookingId}`, formData, {
        headers: { userId: userId },
      });
      alert('Booking updated successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error updating booking:', error);
      alert('Failed to update booking');
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Edit Booking</Text>
      <TextInput
        style={styles.input}
        placeholder="Customer Name"
        value={formData.customerName}
        onChangeText={(text) => handleInputChange('customerName', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Check-in Date"
        value={formData.checkinDate}
        onChangeText={(text) => handleInputChange('checkinDate', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Check-out Date"
        value={formData.checkoutDate}
        onChangeText={(text) => handleInputChange('checkoutDate', text)}
      />
      {/* Add more fields as needed */}
      <Button title="Update Booking" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#4B0082',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default ManageRoomBooking;
