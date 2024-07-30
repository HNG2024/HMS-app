import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const initialEmployees = [
  { name: 'Employee Name', id: '0001', position: 'Position', roomNumber: 'PN46', status: 'Assign', contact: 'tel:1234567890' },
  { name: 'Employee Name', id: '0002', position: 'Position', roomNumber: 'PN47', status: 'Working', contact: 'tel:1234567890' },
  { name: 'Employee Name', id: '0003', position: 'Position', roomNumber: 'PN48', status: 'Assign', contact: 'tel:1234567890' },
];

const AssignEmployeePage = ({ navigation, route }) => {
  const [employees, setEmployees] = useState(initialEmployees);
  const room = route.params?.room;

  useEffect(() => {
    if (route.params?.newEmployee) {
      setEmployees([...employees, route.params.newEmployee]);
    }
    if (route.params?.updatedEmployee) {
      setEmployees(employees.map(employee =>
        employee.id === route.params.updatedEmployee.id
          ? route.params.updatedEmployee
          : employee
      ));
    }
  }, [route.params?.newEmployee, route.params?.updatedEmployee]);

  const markAsFinished = (employeeId) => {
    const updatedEmployees = employees.map(employee =>
      employee.id === employeeId
        ? { ...employee, status: 'Assign' }
        : employee
    );
    setEmployees(updatedEmployees);
    navigation.navigate('RoomCleaning', { updatedRoom: updatedEmployees.find(e => e.id === employeeId).roomNumber });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>House Keeping</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddEmployee')}>
          <Icon name="add-circle" size={30} color="blue" />
          <Text style={styles.addButtonText}>Add Employee</Text>
        </TouchableOpacity>
      </View>
      {room && (
        <View style={styles.roomDetails}>
          <Text style={styles.roomTitle}>Room Details</Text>
          <Text style={styles.roomInfo}>Room Number: {room.roomNumber}</Text>
          {room.startDate && <Text style={styles.roomInfo}>Start: {room.startDate}</Text>}
          {room.endDate && <Text style={styles.roomInfo}>End: {room.endDate}</Text>}
        </View>
      )}
      {employees.map((employee, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.employeeName}>{employee.name}</Text>
            <Text style={styles.employeeId}>ID: {employee.id}</Text>
          </View>
          <Text style={styles.employeePosition}>Position: {employee.position}</Text>
          <Text style={styles.roomNumber}>Room No: {employee.roomNumber}</Text>
          <View style={styles.buttonContainer}>
            {employee.status === 'Working' ? (
              <>
                <TouchableOpacity style={styles.finishedButton} onPress={() => markAsFinished(employee.id)}>
                  <Text style={styles.buttonText}>Finished</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.callButton} onPress={() => Linking.openURL(employee.contact)}>
                  <Text style={styles.buttonText}>Call</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity style={styles.assignButton} onPress={() => navigation.navigate('AssignEmployeeToRoom', { employee, room })}>
                  <Text style={styles.buttonText}>{employee.status}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.callButton} onPress={() => Linking.openURL(employee.contact)}>
                  <Text style={styles.buttonText}>Call</Text>
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
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: 'blue',
  },
  roomDetails: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  roomTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  roomInfo: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  employeeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  employeeId: {
    fontSize: 14,
    color: '#555',
  },
  employeePosition: {
    fontSize: 16,
    marginBottom: 5,
  },
  roomNumber: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  assignButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  workingButton: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  callButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  finishedButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AssignEmployeePage;
