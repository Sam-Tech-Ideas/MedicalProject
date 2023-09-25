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
