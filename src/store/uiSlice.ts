import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  isSidebarOpen: boolean;
  isLoading: boolean;
}

const initialState: UIState = {
  isSidebarOpen: true,
  isLoading: false,
};

const authSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.isSidebarOpen = true;
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
});

export const { openSidebar, closeSidebar, toggleSidebar } = authSlice.actions;
export default authSlice.reducer;
