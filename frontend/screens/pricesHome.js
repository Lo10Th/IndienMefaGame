import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { DataTable } from 'react-native-paper';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function PricesHome() {
    const [prices, setPrices] = useState([]);
    const [selfPrices, setSelfPrices] = useState([]);
    navigator = useNavigation();

    const getPrices = async () => {
        id = await AsyncStorage.getItem('db_id');
        fetch('http://192.168.178.91:5000/getDealerPrices?id=' + id)
            .then((response) => response.json())
            .then((data) => {
                setPrices(data);
            });
    }

    const getSelfPrices = async () => {
        id = await AsyncStorage.getItem('db_id');
        fetch('http://192.168.178.91:5000/getOwnPrices?id=' + id)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setSelfPrices(data);
            });
    }

    useEffect(() => {
        getPrices();
        getSelfPrices();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            getPrices();
            getSelfPrices();
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    const redirect = () => {
        navigator.navigate('ChangePrices');
    }

    return (
        <View style={styles.container}>
            <View style={styles.scrollContainer}>
                <Text style={styles.headerText}>Preise von anderen Dealern</Text>
                <DataTable style={{ marginTop: '5%' }}>
                    <DataTable.Header>
                        <DataTable.Title><Text style={styles.text}>Name</Text></DataTable.Title>
                        <DataTable.Title><Text style={styles.text}>Gold</Text></DataTable.Title>
                        <DataTable.Title numeric><Text style={styles.text}>Wood</Text></DataTable.Title>
                    </DataTable.Header>

                    {Object.keys(prices).map((name, index) => (
                        <DataTable.Row key={index}>
                            <DataTable.Cell><Text style={styles.text}>{name}</Text></DataTable.Cell>
                            <DataTable.Cell><Text style={styles.text}>{prices[name].gold}</Text></DataTable.Cell>
                            <DataTable.Cell numeric><Text style={styles.text}>{prices[name].wood}</Text></DataTable.Cell>
                        </DataTable.Row>
                    ))}
                </DataTable>
            </View>
            <Text style={styles.headerText}>Deine Preise</Text>
            <TouchableOpacity style={styles.reload} onPress={getPrices}>
                <Image source={require('../assets/icons/reload.png')} style={{ width: 40, height: 40 }} />
            </TouchableOpacity>
            <View style={styles.yourPrice}>
                <View style={styles.gold}>
                    <Text style={styles.boxHeader}>Gold Preis</Text>
                    <Text style={styles.boxCount}>{selfPrices.gold}</Text>
                </View>
                <View style={styles.wood}>
                    <Text style={styles.boxHeader}>Holz Preis</Text>
                    <Text style={styles.boxCount}>{selfPrices.wood}</Text>
                </View>
                
            </View>
            <View style={styles.yourPriceContainer}>
                <TouchableOpacity style={styles.changePrice} onPress={redirect}>
                    <Text style={styles.ButtonText}>Preise ändern</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#080B0F',
    },
    headerText: {
        color: '#F7F7F7',
        fontSize: 30,
        textAlign: 'center',
    },
    text: {
        color: '#F7F7F7',
        fontSize: 20,
    },
    scrollContainer: {
        marginTop: 25,
        height: '50%',
        marginLeft: 7,
        marginRight: 7,
    },
    table: {
        marginTop: '5%',
    },
    yourPrice: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: '5%',
    },
    gold: {
        padding: 20,
        borderRadius: 10,
    },
    wood: {
        padding: 20,
        borderRadius: 10,
    },
    boxHeader: {
        fontSize: 20,
        textAlign: 'center',
        color: '#F7F7F7',
    },
    boxCount: {
        fontSize: 30,
        textAlign: 'center',
        color: '#F7F7F7',
    },
    changePrice: {
        padding: 10,
        borderColor: '#F7F7F7',
        borderRadius: 10,
        borderWidth: 1,
        margin: 20,
    },
    changePriceContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    ButtonText: {
        color: '#F7F7F7',
        fontSize: 20,
        alignSelf: 'center',
    },
    reload: {
        marginLeft: 20,
    },
});