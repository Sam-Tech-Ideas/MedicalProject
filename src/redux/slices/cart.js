import {createSlice} from '@reduxjs/toolkit';
import {createSelector} from 'reselect'; // Add this import statement

// Rest of your code...

// Define the initial state using that type
const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items = [...state.items, action.payload];
    },

    removeFromCart: (state, action) => {
      const index = state.items.findIndex(
        item => item.id === action.payload.id,
      );

      let newCart = [...state.items];
      if (index >= 0) {
        // The item exists in the basket...remove it
        newCart.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (id: ${action.payload.id}) as it's not in the basket!`,
        );
        
      }
      state.items = newCart;
    },
  },
});

export const {addToCart, removeFromCart} = cartSlice.actions;

//export const selectCartItemsWithId = (state, id) => {
// return state.cart.items.filter(item => item.id === id);
//};

export const selectCartTotal = state =>
  state.cart.items.reduce((total, item) => total + item.price, 0);

export const selectCartItems = (state) => state.cart.items;

// export const selectCartItemsWithId = (state, id) =>
//   state.cart.items.filter(item => item.id === id);
//export const selectCartItemsWithId = (state, id) => state.cart.items.filter(item => item.id === id);
export const selectCartItemsWithId = createSelector(
  [selectCartItems, (state, id) => id],
  (cartItems, id) => cartItems.filter(item => item.id === id),
  
  // Output selector: filter cartItems based on ID
);
export default cartSlice.reducer;
