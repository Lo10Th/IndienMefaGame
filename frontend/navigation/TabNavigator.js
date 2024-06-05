import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackScreen from './HomeStack';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import DealerTradesStackScreen from './DealerTradesStack';
import DealerPrizesStackScreen from './dealerPrizesStack';
import QrScannerStack from './qrScannerStack';


const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const [type, setType] = useState(null);


  const getType = async () => {
    const type = await AsyncStorage.getItem('type');
    setType(type);
  };

  useEffect(() => {
    getType();
  }, []);


  return (
    <Tab.Navigator 
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#080B0F',
          borderColor: '#080B0F',
        },
      }}
    >
    <Tab.Screen 
      name="Home"
      component={HomeStackScreen} 
      options={{
        tabBarIcon: ({ focused }) => (
          <Image
          source={focused ? require('../assets/icons/HomeFocus.png') : require('../assets/icons/HomeUnFocus.png')}
          style={{ width: 30, height: 30, tintColor: focused ? '#F7F7F7' : '#A9A9A9' }}
          />
        ),
      }}
    />

  {type === 'group' && (
    <Tab.Screen
      name="Scan"
      component={QrScannerStack}
      options={{
        tabBarIcon: ({ focused }) => (
          <Image
            source={focused ? require('../assets/icons/qrCodeFocus.png') : require('../assets/icons/qrCodeUnfocus.png')}
            style={{ width: 30, height: 30, tintColor: focused ? '#F7F7F7' : '#A9A9A9' }}
          />
        ),
      }}
    />
  )}

    {type === 'dealer' && (
      <Tab.Screen 
        name="ThirdTab"
        component={DealerTradesStackScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? require('../assets/icons/transferFocus.png') : require('../assets/icons/transferUnfocus.png')}
              style={{ width: 40, height: 40, tintColor: focused ? '#F7F7F7' : '#A9A9A9' }}
            />
          ),
        }}
      />
    )}

    {type === 'dealer' && (
      <Tab.Screen 
        name="Prices"
        component={DealerPrizesStackScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? require('../assets/icons/preisFocus.png') : require('../assets/icons/preisUnfocus.png')}
              style={{ width: 30, height: 30, tintColor: focused ? '#F7F7F7' : '#A9A9A9' }}
            />
          ),
        }}
      />
    )}
    </Tab.Navigator>
  );
}
