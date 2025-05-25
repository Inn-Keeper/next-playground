import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import gameReducer, { GameState } from './slices/gameSlice';
import userReducer, { UserState } from './slices/userSlice';
import themeReducer, { ThemeState } from './slices/themeSlice';

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

// Create the store
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
    game: gameReducer,
  },
  // preloadedState: initialState,
});

// Export typed hooks
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(selector: (state: RootState) => T) => useSelector<RootState, T>(selector); 