import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Ensure this package is installed

const initialRooms = [
  {
    roomNumber: 'PN46',
    startDate: 'Feb 21, 2020',
    endDate: 'Feb 23, 2020',
    status: 'Assign',
  },
  {
    roomNumber: 'PN47',
    status: 'Ready to Book',
  },
  {
    roomNumber: 'PN48',
    status: 'Cleaning under progress',
  },
  {
    roomNumber: 'PN49',
    status: 'Ready to Book',
  },
  {
    roomNumber: 'PN50',
    status: 'Ready to Book',
  },
];

const RoomCleaningPage = ({ navigation, route }) => {
  const [rooms, setRooms] = useState(initialRooms);

  useEffect(() => {
    if (route.params?.newRoom) {
      setRooms([...rooms, route.params.newRoom]);
    }
    if (route.params?.updatedRoom) {
      setRooms(rooms.map(room =>
        room.roomNumber === route.params.updatedRoom
          ? { ...room, status: 'Ready to Book' }
          : room
      ));
    }
  }, [route.params?.newRoom, route.params?.updatedRoom]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>HOUSE KEEPING</Text>
      {rooms.map((room, index) => (
        <View key={index} style={styles.roomCard}>
          <Text style={styles.roomNumber}>Room Number: {room.roomNumber}</Text>
          {room.startDate && <Text style={styles.date}>Start: {room.startDate}</Text>}
          {room.endDate && <Text style={styles.date}>End: {room.endDate}</Text>}
          {room.status === 'Assign' ? (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.assignButton}
                onPress={() => navigation.navigate('AssignEmployee', { room })}
              >
                <Text style={styles.buttonText}>Assign</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.statusContainer}>
              <Text style={styles.statusText}>{room.status}</Text>
            </View>
          )}
        </View>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddRoom')}>
        <Icon name="add-circle" size={50} color="blue" />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  roomCard: {
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
  roomNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  assignButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  statusContainer: {
    marginTop: 10,
    paddingVertical: 10,
    backgroundColor: '#EEE',
    borderRadius: 5,
    alignItems: 'center',
  },
  statusText: {
    color: '#333',
    fontWeight: 'bold',
  },
  addButton: {
    alignItems: 'center',
    marginTop: 20,
  },
});

export default RoomCleaningPage;
