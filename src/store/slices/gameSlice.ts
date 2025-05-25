import { createSlice } from '@reduxjs/toolkit';

export interface GameState {
  score: number;
}

const initialState: GameState = {
  score: 0,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    rollDice: (state) => {
      state.score = Math.floor(Math.random() * 6) + 1;
    },
  },
});

export const {
  rollDice
} = gameSlice.actions;

export default gameSlice.reducer; 