import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AuthButton from '../../shared/ui/AuthButton';
import {auth, db} from '../../services/firebaseconfig';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {doc, setDoc} from 'firebase/firestore';
import {ActivityIndicator} from 'react-native-paper';
import Snackbar from 'react-native-snackbar';
import {useDispatch, useSelector} from 'react-redux';
import user, {setUserLoading} from '../../redux/slices/user';
import Loading from '../../shared/ui/Loading';

const Register = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const {userLoading} = useSelector(state => state.user);

  const dispatch = useDispatch();

  const handleRegister = async () => {
    try {
      dispatch(setUserLoading(true));
      await createUserWithEmailAndPassword(auth, email, password);

      //Save to firestore
      const user = auth.currentUser;
      const uid = user.uid;
      const usersRef = doc(db, 'users', uid);
      await setDoc(usersRef, {
        name: name,
        email: email,
        uid: uid,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Show success snackbar

      setSuccessMessage('Account created successfully.');
      dispatch(setUserLoading(false));
    } catch (error) {
      Snackbar.show({
        text: error.message,
        duration: Snackbar.LENGTH_SHORT,

        backgroundColor: 'red',
      });

      dispatch(setUserLoading(false));
    }
  };

  useEffect(() => {
    if (successMessage) {
      navigation.navigate('Home'); // Replace 'Home'
    }
  }, [successMessage, navigation]);

  return (
    <SafeAreaView className="bg-white py-6  h-full">
      <View className="flex-row justify-between items-center bg-gray-100 mx-4 rounded-2xl">
        <View className="p-3">
          <Ionicons name="person-outline" size={30} className="" />
        </View>

        <TextInput
          label="Name"
          value={name}
          mode="flat"
          placeholder="Enter your name"
          className="w-[300] md:w-auto  border-none "
          onChangeText={name => setName(name)}
        />
      </View>
      <View className="flex-row justify-between items-center bg-gray-100 mx-4 rounded-2xl my-4">
        <View className="p-3">
          <Ionicons name="mail-outline" size={30} className="" />
        </View>

        <TextInput
          label="Email"
          value={email}
          textContentType="emailAddress"
          mode="flat"
          placeholder="Enter your email"
          className="w-[300] md:w-auto  border-none "
          onChangeText={email => setEmail(email)}
        />
      </View>
      <View className="flex-row justify-between items-center bg-gray-100 mx-4 rounded-2xl my-2">
        <View className="p-3">
          <Ionicons name="lock-closed-outline" size={30} className="" />
        </View>

        <TextInput
          label="password"
          value={password}
          secureTextEntry={true}
          mode="flat"
          placeholder="Enter your password"
          className="w-[300] md:w-auto  border-none "
          onChangeText={password => setPassword(password)}
        />
      </View>

      <View className="flex-row justify-center">
        {userLoading ? (
          <Loading />
        ) : (
          <AuthButton title={'Sign Up'} onPress={() => handleRegister()} />
        )}
      </View>
      <View className="flex-row justify-center items-center">
        <Text className="text-md font-bold text-center my-2">
          Already have an account?
        </Text>
        <Text className="text-md font-bold text-center text-teal-500 px-1">
          Log in
        </Text>
      </View>

      {/* <View className="flex-row justify-center items-center">
        <Text className="text-lg  text-center my-8">OR</Text>
      </View>

      <TouchableOpacity className="mx-4 flex-row justify-center">
        <View className="flex-row justify-center items-center w-[300] border-2 py-3 rounded-[50px] border-gray-100 ">
          <View className="">
            <Image
              source={require('../../assets/icons/Google.png')}
              style={{width: 20, height: 20}}
            />
          </View>
          <View className="pl-4">
            <Text className="text-lg font-bold   text-center">
              Sign in with Google
            </Text>
          </View>
        </View>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

export default Register;
