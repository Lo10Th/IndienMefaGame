import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

export default function FirstTimeUsingDealer() {
  const [dealerNames, setDealerNames] = useState([]);
  const [selectedDealer, setSelectedDealer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await fetch('http://192.168.178.91:5000/listDealers');
        const data = await response.json();
        setDealerNames(data);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const selectDealer = async (dealer) => {
    setSelectedDealer(dealer);
    await AsyncStorage.setItem('db_id', dealer.id);
    await AsyncStorage.setItem('name', dealer.name);
    await AsyncStorage.setItem('type', 'dealer')
    await AsyncStorage.getItem('db_id').then((value) => console.log(value));
  };

  const handleButtonPress = () => {
    console.log('Weiter');
    navigation.navigate('FirstTimeUsingStack3Dealer');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.HeaderText}>Wähle deinen Namen</Text>
      <View style={styles.listContainer}>
      {isLoading && <ActivityIndicator size="large" color="#fff" />}
          <FlatList
            style={styles.listStyle}
            data={dealerNames}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.dealerName, item === selectedDealer && styles.selectedDealer]}
                onPress={() => selectDealer(item)}
              >
                <Text style={styles.dealerNameText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleButtonPress} disabled={selectedDealer === null}>
        <Text style={styles.buttonText}>Weiter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#080B0F',
      flex: 1,
    },
    HeaderText: {
      color: '#F7F7F7',
      fontSize: 30,
      fontFamily: 'sans-serif',
      textAlign: 'center',
      marginTop: 60,
    },
    dealerName: {
      color: '#F7F7F7',
      fontSize: 20,
      fontFamily: 'sans-serif',
      textAlign: 'center',
      padding: 10,
    },
    dealerNameText: {
      color: '#F7F7F7',
      fontSize: 20,
      fontFamily: 'sans-serif',
      textAlign: 'center',
    },
    selectedDealer: {
      borderColor: '#F7F7F7',
      borderWidth: 2,
      borderRadius: 5,
    },
    button: {
      backgroundColor: '#F7F7F7',
      padding: 10,
      margin: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: '#080B0F',
      fontSize: 20,
      textAlign: 'center',
    },
    listStyle: {
      padding: 10,
      marginTop: '20%',
      borderColor: '#F7F7F7',
      borderWidth: 3,
      borderRadius: 5,
    },
    listContainer: {
      padding: 20,
      flex: 1,
    },
  });