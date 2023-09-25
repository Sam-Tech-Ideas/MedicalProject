import {View, Text, TextInput, Button, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Category from '../../features/product/Category';
import {ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Caro from './Caro';
import ProductList from '../../Features/product/components/ProductList';

const Home = ({onSearch}) => {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();
  const handleSearch = () => {
    // Pass the search text to the parent component or perform search logic here
    onSearch(searchText);
  };

  const handlePress = () => {
    //move to category screen
    navigation.navigate('Category');
  };

  return (
    <SafeAreaView className="bg-gray-100 h-full">
      <ScrollView vertical>
        <View className="m-2 flex-row justify-between">
          <View>
            <Text className="text-2xl font-bold text-black">
              Medicine Store
            </Text>
            <Text>How are you feeling today?</Text>
          </View>
          <View className="p-4">
            <Ionicons name="notifications" size={22} color="grey" />
          </View>
        </View>
        <View>
          <Caro />
        </View>
        <View className=" rounded-lg flex-col  items-center   px-2 bg-white">
          <View className="flex-row justify-between items-center w-full p-2">
            <View>
              <Text className="text-lg ">Categories</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                handlePress();
              }}>
              <Text className="text-sm">See all</Text>
            </TouchableOpacity>
          </View>

          <Category />
        </View>

        {/* <View className="my-4   px-4 items-center justify-between flex-row mx-3 rounded-lg border-gray-200 bg-gray-200">
          <TextInput
            placeholder="Search"
            value={searchText}
            onChangeText={setSearchText}
            className="flex-1 text-black"
          />
          
          <Ionicons name="search" size={22} color="black" />
        </View> */}
        {/* <View className="flex-row justify-between items-center mx-4">
          <Text className="text-lg font-bold">Categories</Text>
          <Text className="text-lg font-bold">See all</Text>
        </View> */}

        <View className=" rounded-lg flex-col  p-4   px-3 bg-white">
          <View className="flex-row justify-between items-center w-full">
            <View>
              <Text className="text-lg ">Top Picks</Text>
            </View>
            <View>
              <Text className="text-lg ">See all</Text>
            </View>
          </View>
          <ProductList />
        </View>
        <View className=" rounded-lg flex-col  p-4   px-3 bg-white ">
          <View className="flex-row justify-between items-center w-full">
            <View>
              <Text className="text-lg ">Recommended for you</Text>
            </View>
            <View>
              <Text className="text-lg ">See all</Text>
            </View>
          </View>
          <ProductList />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
