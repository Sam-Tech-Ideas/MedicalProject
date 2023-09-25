import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AuthButton from '../../shared/ui/AuthButton';
import {Divider} from 'react-native';
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
//import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';
import Loading from '../../shared/ui/Loading';
import {useDispatch, useSelector} from 'react-redux';
import {auth} from '../../services/firebaseconfig';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {setUserLoading} from '../../redux/slices/user';
//import Ionicons from 'react-native-vector-icons/Ionicons';
const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const {userLoading} = useSelector(state => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    // GoogleSignin.configure();
    GoogleSignin.configure({
      //offlineAccess: true,
      webClientId:
        '801283588951-j5urauo008spdkjgu7tvbsuhbnqja24k.apps.googleusercontent.com',
    });
  }, []);

  const handleLogin = async () => {
    try {
      dispatch(setUserLoading(true));
      await signInWithEmailAndPassword(auth, email, password);
      dispatch(setUserLoading(false));

      // Show success snackbar

      setSuccessMessage('Account created successfully.');
    } catch (error) {
      Snackbar.show({
        text: error.message,
        duration: Snackbar.LENGTH_SHORT,

        backgroundColor: 'red',
      });
      dispatch(setUserLoading(false));
    }
  };

  const handleGoogleLogin = async () => {
    try {
       const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log(error);

      Snackbar.show({
        text: error.message,
        duration: Snackbar.LENGTH_SHORT,

        backgroundColor: 'red',
      });
    }
  };

  useEffect(() => {
    if (successMessage) {
      Snackbar.show({
        text: successMessage,
        duration: Snackbar.LENGTH_SHORT,

        backgroundColor: 'green',
      });

      setSuccessMessage('');
    }
  }, [successMessage]);

  return (
    <SafeAreaView className="bg-white   h-full flex justify-center items-center">
      <View className="flex-row justify-between items-center bg-gray-100 mx-4 rounded-2xl">
        <View className="p-3">
          <Ionicons name="mail-outline" size={30} className="" />
        </View>

        <TextInput
          label="Email"
          value={email}
          mode="flat"
          placeholder="Enter your email"
          className="w-[300] md:w-auto  border-none "
          onChangeText={email => setEmail(email)}
        />
      </View>
      <View className="flex-row justify-between items-center bg-gray-100 mx-4 rounded-2xl my-4">
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
      <View className="flex-row justify-end px-4 py-2">
        <Text className="text-md font-bold text-teal-500">
          Forgot Password?
        </Text>
      </View>
      <View className="flex-row justify-center">
        {userLoading ? (
          <Loading />
        ) : (
          <AuthButton
            className={'bg-red-500'}
            title={'Log in'}
            onPress={() => handleLogin()}
          />
        )}
      </View>
      <View className="flex-row justify-center items-center">
        <Text className="text-md font-bold text-center my-2">
          Don't have an account?
        </Text>
        <Text className="text-md font-bold text-center text-teal-500 px-1">
          Sign Up
        </Text>
      </View>

      <View className="flex-row justify-center items-center">
        <Text className="text-lg  text-center my-8">OR</Text>
      </View>

      <TouchableOpacity
        className="mx-4 flex-row justify-center"
        onPress={() => handleGoogleLogin()}>
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
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Login;
