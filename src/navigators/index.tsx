import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {RootStackParamList, RootTabParamList} from './types';
import HomeScreen from '../presentation/screens/home';
import SearchScreen from '../presentation/screens/search';
import CartScreen from '../presentation/screens/cart';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../dls/colors';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

const CartIcon = ({focused, color, size}: {focused: boolean; color: string; size: number}) => {
  const cart = useSelector((state: any) => state.cartState);
  const totalItems = Array.isArray(cart) ? cart.reduce((total: number, item: any) => total + item.quantity, 0) : 0;

  return (
    <View style={styles.iconContainer}>
      <Ionicons name={focused ? 'cart' : 'cart-outline'} size={size} color={color} />
      {totalItems > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{totalItems}</Text>
        </View>
      )}
    </View>
  );
};

const getTabBarIcon = (routeName: string, focused: boolean, color: string, size: number) => {
  if (routeName === 'Cart') {
    return <CartIcon focused={focused} color={color} size={size} />;
  }

  let iconName: string;

  if (routeName === 'Home') {
    iconName = focused ? 'home' : 'home-outline';
  } else if (routeName === 'Search') {
    iconName = focused ? 'search' : 'search-outline';
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

const styles = StyleSheet.create({
  iconContainer: {
    position: 'relative',
    width: 24,
    height: 24,
  },
  badge: {
    position: 'absolute',
    right: -8,
    top: -8,
    backgroundColor: colors.primary,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  badgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export const AppNavigators = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainTabs" component={TabNavigator} />
    </Stack.Navigator>
  );
};
