import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import SelectDropdown from 'react-native-select-dropdown'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import BackendUrl from '../env';

export default function DealerCreateTrade() {
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
        h2Text: {
            color: '#F7F7F7',
            fontSize: 20,
            textAlign: 'center',
            marginTop: '10%',
        },
        input: {
            marginTop: 20,
            height: 50,
            borderWidth: 1,
            backgroundColor : '#F7F7F7',
            color: '#080B0F',
            borderRadius: 10,
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
        yourPrice: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: '5%',
        },
        summaryRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 10,
        },
        redText: {
            color: 'red',
            fontSize: 20,
        },
        greenText: {
            color: 'green',
            fontSize: 20,
            color: 'green',
            fontSize: 20,
            alignSelf: 'flex-end',
        },
        summary: {
            marginTop: 20,
        },
    });

    const [tradeType, setTradeType] = useState(''); // 'buy' or 'sell' from the view of the dealer
    const [material, setMaterial] = useState(''); // 'wood' or 'gold'
    const [sentence1, setSentence1] = useState('Wie viel Material willst du handeln?');
    const [materialSum, setMaterialSum] = useState('');
    const [selfPrices, setSelfPrices] = useState([]);
    const [sentence2, setSentence2] = useState('Dein aktueller Preis');
    const [price, setPrice] = useState('');
    const navigator = useNavigation();


    async function createTrade() {
        if (tradeType === '' || material === '' || materialSum === '') {
            alert('Bitte fülle alle Felder aus');
            return;
        }
        if (tradeType === 'sell') {
            trade = {
                type: tradeType,
                material: material,
                materialSum: materialSum,
                blingSum: materialSum * Number(price),
            }
        } else {
            trade = {
                type: tradeType,
                material: material,
                materialSum: materialSum,
                blingSum: materialSum * Number(selfPrices[material]),
            }
        }
        const id = await AsyncStorage.getItem('db_id');
        fetch(BackendUrl + '/openTrade?dealer_id=' + id + '&materialSum=' + materialSum + '&blingSum=' + trade.blingSum + '&transactionType=' + trade.type + '&material=' + trade.material)
            .then((response) => response.text())
            .then((data) => {
            if (data === "Trade opened") {
                alert('Trade erfolgreich geöffnet');
                navigator.navigate('DealerTrades')
            } else {
                alert('Trade konnte nicht geöffnet werden. Fehler: ' + data + '. Bitte versuche es erneut oder wende dich an Karl');
            }
            });
        console.log(trade);
    }

    const getSelfPrices = async () => {
        id = await AsyncStorage.getItem('db_id');
        fetch(BackendUrl + '/getOwnPrices?id=' + id)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setSelfPrices(data);
            });
    }

    useEffect(() => {
        getSelfPrices();
    }, []);
    


    return (
        <View style={styles.container}>
            <Text style={styles.HeaderText}>Trade öffnen</Text>
            <View>
                <Text style={styles.h2Text}>Willst du Material Verkaufen oder Kaufen</Text>
                <SelectDropdown
                    data={['Kaufen', 'Verkaufen']}
                    onSelect={(selectedItem, index) => {
                        if (selectedItem === 'Kaufen') {
                            setTradeType('sell');
                        } else {
                            setTradeType('buy');
                        }
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        return item
                    }}
                    renderButton={(selectedItem, isOpened) => {
                        return (
                            <View style={{ width: '100%', height: 50, backgroundColor: '#F7F7F7', justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginTop: 20 }}>
                                <Text style={{ color: '#080B0F', fontSize: 20 }}>{selectedItem}</Text>
                            </View>
                        )
                    }}
                    renderItem={(item, index, isSelected) => {
                        return (
                            <View style={{ width: '100%', height: 50, backgroundColor: '#080B0F', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: '#F7F7F7', fontSize: 20 }}>{item}</Text>
                            </View>
                        )
                    }}

                    />
            </View>
            <View>
                <Text style={styles.h2Text}>Welches Material willst du handeln?</Text>
                <SelectDropdown
                    data={['Holz', 'Gold']}
                    onSelect={(selectedItem, index) => {
                        if (selectedItem === 'Holz') {
                            setMaterial('wood');
                            setSentence1('Wie viel Holz willst du handeln?');
                            setSentence2('Dein aktueller Holz Preis');
                        } else {
                            setMaterial('gold');
                            setSentence1('Wie viel Gold willst du handeln?');
                            setSentence2('Dein aktueller Gold Preis');
                        }
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        return item
                    }}
                    renderButton={(selectedItem, isOpened) => {
                        return (
                            <View style={{ width: '100%', height: 50, backgroundColor: '#F7F7F7', justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginTop: 20 }}>
                                <Text style={{ color: '#080B0F', fontSize: 20 }}>{selectedItem}</Text>
                            </View>
                        )
                    }}
                    renderItem={(item, index, isSelected) => {
                        return (
                            <View style={{ width: '100%', height: 50, backgroundColor: '#080B0F', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: '#F7F7F7', fontSize: 20 }}>{item}</Text>
                            </View>
                        )
                    }}

                    />
            </View>
            <View>
                <Text style={styles.h2Text}>{sentence1}</Text>
                <TextInput 
                style={styles.input}
                onChangeText={setMaterialSum}
                value={materialSum}
                keyboardType="numeric"
                />
            </View>

            {tradeType === 'sell' && (
                <View>
                    <Text style={styles.h2Text}>Für was für einen Preis pro Stück möchstest du kaufen?</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setPrice}
                        value={price}
                        keyboardType="numeric"
                    />
                </View>
            )}

            {tradeType === 'buy' && (
            <View>
            <View style={styles.yourPrice}>
                <View style={styles.gold}>
                    <Text style={styles.boxHeader}>{sentence2}</Text>
                    <Text style={styles.boxCount}>{selfPrices[material]}</Text>
                </View>
            </View>
            <View style={styles.summary}>
            <Text style={styles.h2Text}>Zusammenfassung</Text>
            <View style={styles.summaryRow}>
                <Text style={styles.redText}>-{materialSum} {material}</Text>
                <Text style={styles.greenText}>{materialSum * Number(price)} Bling</Text>
            </View>
            </View>
            </View>
            )}

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

