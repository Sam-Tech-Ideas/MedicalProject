import {addDoc, collection, serverTimestamp} from 'firebase/firestore';
import {db} from '../../services/firebaseconfig';
import {useEffect, useRef} from 'react';
import {Alert, View} from 'react-native';
import PaystackWebView from 'react-native-paystack-popup';

// ...

const PaymentScreen = ({navigation, route}) => {
  const {total, groupedItemsInCart} = route.params;

  const paystackWebViewRef = useRef(null);

  useEffect(() => {
    return () => {
      // Cleanup code here (if needed)
      // Close the Paystack WebView
      paystackWebViewRef.current.close();
    };
  }, []);

  return (
    <View className="flex-row h-full">
      <PaystackWebView
        ref={paystackWebViewRef}
        amount={2000} //{total * 100}
        paystackKey={'pk_test_b19fb24f73df146796bbab6916a774c19108a72a'}
        currency="GHS"
        customerEmail={'powersam@gmail.com'}
        onSuccess={() => {
          //nav home
          navigation.navigate('Home');
          Alert.alert('Payment Successful', 'Your order has been placed');
          //close webview and navigate to home
        }}
        //{async response => {
        //const order = {
        // items: groupedItemsInCart,
        //items is an array of objects, so we need to convert it to an array of strings
        //  items: {
        // groupedItemsInCart: groupedItemsInCart.map(item => {
        //    return JSON.stringify(item);
        // }),
        // },

        ////total: total,
        // status: 'pending',
        //  payment_reference: response.reference,
        //    order_date: serverTimestamp(), // Use serverTimestamp to set the current date and time on the server
        //   };

        //   try {
        //     // Add the order to the "orders" collection in Firestore
        //     const docRef = await addDoc(collection(db, 'orders'), order);
        //     console.log('Order saved with ID: ', docRef.id);
        //     Alert.alert('Payment Successful', 'Your order has been placed');

        //     navigation.navigate('Home');
        //   } catch (error) {
        //     console.error('Error saving order: ', error);
        //     Alert.alert('Error', 'There was an error placing your order');
        //     navigation.navigate('Home');
        //   }

        //   // Close the Paystack WebView
        //   paystackWebViewRef.current.close();
        // }}
        onCancel={() => {
          Alert.alert('Payment Cancelled', 'Your order has been cancelled');
          navigation.navigate('Home');
        }}
        autoStart={false}

        // ...
      />
    </View>
  );
};

export default PaymentScreen;
