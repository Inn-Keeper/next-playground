import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import gameReducer, { GameState } from './slices/gameSlice';
import userReducer, { UserState } from './slices/userSlice';
import themeReducer, { ThemeState } from './slices/themeSlice';
// redux-persist imports
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

// Define the initial state type
export interface RootState {
  theme: ThemeState;
  user: UserState;
  game: GameState;
}

// // Define the initial state
// const initialState: RootState = {
//   theme: {
//     darkMode: true,
//   },
//   user: {
//     isAuthenticated: true,
//     name: 'Dalton Castro',
//   },
//   game: {
//     score: 0
//   },
// };

// Combine reducers
const rootReducer = combineReducers({
  theme: themeReducer,
  user: userReducer,
  game: gameReducer,
});

// Persist config for user slice
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'], // only persist user slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

export const persistor = persistStore(store);

// Export typed hooks
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(selector: (state: RootState) => T) => useSelector<RootState, T>(selector); 