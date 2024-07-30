import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { REACT_APP_API_URL } from '@env';
import { getUid } from '../storageUtils'; // Adjust the path as necessary

const AddRoomScreen = () => {
  const [roomNumber, setRoomNumber] = useState('');
  const [floor, setFloor] = useState('');
  const [roomType, setRoomType] = useState('Presidential Suite');
  const [viewType, setViewType] = useState('Ocean View');
  const [bedType, setBedType] = useState('King Size');
  const [maxOccupancy, setMaxOccupancy] = useState('');
  const [roomSize, setRoomSize] = useState('');
  const [pricePerNight, setPricePerNight] = useState('');
  const [amenities, setAmenities] = useState('');
  const [exclusiveServices, setExclusiveServices] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserId = await getUid();
      console.log('Fetched userId:', storedUserId); // Add this log
      setUserId(storedUserId);
    };

    fetchUserId();
  }, []);

  const handleSubmit = async () => {
    console.log('Submitting room with userId:', userId); // Add this log
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/api/addRoom`, {
        userId,
        roomNumber,
        floor,
        roomType,
        viewType,
        bedType,
        maxOccupancy,
        roomSize,
        pricePerNight,
        amenities,
        exclusiveServices,
        isAvailable,
      });
      console.log('Room added successfully:', response.data);
      alert('Luxury Room Added Successfully!');
    } catch (error) {
      console.error('Error adding room:', error.response ? error.response.data : error.message);
      alert('Failed to add room. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Add New Room</Text>
      <TextInput
        style={styles.input}
        placeholder="Room Number"
        value={roomNumber}
        onChangeText={setRoomNumber}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Floor"
        value={floor}
        onChangeText={setFloor}
      />
      <Text style={styles.label}>Room Type</Text>
      <Picker
        selectedValue={roomType}
        onValueChange={(itemValue) => setRoomType(itemValue)}
        style={styles.picker}
      >
      
         <Picker.Item label="Dulex" value="Dulex" />   
         <Picker.Item label="Super Dulex" value="Super Dulex" />
        <Picker.Item label="Presidential Suite" value="Presidential Suite" />
        <Picker.Item label="Royal Suite" value="Royal Suite" />
        <Picker.Item label="Villa" value="Villa" />
      </Picker>
      <Text style={styles.label}>View Type</Text>
      <Picker
        selectedValue={viewType}
        onValueChange={(itemValue) => setViewType(itemValue)}
        style={styles.picker}
      >
         <Picker.Item label="Normel View" value="Normel View" />
         <Picker.Item label="Balcony View" value="Balcony View" />
        <Picker.Item label="Ocean View" value="Ocean View" />
        <Picker.Item label="City View" value="City View" />
        <Picker.Item label="Mountain View" value="Mountain View" />
      </Picker>
      <Text style={styles.label}>Bed Type</Text>
      <Picker
        selectedValue={bedType}
        onValueChange={(itemValue) => setBedType(itemValue)}
        style={styles.picker}
      >
         <Picker.Item label="Single" value="Single" />
         <Picker.Item label="Double" value="Dounble" />
         <Picker.Item label="saparate" value="saparate" />
        <Picker.Item label="King Size" value="King Size" />
        <Picker.Item label="Queen Size" value="Queen Size" />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Maximum Occupancy"
        value={maxOccupancy}
        onChangeText={setMaxOccupancy}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Room Size (sq ft)"
        value={roomSize}
        onChangeText={setRoomSize}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Price per Night ($)"
        value={pricePerNight}
        onChangeText={setPricePerNight}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Amenities (e.g., Mini bar, Jacuzzi)"
        value={amenities}
        onChangeText={setAmenities}
      />
      <TextInput
        style={styles.input}
        placeholder="Exclusive Services (e.g., Butler, Private Chef, Spa Treatments)"
        value={exclusiveServices}
        onChangeText={setExclusiveServices}
      />
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Available</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isAvailable ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={setIsAvailable}
          value={isAvailable}
        />
      </View>
      <Button
        title="Add Luxury Room"
        onPress={handleSubmit}
        color="#0066cc"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export default AddRoomScreen;
