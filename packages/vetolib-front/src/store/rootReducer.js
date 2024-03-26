import { combineReducers } from "@reduxjs/toolkit";
import searchSlice from "./search/searchSlice";
import authSlice from "./auth/authSlice";
import userSlice from "./user/userSlice";
import appointmentSlice from "./appointments/appointmentsSlice";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 

const rootReducer = combineReducers({
    auth: authSlice,
    search: searchSlice,
    user: userSlice,
    appointments: appointmentSlice
  });

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'search', 'appointments'],
  };
  
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;