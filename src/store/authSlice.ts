import { IUser } from "@/app/(PagesInDashboard)/users/usersInterfaces";
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  currentUser: IUser | null;
}

const initialState: AuthState = {
  isAuthenticated: true,
  currentUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
    },
    updateCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { login, logout, updateCurrentUser } = authSlice.actions;
export default authSlice.reducer;
