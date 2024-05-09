import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

export default function FirstTimeUsingGruppe() {
  const [groupNames, setGroupNames] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();


  useEffect(() => {
    fetch('http://192.168.178.91:5000/listGroups')
      .then(response => response.json())
      .then(data => setGroupNames(data));
      setIsLoading(false);
  }, []);

  const selectGroup = async (group) => {
    setSelectedGroup(group);
    await AsyncStorage.setItem('db_id', group.id);
    await AsyncStorage.setItem('name', group.name);
    await AsyncStorage.getItem('db_id').then((value) => console.log(value));
  };

  const handleButtonPress = () => {
    console.log('Weiter');
    navigation.navigate('FirstTimeUsingStack3Gruppe');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.HeaderText}>Wähle deine Gruppe</Text>
      <View style={styles.listContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" /> // Loading spinner
        ) : (
          <FlatList
            style={styles.listStyle}
            data={groupNames}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.groupName, item === selectedGroup && styles.selectedGroup]}
                onPress={() => selectGroup(item)}
              >
                <Text style={styles.groupNameText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleButtonPress} disabled={selectedGroup === null}>
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
  groupName: {
    color: '#F7F7F7',
    fontSize: 20,
    fontFamily: 'sans-serif',
    textAlign: 'center',
    padding: 10,
  },
  groupNameText: {
    color: '#F7F7F7',
    fontSize: 20,
    fontFamily: 'sans-serif',
    textAlign: 'center',
  },
  selectedGroup: {
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