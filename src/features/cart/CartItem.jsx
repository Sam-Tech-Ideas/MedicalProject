import {View, Text} from 'react-native';
import React from 'react';
import {Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const CartItem = () => {
  return (
    <View>
      <View className="flex-row border-2 border-gray-200   m-4 p-4">
        <Image
          className="w-20 h-full object-cover object-center"
          source={{uri: 'https://picsum.photos/200/300'}}
        />

        <View className="flex-1">
          <View className="flex-row justify-between items-center m-2">
            <Text className="text-xl font-bold">Paracetamol</Text>
            <View>
              <Ionicons name="trash-outline" size={26} color="gray" />
            </View>
          </View>
          <View className="flex-row justify-between items-center m-4">
            <View className="flex-row ">
              <Ionicons name="remove" size={26} color="black" />
              <Text className="text-lg font-bold">1</Text>
              <View className="bg-teal-300  mx-2">
                <Ionicons name="add" size={26} color="white" className="" />
              </View>
            </View>
            <View className="">
              <Text className="text-lg font-bold">Ghc100</Text>
               </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartItem;
