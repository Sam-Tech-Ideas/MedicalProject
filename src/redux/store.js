import {configureStore} from '@reduxjs/toolkit';
import user from './slices/user';
import cart from './slices/cart';
import thunk from 'redux-thunk';

export const store = configureStore({
  reducer: {
    user,
    cart,
  },
  middleware: [thunk],
});

//pk_test_b19fb24f73df146796bbab6916a774c19108a72a
 // <ScrollView
    //   contentContainerStyle={{
    
        
    //   }}
    //   horizontal
    //   showsHorizontalScrollIndicator={false}>
    //   {products.map(product => (
    //     <TouchableOpacity
    //       onPress={() => navigateToProductDetail(product.id)}
    //       key={product.id} className="w-[30vh] rounded-lg  h-50 m-2 border-2 border-gray-200 bg-white "
    //     >
         
    //       <View className="w-full h-40 ">
    //         <Image source={{uri: product.image}} className="w-full h-40 object-center object-cover" />
    //       </View>
    //       <View className="p-1">
    //         <View>
    //           <Text className="text-md">Paracetamol</Text>
    //         </View>
    //         <View>
    //           <Text className="text-lg font-bold">Ghc {product.price}</Text>
    //         </View>
    //       </View>
    //     </TouchableOpacity>
        
    //   ))}

      
      
    // </ScrollView>