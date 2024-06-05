import { View, Text, StyleSheet, Touchable } from 'react-native';
import { useState, useEffect } from 'react';
import backendUrl from '../env';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


export default function QrCodeResult({ route }) {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#080B0F',
            alignItems: 'center',
        },
        text: {
            color: '#F7F7F7',
            fontSize: 20,
        },
        h2Text: {
            color: '#F7F7F7',
            fontSize: 25,
            fontWeight: 'bold',
            marginTop: '15%'
        },
        button: {
            backgroundColor: '#F7F7F7',
            padding: 10,
            borderRadius: 10,
            marginTop: '80%',
            width: '80%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        buttonText: {
            color: '#080B0F',
            fontSize: 20
        }
    });


    const [tradeId, setTradeId] = useState('');
    const navigator = useNavigation();

    async function acceptTrade() {
        id = await AsyncStorage.getItem('db_id');
        url = backendUrl + '/closeTrade?id=' + tradeId + '&groupId=' + id 
        console.log(url)
        fetch(url)
        .then(response => response.text())
        .then(data => {
            if (data == 'Trade closed') {
                navigator.navigate('ScannerHome');
            } else {
                alert(data);
            }
        })
    }

    async function fetchData() {
        if (route && route.params) {
            const tradeId = await route.params.data;
            setTradeId(tradeId);
        }
    }

    useEffect(() => {
        fetchData();
    }, [route]);


    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity style={styles.button} onPress={acceptTrade}>
                    <Text style={styles.buttonText}>Trade bestätigen</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}