import { createStackNavigator } from '@react-navigation/stack';
import PricesHome from '../screens/pricesHome';

const DealerPrizesStack = createStackNavigator();

export default function DealerPrizesStackScreen() {
    return (
        <DealerPrizesStack.Navigator screenOptions={{ headerShown: false }}>
            <DealerPrizesStack.Screen name="DealerPrices" component={PricesHome} />
            
        </DealerPrizesStack.Navigator>
    );
}