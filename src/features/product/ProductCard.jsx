import {View, Text, Image, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {collection, getDocs, onSnapshot} from 'firebase/firestore';
import {db} from '../../services/firebaseconfig';
import {useNavigation} from '@react-navigation/native';

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'products'),
      querySnapshot => {
        const productsData = querySnapshot.docs.map(doc => doc.data());
        setProducts(productsData);
        setLoading(false);
        console.log('Products data:', productsData);
      },
    );

    return () => {
      // Unsubscribe from the real-time listener when the component unmounts
      unsubscribe();
    };
  }, []);

  const handlePress = product => {
    // Navigate to the detail page with the product data
    navigation.navigate('ProductDetail', {product});
  };

  return (
    <>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row">
          {products.map(product => (
            <TouchableOpacity
              key={product.id}
              onPress={() => handlePress(product)}>
              <View className="w-[24vh] rounded-xl   h-64 m-2 border  bg-white  border-gray-200 ">
                <View className=" h-40 p-4">
                  <Image
                    source={{uri: product?.imageUrl}}
                    className="  h-36 object-center object-cover"
                  />
                </View>
                <View className="px-2">
                  <View className="py-2">
                    <Text className="text-lg font-bold text-black">
                      {product.title}
                    </Text>
                  </View>
                  <View>
                    <Text className="text-md text-teal-400">
                      Ghc {product.price}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default ProductCard;
