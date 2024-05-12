import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import React, { useState } from 'react';


export default function HomeScreen() {
  const getName = async () => {
    const name = await AsyncStorage.getItem('name');
    return name;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.HeaderText}>Willkommen, Gruppe Karl</Text>
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
});
