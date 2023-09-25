import {SafeAreaView, TextInput, Image, ScrollView, Alert} from 'react-native';
import {useMemo, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {selectCartItems, selectCartTotal} from '../../redux/slices/cart';
import {useSelector} from 'react-redux';

import PaystackWebView from 'react-native-paystack-popup';
import {addDoc, collection} from 'firebase/firestore';
import {db} from '../../services/firebaseconfig';

const Checkout = ({navigation}) => {
  const items = useSelector(selectCartItems);
  const [groupedItemsInCart, setGroupedItemsInCart] = useState([]);
  const [payment, setPayment] = useState(false);
  const total = useSelector(selectCartTotal);
  const paystackWebViewRef = useRef(null);

  const handleBuyNow = async () => {
    // setPayment(true);

    navigation.navigate('PaymentScreen', {
      total: total,
      groupedItemsInCart: groupedItemsInCart,
    });
  };

  const dispatch = useDispatch();

  useMemo(() => {
    const groupedItems = items.reduce((acc, item) => {
      const found = acc.find(_item => _item.id === item.id);
      if (found) {
        found.quantity += 1;
      } else {
        acc.push({...item, quantity: 1});
      }
      return acc;
    }, []);
    setGroupedItemsInCart(groupedItems);
  }, [items]);

  console.log(groupedItemsInCart);
  return (
    <>
      <ScrollView>
        <SafeAreaView className="bg-white h-screen">
          <View className="p-4 ">
            <View className="flex-row items-center justify-between">
              <Text className="text-lg font-bold">Deliver to</Text>
            </View>
            <View className="bg-gray-100 rounded-xl my-4">
              <TextInput
                className="w-full"
                placeholder="Enter your address. eg.Baby Brunei, Room 14"
              />
            </View>
            <View className="bg-gray-100 rounded-xl my-4">
              <TextInput
                className="w-full"
                placeholder="Enter your call number. eg. 024 000 0000"
              />
            </View>

            <View className="py-4">
              <Text className="text-lg font-bold">Order Summary</Text>

              {groupedItemsInCart.map(item => (
                <View
                  className="flex-row items-center justify-between my-2"
                  key={item.id}>
                  <View className="flex-row items-center">
                    <Image
                      source={{uri: item.imageUrl}}
                      className="w-16 h-16 rounded-xl"
                    />
                    <View className="mx-4">
                      <Text className="font-bold">{item.title}</Text>
                      <Text className="text-gray-400">Ghc {item.price}</Text>
                    </View>
                  </View>
                  <View className="flex-row items-center">
                    <Text className="font-bold">x{item.quantity}</Text>
                  </View>
                </View>
              ))}

              <View className="flex-row items-center justify-between">
                <Text className="text-lg font-bold">Delivery fee</Text>
                <Text className="text-lg font-bold">Ghc 0.00</Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>

      <TouchableOpacity
        onPress={() => handleBuyNow()}
        style={{
          backgroundColor: 'teal',
          padding: 15,
          borderRadius: 10,
        }}>
        <Text style={{color: 'white', textAlign: 'center'}}>Buy Now</Text>
      </TouchableOpacity>
      {/* <View className="flex-row items-center  py-2 ">
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
      </View> */}
    </>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
