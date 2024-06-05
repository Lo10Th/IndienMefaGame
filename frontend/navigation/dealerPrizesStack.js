import { createStackNavigator } from '@react-navigation/stack';
import PricesHome from '../screens/pricesHome';
import ChangePrices from '../screens/changePrices';

const DealerPrizesStack = createStackNavigator();

export default function DealerPrizesStackScreen() {
    return (
        <DealerPrizesStack.Navigator screenOptions={{ headerShown: false }}>
            <DealerPrizesStack.Screen name="DealerPrices" component={PricesHome} />
            <DealerPrizesStack.Screen name="ChangePrices" component={ChangePrices} />
        </DealerPrizesStack.Navigator>
    );
}