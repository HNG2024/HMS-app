import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import BillDownloadScreen from './src/screens/Invoice';
import WelcomePage from './src/screens/WelcomeScreen';
import SignUp from './src/SignUp';
import Login from './src/Login';
import Dashboard from './src/Dashboard';
import AuthLoadingScreen from './src/screens/AuthLoadingScreen';
import EventPage from './src/screens/EventPage';
import ChatPage from './src/screens/ChatPage';
import Invoice from './src/screens/Invoice';
import FileManager from './src/screens/FileManager';
import HouseKeepingInfoScreen from './src/screens/HouseKeepingInfoScreen';
import HouseKeepingScreen from './src/screens/HouseKeepingScreen';
import LaundryPage from './src/screens/LaundryPage';
import OrderDetailScreen from './src/screens/OrderDetailScreen';
import OrderProductScreen from './src/screens/OrderProductScreen';
import StockCheckScreen from './src/screens/StockCheckScreen';
import AddRoomScreen from './src/screens/AddRoomScreen';
import AddProduct from './src/screens/AddProduct';
import HNGProduct from './src/screens/HNGProduct';
import CustomerList from './src/screens/CustomerList';
import EditCustomer from './src/screens/EditCustomer';
import CustomerCard from './src/screens/CustomerCard';
import History from './src/screens/History';
import ManagerSignUp from './src/ManagerSignUp';
import AdminLogin from './src/AdminLogin';
import BookingScreen from './src/screens/BookingScreen';
import BookingSummary from './src/screens/BookingSummary';
import CustomCalendar from './src/screens/CustomCalendar';
import OfflinePaymentScreen from './src/screens/OfflinePaymentScreen';
import CardPaymentScreen from './src/screens/CardPaymentScreen';
import PaymentMethodScreen from './src/screens/PaymentMethodScreen';
import OnlinePaymentScreen from './src/screens/OnlinePaymentScreen';
import Profile from './src/screens/ProfileScreen';
import EditProfile from './src/screens/EditProfileScreen';
import EditPassword from './src/screens/ForgetPasswordScreen';
import Notification from './src/screens/NotificationsScreen';
import Privacy from './src/screens/PrivacyScreen';
import Settings from './src/screens/SettingsScreen';
import TermsPolicy from './src/screens/TermsPolicyScreen';
import DetailsScreen from './src/screens/DetailScreen';
import { UserProvider } from './src/screens/UserContext';
import ManageRooms from './src/screens/ManageRoomsScreen';
import FileManager1 from './src/screens/FileManagement';
import DocsScreen from './src/screens/DocsScreen';
import ImagesScreen from './src/screens/ImagesScreen';
import InvoicesScreen from './src/screens/InvoicesScreen';
import StockScreen from './src/screens/StockScreen';
import InvoicePrint from './src/screens/InvoiceScreen';
import Concierge from './src/Concierge';
import Parcels from './src/Parcels';
import Keys from './src/Keys';
import NoticeBoard from './src/NoticeBoard';
import { Ionicons } from '@expo/vector-icons';




import QuotationScreen from './src/screens/QuotationScreen';


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomePage from './src/screens/HomePage'; // Adjust the path if necessary
import RoomCleaningPage from './src/screens/RoomCleaningPage'; // Adjust the path if necessary
import AddRoomPage from './src/screens/AddRoomPage';

// Adjust the path if necessary
import AssignEmployeePage from './src/screens/AssignEmployeePage'; // Adjust the path if necessary
import AddEmployeePage from './src/screens/AddEmployeePage'; // Adjust the path if necessary
import AssignEmployeeToRoomPage from './src/screens/AssignEmployeeToRoomPage'; // Adjust the path if necessary

import OrderSummaryPage from './src/screens/OrderSummaryPage'; // Adjust the path if necessary
import AmenitiesPage from './src/screens/AmenitiesPage';
import AmenitiesOrderPage from './src/screens/AmenitiesOrderPage'; // Adjust the path if necessary


