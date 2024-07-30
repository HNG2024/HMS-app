import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HouseKeepingInfoScreen = ({ navigation }) => {
  const employeeData = [
    { id: '00071', name: 'Employee Name', position: 'Position', status: 'assign' },
    { id: '00072', name: 'Employee Name', position: 'Position', roomNumber: 'PN47', status: 'working' },
    { id: '00073', name: 'Employee Name', position: 'Position', status: 'assign' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
       
      </View>
      
      {employeeData.map((employee, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.employeeHeader}>
            <MaterialCommunityIcons name="account-circle" size={50} color="gray" />
            <View style={styles.employeeInfo}>
              <Text style={styles.employeeName}>{employee.name}</Text>
              <Text style={styles.employeeId}>ID: {employee.id}</Text>
              <Text style={styles.employeePosition}>Position: {employee.position}</Text>
              {employee.roomNumber && <Text style={styles.roomNumber}>Room No: {employee.roomNumber}</Text>}
            </View>
          </View>
          <View style={styles.buttonContainer}>
            {employee.status === 'assign' ? (
              <>
                <TouchableOpacity style={styles.assignButton}>
                  <Text style={styles.buttonText}>Assign</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.callButton}>
                  <Text style={styles.buttonText}>Call</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity style={styles.workingButton}>
                  <Text style={styles.buttonText}>working</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  employeeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  employeeInfo: {
    marginLeft: 10,
  },
  employeeName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  employeeId: {
    fontSize: 14,
    color: 'gray',
  },
  employeePosition: {
    fontSize: 14,
    color: 'gray',
  },
  roomNumber: {
    fontSize: 14,
    color: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  assignButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginRight: 5,
  },
  callButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginLeft: 5,
  },
  workingButton: {
    backgroundColor: '#FFC107',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginRight: 5,
  },
  cancelButton: {
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HouseKeepingInfoScreen;
