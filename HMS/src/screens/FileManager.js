import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';


const filesData = [
  { date: '19-08-2024', files: ['File 1', 'File 2', 'File 3'] },
  { date: '25-12-2024', files: ['File 4', 'File 5', 'File 6', 'File 7'] },
];

const FileManager = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <FontAwesome name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>File Manager</Text>
      </View>
      {filesData.map((item, index) => (
        <View key={index}>
          <Text style={styles.dateText}>{item.date}</Text>
          {item.files.map((file, index) => (
            <View key={index} style={styles.fileContainer}>
              <Text style={styles.fileText}>{file}</Text>
              <View style={styles.iconContainer}>
                <FontAwesome name="download" size={16} color="black" style={styles.icon} />
                <Text style={styles.sizeText}>10MP</Text>
                <FontAwesome name="refresh" size={16} color="black" style={styles.icon} />
                <FontAwesome name="trash" size={16} color="black" style={styles.icon} />
              </View>
            </View>
          ))}
        </View>
      ))}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingVertical: 30
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    backgroundColor: '#FFC0CB',
  },
  headerText: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateText: {
    marginTop: 16,
    marginLeft: 16,
    fontSize: 16,
    fontWeight: 'bold',
  },
  fileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E0E0E0',
    padding: 10,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  fileText: {
    fontSize: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 8,
  },
  sizeText: {
    marginHorizontal: 8,
  },
  addButton: {
    alignSelf: 'center',
    backgroundColor: '#6B46C1',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
  },
});

export default FileManager;
