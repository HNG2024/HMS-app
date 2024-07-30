import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { REACT_APP_API_URL } from '@env';
import { getUid } from '../storageUtils';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import MultiSelect from 'react-native-multiple-select';
import { Picker } from '@react-native-picker/picker';

const BookingScreen = ({ navigation }) => {
  const [selectedRoomNumbers, setSelectedRoomNumbers] = useState([]);
  const [stateCustomerId, setCustomerId] = useState('');
  const [stateExtraBed, setExtraBed] = useState('No');
  const [stateOccupancy, setOccupancy] = useState('');
  const [stateCheckinDate, setCheckinDate] = useState(new Date());
  const [stateCheckoutDate, setCheckoutDate] = useState(new Date());
  
  const [stateAmount, setAmount] = useState('');
  const [stateAmenities, setAmenities] = useState('');
  const [stateExclusiveServices, setExclusiveServices] = useState('');
  const [stateIsAvailable, setIsAvailable] = useState(true);
  const [stateUserId, setUserId] = useState('');
  const [stateMaleCount, setMaleCount] = useState('');
  const [stateFemaleCount, setFemaleCount] = useState('');
  const [stateChildCount, setChildCount] = useState('');
  const [stateCompanyName, setCompanyName] = useState('');
  const [stateCompanyAddress, setCompanyAddress] = useState('');
  const [stateCompanyContact, setCompanyContact] = useState('');
  const [statePhoneNumber, setPhoneNumber] = useState('');
  const [stateDiscount, setDiscount] = useState('');
  const [stateCheckInTime, setCheckInTime] = useState('');
  const [stateIdProofType, setIdProofType] = useState('Aadhar Card');
  const [stateIdProofNumber, setIdProofNumber] = useState('');
  const [stateIdProofPath, setIdProofPath] = useState('');
  const [stateGst, setGst] = useState('18');
  const [stateTotalPrice, setTotalPrice] = useState('');
  const [stateCustomerName, setCustomerName] = useState('');
  const [isCheckinDatePickerVisible, setCheckinDatePickerVisibility] = useState(false);
  const [isCheckoutDatePickerVisible, setCheckoutDatePickerVisibility] = useState(false);
  const [isCheckinTimePickerVisible, setCheckinTimePickerVisibility] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stateSegmentType, setSegmentType] = useState('Walk-in');
  const [customSegment, setCustomSegment] = useState('');
  const [stateEmail, setEmail] = useState('');
  const [stateAge,setAge] = useState('');
  const [stateAddress,setAddress] = useState('');
  const [stateState,setState] = useState('TamilNadu');
  const [stateNationality, setNationality] = useState('INDIA');
  const [statePaymentType, setPaymentType] = useState('CASH');
  const [stateAdvance, setAdvance] = useState('');

  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserId = await getUid();
      console.log('Fetched userId:', storedUserId);
      setUserId(storedUserId);
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchRooms = async () => {
      if (!stateUserId) return;

      try {
        const response = await axios.get(`${REACT_APP_API_URL}/api/rooms`, {
          params: { userId: stateUserId },
        });
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
        alert('Failed to fetch rooms. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [stateUserId]);

  useEffect(() => {
    calculateTotalPrice();
  }, [stateAmount, stateDiscount, stateGst]);

  useEffect(() => {
    calculateOccupancy();
  }, [stateMaleCount, stateFemaleCount, stateChildCount]);

  const handleConfirmCheckinDate = (date) => {
    setCheckinDate(date);
    setCheckinDatePickerVisibility(false);
  };

  const handleConfirmCheckoutDate = (date) => {
    setCheckoutDate(date);
    setCheckoutDatePickerVisibility(false);
  };

  const handleConfirmCheckinTime = (time) => {
    setCheckInTime(time.toTimeString().split(' ')[0]);
    setCheckinTimePickerVisibility(false);
  };

  const calculateTotalPrice = () => {
    const amount = parseFloat(stateAmount) || 0;
    const discount = parseFloat(stateDiscount) || 0;
    const gstPercentage = parseFloat(stateGst) || 0;
    const gstAmount = (amount - discount) * (gstPercentage / 100);
    const totalPrice = amount - discount + gstAmount;
    setTotalPrice(totalPrice.toFixed(2));
  };

  const calculateOccupancy = () => {
    const maleCount = parseInt(stateMaleCount) || 0;
    const femaleCount = parseInt(stateFemaleCount) || 0;
    const childCount = parseInt(stateChildCount) || 0;
    const totalCount = maleCount + femaleCount + childCount;
    setOccupancy(totalCount.toString());
  };

  const generateCustomerId = () => {
    if (stateCustomerName) {
      const id = stateCustomerName.replace(/\s+/g, '').toLowerCase() + Math.floor(Math.random() * 1000);
      setCustomerId(id);
    } else {
      alert('Please enter the customer name first.');
    }
  };

  const handleSubmit = async () => {
    console.log('Submitting room with userId:', stateUserId);
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/api/RoomBooking`, {
        userId: stateUserId,
        roomNumber: selectedRoomNumbers,
        customerId: stateCustomerId,
        extraBed: stateExtraBed,
        occupancy: stateOccupancy,
        checkinDate: stateCheckinDate,
        checkoutDate: stateCheckoutDate,
       
        amount: stateAmount,
        amenities: stateAmenities,
        isAvailable: stateIsAvailable,
        exclusiveServices: stateExclusiveServices,
        maleCount: stateMaleCount,
        femaleCount: stateFemaleCount,
        childCount: stateChildCount,
        companyName: stateCompanyName,
        companyAddress: stateCompanyAddress,
        companyContact: stateCompanyContact,
        phoneNumber: statePhoneNumber,
        discount: stateDiscount,
        checkInTime: stateCheckInTime,
        idProofType: stateIdProofType,
        idProofNumber: stateIdProofNumber,
        idProofPath: stateIdProofPath,
        gst: stateGst,
        email: stateEmail,
        age: stateAge,
        totalPrice: stateTotalPrice,
        customerName: stateCustomerName,
        customerAddress: stateAddress,
        customerState: stateState,
        nationality: stateNationality,
        paymentType: statePaymentType,
        advance: stateAdvance,
        segmentType: stateSegmentType === 'Others' ? customSegment : stateSegmentType,
      });
      console.log('Room Booking successfully:', response.data);
      alert('Room Booked Successfully! Welcome!!');
    } catch (error) {
      console.error('Error adding room:', error.response ? error.response.data : error.message);
      alert('Failed to Book room. Please try again.');
    }
  };

  const renderItem = (item) => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text>{item.room_no} - {item.room_type}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Room Booking</Text>
        <Text style={styles.label}>Room Number</Text>
        <MultiSelect
          items={rooms}
          uniqueKey="room_no"
          onSelectedItemsChange={(selectedItems) => setSelectedRoomNumbers(selectedItems)}
          selectedItems={selectedRoomNumbers}
          selectText="Pick Room Numbers"
          searchInputPlaceholderText="Search Rooms..."
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="room_no"
          searchInputStyle={{ color: '#CCC' }}
          submitButtonColor="#48d22b"
          submitButtonText="Submit"
          style={styles.multiSelect}
          renderItem={renderItem}
        />

        <TouchableOpacity onPress={() => setCheckinDatePickerVisibility(true)}>
          <Text style={styles.dateInput}>Check-in Date: {stateCheckinDate.toDateString()}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isCheckinDatePickerVisible}
          mode="date"
          onConfirm={handleConfirmCheckinDate}
          onCancel={() => setCheckinDatePickerVisibility(false)}
        />
        <TouchableOpacity onPress={() => setCheckoutDatePickerVisibility(true)}>
          <Text style={styles.dateInput}>Check-out Date: {stateCheckoutDate.toDateString()}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isCheckoutDatePickerVisible}
          mode="date"
          onConfirm={handleConfirmCheckoutDate}
          onCancel={() => setCheckoutDatePickerVisibility(false)}
        />
        <TouchableOpacity onPress={() => setCheckinTimePickerVisibility(true)}>
          <Text style={styles.dateInput}>Check-in Time: {stateCheckInTime}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isCheckinTimePickerVisible}
          mode="time"
          onConfirm={handleConfirmCheckinTime}
          onCancel={() => setCheckinTimePickerVisibility(false)}
        />
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfWidth]}
            placeholder="Guest Name"
            value={stateCustomerName}
            onChangeText={setCustomerName}
          /> 
          <TextInput
            style={[styles.input, styles.halfWidth]}
            placeholder="Age"
            value={stateAge}
            onChangeText={setAge}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfWidth]}
            placeholder="Customer ID"
            value={stateCustomerId}
            onChangeText={setCustomerId}
          />
        </View> 
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfWidth1]}
            placeholder="Male Count"
            value={stateMaleCount}
            onChangeText={setMaleCount}
            keyboardType="numeric"
          /> 
          <TextInput
            style={[styles.input, styles.halfWidth1]}
            placeholder="Female Count"
            value={stateFemaleCount}
            onChangeText={setFemaleCount}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, styles.halfWidth1]}
            placeholder="Child Count"
            value={stateChildCount}
            onChangeText={setChildCount}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfWidth]}
            placeholder="Company"
            value={stateCompanyName}
            onChangeText={setCompanyName}
          />
          <TextInput
            style={[styles.input, styles.halfWidth]}
            placeholder="Company Address"
            value={stateCompanyAddress}
            onChangeText={setCompanyAddress}
          />
        </View>
       
        <TextInput
          style={[styles.input, styles.halfWidth]}
          placeholder="E-Mail"
          value={stateEmail}
          onChangeText={setEmail}
        />
        <TextInput
          style={[styles.input, styles.halfWidth]}
          placeholder="Address"
          value={stateAddress}
          onChangeText={setAddress}
        /> 
        <View style={styles.row}>
        </View>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfWidth]}
            placeholder="State"
            value={stateState}
            onChangeText={setState}
          />
          <TextInput
            style={[styles.input, styles.halfWidth]}
            placeholder="Nationality"
            value={stateNationality}
            onChangeText={setNationality}
          />
        </View>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfWidth]}
            placeholder="Company Phone Number"
            value={stateCompanyContact}
            onChangeText={setCompanyContact}
            keyboardType="numeric"
          /> 
          <TextInput
            style={[styles.input, styles.halfWidth]}
            placeholder="Customer Phone Number"
            value={statePhoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="numeric"
          />         
        </View>
       
        <Text style={styles.label}>Payment Type</Text>
        <Picker
          selectedValue={statePaymentType}
          onValueChange={(itemValue) => setPaymentType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="CASH" value="CASH" />
          <Picker.Item label="ONLINE" value="ONLINE" />
          <Picker.Item label="CARD" value="CARD" />
          <Picker.Item label="POST PAID" value="POST PAID" />
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Amount"
          value={stateAmount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Discount"
          value={stateDiscount}
          onChangeText={setDiscount}
          keyboardType="numeric"
        />
        <Text style={styles.label}>GST Percentage</Text>
        <Picker
          selectedValue={stateGst}
          onValueChange={(itemValue) => setGst(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="18%" value="18" />
          <Picker.Item label="16%" value="16" />
          <Picker.Item label="12%" value="12" />
          <Picker.Item label="10%" value="10" />
          <Picker.Item label="8%" value="8" />
          <Picker.Item label="With Out GST" value="0" />
        </Picker>
        <Text style={styles.label}>Total Price: {stateTotalPrice}</Text>
        <TextInput
          style={styles.input}
          placeholder="Advance Amt"
          value={stateAdvance}
          onChangeText={setAdvance}
          keyboardType="numeric"
        />  
        <Text style={styles.label}>ID Proof Type</Text>
        <Picker
          selectedValue={stateIdProofType}
          onValueChange={(itemValue) => setIdProofType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Aadhar Card" value="Aadhar Card" />
          <Picker.Item label="Pan Card" value="Pan Card" />
          <Picker.Item label="Driving Licence" value="Driving Licence" />
          <Picker.Item label="Passport" value="Passport" />
          <Picker.Item label="Others" value="Others" />
        </Picker>
        <TextInput
          style={styles.input}
          placeholder="ID Proof Number"
          value={stateIdProofNumber}
          onChangeText={setIdProofNumber}
        />
        <Text style={styles.label}>Segment</Text>
        <Picker
          selectedValue={stateSegmentType}
          onValueChange={(itemValue) => setSegmentType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Walk-in" value="Walk-in" />
          <Picker.Item label="Online Booking" value="Online Booking" />
          <Picker.Item label="Corporate Booking" value="Corporate Booking" />
          <Picker.Item label="Group Booking" value="Group Booking" />
          <Picker.Item label="Direct Booking" value="Direct Booking" />
          <Picker.Item label="Travel Agent Booking" value="Travel Agent Booking" />
          <Picker.Item label="Others" value="Others" />
        </Picker>
        {stateSegmentType === 'Others' && (
          <TextInput
            style={styles.input}
            placeholder="Please specify"
            value={customSegment}
            onChangeText={setCustomSegment}
          />
        )}
        <TextInput
        style={styles.input}
        placeholder="Any Instructions"
        value={stateExclusiveServices}
        onChangeText={setExclusiveServices}
        />
        <View style={styles.switchContainer}>
          <Text style={styles.label}>Add Regular Customer</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={stateIsAvailable ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setIsAvailable}
            value={stateIsAvailable}
          />
        </View>
        <Button
          title="Book Room"
          onPress={handleSubmit}
          color="#0066cc"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#f5f5f5',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  dateInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    justifyContent: 'center',
    lineHeight: 40,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  picker: {
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  halfWidth1: {
    width: '30%',
  },
  multiSelect: {
    marginBottom: 10,
  },
});

export default BookingScreen;
