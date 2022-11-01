import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  username: null,
  password: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      (state.userId = null),
      (state.username = null),
      (state.password = null);
    }
  }
})

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
