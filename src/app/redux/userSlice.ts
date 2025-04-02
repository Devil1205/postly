import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userState {
  name: string;
  email: string;
  profilePicture?: string;
  isAuthenticated: boolean;
}

const initialState: userState = {
  name: "",
  email: "",
  profilePicture: "",
  isAuthenticated: false,
};

const user = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<userState>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.profilePicture = action.payload.profilePicture;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state = initialState;
    },
  },
});

export const { setUser, logout } = user.actions;
export default user.reducer;
