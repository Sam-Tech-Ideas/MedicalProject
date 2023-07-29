import React, {useRef} from 'react';

import {View, Button} from 'react-native';

const Payment = ({navigation}) => {


  const [showPayment, setShowPayment] = React.useState(false);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      
    

      {showPayment && (
        <PaystackWebView
          ref={ref}
          onError={() => {
            setShowPayment(false);

            alert('Failed...');
          }}
          metadata={{custom_fields: [{display_name: 'Demo Checkout'}]}}
          onDismissed={() => {
            //reload if dismissed.
            setShowPayment(false);
          }}
          onSuccess={response => {
            setShowPayment(false);

            alert(`Transaction successful: ${response.reference}`);
          }}
          paystackKey={'pk_test_b19fb24f73df146796bbab6916a774c19108a72a'}
          customerEmail={'powersam360@gmail.com'}
          amount={6000 * 100}
          currency="GHS"
        />
      )}
    </View>
  );
};

export default Payment;
