import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const AuthButton = ({title, className, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} className="">
      <View className="">
        <View
          className={`flex-row items-center justify-center rounded-full py-4 bg-teal-600 m-2  w-[300] md:w-auto + ${className}`}>
          <Text className="text-white">{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AuthButton;
