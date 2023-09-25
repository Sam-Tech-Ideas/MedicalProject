import {View, Text, SafeAreaView, StyleSheet, Image, ActivityIndicator} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {where, collection, query, getDocs} from 'firebase/firestore';
import {db} from '../../services/firebaseconfig';
import { TouchableOpacity } from 'react-native';

const CategoryScreen = ({navigation}) => {
  const route = useRoute();
  const categoryName = route.params.categoryName;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  //destructure

  useLayoutEffect(() => {
    navigation.setOptions({
      title: categoryName,
    });
  }, [navigation]);

  {
    /**i want to use the categoryName to fetch for products in the collection under with same category name */
  }

  useEffect(() => {
    // Function to fetch products from Firestore based on categoryName
      setLoading(true);
    const fetchProducts = async () => {

      try {
       const q = query(collection(db, "products"),where("category", "==", categoryName));
        const querySnapshot = await getDocs(q);
        const products = [];
        querySnapshot.forEach(doc => {
          products.push({...doc.data(), id: doc.id});
        });
        setProducts(products);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching products', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryName]);



  console.log('Products:', products);
  return (
    <SafeAreaView className="bg-white h-full">
      {loading ? (
        <ActivityIndicator className="flex items-center h-full" size={40} />
      ) : products.length === 0 ? (
        <View className="h-full flex items-center justify-center">
          <Text className="text-teal-400 text-lg">
            No products found for this category
          </Text>
        </View>
      ) : (
        products.map(product => (
          <View key={product.id}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => handleProductPress(product)}
              className="flex-row ">
              <View style={styles.cardContent}>
                <Image
                  source={{uri: product.imageUrl}}
                  style={styles.productImage}
                />
              </View>
              <View className="flex-col justify-evenly">
                <Text style={styles.productTitle}>{product.title}</Text>
                <Text style={styles.productPrice}>{product.vendor}</Text>

                <Text className="text-teal-400">Ghc {product.price}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    elevation: 2,
  },
  cardContent: {
    padding: 16,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 8,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CategoryScreen;
