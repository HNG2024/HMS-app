import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ForgetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handlePasswordReset = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      try {
        const response = await fetch('http://localhost:5000/api/forget-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email })
        });

        const data = await response.json();
        if (response.status === 200) {
          Alert.alert('Password Reset', data.message, [{ text: 'OK', onPress: () => navigation.goBack() }]);
        } else {
          Alert.alert('Error', data.message, [{ text: 'OK' }]);
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to send email', [{ text: 'OK' }]);
      }
    } else {
      Alert.alert('Invalid Email', 'Please enter a valid email address.', [{ text: 'OK' }]);
    }
  };

  return (
    <Container>
         <Content>
        <Instruction>Enter your email to reset your password:</Instruction>
        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <ResetButton onPress={handlePasswordReset}>
          <ResetButtonText>Reset Password</ResetButtonText>
        </ResetButton>
      </Content>
    </Container>
  );
}

const Container = styled.ScrollView`
  flex: 1;
  background-color: #f8f9fa;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 15px;
  background-color: #fff;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
`;

const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-left: 10px;
`;

const Content = styled.View`
  padding: 20px;
`;

const Instruction = styled.Text`
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
`;

const Input = styled.TextInput`
  height: 40px;
  border-width: 1px;
  border-color: #ccc;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
`;

const ResetButton = styled.TouchableOpacity`
  background-color: #007bff;
  padding: 10px;
  border-radius: 5px;
  align-items: center;
`;

const ResetButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
`;
