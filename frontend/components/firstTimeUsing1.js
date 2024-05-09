import { Text, View, Image, StyleSheet, TouchableOpacity, Button } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from "@react-navigation/native"


export default function FirstTimeUsing1() {
    const [selectedBox, setSelectedBox] = useState(null);
    const navigation = useNavigation();
  
    const handleBoxClick = (boxName) => {
      setSelectedBox(boxName);
    }
  
    const handleButtonClick = () => {
      if (selectedBox === 'Gruppe') {
        navigation.navigate('FirstTimeUsingStack2Gruppe');
      } else if (selectedBox === 'Dealer') {
        navigation.navigate('FirstTimeUsingStack2Dealer');
      }
    }
  
    return (
      <View style={styles.container}>
          <Text style={styles.HeaderText}>Willkommen in Indien</Text>
          <View style={styles.boxesContainer}>
          <TouchableOpacity style={selectedBox === 'Gruppe' ? styles.selectedBoxContainer : styles.boxContainer} onPress={() => handleBoxClick('Gruppe')}>
              <Text style={selectedBox === 'Gruppe' ? styles.selectedBoxText : styles.boxText } >Gruppe</Text>
              <Image style={styles.ImageStyles} source={require('../assets/icons/group.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={selectedBox === 'Dealer' ? styles.selectedBoxContainer : styles.boxContainer} onPress={() => handleBoxClick('Dealer')}>
              <Text style={selectedBox === 'Dealer' ? styles.selectedBoxText : styles.boxText } >Dealer</Text>
              <Image style={styles.ImageStyles} source={require('../assets/icons/dealer.png')} />
          </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleButtonClick}>
              <Text style={styles.buttonText}>Weiter</Text>
          </TouchableOpacity>
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
    boxContainer: {
        flexDirection: 'collumn',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#F7F7F7',
        borderRadius: 10,
        marginTop: 50,
    },
    selectedBoxContainer: {
        flexDirection: 'collumn',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#F7F7F7',
        borderRadius: 10,
        marginTop: 50,
        backgroundColor: '#F7F7F7',
    },
    boxText: {
        color: '#F7F7F7',
        fontSize: 20,
        marginTop: 10,
        fontFamily: 'sans-serif',
        textAlign: 'center',
        marginBottom: 20,
    },
    selectedBoxText: {
        color: '#080B0F',
        fontSize: 20,
        marginTop: 10,
        fontFamily: 'sans-serif',
        textAlign: 'center',
        marginBottom: 20,
    },
    ImageStyles: {
        width: 150,
        height: 150,
        marginLeft: 10,
    },
    boxesContainer: {
        flex: 1,
        flexDirection: 'collumn',
        justifyContent: 'center',
        padding: 20,
        marginBottom: '20%',
    },
    button: {
        backgroundColor: '#F7F7F7',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
        margin: 20,
    },
    buttonText: {
        color: '#080B0F',
        fontSize: 20,
        fontWeight: 'medium',
        fontFamily: 'sans-serif',
    },
    });
