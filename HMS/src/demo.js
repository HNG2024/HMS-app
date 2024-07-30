import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { getUid } from './storageUtils'; // Adjust the path as necessary

const AnotherScreen = () => {
  const [uId, setUid] = useState('');

  useEffect(() => {
    const fetchUid = async () => {
      const storedUid = await getUid();
      setUid(storedUid);
    };

    fetchUid();
  }, []);

  return (
    <View>
      <Text>User ID: {uId}</Text>
    </View>
  );
};

export default AnotherScreen;
