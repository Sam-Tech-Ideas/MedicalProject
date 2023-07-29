import {View, Text, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {collection, getDocs} from 'firebase/firestore';
import {db} from '../../services/firebaseconfig';
import ProductCard from './ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsData = querySnapshot.docs.map(doc => doc.data());
        setProducts(productsData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <View className="flex-row">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {products.map(product => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
            vendor={product.vendor}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default ProductList;
