import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import MaterialsList from '../components/home/materialsList';


export default function HomeScreen() {
  const [name, setName] = useState(null);

  const getName = async () => {
    const value = await AsyncStorage.getItem('name');
    setName(value);
  }

  useEffect(() => {
    getName();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.HeaderText}>{name}</Text>
      <View style={styles.matList}>
        <MaterialsList />
      </View>
    </View>
  );
}

styles = StyleSheet.create({
  container: {
    backgroundColor: '#080B0F',
    flex: 1,
  },
  HeaderText: {
    color: '#F7F7F7',
    fontSize: 30,
    fontFamily: 'sans-serif',
    textAlign: 'center',
    marginTop: 50,
  },
  matList: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
});
