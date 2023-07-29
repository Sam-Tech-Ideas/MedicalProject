import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import {Avatar} from 'react-native-paper';
import Ioniocons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';
import { auth } from '../../services/firebaseconfig';
import { signOut } from 'firebase/auth';

const Profile = () => {

  handleLogout = async() => {
    try{
     await signOut(auth);

    }
    catch(error){
      console.log(error);
    }
  }

  return (
    <SafeAreaView className="bg-teal-500">
      
      <View className="flex-row items-center justify-end p-4">
        <Ioniocons name="pencil-outline" size={22} color="white" />
      </View>
      <View className="flex-col items-center justify-center py-2">
        <Avatar.Image
          size={100}
          source={{uri: 'https://picsum.photos/200/300'}}
        />

        <Text className="text-lg font-bold m-2 text-white">Kyle Sams</Text>
      </View>
      <View className="  rounded-t-3xl items-center   w-full justify-center container bg-white">
        <TouchableOpacity className="flex-row justify-between items-center  w-full p-4">
          <View className="flex-row justify-between items-center  w-full p-4">
            <Text className="text-lg font-bold">My Orders</Text>
            <View>
              <Ioniocons name="chevron-forward-outline" size={30} />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row justify-between items-center  w-full p-4">
          <View className="flex-row justify-between items-center  w-full p-4">
            <Text className="text-lg font-bold">FAQs</Text>
            <View>
              <Ioniocons name="chevron-forward-outline" size={30} />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row justify-between items-center  w-full p-4" onPress={()=>handleLogout()}>
          <View className="flex-row justify-between items-center  w-full p-4">
            <Text className="text-lg font-bold text-red-500">Logout</Text>
            <View>
              <Ioniocons name="chevron-forward-outline" size={30} />
            </View>
          </View>
        </TouchableOpacity>
      
      </View>
    </SafeAreaView>
  );
};

export default Profile;
