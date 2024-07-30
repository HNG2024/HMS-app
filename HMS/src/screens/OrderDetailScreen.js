import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const OrderDetailScreen = ({ route, navigation }) => {
  const { roomNumber, customerName } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Room Number:101 {roomNumber}</Text>
        <Text style={styles.cardSubtitle}>Order Time: 10:20 am</Text>
        <Text style={styles.cardSubtitle}>Customer Name:punithapriyan{customerName}</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={[styles.actionButton, styles.deliveredButton]}>
            <Text style={styles.buttonText}>Delivered</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.viewButton]}>
            <Text style={styles.buttonText}>View</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.cancelButton]}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
    backgroundColor: '#FFB6C1',
    borderRadius: 10,
  },
  headerText: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  deliveredButton: {
    backgroundColor: '#7ED957',
  },
  viewButton: {
    backgroundColor: '#1E90FF',
  },
  cancelButton: {
    backgroundColor: '#FF6347',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default OrderDetailScreen;
