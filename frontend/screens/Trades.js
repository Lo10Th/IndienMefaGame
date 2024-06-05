import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { DataTable } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import BackendUrl from '../env';


export default function Trades() {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: '#080B0F',
        },
        HeaderText: {
            color: '#F7F7F7',
            fontSize: 30,
            textAlign: 'center',
        },
        HeaderText2: {
            color: '#F7F7F7',
            fontSize: 30,
            textAlign: 'center',
            marginTop: '10%',
        },
        Buttoncontainer: {
            flex: 1,
            backgroundColor: '#080B0F',
            justifyContent: 'flex-end',
            marginTop: '15%',
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
        qrCodeButton: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            padding: 3,
            borderColor: '#F7F7F7',
            borderRadius: 10,
            borderWidth: 1,
            marginLeft: 8,
        },
        qrCodeButtonText: {
            color: '#F7F7F7',
            fontSize: 20,
        },
        reload: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginRight: 20,
            marginTop: '10%',
            marginRight: 20,
        },
    });


    const [closedTrades, setClosedTrades] = useState([]);
    const [openTrades, setOpenTrades] = useState([]);

    const Navigator = useNavigation();


    getTrades = async () => {
        const id = await AsyncStorage.getItem('db_id');
        
        fetch(BackendUrl + '/listDealersClosedTrades?id=' + id)
            .then((response) => response.json())
            .then((data) => {
                setClosedTrades(data);
            });
        fetch(BackendUrl + '/listDealerOpenTrades?id=' + id)
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

    function openQrCode(id) {
        Navigator.navigate('QrCode', { id: id });
    }


    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.reload} onPress={getTrades}>
                <Image source={require('../assets/icons/reload.png')} style={{ width: 40, height: 40 }} />
            </TouchableOpacity>
            <Text style={styles.HeaderText}>Geschlossene Trades</Text>
            <DataTable style={styles.DataTable}>
                <DataTable.Header>
                    <DataTable.Title><Text style={styles.DataTableText}>Material</Text></DataTable.Title>
                    <DataTable.Title><Text style={styles.DataTableText}>Typ</Text></DataTable.Title>
                    <DataTable.Title numeric><Text style={styles.DataTableText}>Bling</Text></DataTable.Title>
                    <DataTable.Title numeric><Text style={styles.DataTableText}>Material</Text></DataTable.Title>
                    <DataTable.Title numeric><Text style={styles.DataTableText}>Uhrzeit</Text></DataTable.Title>
                </DataTable.Header>

                {closedTrades.map((trade, index) => (
                    <DataTable.Row key={index}>
                        <DataTable.Cell><Text style={styles.DataTableText}>{String(trade.material)}</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.DataTableText}>{trade.transactionType === 'buy' ? 'sell' : 'buy'}</Text></DataTable.Cell>
                        <DataTable.Cell numeric><Text style={styles.DataTableText}>{String(trade.blingSum)}</Text></DataTable.Cell>
                        <DataTable.Cell numeric><Text style={styles.DataTableText}>{String(trade.materialSum)}</Text></DataTable.Cell>
                        <DataTable.Cell numeric><Text style={styles.DataTableText}>{String(trade.created.split(' ')[4])}</Text></DataTable.Cell>
                    </DataTable.Row>
                ))}
            </DataTable>
            <Text style={styles.HeaderText2}>Offene Trades</Text>
            <DataTable style={styles.DataTable}>
                <DataTable.Header>
                    <DataTable.Title><Text style={styles.DataTableText}>Material</Text></DataTable.Title>
                    <DataTable.Title><Text style={styles.DataTableText}>Typ</Text></DataTable.Title>
                    <DataTable.Title numeric><Text style={styles.DataTableText}>Bling</Text></DataTable.Title>
                    <DataTable.Title numeric><Text style={styles.DataTableText}>Material</Text></DataTable.Title>
                    <DataTable.Title numeric><Text style={styles.DataTableText}>Qr-Code</Text></DataTable.Title>
                </DataTable.Header>

                {openTrades.map((trade, index) => (
                    <DataTable.Row key={index}>
                        <DataTable.Cell><Text style={styles.DataTableText}>{String(trade.material)}</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.DataTableText}>{trade.transactionType === 'buy' ? 'sell' : 'buy'}</Text></DataTable.Cell>
                        <DataTable.Cell numeric><Text style={styles.DataTableText}>{String(trade.blingSum)}</Text></DataTable.Cell>
                        <DataTable.Cell numeric><Text style={styles.DataTableText}>{String(trade.materialSum)}</Text></DataTable.Cell>
                        <DataTable.Cell>
                            <TouchableOpacity style={styles.qrCodeButton} onPress={() => { openQrCode(trade.id); console.log(trade.id); }}>
                                <Text style={styles.qrCodeButtonText}>QrCode</Text>
                            </TouchableOpacity>
                        </DataTable.Cell>
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
        </ScrollView>
    );
}

