import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const QuotationScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Quotation Details</Text>
      {/* Add your quotation details here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default QuotationScreen;
