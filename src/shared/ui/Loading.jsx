import { View, Text } from 'react-native'
import React from 'react'

import {ActivityIndicator} from 'react-native-paper';


const Loading = () => {
  return (
    <View className="flex-row justify-center py-8">
      <ActivityIndicator animating={true} color='blue' />
    </View>
  );
}

export default Loading