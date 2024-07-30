import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { REACT_APP_API_URL } from '@env';

const SignUp = ({ navigation }) => {
  const [uId, setUId] = useState('');
  const [employeeName, setEmpName] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [age, setAge] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('employee'); // Default role

  const handleSignUp = async () => {
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/api/signup`, {
        uId,
        employeeName,
        password,
        companyName,
        age,
        phoneNumber,
        address,
        role
      });
      console.log('User signed up:', response.data);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error signing up:', error);
      // Additional error handling logic
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.label}>U-ID</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUId}
        value={uId}
        placeholder="Enter your U-ID"
      />
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
      <Text style={styles.label}>Role</Text>
      <Picker
        selectedValue={role}
        style={styles.picker}
        onValueChange={(itemValue) => setRole(itemValue)}
      >
        <Picker.Item label="Admin" value="admin" />
        <Picker.Item label="Manager" value="manager" />
        <Picker.Item label="Employee" value="employee" />
      </Picker>
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
  picker: {
    height: 40,
    marginBottom: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
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

export default SignUp;
