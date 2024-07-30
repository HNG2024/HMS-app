import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Dimensions, Alert } from 'react-native';

const { width } = Dimensions.get('window');

const EditCustomer = ({ navigation, route }) => {
    const { customer, onSave } = route.params;
    const [name, setName] = useState(customer.name);
    const [address, setAddress] = useState(customer.address);
    const [phone, setPhone] = useState(customer.phone);

    const handleSave = () => {
        if (name && address && phone) {
            const updatedCustomer = { ...customer, name, address, phone };
            onSave(updatedCustomer);
            navigation.goBack();
        } else {
            Alert.alert("Error", "Please fill out all fields.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Edit Customer</Text>
            <Text style={styles.label}>Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <Text style={styles.label}>Address</Text>
            <TextInput
                style={styles.input}
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
            />
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
                style={styles.input}
                placeholder="Phone"
                value={phone}
                onChangeText={setPhone}
                keyboardType="numeric"
            />
            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#666',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 15,
        borderRadius: 4,
        width: width * 0.9,
    },
    button: {
        backgroundColor: 'green',
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default EditCustomer;
