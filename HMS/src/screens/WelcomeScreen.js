import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const WelcomeScreen = ({ navigation }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('AuthLoading');
    }, 2000); // 50000 milliseconds = 50 seconds

    return () => clearTimeout(timer); // Clear the timer if the component is unmounted
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
      <Text style={styles.WelcomeLine}>Welcome to HMS Hotel Management System! Experience seamless control of your hotel operations all in one app, integrating all your online bookings effortlessly.
      Elevate your guest experience and streamline your management with our intuitive, user-friendly interface.</Text>
     
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AuthLoading')}>
        <Text style={styles.buttonText}>Welcome</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F4F8',
  },
  logo: {
    width: 300,
    height: 200,
    marginBottom: 8,
  },
 
  button: {
    backgroundColor: '#F1BBE0',
    padding: 15,
    borderRadius: 25,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    textTransform: 'uppercase',
  },
  WelcomeLine:{
    fontSize: 18,
    color: '#00000',
    marginBottom: 100,
   textAlign: 'center',
   width: 500,
  }
});

export default WelcomeScreen;
