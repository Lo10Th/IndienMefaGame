import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import backendUrl from '../../env';


export default function MaterialsList() {
    const [gold, setGold] = useState(null);
    const [bling, setBling] = useState(null);
    const [wood, setWood] = useState(null);

    const getMaterials = async () => {
        const id = await AsyncStorage.getItem('db_id');
        const type = await AsyncStorage.getItem('type');
        const url = backendUrl + '/getPortfolioAll?id=' + id + '&type=' + type 
        fetch(url)
        .then((response) => response.json())
        .then(data => {
            setGold(data.gold);
            setBling(data.bling);
            setWood(data.wood);
        });
    };
    
    useEffect(() => {
        getMaterials();
    }, []);
    
    useEffect(() => {
        const interval = setInterval(() => {
            getMaterials();
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.reload} onPress={getMaterials}>
                <Image source={require('../../assets/icons/reload.png')} style={{ width: 40, height: 40 }} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.matBox}>
                <Text style={styles.matText}>Bling: {bling}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.matBox}>
                <Text style={styles.matText}>Gold: {gold}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.matBox}>
                <Text style={styles.matText}>Wood: {wood}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = {
    container: {
        marginTop: '20%',
    },
    matText: {
        color: '#F7F7F7',
        fontSize: 20,
        fontFamily: 'sans-serif',
        textAlign: 'center',
    },
    matBox: {
        backgroundColor: '#080B0F',
        borderColor: '#F7F7F7',
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,
        padding: 10,
    },
    reload: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 20,
        padding: 10,
        marginBottom: 50,
    },
};