import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native';
import CartItem from '../../features/cart/CartItem';

const Cart = () => {
  return (
    <SafeAreaView>
      <View>
        <CartItem />
        <View className="p-4 ">
          <Text className="text-lg font-bold">Payment Details</Text>
          <View className="p-4 flex-row justify-between items-center">
            <Text>Subtotal</Text>
            <Text>1000</Text>
          </View>
          <View className="p-4 flex-row justify-between">
            <Text>Delivery Fee</Text>
            <Text>100 </Text>
          </View>
          <View className="p-4 flex-row justify-between">
            <Text className="font-bold text-md">Total</Text>
            <Text className="font-bold text-md">Ghc 1100</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Cart;
