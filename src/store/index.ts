import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import {persistStore} from 'redux-persist';

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

// export const api = axios.create({
//   baseURL: 'http://localhost:8000/api', // Update with your backend URL
//   timeout: 10000,
// });

export const persistor = persistStore(store);
