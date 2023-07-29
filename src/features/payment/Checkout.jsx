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
    setPayment(true);
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
                <View className="flex-row items-center justify-between my-2">
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
        {payment && (
          <PaystackWebView
            ref={paystackWebViewRef}
            amount={total * 100}
            paystackKey={'pk_test_b19fb24f73df146796bbab6916a774c19108a72a'}
            currency="GHS"
            customerEmail={'powersam@gmail.com'}
            onSuccess={response => {
              const order = {
                items: groupedItemsInCart,
                total: total,
                status: 'pending',
                payment_reference: response.reference,
                created_at: Date.now(),
              };

              try {
                // Save the order to the Firestore collection named 'orders'
                const docRef = addDoc(collection(db, 'orders'), order);
                // If the document is successfully saved, you can perform additional actions or display a success message
                console.log('Order saved with ID: ', docRef.id);
                Alert.alert('Payment Successful', 'Your order has been placed');
              } catch (error) {
                console.error('Error saving order: ', error);
                Alert.alert('Error', 'There was an error placing your order');
              }
              setPayment(false);
            }}
            onClose={() => {
              setPayment(false);
            }}
            autoStart={false}

            // onError={() => {
            //   setPayment(false);

            //   alert('Failed...');
            // }}
            // metadata={{custom_fields: [{display_name: 'Demo Checkout'}]}}
            // onDismissed={() => {
            //   //reload if dismissed.
            //   setPayment(false);
            // }}
            // onSuccess={response => {
            //   setPayment(false);

            //   alert(`Transaction successful: ${response.reference}`);
            // }}
            // paystackKey={'pk_test_b19fb24f73df146796bbab6916a774c19108a72a'}
            // customerEmail={'powersam360@gmail.com'}
            // amount={6000 * 100}
            // currency="GHS"
          />
        )}

        {!payment && (
          <TouchableOpacity
            className="bg-teal-500 flex-1 py-3 rounded-full mx-4"
            onPress={() => handleBuyNow()}>
            <Text className="text-center text-white">Buy Now</Text>
          </TouchableOpacity>
        )}
      </View>
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
