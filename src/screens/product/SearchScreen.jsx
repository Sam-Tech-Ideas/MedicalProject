import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {db} from '../../services/firebaseconfig';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from 'firebase/firestore';
import {Searchbar} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
//import { TouchableOpacity } from 'react-native-gesture-handler';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    console.log('Search query:', searchQuery);
    console.log('Products:', products);

    const unsubscribe = onSnapshot(
      query(collection(db, 'products'), orderBy('title')),
      snapshot => {
        const products = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(products);
        setLoading(false); // Set loading to false once data is fetched
      },
      error => {
        console.error('Error fetching products:', error);
        setLoading(false); // Set loading to false in case of error
      },
    );

    return () => unsubscribe();
  }, [searchQuery]);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes((searchQuery || '').toLowerCase()),
  );

  console.log(filteredProducts);
  console.log(searchQuery);

  const handleSearch = text => {
    setSearchQuery(text);
    setHasSearched(text.trim() !== '');
  };
  const navigation = useNavigation();

  handleProductPress = (product) => {
    navigation.navigate('ProductDetail', { product });
  };


  return (
    <View className="bg-white h-full">
      <Searchbar
        placeholder="Search"
        onChangeText={handleSearch}
        value={searchQuery}
        className=" bg-teal-100/50 my-8 mx-4"
      />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading products...</Text>
        </View>
      ) : searchQuery === '' ? (
        <View className="flex-col justify-center items-center pt-16">
          <Image
            source={require('../../assets/icons/notentered.png')}
            className="w-full h-64"
          />
          <Text className="text-xl font-bold">
            Please enter a search query.
          </Text>
          {/* Display a default list of products here */}
        </View>
      ) : filteredProducts.length > 0 ? (
        <FlatList
          data={filteredProducts}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.card} onPress={()=> handleProductPress(product)} className="flex-row ">
              <View style={styles.cardContent}>
                <Image
                  source={{uri: item.imageUrl}}
                  style={styles.productImage}
                />
              </View>
              <View className="flex-col justify-evenly">
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productPrice}>{item.vendor}</Text>

                <Text className="text-teal-400">Ghc {item.price}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View className="flex-col justify-center items-center pt-16">
          <Image
            source={require('../../assets/icons/notfound.png')}
            className="w-full h-64"
          />
          <Text className="text-xl font-bold py-2">Results not found</Text>
          {/* Display a default list of products here */}
        </View>
      )}
    </View>
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
export default SearchScreen;

