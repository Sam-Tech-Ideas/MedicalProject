import {View, Text, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {collection, getDocs} from 'firebase/firestore';
import {db} from '../../services/firebaseconfig';
import ProductCard from './ProductCard';
//import { load } from 'firebase-tools/lib/commands';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsData = querySnapshot.docs.map(doc => doc.data());
        setProducts(productsData);
      } catch (error) {
        console.log(error);
        setLoading(false);
        Text('Ooops, something went wrong');

      }
    };

    fetchProducts();
  }, []);

  return (
    <View className="flex-row">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>

        {
          loading ? (
            <ActivityIndicator className="flex items-center h-full" size={40} />
          ) : products.length === 0 ? (
            <View className="h-full flex items-center justify-center">
              <Text className="text-teal-400 text-lg">
                No products found
              </Text>
            </View>
          ) : (


        
        
        products.map(product => (
          <ProductCar
            key={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
            vendor={product.vendor}
          />
        ))
        )}

      </ScrollView>
    </View>
  );
};

export default ProductList;
