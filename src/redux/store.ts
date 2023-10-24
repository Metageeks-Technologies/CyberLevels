import wishlistSlice from './features/wishlist';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import filterSlice from './features/filterJobPostSlice';
import userSlice from './features/user/slice';
import companySlice from './features/company/slice';
import jobPostSlice from './features/jobPost/slice';
import companyFilterSlice from './features/company/filter';
import candidateSlice from './features/candidate/slice';
import candidateFilterSlice from './features/candidate/filterSlice'
import candidateDashboardSlice from "@/redux/features/candidate/dashboardSlice"


import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const rootReducer = combineReducers({
  user: userSlice
})

const candidate = combineReducers({
  candidateList: candidateSlice,
  candidateFilter: candidateFilterSlice,
  candidateDashboard: candidateDashboardSlice
})
const company = combineReducers({
  companyList: companySlice,
  companyFilter: companyFilterSlice,
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
  reducer: {
    persistedReducer,
    company,
    candidate,
    jobPost: jobPostSlice,
    filter: filterSlice,
    wishlist: wishlistSlice,


  },

})



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch