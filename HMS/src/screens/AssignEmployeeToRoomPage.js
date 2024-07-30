import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const AssignEmployeeToRoomPage = ({ navigation, route }) => {
  const { employee, room } = route.params;
  const [roomNumber, setRoomNumber] = useState(room.roomNumber);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const onStartTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || startTime;
    setShowStartPicker(false);
    setStartTime(currentDate);
  };

  const onEndTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || endTime;
    setShowEndPicker(false);
    setEndTime(currentDate);
  };

  const handleSubmit = () => {
    Alert.alert('Employee Assigned', `Employee ${employee.name} was assigned to room ${roomNumber}.`);
    navigation.navigate('AssignEmployee', {
      updatedEmployee: {
        ...employee,
        roomNumber: roomNumber,
        status: 'Working',
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Assign Employee to Room</Text>
      <TextInput
        style={styles.input}
        placeholder="Room Number"
        value={roomNumber}
        onChangeText={setRoomNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Employee Name"
        value={employee.name}
        editable={false}
      />
      <TouchableOpacity onPress={() => setShowStartPicker(true)} style={styles.input}>
        <Text style={styles.dateText}>{`Start Time: ${startTime.toLocaleTimeString()}`}</Text>
      </TouchableOpacity>
      {showStartPicker && (
        <DateTimePicker
          value={startTime}
          mode="time"
          display="default"
          onChange={onStartTimeChange}
        />
      )}
      <TouchableOpacity onPress={() => setShowEndPicker(true)} style={styles.input}>
        <Text style={styles.dateText}>{`End Time: ${endTime.toLocaleTimeString()}`}</Text>
      </TouchableOpacity>
      {showEndPicker && (
        <DateTimePicker
          value={endTime}
          mode="time"
          display="default"
          onChange={onEndTimeChange}
        />
      )}
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
  dateText: {
    color: '#000',
    fontSize: 16,
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

export default AssignEmployeeToRoomPage;
