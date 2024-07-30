import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, ActivityIndicator } from 'react-native';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

const Invoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [printing, setPrinting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoices();
    getPermissions();
  }, []);

  const getPermissions = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'We need permissions to access your file storage');
    }
  };

  const fetchInvoices = async () => {
    try {
      const response = await fetch('http://192.168.29.35:3000/api/bills');
      const data = await response.json();
      setInvoices(data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = async () => {
    if (printing || !selectedInvoice) return;

    setPrinting(true);
    try {
      const { customerId } = selectedInvoice;
      const response = await fetch(`http://192.168.29.35:3000/api/generate-bill/${customerId}`);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64data = reader.result.split(',')[1];
        const url = `data:application/pdf;base64,${base64data}`;
        await Print.printAsync({ uri: url });
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error('Error during printing:', error);
    } finally {
      setPrinting(false);
    }
  };

  const ensureDirectoryExists = async (path) => {
    const dirInfo = await FileSystem.getInfoAsync(path);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(path, { intermediates: true });
    }
  };

  const handleDownload = async () => {
    if (printing || !selectedInvoice) return;

    setPrinting(true);
    try {
      const { customerId } = selectedInvoice;
      const response = await fetch(`http://192.168.29.35:3000/api/generate-bill/${customerId}`);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64data = reader.result.split(',')[1];

        const downloadDir = FileSystem.documentDirectory.replace('file://', '') + 'Download';
        const hngDir = `${downloadDir}/HNG`;
        const invoiceDir = `${hngDir}/Invoice`;

        await ensureDirectoryExists(hngDir);
        await ensureDirectoryExists(invoiceDir);

        const fileUri = `${invoiceDir}/invoice_${customerId}.pdf`;
        await FileSystem.writeAsStringAsync(fileUri, base64data, { encoding: FileSystem.EncodingType.Base64 });
        Alert.alert('Download complete', `Invoice saved at ${fileUri}`);
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error('Error during downloading:', error);
    } finally {
      setPrinting(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#4B0082" />
      ) : (
        <>
          <FlatList
            data={invoices}
            keyExtractor={(item) => item.customerId.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => setSelectedInvoice(item)}
                style={[
                  styles.invoiceItem,
                  selectedInvoice && selectedInvoice.customerId === item.customerId
                    ? styles.selectedInvoiceItem
                    : null,
                ]}
              >
                <View style={styles.invoiceDetails}>
                  <Text style={styles.customerName}>{item.customerName}</Text>
                  <Text style={styles.invoiceInfo}>{`Customer ID: ${item.customerId}`}</Text>
                  {selectedInvoice && selectedInvoice.customerId === item.customerId && (
                    <Text style={styles.selectedIndicator}>✓</Text>
                  )}
                </View>
              </TouchableOpacity>
            )}
          />
          {selectedInvoice && (
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.printButton}
                onPress={handlePrint}
                disabled={printing}
              >
                <Text style={styles.buttonText}>Print</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.downloadButton}
                onPress={handleDownload}
                disabled={printing}
              >
                <Text style={styles.buttonText}>Download</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F9FD',
    padding: 20,
  },
  invoiceItem: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedInvoiceItem: {
    backgroundColor: '#E1AFD1',
  },
  invoiceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  invoiceInfo: {
    fontSize: 14,
    color: '#666',
  },
  selectedIndicator: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4B0082',
  },
  actionButtons: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  printButton: {
    backgroundColor: '#4B0082',
    padding: 15,
    borderRadius: 10,
    flex: 0.45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  downloadButton: {
    backgroundColor: '#EC6565',
    padding: 15,
    borderRadius: 10,
    flex: 0.45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Invoice;
