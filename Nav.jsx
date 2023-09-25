// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Welcome from './src/screens/home/Welcome';
import Home from './src/screens/home/Home';
import Navigation from './src/shared/navigation/Navigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ProductDetail from './src/screens/product/ProductDetail';
import Profile from './src/screens/user/Profile';
import Login from './src/screens/user/Login';
import Register from './src/screens/user/Register';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {store} from './src/redux/store';
import {onAuthStateChanged} from 'firebase/auth';
import {setUser} from './src/redux/slices/user';
import {auth} from './src/services/firebaseconfig';
import Checkout from './src/features/payment/Checkout';
import Cender from './src/features/payment/Cender';
import CategoryList from './src/screens/product/CategoryList';
import CategoryScreen from './src/screens/product/CategoryScreen';
import PaymentScreen from './src/features/payment/Payment';

const Stack = createNativeStackNavigator();

export default function Nav() {
  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();
  onAuthStateChanged(auth, user => {
    dispatch(setUser(user));
  });

  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Navigation}
            options={{
              headerShown: false,
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="ProductDetail"
            options={{
              headerTitle: 'Drug Details',
              headerShadowVisible: false,
            }}
            component={ProductDetail}
          />

          <Stack.Screen
            name="PaymentScreen"
            options={{
              headerShadowVisible: false,
              presentation: 'modal',
            }}
            component={PaymentScreen}
          />
          <Stack.Screen
            name="Checkout"
            options={{
              headerShadowVisible: false,
              presentation: 'modal',
            }}
            component={Checkout}
          />
          <Stack.Screen
            name="Category"
            options={{
              headerShadowVisible: false,
              headerTitle: 'All Categories',
            }}
            component={CategoryList}
          />
          <Stack.Screen
            name="CategoryScreen"
            options={{
              headerShadowVisible: false,
            }}
            component={CategoryScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerTitle: 'Login',
            headerTitleAlign: 'center',

            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerTitle: 'Sign Up',
            headerTitleAlign: 'center',

            headerShadowVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
