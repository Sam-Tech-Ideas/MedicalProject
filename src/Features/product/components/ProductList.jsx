import React, {useEffect, useState} from 'react';
import ProductCard from './ProductCard';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import {collection, onSnapshot} from 'firebase/firestore';
import {db} from '../../../services/firebaseconfig';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
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
      unsubscribe();
    };
  }, []);

  return (
    <View className="flex-row ">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {loading ? (
          <View className="w-full flex-row items-center h-full">
            <ActivityIndicator className="" size={40} />
          </View>
        ) : products.length === 0 ? (
          <View className="h-full flex items-center justify-center">
            <Text className="text-teal-400 text-lg">No products found</Text>
          </View>
        ) : (
          products.map(product => (
            <ProductCard 
            
              key={product.id}
              id={product.id}
              title={product.title}
              vendor={product.vendor}
              imageUrl={product.imageUrl}
              price={product.price}
              description={product.description}
              location={product.location}
              quantity={product.quantity}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default ProductList;
