// src/redux/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserProfile {
  role: string;
  username: string;
}

interface UserState {
  user: UserProfile | null;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserProfile>) => {
      state.user = action.payload;
    },

    // Vider le panier
    clearUser: (state) => {
      state.user =  initialState.user;
    },
  },
});

export const { addUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
