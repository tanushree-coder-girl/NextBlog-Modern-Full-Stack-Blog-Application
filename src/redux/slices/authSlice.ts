import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  user: any | null; // 🔁 Replace `any` with your User type when ready
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    },
    loadUserFromStorage: (state) => {
      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
          state.user = JSON.parse(storedUser);
          state.token = storedToken;
        }
      }
    },
  },
});

export const { setCredentials, logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
