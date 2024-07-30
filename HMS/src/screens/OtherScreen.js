import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OtherScreen = ({ route }) => {
  const { title } = route.params;
  return (
    <View style={styles.container}>
      <Text>{title} Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OtherScreen;
