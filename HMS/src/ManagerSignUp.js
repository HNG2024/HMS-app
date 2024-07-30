import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { REACT_APP_API_URL } from '@env';

const ManagerSignUp = ({ navigation }) => {
  const [uId, setUId] = useState('');
  const [employeeName, setEmpName] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [age, setAge] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('manager'); // Default role to manager
  const [uIdError, setUIdError] = useState('');

  const checkUIdAvailability = async (id) => {
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/api/checkUId`, { uId: id });
      return response.data.available;
    } catch (error) {
      console.error('Error checking u_id:', error);
      return false;
    }
  };

  const handleUIdChange = async (text) => {
    setUId(text);
    if (text) {
      const isAvailable = await checkUIdAvailability(text);
      if (!isAvailable) {
        setUIdError('C-ID already taken,So add random number. :)');
        setUId(`${text}${Math.floor(Math.random() * 1000)}`);
      } else {
        setUIdError('');
      }
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/api/managerSignup`, {
        uId,
        employeeName,
        password,
        companyName,
        age,
        phoneNumber,
        address,
        role
      });
      console.log('Manager signed up:', response.data);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.label}>U-ID</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleUIdChange}
        value={uId}
        placeholder="Enter your U-ID"
      />
      {uIdError ? <Text style={styles.errorText}>{uIdError}</Text> : null}
      <Text style={styles.label}>Employee Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmpName}
        value={employeeName}
        placeholder="Enter your name"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Enter your password"
        secureTextEntry
      />
      <Text style={styles.label}>Company Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={setCompanyName}
        value={companyName}
        placeholder="Enter your company name"
      />
      <Text style={styles.label}>Age (Optional)</Text>
      <TextInput
        style={styles.input}
        onChangeText={setAge}
        value={age}
        placeholder="Enter your age"
        keyboardType="numeric"
      />
      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
      />
      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        onChangeText={setAddress}
        value={address}
        placeholder="Enter your address"
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#F1BBE0',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ManagerSignUp;
