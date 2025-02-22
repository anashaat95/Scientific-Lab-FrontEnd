"use client";

const { configureStore } = require("@reduxjs/toolkit");
import React from "react";
import { Provider } from "react-redux";
import uiReducer from "./uiSlice";

const store = configureStore({ reducer: { ui: uiReducer } });

export const ReduxStoreProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
