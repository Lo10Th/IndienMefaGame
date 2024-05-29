import { View, Text, StyleSheet } from "react-native";
import QRCode from 'react-native-qrcode-svg';
import { useEffect, useState } from "react";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export default function QrCode({ route }) {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#080B0F',
            justifyContent: 'center',
            alignItems: 'center',
        },
        qrCode: {
            backgroundColor: '#F7F7F7',
        },
    });

    const [id, setId] = useState();

    useEffect(() => {
        async function fetchId() {
            if (route && route.params) {
                const id = await route.params.id;
                setId(id);
            }
        }

        fetchId();
    }, [route]);

    return (
        <View style={styles.container}>
            <QRCode
                value={String(id)}
                size={350}
                style={styles.qrCode}
            />
        </View>
    );
}