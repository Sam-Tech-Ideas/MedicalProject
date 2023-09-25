import {
  View,
  Text,
  ScrollView,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const Category = () => {
  const categories = [
    {
      id: 1,
      name: 'All',
    },
    {
      id: 2,
      name: 'Condoms',
    },
    {
      id: 3,
      name: 'Contraceptives & Lubricants',
    },
    {
      id: 4,
      name: 'Vitamins & Supplements',
    },
    {
      id: 5,
      name: 'First Aid',
    },
    {
      id: 6,
      name: 'Skin Care',
    },
    {
      id: 7,
      name: 'Digestion & Nausea',
    },
    {
      id: 8,
      name: 'Eye & Ear Care',
    },
    {
      id: 9,
      name: 'Oral Care',
    },
    {
      id: 10,
      name: 'Feminine Care',
    },
    {
      id: 11,
      name: 'Baby & Child Care',
    },
    {
      id: 12,
      name: 'Sexual Health',
    },
  ];

  return (
    <ScrollView
      horizontal
      contentContainerStyle={{
        paddingHorizontal: 20,
    
      }}
      showsHorizontalScrollIndicator={false}>
      {categories.map(category => (
        <TouchableOpacity key={category.id}>
          <View
            style={{borderRadius: 8, padding: 4}}
            className="border-teal-300 rounded-md p-2 m-1 border">
            <Text style={{fontSize: 16}} className="text-teal-300">
              {category.name}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Category;
