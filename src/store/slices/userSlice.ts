import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  isAuthenticated: boolean;
  name: string;
}

const initialState: UserState = {
  isAuthenticated: false,
  name: 'Dalton Castro',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { setAuthenticated, setName } = userSlice.actions;
export default userSlice.reducer; 