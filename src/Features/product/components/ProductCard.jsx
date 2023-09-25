import {collection, onSnapshot} from 'firebase/firestore';
import React, {useEffect, useState} from 'react';
import {db} from '../../../services/firebaseconfig';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const ProductCard = ({
  id,
  title,
  price,
  description,
  vendor,
  location,
  quantity,
  imageUrl,
}) => {
  const [loading, setLoading] = useState(true); 
  const navigation = useNavigation();

        

  return (
    <TouchableOpacity key={id} onPress={
        ()=> navigation.navigate('ProductDetail', {
            id,
            imageUrl,
            title,
            price,
            description, 
            vendor,
            location,
            quantity,
            })
    }>


      <View className="w-[24vh] rounded-xl   h-54 m-2 border  bg-white  border-gray-200 ">
        <View className=" h-40 p-2">
          {/* {loading ? (
            <ActivityIndicator className="flex items-center h-full" size={40} />
          ) : ( */}
            <Image
              source={{uri: imageUrl}}
              className="  h-40 object-center object-cover"
            />
        
        </View>
        <View className="px-2">
          <View className="py-2">
            <Text className="text-lg font-bold text-black">{title}</Text>
          </View>
          <View className="pb-1">
            <Text className="text-md text-teal-400">Ghc {price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
