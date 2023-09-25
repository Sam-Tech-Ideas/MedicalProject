import {View, Text, Image, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';
import BuyIcon from '../../features/product/BuyIcon';
import {
  addToCart,
  removeFromCart,
  selectCartItems,
  selectCartItemsWithId,
} from '../../redux/slices/cart';
import {useDispatch, useSelector} from 'react-redux';
import {doc, getDoc} from 'firebase/firestore';
import {db} from '../../services/firebaseconfig';

const ProductDetail = (
  {
    
   

    productId,

  },
) => {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const {
    params: {
      id,
      title,
      price,
      category,
      description,
      vendor,
      location,
      quantity,
      imageUrl,
    },
  } = useRoute();
  console.log('id', id);
 const items = useSelector((state)=>selectCartItemsWithId(state, id));
  const dispatch = useDispatch();

  const addProductToCart = () => {
    dispatch(
      addToCart({
        id,
        title,
        price,
        category,
        description,
        vendor,
        location,
        quantity,
        imageUrl,
      }),
    );
  };

  const removeProductFromCart = () => {
    if (!items.length > 0) return;
    dispatch(
      removeFromCart({
      id,
        title,
        price,
        category,
        description,
        vendor,
        location,
        quantity,
        imageUrl,
      }),
    );
  };



  return (
    <>
      <ScrollView vertical className="bg-white">
        <View key={id}>
          <View style={{width: '100%'}} className="container h-72 bg-red-500">
            <View className="flex-row bg-white justify-center items-center h-full">
              <Image
                className="h-48 w-40"
                loadingStyle={{size: 'large', color: 'blue'}}
                source={{uri: imageUrl}}
              />
            </View>
          </View>

          <View
            style={{padding: 16}}
            className=" shadow-4xl h-full border-gray-200 border-2  rounded-t-[50] bg-white">
            <View className="p-2">
              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="font-bold text-black text-2xl">{title}</Text>
                  <Text className="text-gray-400 text-sm">{category}</Text>
                </View>
                <View className="bg-teal-700 rounded-full">
                  <Text className="text-white text-md  p-2 font-bold">
                    Ghc {price}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginVertical: 10,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={removeProductFromCart}
                  className="pr-2">
                  <Ionicons name="remove" size={26} color="black" />
                </TouchableOpacity>

                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    marginHorizontal: 2,
                  }}
                  className="text-black pr-2">
                  {items.length}
                </Text>
                <TouchableOpacity onPress={addProductToCart}>
                  <View
                    style={{
                      backgroundColor: 'teal',
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      marginLeft: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Ionicons name="add" size={26} color="white" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View className="px-2">
              <Text className="font-bold text-xl text-black py-1">
                Composition
              </Text>
              <Text className="text-gray-400 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Adipisci ea quasi ex quas minus quam consequuntur ipsam labore
                molestiae incidunt officiis accusantium illo, debitis aliquam
                quo impedit sunt dignissimos. Earum.
              </Text>
            </View>
            <View className="px-2 my-3">
              <Text className="font-bold text-xl text-black py-1">
                Description
              </Text>
              <Text className="text-gray-400 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Adipisci ea quasi ex quas minus quam consequuntur ipsam labore
                molestiae incidunt officiis accusantium illo, debitis aliquam
                quo impedit sunt dignissimos. Earum.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <BuyIcon navigation={navigation} />
    </>
  );
};

export default ProductDetail;
