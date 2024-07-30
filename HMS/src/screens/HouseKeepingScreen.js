import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HouseKeepingScreen = ({ navigation }) => {
  const roomData = [
    { roomNumber: 'PN46', roomType: 'Double Bed Room', customerName: 'Evan Yates', start: 'Feb 23, 2020', end: 'Feb 23, 2020', bookedOn: 'May 28, 2020', status: 'refill' },
    { roomNumber: 'PN47', roomType: 'Single Bed Room', status: 'ready' },
    { roomNumber: 'PN48', roomType: 'Single Bed Room', status: 'cleaning' },
    { roomNumber: 'PN49', roomType: 'Single Bed Room', status: 'ready' },
    { roomNumber: 'PN50', roomType: 'Single Bed Room', status: 'ready' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        
        
      </View>
      
      {roomData.map((room, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.roomNumber}>Room Number: {room.roomNumber}</Text>
          <Text style={styles.roomType}>Room type: {room.roomType}</Text>
          {room.customerName && <Text style={styles.customerName}>Customer Name: {room.customerName}</Text>}
          {room.start && <Text style={styles.date}>Start: {room.start}</Text>}
          {room.end && <Text style={styles.date}>End: {room.end}</Text>}
          {room.bookedOn && <Text style={styles.bookedOn}>Booked On: {room.bookedOn}</Text>}
          {room.status === 'refill' && (
            <>
              <Text style={styles.actionText}>Refill stocks in Room</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.finishedButton}>
                  <Text style={styles.buttonText}>Finished</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.assignButton}
                  onPress={() => navigation.navigate('OrderProductScreen', { roomNumber: room.roomNumber })}
                >
                  <Text style={styles.buttonText}>Assign</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
          {room.status === 'ready' && (
            <TouchableOpacity style={styles.readyButton}>
              <Text style={styles.buttonText}>ready to Book</Text>
            </TouchableOpacity>
          )}
          {room.status === 'cleaning' && (
            <TouchableOpacity 
              style={styles.cleaningButton} 
              onPress={() => navigation.navigate('HouseKeepingInfoScreen')}
            >
              <Text style={styles.buttonText}>Cleaning under progress</Text>
            </TouchableOpacity>
          )}
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
  roomNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  roomType: {
    fontSize: 16,
  },
  customerName: {
    fontSize: 16,
  },
  date: {
    fontSize: 14,
    color: 'gray',
  },
  bookedOn: {
    fontSize: 14,
    color: 'gray',
  },
  actionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  finishedButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 10,
  },
  assignButton: {
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 10,
  },
  readyButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  cleaningButton: {
    backgroundColor: '#FFC107',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HouseKeepingScreen;
