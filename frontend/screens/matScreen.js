import { View, Text } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';


export default function MatScreen({ route}) {
    const { MatName } = route.params;
    const [matName, setMatName] = useState(MatName);
    const [matCount, setMatCount] = useState(0);


    async function getData() {
        const id = await AsyncStorage.getItem('db_id');
        const type = await AsyncStorage.getItem('type');
        fetch('http://192.168.178.91:5000/getPortfolio?id=' + id + '&type=' + type + '&resource=' + matName)
            .then((response) => Number(response))
            .then((data) => setMatCount(data));
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <View>
            <Text>{matName}</Text>
        </View>
    );
    }
