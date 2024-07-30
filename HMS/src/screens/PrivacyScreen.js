import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function PrivacyScreen({ navigation }) {
  return (
    <Container>
         <Content>
        <Text>
          Here you can add the privacy policy text. This is just a placeholder for now.
          You can format it as needed and include the relevant legal information.
        </Text>
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

const Text = styled.Text`
  font-size: 16px;
  color: #333;
`;