import BuyItemsScreen from './src/screens/ProductService';
import SellItemsScreen from './src/screens/SellItemsScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import ManageRoomBooking from './src/screens/ManageRoomBooking';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Tabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="HNGProduct" component={BuyItemsScreen} />
    <Tab.Screen name="HotelToiletries" component={SellItemsScreen} />
    <Tab.Screen name="History" component={HistoryScreen} />
  </Tab.Navigator>
);
const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'magnify' : 'magnify';
          } else if (route.name === 'Chat') {
            iconName = focused ? 'chat' : 'chat-outline';
          } else if (route.name === 'Mail') {
            iconName = focused ? 'email' : 'email-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account' : 'account-outline';
          }

          return (
            <MaterialCommunityIcons
              name={iconName}
              size={focused ? size + 4 : size} // Increase size when focused
              color={color}
            />
          );
        },
        tabBarLabelStyle: {
          fontFamily: 'YourCustomFont', // Replace with your custom font name
          fontSize: 14,
          fontWeight: 'bold',
        },
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
        },
      })}
      tabBarOptions={{
        activeTintColor: '#ff6347',
        inactiveTintColor: 'gray',
        labelStyle: {
          fontFamily: 'YourCustomFont', // Replace with your custom font name
          fontSize: 14,
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen name="Home" component={Dashboard} />
      <Tab.Screen name="Search" component={Concierge} />
      <Tab.Screen name="Chat" component={Parcels} />
      <Tab.Screen name="Mail" component={Keys} />
      <Tab.Screen name="Profile" component={NoticeBoard} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="BillDownload" component={BillDownloadScreen} />
          <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Welcome" component={WelcomePage} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: true }} />
          <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
          <Stack.Screen name="EventPage" component={EventPage} options={{ headerShown: true }} />
          <Stack.Screen name="ChatPage" component={ChatPage} options={{ headerShown: true }} />
          <Stack.Screen name="Invoice" component={Invoice} options={{ headerShown: true }} />
          <Stack.Screen name="FileManager" component={FileManager} options={{ headerShown: true }} />
          <Stack.Screen name="HouseKeepingInfoScreen" component={HouseKeepingInfoScreen} options={{ headerShown: true }} />
          <Stack.Screen name="HouseKeepingScreen" component={HouseKeepingScreen} options={{ headerShown: true }} />
          <Stack.Screen name="LaundryPage" component={LaundryPage} options={{ headerShown: true }} />
          <Stack.Screen name="OrderDetailScreen" component={OrderDetailScreen} options={{ headerShown: true }} />
          <Stack.Screen name="OrderProductScreen" component={OrderProductScreen} options={{ headerShown: true }} />
          <Stack.Screen name="StockCheckScreen" component={StockCheckScreen} options={{ headerShown: true }} />
          <Stack.Screen name="AddRoomScreen" component={AddRoomScreen} options={{ headerShown: true }} />
          <Stack.Screen name="ManagerSignUp" component={ManagerSignUp} options={{ headerShown: true }} />
          <Stack.Screen name="AdminLogin" component={AdminLogin} options={{ headerShown: true }} />
          <Stack.Screen name="AddProduct" component={AddProduct} options={{ headerShown: true, title: 'Add New Product' }} />
          <Stack.Screen name="HNGProduct" component={HNGProduct} options={{ headerShown: true, title: 'HNG Product Service' }} />
          <Stack.Screen name="CustomerList" component={CustomerList} options={{ headerShown: true }} />
          <Stack.Screen name="EditCustomer" component={EditCustomer} options={{ headerShown: true }} />
          <Stack.Screen name="CustomerCard" component={CustomerCard} options={{ headerShown: true }} />
          <Stack.Screen name="History" component={History} options={{ headerShown: true }} />
          <Stack.Screen name="FileManager1" component={FileManager1} options={{ headerShown: true }} />
          <Stack.Screen name="ManageRooms" component={ManageRooms} options={{ headerShown: true }} />
          <Stack.Screen
            name="CustomCalendar"
            component={CustomCalendar}
            options={({ navigation }) => ({
              title: 'Calendar',
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 20 }}>
                  <Icon name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen name="BookingScreen" component={BookingScreen} options={{ headerShown: true, title: 'Booking' }} />
          <Stack.Screen name="BookingSummary" component={BookingSummary} options={{ title: 'Booking Summary' }} />
          <Stack.Screen name="PaymentMethodScreen" component={PaymentMethodScreen} options={{ title: 'Payment Methods' }} />
          <Stack.Screen name="OnlinePaymentScreen" component={OnlinePaymentScreen} options={{ title: 'Online Payment' }} />
          <Stack.Screen name="OfflinePaymentScreen" component={OfflinePaymentScreen} options={{ title: 'Offline Payment' }} />
          <Stack.Screen name="CardPaymentScreen" component={CardPaymentScreen} options={{ title: 'Card Payment' }} />
          <Stack.Screen name="Profile" component={Profile} options={{ headerShown: true }} />
          <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: true }} />
          <Stack.Screen name="EditPassword" component={EditPassword} options={{ headerShown: true }} />
          <Stack.Screen name="Notification" component={Notification} options={{ headerShown: true }} />
          <Stack.Screen name="Privacy" component={Privacy} options={{ headerShown: true }} />
          <Stack.Screen name="Settings" component={Settings} options={{ headerShown: true }} />
          <Stack.Screen name="TermsPolicy" component={TermsPolicy} options={{ headerShown: true }} />
          <Stack.Screen name="DetailsScreen" component={DetailsScreen} options={{ headerShown: true }} />
          <Stack.Screen name="DocsScreen" component={DocsScreen} options={{ headerShown: true }} />
          <Stack.Screen name="StockScreen" component={StockScreen} options={{ headerShown: true }} />
          <Stack.Screen name="InvoicesScreen" component={InvoicesScreen} options={{ headerShown: true }} />
          <Stack.Screen name="ImagesScreen" component={ImagesScreen} options={{ headerShown: true }} />
          <Stack.Screen name="InvoicePrint" component={InvoicePrint} options={{ headerShown: true }} />
         
          <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
         
         
          
            <Stack.Screen
            name="QuotationScreen"
            component={QuotationScreen}
            options={{
              headerTitle: 'Quotation',
            }}
          />

        <Stack.Screen name="RoomCleaning" component={RoomCleaningPage} />
        <Stack.Screen name="AddRoom" component={AddRoomPage} />
        <Stack.Screen name="AssignEmployee" component={AssignEmployeePage} />
        <Stack.Screen name="AddEmployee" component={AddEmployeePage} />
        <Stack.Screen name="AssignEmployeeToRoom" component={AssignEmployeeToRoomPage} />
        <Stack.Screen name="Laundry" component={LaundryPage} />
        <Stack.Screen name="OrderSummary" component={OrderSummaryPage} />
        <Stack.Screen name="Amenities" component={AmenitiesPage} />
        <Stack.Screen name="AmenitiesOrder" component={AmenitiesOrderPage} />

        <Stack.Screen
            name="Inventory"
            component={Tabs}
            options={({ navigation }) => ({
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                  <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
              ),
              headerTitle: 'Inventory',
            })}
          />
         <Stack.Screen
         name="ManageRoomBooking"
         component={ManageRoomBooking}
         options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerTitle: 'Manage Room Booking',
          })}
          />
              
        
         
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
});

export default App;
