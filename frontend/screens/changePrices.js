import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import BackendUrl from '../env';

export default function ChangePrices() {
    const [gold, setGold] = useState('');
    const [wood, setWood] = useState('');
    const navigator = useNavigation();

    const changePrices = async () => {
        const id = await AsyncStorage.getItem('db_id');
        if (gold == '' || wood == '') {
            alert('Bitte fülle alle Felder aus!');
            return;
        }
        fetch(BackendUrl + '/updatePrices?id=' + id + '&gold=' + gold + '&wood=' + wood)
            .then((response) => response.text())
            .then((data) => {
                if (data != '"Prices updated"') {
                    console.log(data);
                    return;
                }
            });
        navigator.navigate('DealerPrices');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.textHeader}>Preise ändern</Text>
            <Text style={styles.text}>Gold Preis</Text>
            <TextInput
                style={styles.input}
                onChangeText={setGold}
                value={gold}
                keyboardType="numeric"
            />
            <Text style={styles.text}>Wood Preis</Text>
            <TextInput
                style={styles.input}
                onChangeText={setWood}
                value={wood}
                keyboardType="numeric"
            />
            <TouchableOpacity onPress={changePrices} style={styles.button}>
                <Text style={styles.buttonText}>Preise ändern</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#080B0F',
    },
    textHeader: {
        marginTop: '10%',
        color: '#F7F7F7',
        fontSize: 30,
        textAlign: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        backgroundColor : '#F7F7F7',
        color: '#080B0F',
        borderRadius: 10,
    },
    text: {
        marginTop: '5%',
        color: '#F7F7F7',
        fontSize: 20,
        textAlign: 'center',
    },
    button: {
        padding: 10,
        borderColor: '#F7F7F7',
        borderRadius: 10,
        borderWidth: 1,
        margin: 20,
        justifyContent: 'center',
    },
    buttonText: {
        color: '#F7F7F7',
        textAlign: 'center',
        fontSize: 20,
    },
});