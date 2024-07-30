import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // You can choose any icon set you like

const services = [
  { name: 'Room Cleaning', icon: require('../../assets/book.png'), navigateTo: 'RoomCleaning' }, // Adjust the path if necessary
  { name: 'Laundry Service', icon: require('../../assets/book.png'), navigateTo: 'Laundry' }, // Adjust the path if necessary
  { name: 'Amenities', icon: require('../../assets/book.png'), navigateTo: 'Amenities' }, // Add a path to the amenities icon
];

const HomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.schedulerContainer}>
        <Text style={styles.schedulerTitle}>House Keeping Management</Text>
        <Text style={styles.schedulerDescription}>Manage your house keeping tasks effectively.</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Hello!</Text>
        </View>
        <View style={styles.serviceContainer}>
          {services.map((service, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.serviceButton}
              onPress={() => service.navigateTo && navigation.navigate(service.navigateTo)}
            >
              <Image source={service.icon} style={styles.serviceIcon} />
              <Text style={styles.serviceText}>{service.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.menuBar}>
        <TouchableOpacity style={styles.menuButton}>
          <Icon name="home" size={30} color="#000" />
          <Text style={styles.menuText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}>
          <Icon name="calendar" size={30} color="#000" />
          <Text style={styles.menuText}>Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}>
          <Icon name="person" size={30} color="#000" />
          <Text style={styles.menuText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  schedulerContainer: {
    padding: 20,
    backgroundColor: 'lightblue', // Change colors as needed
    alignItems: 'center',
  },
  schedulerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000', // Change text color to black
  },
  schedulerDescription: {
    fontSize: 14,
    color: '#000', // Change text color to black
    textAlign: 'center',
    marginTop: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000', // Change text color to black
  },
  serviceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    flexWrap: 'wrap',
  },
  serviceButton: {
    width: '45%',
    padding: 20,
    backgroundColor: '#f8f8f8', // Change colors as needed
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  serviceIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  serviceText: {
    color: '#000', // Change text color to black
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 10,
  },
  menuBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#BDBDBD',
    paddingVertical: 10,
    backgroundColor: 'lightblue',
  },
  menuButton: {
    alignItems: 'center',
  },
  menuText: {
    fontSize: 16,
    color: '#000', // Change text color to black
  },
});

export default HomePage;
