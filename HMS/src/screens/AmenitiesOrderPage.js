import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const AmenitiesOrderPage = ({ route, navigation }) => {
    const { bookings: initialBookings } = route.params;
    const [bookings, setBookings] = useState(initialBookings);
    const [showCollectPicker, setShowCollectPicker] = useState(null);
    const [showReturnPicker, setShowReturnPicker] = useState(null);

    useEffect(() => {
        const updatedBookings = bookings.map(booking => ({
            ...booking,
            collectTime: booking.collectTime || new Date(),
            returnTime: booking.returnTime || new Date(),
        }));
        setBookings(updatedBookings);
    }, []);

    const handleCollectTimeChange = (event, selectedDate, index) => {
        const currentDate = selectedDate || new Date();
        const updatedBookings = bookings.map((booking, i) => (
            i === index ? { ...booking, collectTime: currentDate } : booking
        ));
        setBookings(updatedBookings);
        setShowCollectPicker(null); // Close the picker after selecting a date
    };

    const handleReturnTimeChange = (event, selectedDate, index) => {
        const currentDate = selectedDate || new Date();
        const updatedBookings = bookings.map((booking, i) => (
            i === index ? { ...booking, returnTime: currentDate } : booking
        ));
        setBookings(updatedBookings);
        setShowReturnPicker(null); // Close the picker after selecting a date
    };

    const handleFinish = (index) => {
        const updatedBookings = bookings.filter((_, i) => i !== index);
        setBookings(updatedBookings);
        navigation.setParams({ bookings: updatedBookings });
    };

    const renderBooking = ({ item, index }) => (
        <View style={styles.card}>
            <Text style={styles.label}>Room Number:</Text>
            <Text style={styles.value}>{item.roomNumber}</Text>
            <Text style={styles.label}>Booking Time:</Text>
            <Text style={styles.value}>{new Date().toLocaleString()}</Text>
            <Text style={styles.label}>Collect Time:</Text>
            <TouchableOpacity onPress={() => setShowCollectPicker(index)} style={styles.timeButton}>
                <Text style={styles.timeText}>{item.collectTime.toLocaleTimeString()}</Text>
            </TouchableOpacity>
            {showCollectPicker === index && (
                <DateTimePicker
                    value={item.collectTime}
                    mode="time"
                    display="default"
                    onChange={(e, d) => handleCollectTimeChange(e, d, index)}
                />
            )}
            <Text style={styles.label}>Return Time:</Text>
            <TouchableOpacity onPress={() => setShowReturnPicker(index)} style={styles.timeButton}>
                <Text style={styles.timeText}>{item.returnTime.toLocaleTimeString()}</Text>
            </TouchableOpacity>
            {showReturnPicker === index && (
                <DateTimePicker
                    value={item.returnTime}
                    mode="time"
                    display="default"
                    onChange={(e, d) => handleReturnTimeChange(e, d, index)}
                />
            )}
            <Text style={styles.label}>Selected Items:</Text>
            <Text style={styles.value}>{item.selectedItemsSummary}</Text>
            <Text style={styles.label}>Special Instructions:</Text>
            <Text style={styles.value}>{item.specialInstructions}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.finishButton} onPress={() => handleFinish(index)}>
                    <Text style={styles.buttonText}>Finish</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.addItemButton, { backgroundColor: '#6f42c1' }]}
                    onPress={() => navigation.navigate('Amenities', { bookings, bookingIndex: index })}
                >
                    <Text style={styles.buttonText}>Add More Items</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Order Summary</Text>
            <FlatList
                data={bookings}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderBooking}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    listContainer: {
        paddingBottom: 20,
    },
    card: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#333',
    },
    value: {
        fontSize: 16,
        marginBottom: 10,
        color: '#555',
    },
    timeButton: {
        backgroundColor: '#e0e0e0',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
        alignItems: 'center',
    },
    timeText: {
        fontSize: 16,
        color: '#333',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    finishButton: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        flex: 1,
        marginRight: 10,
    },
    addItemButton: {
        backgroundColor: '#6f42c1',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        flex: 1,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AmenitiesOrderPage;
