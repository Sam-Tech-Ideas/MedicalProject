import {Text, View} from 'react-native';
import Home from '../../screens/home/Home';
import Profile from '../../screens/user/Profile';
import Cart from '../../screens/cart/Cart';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import SearchScreen from '../../screens/product/SearchScreen';

const Tab = createMaterialBottomTabNavigator();

export default function Navigation() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="teal"
      inactiveColor="#A0AEC0"
      barStyle={{backgroundColor: 'white'}}
      tabBarOptions={{
        activeTintColor: 'teal',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <Ionicons name="home-outline" color={color} size={18} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <Ionicons name="person-outline" color={color} size={18} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: 'Search',

          tabBarLabel: 'Search',
          tabBarIcon: ({color}) => (
            <Ionicons name="search-outline" color={color} size={18} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({color}) => (
            <Ionicons name="cart-outline" color={color} size={18} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
