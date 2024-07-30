import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomerCard = ({ customer, onEdit, onAdd, onViewHistory }) => {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Image source={require('../../assets/avatar.jpg')} style={styles.avatar} />
                <View style={styles.info}>
                    <Text style={styles.name}>{customer.name}</Text>
                    <Text style={styles.detail}>Address: {customer.address}</Text>
                    <Text style={styles.detail}>Phone Number: {customer.phone}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.historyButton} onPress={onViewHistory}>
                <Icon name="time-outline" size={24} color="#4A90E2" />
                <Text style={styles.historyText}>History</Text>
            </TouchableOpacity>
            <View style={styles.actionContainer}>
                <TouchableOpacity style={styles.editButton} onPress={onEdit}>
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addButton} onPress={onAdd}>
                    <Text style={styles.buttonText}>Book</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 10,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    info: {
        marginLeft: 15,
        flex: 1,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    detail: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    historyButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    historyText: {
        marginLeft: 10,
        color: '#4A90E2',
        fontSize: 16,
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    editButton: {
        backgroundColor: '#FF6347',
        flex: 1,
        marginRight: 10,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    addButton: {
        backgroundColor: '#32CD32',
        flex: 1,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
});

export default CustomerCard;
