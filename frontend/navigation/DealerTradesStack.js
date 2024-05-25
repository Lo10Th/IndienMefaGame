import Trades from "../screens/Trades";
import { createStackNavigator } from '@react-navigation/stack';
import DealerCreateTrade from "../screens/dealerCreateTrade";
import QrCode from "../screens/qrCode";


const DealerTradesStack = createStackNavigator();

export default function DealerTradesStackScreen() {
    return (
        <DealerTradesStack.Navigator screenOptions={{ headerShown: false }}>
            <DealerTradesStack.Screen name="DealerTrades" component={Trades} />
            <DealerTradesStack.Screen name="DealerCreateTrade" component={DealerCreateTrade} />
            <DealerTradesStack.Screen name="QrCode" component={QrCode} />
        </DealerTradesStack.Navigator>
    );
}