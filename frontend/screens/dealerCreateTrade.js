import { View, Text, StyleSheet } from "react-native";

export default function DealerCreateTrade() {
    return (
        <View style={styles.container}>
            <Text>Trade öffnen</Text>
        </View>
    );
}

styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#080B0F',
    },
});