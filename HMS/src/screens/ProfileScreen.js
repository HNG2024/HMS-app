import React, { useContext, useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import UserContext from './UserContext';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ProfileScreen({ navigation }) {
  const { user } = useContext(UserContext);
  const [logoutSuccess, setLogoutSuccess] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Logout cancelled'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            console.log('Logout successful');
            setLogoutSuccess(true);
            setTimeout(() => {
              setLogoutSuccess(false);
              navigation.navigate('Login');
            }, 2000);
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <Container>
      <ProfileSection>
        <ProfileImage source={{ uri: user.image }} />
        <UserName>{user.name}</UserName>
        <UserEmail>{user.email}</UserEmail>
        <EditProfileButton onPress={() => navigation.navigate('EditProfile')}>
          <Icon name="create-outline" size={20} color="#fff" />
          <EditProfileButtonText>Edit Profile</EditProfileButtonText>
        </EditProfileButton>
      </ProfileSection>
      <Section>
        <SectionItem onPress={() => navigation.navigate('Detail')}>
          <Icon name="help-circle-outline" size={20} color="#007bff" />
          <SectionItemText>Help Center</SectionItemText>
          <Icon name="chevron-forward-outline" size={20} color="#007bff" />
        </SectionItem>
        <SectionItem onPress={() => navigation.navigate('Settings')}>
          <Icon name="settings-outline" size={20} color="#007bff" />
          <SectionItemText>Settings</SectionItemText>
          <Icon name="chevron-forward-outline" size={20} color="#007bff" />
        </SectionItem>
        <SectionItem onPress={() => navigation.navigate('Detail')}>
          <Icon name="information-circle-outline" size={20} color="#007bff" />
          <SectionItemText>About</SectionItemText>
          <Icon name="chevron-forward-outline" size={20} color="#007bff" />
        </SectionItem>
        <SectionItem onPress={() => navigation.navigate('Privacy')}>
          <Icon name="lock-closed-outline" size={20} color="#007bff" />
          <SectionItemText>Privacy</SectionItemText>
          <Icon name="chevron-forward-outline" size={20} color="#007bff" />
        </SectionItem>
        <SectionItem onPress={() => navigation.navigate('TermsPolicy')}>
          <Icon name="document-text-outline" size={20} color="#007bff" />
          <SectionItemText>Terms & Policy</SectionItemText>
          <Icon name="chevron-forward-outline" size={20} color="#007bff" />
        </SectionItem>
        <SectionItem onPress={() => navigation.navigate('ForgetPassword')}>
          <Icon name="key-outline" size={20} color="#007bff" />
          <SectionItemText>Forget Password</SectionItemText>
          <Icon name="chevron-forward-outline" size={20} color="#007bff" />
        </SectionItem>
      </Section>
      <LogoutSection>
        <LogoutButton onPress={handleLogout}>
          <Icon name="log-out-outline" size={20} color="#fff" />
          <LogoutButtonText>Logout</LogoutButtonText>
        </LogoutButton>
      </LogoutSection>
      {logoutSuccess && (
        <SuccessMessage>Logout successful!</SuccessMessage>
      )}
    </Container>
  );
}

const Container = styled.ScrollView`
  flex: 1;
  background-color: #f8f9fa;
`;

const ProfileSection = styled.View`
  align-items: center;
  padding: 20px;
  background-color: #fff;
  margin-bottom: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
`;

const ProfileImage = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  margin-bottom: 15px;
`;

const UserName = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

const UserEmail = styled.Text`
  font-size: 18px;
  color: #777;
  margin-bottom: 15px;
`;

const EditProfileButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: #007bff;
  padding: 10px 20px;
  border-radius: 5px;
`;

const EditProfileButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  margin-left: 5px;
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

const SectionItemText = styled.Text`
  font-size: 18px;
  color: #007bff;
  margin-left: 10px;
  flex: 1;
`;

const LogoutSection = styled.View`
  align-items: center;
  margin-top: 30px;
`;

const LogoutButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: #dc3545;
  padding: 10px 20px;
  border-radius: 5px;
`;

const LogoutButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  margin-left: 5px;
`;

const SuccessMessage = styled.Text`
  color: green;
  font-size: 18px;
  text-align: center;
  margin-top: 20px;
`;
