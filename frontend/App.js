import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './navigation/TabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FirstTimeUsingStackScreen from './navigation/firstTimeUsingStack';
import { View } from 'react-native';
import React, { useEffect, useState } from 'react';

export default function App() {
  const [isVerified, setIsVerified] = useState(null);

  useEffect(() => {
    const checkVerified = async () => {
      console.log('Checking if user is verified...');
      const value = await AsyncStorage.getItem('verified');
      setIsVerified(value);
    };

    checkVerified();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isVerified === null ? (
        <NavigationContainer>
          <FirstTimeUsingStackScreen />
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      )}
    </View>
  );
}