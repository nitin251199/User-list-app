import { combineReducers, configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";

const combinedReducer = combineReducers({
  user: rootReducer,
});

export const store = configureStore({
  reducer: combinedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
