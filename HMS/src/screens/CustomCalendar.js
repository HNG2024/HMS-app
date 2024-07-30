import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { parseISO, eachDayOfInterval, format } from 'date-fns';

const CustomCalendar = ({ navigation }) => {
  const [selectedDates, setSelectedDates] = useState({});
  const [stayDuration, setStayDuration] = useState('');
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  const onDayPress = (day) => {
    let newSelectedDates = { ...selectedDates };

    if (Object.keys(newSelectedDates).length >= 2) {
      Alert.alert('Reset Dates', 'You can only select two dates. Please reset to select new dates.');
    } else {
      const selectedDateKeys = Object.keys(newSelectedDates);
      newSelectedDates[day.dateString] = { selected: true, selectedColor: '#1E90FF' };

      if (selectedDateKeys.length === 1) {
        const firstDate = parseISO(selectedDateKeys[0]);
        const secondDate = parseISO(day.dateString);

        if (secondDate > firstDate) {
          const range = eachDayOfInterval({ start: firstDate, end: secondDate });
          range.forEach((date) => {
            const dateString = format(date, 'yyyy-MM-dd');
            newSelectedDates[dateString] = { selected: true, selectedColor: '#1E90FF' };
          });

          setSelectedDates(newSelectedDates);
          setStayDuration(`${range.length - 1}-night stay`);
          setCheckInDate(format(firstDate, 'yyyy-MM-dd'));
          setCheckOutDate(format(secondDate, 'yyyy-MM-dd'));
        } else {
          Alert.alert('Invalid Date Selection', 'Check-out date must be after check-in date.');
        }
      } else {
        setSelectedDates(newSelectedDates);
        setCheckInDate(day.dateString);
        setCheckOutDate(day.dateString);
      }
    }
  };

  const resetDates = () => {
    setSelectedDates({});
    setStayDuration('');
    setCheckInDate(null);
    setCheckOutDate(null);
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const proceedBooking = () => {
    if (!checkInDate || !checkOutDate) {
      Alert.alert('Error', 'Please select both check-in and check-out dates.');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    const bookingType = checkInDate > today ? 'Pre-booking' : 'Current booking';
    const currentTime = getCurrentTime();
    
    navigation.navigate('BookingScreen', {
      checkInDate,
      checkOutDate,
      currentTime,
      bookingType,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.stayDuration}>{stayDuration}</Text>
      <Calendar
        onDayPress={onDayPress}
        markedDates={selectedDates}
        theme={calendarTheme}
        minDate={new Date().toISOString().split('T')[0]} // Prevent past dates
      />
      <View style={styles.selectedDates}>
        <Text style={styles.dateText}>Check-in Date: {checkInDate}</Text>
        <Text style={styles.dateText}>Check-out Date: {checkOutDate}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button
            title="Book Now"
            onPress={proceedBooking}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title="Reset Dates"
            onPress={resetDates}
            color="red"
          />
        </View>
      </View>
    </View>
  );
};

const calendarTheme = {
  backgroundColor: '#f0f0f0',
  calendarBackground: '#ffffff',
  textSectionTitleColor: '#b6c1cd',
  selectedDayBackgroundColor: '#1E90FF',
  selectedDayTextColor: '#ffffff',
  todayTextColor: '#00adf5',
  dayTextColor: '#2d4150',
  textDisabledColor: '#d9e1e8',
  monthTextColor: '#1E90FF',
  indicatorColor: '#1E90FF',
  textDayFontWeight: '300',
  textMonthFontWeight: 'bold',
  textDayHeaderFontWeight: '500',
  textDayFontSize: 16,
  textMonthFontSize: 16,
  textDayHeaderFontSize: 16,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  stayDuration: {
    color: '#1E90FF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  selectedDates: {
    marginVertical: 20,
  },
  dateText: {
    color: '#000000',
    fontSize: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
  },
  buttonWrapper: {
    marginBottom: 10,
  },
});

export default CustomCalendar;
