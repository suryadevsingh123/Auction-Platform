import { configureStore } from '@reduxjs/toolkit';
import auctionsReducer from './auctionsSlice';

export const store = configureStore({
  reducer: {
    auction: auctionsReducer, 
  },
});
