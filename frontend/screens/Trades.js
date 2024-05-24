import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { DataTable } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import { useNavigation } from '@react-navigation/native';


export default function Trades() {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#080B0F',
        },
        HeaderText: {
            color: '#F7F7F7',
            fontSize: 30,
            textAlign: 'center',
            marginTop: '10%',
        },
        Buttoncontainer: {
            flex: 1,
            backgroundColor: '#080B0F',
            flexDirection: 'column',
            justifyContent: 'flex-end',
        },
        createButtonContainer: {
            alignItems: 'center',
            marginBottom: 30,
        },
        createButton: {
            padding: 10,
            borderColor: '#F7F7F7',
            borderRadius: 10,
            borderWidth: 1,
        },
        createButtonText: {
            color: '#F7F7F7',
            fontSize: 20,
        },
        tradeText: {
            color: '#F7F7F7',
            fontSize: 20,
            fontFamily: 'sans-serif',
        },
        DataTable: {
            marginTop: '10%',
        },
        DataTableText: {
            color: '#F7F7F7',
            fontSize: 20,
        },
    });


    const [closedTrades, setClosedTrades] = useState([]);
    const [openTrades, setOpenTrades] = useState([]);

    const Navigator = useNavigation();


    getTrades = async () => {
        const id = await AsyncStorage.getItem('db_id');
        
        fetch('http://192.168.178.91:5000/listDealersClosedTrades?id=' + id)
            .then((response) => response.json())
            .then((data) => {
                setClosedTrades(data);
            });
        fetch('http://192.168.178.91:5000/listDealerOpenTrades?id=' + id)
            .then((response) => response.json())
            .then((data) => {
                setOpenTrades(data);
            });
    }

    useEffect(() => {
        getTrades();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            getTrades();
        }, 10000);

        return () => clearInterval(interval);
    }, []);


    function createTrade() {
        Navigator.navigate('DealerCreateTrade');
    }


    return (
        <View style={styles.container}>
            <Text style={styles.HeaderText}>Geschlossene Trades</Text>
            <DataTable style={styles.DataTable}>
                <DataTable.Header>
                    <DataTable.Title><Text style={styles.DataTableText}>Material</Text></DataTable.Title>
                    <DataTable.Title><Text style={styles.DataTableText}>Typ</Text></DataTable.Title>
                    <DataTable.Title numeric><Text style={styles.DataTableText}>Uhrzeit</Text></DataTable.Title>
                </DataTable.Header>

                {closedTrades.map((trade, index) => (
                    <DataTable.Row key={index}>
                        <DataTable.Cell><Text style={styles.DataTableText}>{String(trade.material)}</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.DataTableText}>{String(trade.transactionType)}</Text></DataTable.Cell>
                        <DataTable.Cell numeric><Text style={styles.DataTableText}>{String(trade.created.split(' ')[4])}</Text></DataTable.Cell>


                    </DataTable.Row>
                ))}
            </DataTable>
            <Text style={styles.HeaderText}>Offene Trades</Text>
            <DataTable style={styles.DataTable}>
                <DataTable.Header>
                    <DataTable.Title><Text style={styles.DataTableText}>Material</Text></DataTable.Title>
                    <DataTable.Title><Text style={styles.DataTableText}>Typ</Text></DataTable.Title>
                    <DataTable.Title numeric><Text style={styles.DataTableText}>Qr-Code</Text></DataTable.Title>
                </DataTable.Header>

                {openTrades.map((trade, index) => (
                    <DataTable.Row key={index}>
                        <DataTable.Cell><Text style={styles.DataTableText}>{String(trade.material)}</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.DataTableText}>{String(trade.transactionType)}</Text></DataTable.Cell>
                        <DataTable.Cell numeric><Text style={styles.DataTableText}>{String(trade.created.split(' ')[4])}</Text></DataTable.Cell>
                    </DataTable.Row>
                ))}
            </DataTable>

            <View style={styles.Buttoncontainer}>
                <View style={styles.createButtonContainer}>
                    <TouchableOpacity style={styles.createButton} onPress={createTrade} >
                        <Text style={styles.createButtonText}>Trade öffnen</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

