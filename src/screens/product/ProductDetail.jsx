import {View, Text, Image, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';
import BuyIcon from '../../features/product/BuyIcon';
import {
  addToCart,
  removeFromCart,
  selectCartItemsWithId,
} from '../../redux/slices/cart';
import {useDispatch, useSelector} from 'react-redux';
import {doc, getDoc} from 'firebase/firestore';
import {db} from '../../services/firebaseconfig';

const ProductDetail = ({route}) => {
  
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();


  const {product} = route.params;
  const items = useSelector(state => selectCartItemsWithId(state, product.id));
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     try {
  //       const docRef = doc(db, 'products', id);
  //       const docSnap = await getDoc(docRef);
  //       if (docSnap.exists()) {
  //         const productData = docSnap.data();
  //         setProduct(productData);
  //         setLoading(false);
  //       } else {
  //         console.log('No such document!');
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchProduct();
  // }, [id]);

  // if (!product) {
  //   return (
  //     <View style={{padding: 4}}>
  //       <Text style={{fontSize: 20, fontWeight: 'bold'}}>Loading...</Text>
  //     </View>
  //   );
  // } else if (loading) {
  //   return (
  //     <View style={{padding: 4}}>
  //       <Text style={{fontSize: 20, fontWeight: 'bold'}}>Loading...</Text>
  //     </View>
  //   );
  // }

  const addProductToCart = () => {
    dispatch(addToCart(product));
    console.log('Product added to cart');
  };

  const removeProductFromCart = () => {
    if (!items.length > 0) return;
    dispatch(removeFromCart(product));
    console.log('Product removed from cart');
  };
  console.log('items:', items.length);

  return (
    <>
      <ScrollView vertical>
        <View>
          <View style={{width: '100%',
      
        }}
        
         className="container h-72 bg-red-500"
        >
           <View className="flex-row bg-white justify-center items-center h-full">
              <Image
                className="h-48 w-40"
                loadingStyle={{size: 'large', color: 'blue'}}
                source={{uri: product.imageUrl}}
              />
              </View>
          
          </View>

          <View style={{padding: 16}} className=" ">
            <View>
              <View>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  {product.title}
                </Text>

                <Text style={{fontWeight: 'bold', fontSize: 16}}>
                  {product.price}
                </Text>
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
                <TouchableOpacity onPress={removeProductFromCart}>
                  <Ionicons name="remove" size={26} color="black" />
                </TouchableOpacity>

                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    marginHorizontal: 2,
                  }}>
                  {items.length}
                </Text>
                <TouchableOpacity onPress={() => addProductToCart()}>
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

              <View>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  {product.price}
                </Text>
              </View>
            </View>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}></Text>
            <Text className="font-bold text-xl">
              Composition
            </Text>
            <View>
              <Text>{product.composition}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <BuyIcon navigation={navigation} />
    </>
  );
};

export default ProductDetail;
