import React from 'react';
import styled from 'styled-components/native';
import { Switch } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function NotificationsScreen({ navigation }) {
  const [privateChatSound, setPrivateChatSound] = React.useState(true);
  const [privateChatVibrate, setPrivateChatVibrate] = React.useState(true);
  const [groupChatSound, setGroupChatSound] = React.useState(true);
  const [groupChatVibrate, setGroupChatVibrate] = React.useState(true);
  const [callSound, setCallSound] = React.useState(true);
  const [callVibrate, setCallVibrate] = React.useState(true);
  const [taskSound, setTaskSound] = React.useState(true);
  const [taskVibrate, setTaskVibrate] = React.useState(true);
  const [driveSound, setDriveSound] = React.useState(true);
  const [driveVibrate, setDriveVibrate] = React.useState(true);

  return (
    <Container>
         <Section>
        <NotificationSection>
          <NotificationTitle>Private Chats Notifications</NotificationTitle>
          <NotificationItem>
            <NotificationText>Sound Effects</NotificationText>
            <Switch value={privateChatSound} onValueChange={setPrivateChatSound} />
          </NotificationItem>
          <NotificationItem>
            <NotificationText>Sound</NotificationText>
            <Icon name="chevron-forward-outline" size={20} color="#007bff" />
          </NotificationItem>
          <NotificationItem>
            <NotificationText>Vibrate</NotificationText>
            <Switch value={privateChatVibrate} onValueChange={setPrivateChatVibrate} />
          </NotificationItem>
        </NotificationSection>
        <NotificationSection>
          <NotificationTitle>Group Chats Notifications</NotificationTitle>
          <NotificationItem>
            <NotificationText>Sound Effects</NotificationText>
            <Switch value={groupChatSound} onValueChange={setGroupChatSound} />
          </NotificationItem>
          <NotificationItem>
            <NotificationText>Sound</NotificationText>
            <Icon name="chevron-forward-outline" size={20} color="#007bff" />
          </NotificationItem>
          <NotificationItem>
            <NotificationText>Vibrate</NotificationText>
            <Switch value={groupChatVibrate} onValueChange={setGroupChatVibrate} />
          </NotificationItem>
        </NotificationSection>
        <NotificationSection>
          <NotificationTitle>Call Notifications</NotificationTitle>
          <NotificationItem>
            <NotificationText>Sound Effects</NotificationText>
            <Switch value={callSound} onValueChange={setCallSound} />
          </NotificationItem>
          <NotificationItem>
            <NotificationText>Sound</NotificationText>
            <Icon name="chevron-forward-outline" size={20} color="#007bff" />
          </NotificationItem>
          <NotificationItem>
            <NotificationText>Vibrate</NotificationText>
            <Switch value={callVibrate} onValueChange={setCallVibrate} />
          </NotificationItem>
        </NotificationSection>
        <NotificationSection>
          <NotificationTitle>Task Notifications</NotificationTitle>
          <NotificationItem>
            <NotificationText>Sound Effects</NotificationText>
            <Switch value={taskSound} onValueChange={setTaskSound} />
          </NotificationItem>
          <NotificationItem>
            <NotificationText>Sound</NotificationText>
            <Icon name="chevron-forward-outline" size={20} color="#007bff" />
          </NotificationItem>
          <NotificationItem>
            <NotificationText>Vibrate</NotificationText>
            <Switch value={taskVibrate} onValueChange={setTaskVibrate} />
          </NotificationItem>
        </NotificationSection>
        <NotificationSection>
          <NotificationTitle>Drive Notifications</NotificationTitle>
          <NotificationItem>
            <NotificationText>Sound Effects</NotificationText>
            <Switch value={driveSound} onValueChange={setDriveSound} />
          </NotificationItem>
          <NotificationItem>
            <NotificationText>Sound</NotificationText>
            <Icon name="chevron-forward-outline" size={20} color="#007bff" />
          </NotificationItem>
          <NotificationItem>
            <NotificationText>Vibrate</NotificationText>
            <Switch value={driveVibrate} onValueChange={setDriveVibrate} />
          </NotificationItem>
        </NotificationSection>
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

const NotificationSection = styled.View`
  background-color: #fff;
  padding: 10px 15px;
  margin-top: 10px;
`;

const NotificationTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const NotificationItem = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
`;

const NotificationText = styled.Text`
  font-size: 16px;
`;
