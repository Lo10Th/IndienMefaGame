import { View, Text, StyleSheet } from "react-native";
import QRCode from 'react-native-qrcode-svg';

export default function QrCode( route ) {
    const id = route.params ? route.params.id : undefined;

    return (
        <View style={styles.container}>
            <QRCode
                value={id}
                size={350}
                style={styles.qrCode}
            />
        </View>
    );
}

styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#080B0F',
        alignItems: 'center',
        justifyContent: 'center',
    },
    qrCode: {
        backgroundColor: '#F7F7F7',
    },
});