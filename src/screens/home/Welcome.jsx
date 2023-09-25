import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import AuthButton from '../../shared/ui/AuthButton';

const Welcome = ({navigation}) => {

    
  return (
    <SafeAreaView className="flex justify-center items-center h-full">
      <View className="flex-col   items-center justify-center">
        <Image source={require('../../assets/icons/Logo.png')} />
        <View className="py-8 text-center"> 
          <Text className="text-2xl font-bold text-center">
            Let's get started!
          </Text>
          <Text className="text-md">
            Login to enjoy the features we've provided and stay healthy!
          </Text>
        </View>

        <AuthButton
          title={'Login'}
          onPress={() => navigation.navigate('Login')}
        />
        <TouchableOpacity onPress={
          () => navigation.navigate('Register')
        }>
          <View>
            <View
              className="flex-row items-center justify-center rounded-full py-4 bg-transparent m-2 w-[300] md:w-auto"
              style={{borderWidth: 1, borderColor: 'teal', borderRadius: 9999}}>
              <Text className="text-teal-600">Register</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
