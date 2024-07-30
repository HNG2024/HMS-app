import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Alert } from 'react-native';

const amenitiesItems = [
    { id: '1', name: 'Pillow' },
    { id: '2', name: 'Bed Sheet' },
    { id: '3', name: 'Bath Towel' },
    { id: '4', name: 'Face Towel' },
    { id: '5', name: 'Hand Towel' },
];

const AmenitiesPage = ({ navigation, route }) => {
    const { bookings: initialBookings = [], bookingIndex = null } = route.params || {};
    const [selectedItems, setSelectedItems] = useState({});
    const [roomNumber, setRoomNumber] = useState('');
    const [specialInstructions, setSpecialInstructions] = useState('');
    const [bookings, setBookings] = useState(initialBookings);

    useEffect(() => {
        if (bookingIndex !== null && initialBookings[bookingIndex]) {
            const booking = initialBookings[bookingIndex];
            setRoomNumber(booking.roomNumber);
            setSelectedItems(booking.selectedItems);
            setSpecialInstructions(booking.specialInstructions);
        }
    }, [bookingIndex, initialBookings]);

    const handleSelectItem = (item) => {
        const currentCount = selectedItems[item.id] || 0;
        setSelectedItems({ ...selectedItems, [item.id]: currentCount + 1 });
    };

    const handleDeselectItem = (item) => {
        const currentCount = selectedItems[item.id] || 0;
        if (currentCount > 0) {
            setSelectedItems({ ...selectedItems, [item.id]: currentCount - 1 });
        }
    };

    const handleAddBooking = () => {
        if (!roomNumber) {
            Alert.alert('Error', 'Please enter your room number.');
            return;
        }

        if (Object.keys(selectedItems).length === 0 || !Object.values(selectedItems).some(count => count > 0)) {
            Alert.alert('Error', 'Please select at least one item.');
            return;
        }

        const selectedItemsSummary = Object.keys(selectedItems)
            .filter(itemId => selectedItems[itemId] > 0)
            .map(itemId => {
                const item = amenitiesItems.find(i => i.id === itemId);
                return `${item.name}: ${selectedItems[itemId]}`;
            }).join('\n');

        const newBooking = {
            roomNumber,
            selectedItemsSummary,
            selectedItems,
            specialInstructions: specialInstructions || 'No special instructions provided.',
            collectTime: new Date(),
            returnTime: new Date(),
        };

        if (bookingIndex !== null) {
            const updatedBookings = bookings.map((booking, index) =>
                index === bookingIndex ? newBooking : booking
            );
            setBookings(updatedBookings);
        } else {
            setBookings([...bookings, newBooking]);
        }

        setSelectedItems({});
        setRoomNumber('');
        setSpecialInstructions('');
    };

    const handleSubmit = () => {
        if (bookings.length === 0) {
            Alert.alert('Error', 'Please add at least one booking.');
            return;
        }

        navigation.navigate('AmenitiesOrder', { bookings });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hotel Amenities Service</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your room number"
                value={roomNumber}
                onChangeText={setRoomNumber}
            />
            <FlatList
                data={amenitiesItems}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemText}>{item.name}</Text>
                        <View style={styles.buttonGroup}>
                            <TouchableOpacity style={styles.button} onPress={() => handleDeselectItem(item)}>
                                <Text style={styles.buttonText}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.itemCount}>{selectedItems[item.id] || 0}</Text>
                            <TouchableOpacity style={styles.button} onPress={() => handleSelectItem(item)}>
                                <Text style={styles.buttonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Special Instructions"
                value={specialInstructions}
                onChangeText={setSpecialInstructions}
                multiline
            />
            <TouchableOpacity style={[styles.addButton, { backgroundColor: '#6f42c1' }]} onPress={handleAddBooking}>
                <Text style={styles.addButtonText}>Add Amenities</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.submitButton, { backgroundColor: '#6f42c1' }]} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>See Booked Amenities</Text>
            </TouchableOpacity>
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
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    textArea: {
        height: 100,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 7,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        elevation: 2,
    },
    itemText: {
        fontSize: 16,
    },
    buttonGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#6f42c1',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    itemCount: {
        fontSize: 16,
        marginHorizontal: 10,
    },
    addButton: {
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    submitButton: {
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AmenitiesPage;
