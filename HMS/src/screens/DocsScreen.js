import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, TextInput, Alert, Modal, Platform } from 'react-native';
import axios from 'axios';
import * as DocumentPicker from 'expo-document-picker';
import * as Print from 'expo-print';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import { REACT_APP_API_URL } from '@env';
const DocsScreen = ({ navigation }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadCancelToken, setUploadCancelToken] = useState(null);
  const [renamingFile, setRenamingFile] = useState(null);
  const [newFileName, setNewFileName] = useState('');


  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/api/files`);
      setFiles(response.data);
    } catch (error) {
      console.error('Error fetching files:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    console.log('Selected file:', result);

    if (result.type === 'success') {
      const { uri, name, mimeType } = result;
      const fileUri = uri;
      const fileName = name;
      const fileType = mimeType || 'application/octet-stream';

      const formData = new FormData();
      formData.append('file', {
        uri: fileUri,
        name: fileName,
        type: fileType,
      });

      const source = axios.CancelToken.source();
      setUploadCancelToken(source);
      setUploading(true);
      setUploadProgress(0);

      try {
        const response = await axios.post(`${API_URL}/api/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: progressEvent => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted);
            console.log(`Upload progress: ${percentCompleted}%`);
          },
          cancelToken: source.token,
        });
        console.log('Upload response:', response.data);
        fetchFiles();
      } catch (error) {
        if (axios.isCancel(error)) {
          Alert.alert('Upload Cancelled', 'The file upload has been cancelled.');
        } else {
          console.error('Error uploading file:', error);
          Alert.alert('Upload Error', 'An error occurred while uploading the file.');
        }
      } finally {
        setUploading(false);
        setUploadCancelToken(null);
      }
    } else {
      Alert.alert('No file selected', 'Please select a file to upload.');
    }
  };

  const handleCancelUpload = () => {
    if (uploadCancelToken) {
      uploadCancelToken.cancel('User cancelled the upload');
      setUploadCancelToken(null);
      setUploading(false);
    }
  };

  const handleDelete = async (fileName) => {
    try {
      await axios.delete(`${API_URL}/api/files/${fileName}`);
      fetchFiles();
    } catch (error) {
      console.error('Error deleting file:', error);
      Alert.alert('Delete Error', 'An error occurred while deleting the file.');
    }
  };

  const handleRename = async () => {
    if (!renamingFile || !newFileName) return;
    try {
      await axios.put(`${API_URL}/api/files/${renamingFile}`, { newName: newFileName });
      setRenamingFile(null);
      setNewFileName('');
      fetchFiles();
    } catch (error) {
      console.error('Error renaming file:', error);
      Alert.alert('Rename Error', 'An error occurred while renaming the file.');
    }
  };

  const handlePrint = async (fileName) => {
    try {
      const fileUri = `${API_URL}/uploads/${fileName}`;
      const response = await axios.get(fileUri, { responseType: 'blob' });
      const fileBlob = response.data;

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result.split(',')[1];
        let printContent = '';

        if (fileBlob.type.startsWith('image/')) {
          printContent = <img src="data:${fileBlob.type};base64,${base64data}" style="width: 100%;" />;
          Print.printAsync({ html: printContent });
        } else if (fileBlob.type === 'application/pdf') {
          Print.printAsync({ uri: fileUri });
        } else {
          printContent = <pre>${atob(base64data)}</pre>;
          Print.printAsync({ html: printContent });
        }
      };
      reader.readAsDataURL(fileBlob);
    } catch (error) {
      console.error('Error printing file:', error);
      Alert.alert('Print Error', 'An error occurred while printing the file.');
    }
  };

  const handleDownload = async (fileName) => {
    if (Platform.OS === 'web') {
      const fileUri = `${API_URL}/download/${fileName}`;
      const link = document.createElement('a');
      link.href = fileUri;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      try {
        const fileUri = `${API_URL}/download/${fileName}`;
        const downloadUri = `${FileSystem.documentDirectory}${fileName}`;
        const { uri } = await FileSystem.downloadAsync(fileUri, downloadUri);
        Alert.alert('Download Complete', `File downloaded to ${uri}`);
      } catch (error) {
        console.error('Error downloading file:', error);
        Alert.alert('Download Error', 'An error occurred while downloading the file.');
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Docs Screen</Text>
      <Button title="Upload File" onPress={handleUpload} />
      <FlatList
        data={files}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.fileItem}>
            <Text style={styles.fileName}>{item.name}</Text>
            <Text style={styles.fileSize}>{(item.size / 1024).toFixed(2)} KB</Text>
            <TouchableOpacity onPress={() => handleDelete(item.name)}>
              <Text style={styles.actionText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setRenamingFile(item.name); setNewFileName(item.name); }}>
              <Text style={styles.actionText}>Rename</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePrint(item.name)}>
              <Text style={styles.actionText}>Print</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDownload(item.name)}>
              <Text style={styles.actionText}>Download</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      {renamingFile && (
        <View style={styles.renameContainer}>
          <TextInput
            style={styles.renameInput}
            value={newFileName}
            onChangeText={setNewFileName}
          />
          <Button title="Rename" onPress={handleRename} />
          <Button title="Cancel" onPress={() => { setRenamingFile(null); setNewFileName(''); }} />
        </View>
      )}
      <Button title="Go Back" onPress={() => navigation.goBack()} />

      <Modal
        transparent={true}
        visible={uploading}
        onRequestClose={() => handleCancelUpload()}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text>Uploading: {uploadProgress}%</Text>
            {Platform.OS === 'android' ? (
              <ProgressBarAndroid
                styleAttr="Horizontal"
                indeterminate={false}
                progress={uploadProgress / 100}
              />
            ) : (
              <ProgressBarAndroid
                styleAttr="Horizontal"
                indeterminate={false}
                progress={uploadProgress / 100}
              />
            )}
            <Button title="Cancel Upload" onPress={handleCancelUpload} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  fileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  fileName: {
    fontSize: 16,
  },
  fileSize: {
    fontSize: 14,
    color: 'gray',
  },
  actionText: {
    color: 'blue',
    marginHorizontal: 5,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  renameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  renameInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    marginRight: 10,
    width: '70%',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default DocsScreen;