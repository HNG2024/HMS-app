import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Keys() {
  return (
    <View style={styles.container}>
      <Text>Mail</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
