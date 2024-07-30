import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const AddEmployeePage = ({ navigation }) => {
  const [employeeName, setEmployeeName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [employeePosition, setEmployeePosition] = useState('');
  const [employeeContact, setEmployeeContact] = useState('');

  const handleSubmit = () => {
    navigation.navigate('AssignEmployee', { 
      newEmployee: { 
        name: employeeName, 
        id: employeeId, 
        position: employeePosition, 
        contact: `tel:${employeeContact}`,
        status: 'Assign' 
      } 
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Employee</Text>
      <TextInput
        style={styles.input}
        placeholder="Employee Name"
        value={employeeName}
        onChangeText={setEmployeeName}
      />
      <TextInput
        style={styles.input}
        placeholder="Employee ID"
        value={employeeId}
        onChangeText={setEmployeeId}
      />
      <TextInput
        style={styles.input}
        placeholder="Position"
        value={employeePosition}
        onChangeText={setEmployeePosition}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        value={employeeContact}
        onChangeText={setEmployeeContact}
        keyboardType="phone-pad"
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddEmployeePage;
