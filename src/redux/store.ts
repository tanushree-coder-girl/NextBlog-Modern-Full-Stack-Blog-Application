import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import { blogApi } from "./api/blogApi";
import { contactApi } from "./api/contactApi";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, blogApi.middleware, contactApi.middleware),
});

// Types for useSelector & useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
