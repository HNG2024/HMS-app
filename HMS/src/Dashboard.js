import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { REACT_APP_API_URL } from '@env';

export default function Dashboard() {
  const [role, setRole] = useState('');

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) {
        navigation.navigate('Login');
      } else {
        const userRole = await AsyncStorage.getItem('userRole');
        console.log('User Role from AsyncStorage:', userRole);
        setRole(userRole);
      }
    };

    checkToken();
  }, [navigation]);
  const [logo, setLogo] = useState(require('../assets/Golden_Park.png')); // Initial logo
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const scrollIntervalRef = useRef(null);
  const greetingOpacity = useRef(new Animated.Value(0)).current;
  const greetingScale = useRef(new Animated.Value(0.5)).current;
  const greetingTranslateY = useRef(new Animated.Value(-30)).current;

  const navigation = useNavigation(); // Access the navigation prop

  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        console.log('Logging out with token:', token);
        await axios.post(`${REACT_APP_API_URL}/api/logout`, { token });
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
        await AsyncStorage.removeItem('userRole');
        console.log('Successfully logged out');
        navigation.navigate('Login');
      } else {
        console.log('No token found');
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const cardData = [
    { name: 'Add Hotel', screen: 'ManagerSignUp', image: require('../assets/hotel1.png') },
    { name: 'Add Room', screen: 'AddRoomScreen', image: require('../assets/room2.png') },
    { name: 'Room Booking', screen: 'BookingScreen', image: require('../assets/book.png') },
    { name: 'Manage Room', screen: 'ManageRooms', image: require('../assets/mr.png') },
    { name: 'Regular Customer', screen: 'CustomerList', image: require('../assets/rc.png') },
    { name: 'Events', screen: 'EventPage', image: require('../assets/event.png') },
    { name: 'Stock Management', screen: 'StockCheckScreen', image: require('../assets/sm.png') },
    { name: 'House Keeping', screen: 'RoomCleaning', image: require('../assets/hk1.png') },
    { name: 'Order Product', screen: 'Amenities', image: require('../assets/op.png') },
    { name: 'HealNGlow Product', screen: 'HNGProduct', image: require('../assets/hng.png') },
    { name: 'File Manager', screen: 'FileManager1', image: require('../assets/file.png') },
    { name: 'BillDownload', screen: 'BillDownload', image: require('../assets/invoice.png') },
    { name: 'Inventory', screen: 'Inventory', image: require('../assets/inv.png') },
    { name: 'Reports', screen: 'ReportsScreen', image: require('../assets/report.png') },
    { name: 'Landry', screen: 'Laundry', image: require('../assets/hk1.png') },
   
  ];

  const noticeData = [
    {
      title: 'Daily Occupancy Rate',
      image: require('../assets/do.png'),
      content: "Today's occupancy rate: 85%. Please ensure all rooms are ready for check-in by 2:00 PM!"
    },
    {
      title: 'VIP Guest Arrivals',
      image: require('../assets/vip.png'),
      content: 'VIP guest arriving today: Mr. John Doe in Room 305. Ensure all special requests are fulfilled.'
    },
    {
      title: 'Staff Meeting Reminder',
      image: require('../assets/sme.png'),
      content: 'Staff meeting today at 10:00 AM in Conference Room A. Attendance is mandatory.'
    },
  ];

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 11) {
      return 'Good Morning';
    } else if (currentHour < 15) {
      return 'Good Afternoon';
    } else if (currentHour < 19) {
      return 'Good Evening';
    } else {
      return 'Good Night';
    }
  };

  const startScrolling = () => {
    stopScrolling(); // Ensure any existing interval is cleared
    scrollIntervalRef.current = setInterval(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ x: scrollX.__getValue() + 1, animated: false });
        scrollX.setValue(scrollX.__getValue() + 1);
        if (scrollX.__getValue() >= 300 * noticeData.length) { // Adjust 300 to the width of a single notice card
          scrollX.setValue(0);
          scrollViewRef.current.scrollTo({ x: 0, animated: false });
        }
      }
    }, 20); // Adjust the speed of scrolling
  };

  const stopScrolling = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
    }
  };

  useEffect(() => {
    startScrolling();
    return () => stopScrolling();
  }, []);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(greetingOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(greetingScale, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.bounce,
      }),
      Animated.timing(greetingTranslateY, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.elastic(1),
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={styles.header}>
        <Animated.Text
          style={[
            styles.locationText,
            {
              opacity: greetingOpacity,
              transform: [{ scale: greetingScale }, { translateY: greetingTranslateY }],
              color: '#D2B48C', // Light brown color
            },
          ]}
        >
          {getGreeting()}
        </Animated.Text>
        <Icon name="notifications" size={30} color="#000" style={styles.notificationIcon} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.noticeBoardContainer}>
          <Text style={styles.noticeTitle}>Notice board</Text>
          <View style={styles.noticeBoard}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              ref={scrollViewRef}
              scrollEventThrottle={16}
              onTouchStart={stopScrolling}
              onTouchEnd={startScrolling}
            >
              {noticeData.concat(noticeData).map((notice, index) => (
                <View key={index} style={styles.noticeCard}>
                  <Image source={notice.image} style={styles.noticeImage} />
                  <View style={styles.noticeTextContainer}>
                    <Text style={styles.noticeContent}>{notice.title}</Text>
                    <Text style={styles.noticeSubContent}>{notice.content}</Text>
                    <TouchableOpacity>
                      <Text style={styles.readMore}>Read more</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
        <View style={styles.grid}>
          {cardData.map((card, index) => (
            <TouchableOpacity key={index} style={styles.card} onPress={() => navigation.navigate(card.screen)}>
              <Image source={card.image} style={styles.cardImage} />
              <Text style={styles.cardText}>{card.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.header2}>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogout}>
                <Image source={require('../assets/logout.png')} style={styles.icon} resizeMode="contain" />
            </TouchableOpacity>
          </View>
      </ScrollView>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header2:{
width: 50,
height: 50,
  },
  loginButton:{
    width: 50,
    height: 50,
  },
  icon: {
    width: 50,
    height: 50,
    },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10, // Adjust for better mobile view
  },
  logo: {
    width: 200, // Adjust width as needed
    height: 100, // Adjust height as needed
    resizeMode: 'contain', // Ensure the entire logo is visible
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  locationText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  notificationIcon: {
    fontWeight: 'bold',
    position: 'absolute',
    right: 0,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  noticeBoardContainer: {
    width: '100%',
    marginBottom: 20,
    padding: 20, // Increased padding
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
  },
  noticeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noticeBoard: {
    width: '100%',
    height: 150, // Reduced height for the inner scrolling area
  },
  noticeCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    width: 300,
    marginRight: 10,
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  noticeImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 10,
  },
  noticeTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  noticeContent: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  noticeSubContent: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  readMore: {
    fontSize: 14,
    color: '#007bff',
    marginTop: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  cardImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  cardText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardSubText: {
    marginTop: 5,
    fontSize: 12,
    color: '#aaa',
  },
});
