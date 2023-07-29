import {View, Text, SafeAreaView} from 'react-native';
import React, {useRef} from 'react';
import PaystackWebView from 'react-native-paystack-popup';
import {useState} from 'react';

const Cender = ({navigation}) => {
  const [payment, setPayment] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const ref = useRef(null);
  return (
    <SafeAreaView>
      <View>
        <PaystackWebView
          onError={() => {
            setShowPayment(false);

            alert('Failed...');
          }}
          metadata={{custom_fields: [{display_name: 'Demo Checkout'}]}}
          onDismissed={() => {
            //reload if dismissed.
            setPayment(false);
          }}
          onSuccess={response => {
            setPayment(false);

            alert(`Transaction successful: ${response.reference}`);
          }}
          paystackKey={'pk_test_b19fb24f73df146796bbab6916a774c19108a72a'}
          customerEmail={'powersam360@gmail.com'}
          amount={6000 * 100}
          currency="GHS"
        />
      </View>
    </SafeAreaView>
  );
};

export default Cender;
