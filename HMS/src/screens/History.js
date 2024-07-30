import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const mockBookingData = {
    '1': [
        { roomNumber: '101', date: '(2023-06-01)', stayDuration: 3, cost: 3000, reason: 'Business Trip' },
        { roomNumber: '102', date: '(2023-06-05)', stayDuration: 2, cost: 2000, reason: 'Vacation' },
        { roomNumber: '101', date: '(2023-06-10)', stayDuration: 4, cost: 4000, reason: 'Conference' },
        { roomNumber: '103', date: '(2023-06-15)', stayDuration: 1, cost: 1000, reason: 'Transit' },
        { roomNumber: '101', date: '(2023-06-20)', stayDuration: 5, cost: 5000, reason: 'Workshop' },
    ],
    '2': [
        { roomNumber: '201', date: '(2023-07-01)', stayDuration: 3, cost: 3000, reason: 'Vacation' },
        { roomNumber: '202', date: '(2023-07-05)', stayDuration: 2, cost: 2000, reason: 'Business Trip' },
        { roomNumber: '201', date: '(2023-07-10)', stayDuration: 4, cost: 4000, reason: 'Workshop' },
        { roomNumber: '203', date: '(2023-07-15)', stayDuration: 1, cost: 1000, reason: 'Transit' },
        { roomNumber: '201', date: '(2023-07-20)', stayDuration: 5, cost: 5000, reason: 'Conference' },
    ],
    '3': [
        { roomNumber: '301', date: '(2023-08-01)', stayDuration: 3, cost: 3000, reason: 'Conference' },
        { roomNumber: '302', date: '(2023-08-05)', stayDuration: 2, cost: 2000, reason: 'Vacation' },
        { roomNumber: '301', date: '(2023-08-10)', stayDuration: 4, cost: 4000, reason: 'Business Trip' },
        { roomNumber: '303', date: '(2023-08-15)', stayDuration: 1, cost: 1000, reason: 'Transit' },
        { roomNumber: '301', date: '(2023-08-20)', stayDuration: 5, cost: 5000, reason: 'Workshop' },
    ],
    '4': [
        { roomNumber: '301', date: '(2023-08-01)', stayDuration: 3, cost: 3000, reason: 'Workshop' },
        { roomNumber: '303', date: '(2023-08-05)', stayDuration: 2, cost: 2000, reason: 'Vacation' },
        { roomNumber: '303', date: '(2023-08-10)', stayDuration: 4, cost: 4000, reason: 'Conference' },
        { roomNumber: '303', date: '(2023-08-15)', stayDuration: 1, cost: 1000, reason: 'Transit' },
        { roomNumber: '301', date: '(2023-08-20)', stayDuration: 5, cost: 5000, reason: 'Business Trip' },
    ],
};

const getMostBookedRoom = (bookings) => {
    const roomCount = {};
    bookings.forEach(booking => {
        roomCount[booking.roomNumber] = (roomCount[booking.roomNumber] || 0) + 1;
    });
    return Object.keys(roomCount).reduce((a, b) => roomCount[a] > roomCount[b] ? a : b);
};

const History = ({ route }) => {
    const { customer } = route.params;
    const bookings = mockBookingData[customer.id] || [];
    const mostBookedRoom = getMostBookedRoom(bookings);

    const handleBook = () => {
        console.log('Booking room for:', customer.name);
        // Add booking logic here
    };

    const handleDocumentUpload = () => {
        console.log('Uploading document for:', customer.name);
        // Add document upload logic here
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.card}>
                    <Text style={styles.title}>{customer.name}</Text>
                    <Text style={styles.subTitle}>Contact Information</Text>
                    <Text style={styles.details}>Phone: {customer.phone}</Text>
                    <Text style={styles.details}>Aadhaar: {customer.aadhaar}</Text>

                    <Text style={styles.subTitle}>Booking History</Text>
                    <Text style={styles.details}>Most Booked Room: {mostBookedRoom}</Text>
                    <Text style={styles.subTitle}>Previous Bookings:</Text>
                    {bookings.map((booking, index) => (
                        <View key={index} style={styles.bookingDetailsContainer}>
                            <Text style={styles.bookingDetails}>
                                Room Number: <Text style={styles.bookingHighlight}>{booking.roomNumber}</Text>
                            </Text>
                            <Text style={styles.bookingDetails}>
                                Booking Date: <Text style={styles.bookingHighlight}>{booking.date}</Text>
                            </Text>
                            <Text style={styles.bookingDetails}>
                                Stay Duration: <Text style={styles.bookingHighlight}>{booking.stayDuration} day's</Text>
                            </Text>
                            <Text style={styles.bookingDetails}>
                                Total Cost: <Text style={styles.bookingHighlight}>₹{booking.cost}</Text> (₹{(booking.cost / booking.stayDuration).toFixed(2)} per night)
                            </Text>
                            <Text style={styles.bookingDetails}>
                               Visit  Reason: <Text style={styles.bookingHighlight}>{booking.reason}</Text>
                            </Text>
                        </View>
                    ))}

                    <TouchableOpacity style={styles.button} onPress={handleBook}>
                        <Text style={styles.buttonText}>Book</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.documentButton]} onPress={handleDocumentUpload}>
                        <Text style={styles.buttonText}>Document</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    card: {
        backgroundColor: '#fff',
        padding: 20,
        marginVertical: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        width: '90%',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    subTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        color: '#555',
    },
    details: {
        fontSize: 16,
        color: '#777',
        marginBottom: 10,
    },
    bookingDetailsContainer: {
        backgroundColor: '#f1f1f1',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
    },
    bookingDetails: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    bookingHighlight: {
        fontWeight: 'bold',
        color: '#000',
    },
    button: {
        backgroundColor: '#1E90FF',
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 20,
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    documentButton: {
        backgroundColor: '#FF6347',
        marginTop: 10,
    },
});

export default History;
