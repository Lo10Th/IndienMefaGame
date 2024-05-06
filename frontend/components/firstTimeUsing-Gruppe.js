import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from 'react';

export default function FirstTimeUsingGruppe() {
  const [groupNames, setGroupNames] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/listGroups')
      .then(response => response.json())
      .then(data => setGroupNames(data));
  }, []);

  const selectGroup = (group) => {
    setSelectedGroup(group);
    // Navigate to the next screen or perform any other action here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.HeaderText}>Wähle deine Gruppe</Text>
      <FlatList
        data={groupNames}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.groupName, item === selectedGroup && styles.selectedGroup]}
            onPress={() => selectGroup(item)}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={() => console.log('Weiter')}>
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
  selectedGroup: {
    borderColor: '#F7F7F7',
    borderWidth: 2,
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
});