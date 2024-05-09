import { createStackNavigator } from '@react-navigation/stack';
import FirstTimeUsing1 from '../components/firstTimeUsing1';
import FirstTimeUsingGruppe from '../components/firstTimeUsing-Gruppe';
import PwdCheckGroup from '../components/pwdCheckGroup';
import FirstTimeUsingDealer from '../components/firstTimeUsing-Dealer';
import PwdCheckDealer from '../components/pwdCheckDealer';

const FirstTimeUsingStack = createStackNavigator();

export default function FirstTimeUsingStackScreen() {
  return (
    <FirstTimeUsingStack.Navigator screenOptions={{ headerShown: false }}>
      <FirstTimeUsingStack.Screen name="FirstTimeUsingStack1" component={FirstTimeUsing1} />
      <FirstTimeUsingStack.Screen name="FirstTimeUsingStack2Gruppe" component={FirstTimeUsingGruppe} />
      <FirstTimeUsingStack.Screen name="FirstTimeUsingStack3Gruppe" component={PwdCheckGroup} />
      <FirstTimeUsingStack.Screen name="FirstTimeUsingStack2Dealer" component={FirstTimeUsingDealer} />
      <FirstTimeUsingStack.Screen name="FirstTimeUsingStack3Dealer" component={PwdCheckDealer} />
    </FirstTimeUsingStack.Navigator>
  );
}
