import { View, Text, SafeAreaView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useRoute } from '@react-navigation/native';


const CategoryScreen = () => {
    const route = useRoute();
    const categoryName = route.params.categoryName;
    //destructure


  return (
    <SafeAreaView>
        <View>
            
            <Text>
                {categoryName}
            </Text>
        </View>
        </SafeAreaView>
  )
}

export default CategoryScreen