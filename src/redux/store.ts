import wishlistSlice from './features/wishlist';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import filterSlice from './features/filterSlice';
import lnAuthSlice from './features/lnAuthSlice';
import userSlice from './features/userSlice';
import companySlice from './features/companySlice';
import jobPostSlice from './features/jobPostSlice';

import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const rootReducer = combineReducers({
  user: userSlice
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
  reducer: {
    persistedReducer,
    company: companySlice,
    jobPost: jobPostSlice,
    filter: filterSlice,
    wishlist: wishlistSlice,
    lnAuth: lnAuthSlice,
  },

})



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch