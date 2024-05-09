import { createStackNavigator } from '@react-navigation/stack';
import FirstTimeUsing1 from '../components/firstTimeUsing1';
import FirstTimeUsingGruppe from '../components/firstTimeUsing-Gruppe';
import FirstTimeUsing3 from '../components/pwdCheckGroup';

const FirstTimeUsingStack = createStackNavigator();

export default function FirstTimeUsingStackScreen() {
  return (
    <FirstTimeUsingStack.Navigator screenOptions={{ headerShown: false }}>
      <FirstTimeUsingStack.Screen name="FirstTimeUsingStack1" component={FirstTimeUsing1} />
      <FirstTimeUsingStack.Screen name="FirstTimeUsingStack2Gruppe" component={FirstTimeUsingGruppe} />
      <FirstTimeUsingStack.Screen name="FirstTimeUsingStack3Gruppe" component={FirstTimeUsing3} />
    </FirstTimeUsingStack.Navigator>
  );
}
