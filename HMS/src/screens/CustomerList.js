import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomerCard from './CustomerCard'; // Adjust the import path as needed

const customersData = [
    { id: '1', name: 'A.Abdul', address: '12A Palani bypass, allen solai opsit, Dindigul-624002.', phone: '9944567532', aadhaar: '123456789012' },
    { id: '2', name: 'E.EZhil', address: 'Allen solai, Dindigul-624002.', phone: '9678654378', aadhaar: '234567890123' },
    { id: '3', name: 'A.Punith', address: '12A Palani bypass, allen solai opsit, Dindigul-624002.', phone: '8767543278', aadhaar: '345678901234' },
    { id: '4', name: 'V.Bharath', address: 'RM colony, Dindigul-624001.', phone: '8767543278', aadhaar: '456789012345' },
];

const CustomerList = ({ navigation }) => {
    const [searchText, setSearchText] = useState('');
    const [filteredCustomers, setFilteredCustomers] = useState(customersData);

    const handleSearch = (text) => {
        setSearchText(text);
        if (text) {
            const filtered = customersData.filter(customer =>
                customer.name.toLowerCase().includes(text.toLowerCase()) ||
                customer.phone.includes(text) ||
                customer.aadhaar.includes(text)
            );
            setFilteredCustomers(filtered);
        } else {
            setFilteredCustomers(customersData);
        }
    };

    const handleSaveCustomer = (updatedCustomer) => {
        const updatedCustomers = customersData.map(customer =>
            customer.id === updatedCustomer.id ? updatedCustomer : customer
        );
        setFilteredCustomers(updatedCustomers);
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchBarContainer}>
                <Icon name="search" size={20} color="#ccc" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search by name, phone number"
                    value={searchText}
                    onChangeText={handleSearch}
                />
            </View>
            <ScrollView>
                {filteredCustomers.map(customer => (
                    <CustomerCard
                        key={customer.id}
                        customer={customer}
                        onEdit={() => navigation.navigate('EditCustomer', { customer, onSave: handleSaveCustomer })}
                        onAdd={() => console.log('Add:', customer.name)}
                        onViewHistory={() => navigation.navigate('History', { customer })}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: '#f5f5f5'
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    searchIcon: {
        marginLeft: 10,
    },
    searchBar: {
        flex: 1,
        height: 45,
        paddingLeft: 10,
        backgroundColor: '#fff',
    }
});

export default CustomerList;
