import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SettingsScreen({ navigation }) {
  return (
    <Container>
          <Section>
        <SectionItem onPress={() => navigation.navigate('Notifications')}>
          <SectionTitle>Notifications and Sound</SectionTitle>
          <Icon name="chevron-forward-outline" size={20} color="#007bff" />
        </SectionItem>
            </Section>
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

const Section = styled.View`
  margin: 20px;
`;

const SectionItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  color: #007bff;
`;
