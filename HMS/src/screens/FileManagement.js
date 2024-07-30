// FileManagement.js
import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const FileManagement = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>File Manager</Text>
        <Ionicons name="search" size={24} color="black" />
      </View>
      <View style={styles.storageContainer}>
        <Text style={styles.storageText}>70 GB Free</Text>
        <ProgressBar progress={0.68} color="#6A1B9A" style={styles.progressBar} />
        <Text style={styles.storageUsedText}>30% used</Text>
        <Text style={styles.storageUsedDetails}>100 GB used</Text>
      </View>
      <View style={styles.categories}>
        <Category icon="document" label="Docs" onPress={() => navigation.navigate('DocsScreen')} />
        <Category icon="image" label="Images" onPress={() => navigation.navigate('ImagesScreen')} />
        <Category icon="document-attach" label="Invoices" onPress={() => navigation.navigate('InvoicesScreen')} />
        <Category icon="cloud-upload" label="Stock" onPress={() => navigation.navigate('StockScreen')} />
      </View>
      <View style={styles.recentContainer}>
        <Text style={styles.recentTitle}>Recent</Text>
        <View style={styles.recentItem}>
          <Ionicons name="document" size={24} color="black" />
          <Text style={styles.recentItemText}>Competitive Analysis.xls</Text>
          <Text style={styles.recentItemSize}>2.6 MB</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const Category = ({ icon, label, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.category}>
      <Ionicons name={icon} size={26} color="black" />
      <Text style={styles.categoryLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  storageContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  storageText: {
    fontSize: 16,
    color: 'gray',
  },
  progressBar: {
    width: '100%',
    height: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  storageUsedText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A1B9A',
  },
  storageUsedDetails: {
    fontSize: 16,
    color: 'gray',
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  category: {
    alignItems: 'center',
  },
  categoryLabel: {
    marginTop: 5,
    fontSize: 16,
  },
  recentContainer: {
    marginVertical: 20,
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  recentItemText: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
  },
  recentItemSize: {
    fontSize: 14,
    color: 'gray',
  },
});

export default FileManagement;
