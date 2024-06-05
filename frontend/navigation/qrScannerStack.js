import { createStackNavigator } from "@react-navigation/stack";
import ScannerHome from "../screens/scannerHome";
import QrCodeResult from "../screens/qrCodeResult";

const qrCodeScannerStack = createStackNavigator();

export default function QrScannerStack() {
    return (
        <qrCodeScannerStack.Navigator screenOptions={{ headerShown: false }}>
            <qrCodeScannerStack.Screen name="ScannerHome" component={ScannerHome}/>
            <qrCodeScannerStack.Screen name="QrCodeResult" component={QrCodeResult} />
        </qrCodeScannerStack.Navigator>
    )
}