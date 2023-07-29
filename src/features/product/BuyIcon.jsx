import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {selectCartItems, selectCartTotal} from '../../redux/slices/cart';
import {useSelector} from 'react-redux';


const BuyIcon = ({navigation}) => {
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  

  const handleBuyNow = () => {
    navigation.navigate('Checkout');
  };

  //nav

  return (
    <>
      <View className="flex-row items-center  py-2 ">
        <View className="flex-row items-center justify-between w-full px-8">
          <View>
            <Text className="font-bold text-lg">Total</Text>
          </View>
          <View className="flex-row ">
            <Text className="font-bold text-xl text-black">
              Ghc {total.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
      <View className=" my-2 items-center fab mx-4 flex-row">
        <View className="bg-gray-300 p-2 rounded-2xl">
          <Ionicons name="cart-outline" size={24} color="teal" className="" />
        </View>

        <TouchableOpacity
          className="bg-teal-500 flex-1 py-3 rounded-full mx-4"
          onPress={handleBuyNow}>
          <Text className="text-center text-white">Buy Now</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default BuyIcon;
