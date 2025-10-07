import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootStackParamList, RootTabParamList} from './types';
import HomeScreen from '../presentation/screens/home';
import SearchScreen from '../presentation/screens/search';
import CartScreen from '../presentation/screens/cart';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../dls/colors';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

const getTabBarIcon = (routeName: string, focused: boolean, color: string, size: number) => {
  let iconName: string;

  if (routeName === 'Home') {
    iconName = focused ? 'home' : 'home-outline';
  } else if (routeName === 'Search') {
    iconName = focused ? 'search' : 'search-outline';
  } else if (routeName === 'Cart') {
    iconName = focused ? 'cart' : 'cart-outline';
  } else {
    iconName = 'circle';
  }

  return <Ionicons name={iconName} size={size} color={color} />;
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => getTabBarIcon(route.name, focused, color, size),
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.grey66,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 1,
          borderTopColor: colors.greyeee,
          paddingBottom: 15,
          paddingTop: 5,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
    </Tab.Navigator>
  );
};

export const AppNavigators = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainTabs" component={TabNavigator} />
    </Stack.Navigator>
  );
};
