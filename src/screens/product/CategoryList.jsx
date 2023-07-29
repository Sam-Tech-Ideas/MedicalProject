import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {db} from '../../services/firebaseconfig';
import {collection, onSnapshot} from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';



const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'categories'), snapshot => {
      const categoriesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(categoriesData);
    });

    return () => unsubscribe();
  }, []);

  const handleCatNav = (categoryName)=>{
    navigation.navigate('CategoryScreen', {categoryName});

  }

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="flex-row flex-wrap px-1 py-4">
        {categories.map(category => (
          <TouchableOpacity key={category.id} className="w-1/3 px-[1] py-2" onPress={
            ()=>handleCatNav(category.name)
          }>
            <View className="bg-teal-500 px-6 py-2 rounded-lg">
              <Text className="text-white">{category.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};
export default CategoryList;

