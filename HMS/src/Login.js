import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_APP_API_URL } from '@env';

const Login = ({ navigation }) => {
  const [name, setName] = useState('');
  const [uId, setUId] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        navigation.navigate('Dashboard');
      }
    };

    checkToken();
  }, [navigation]);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/api/login`, {
        name,
        uId,
        password,
      });
      const { accessToken, refreshToken, role, userId } = response.data;

      if (!userId) {
        throw new Error('userId is missing from the login response');
      }

      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);
      await AsyncStorage.setItem('userRole', role);
      await AsyncStorage.setItem('userId', userId.toString());
      await AsyncStorage.setItem('uId', uId);

      navigation.navigate('Dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Enter your name"
      />
      <Text style={styles.label}>U-ID</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUId}
        value={uId}
        placeholder="Enter your U-ID"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Enter your password"
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ForgetPasswordScreen')}>
        <Text style={styles.buttonText}>Forget Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#F1BBE0',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Login;
