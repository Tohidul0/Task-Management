import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//import { user as defaultUser } from "../../assets/data";

interface User {
  _id: string; 
  name: string;
  email: string;
  title?: string; 
  role?: string;
  isAdmin?: boolean;
  tasks?: any[];
  createdAt?: string;
  updatedAt?: string;
  isActive?: boolean;
}

interface AuthState {
  user: User | null;
  isSidebarOpen: boolean;
}

const initialState: AuthState = {
  user: localStorage.getItem("userInfo")
    ? (JSON.parse(localStorage.getItem("userInfo") as string) as User)
    : null,

  isSidebarOpen: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      if (action.payload) {
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("userInfo");
      }
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("userInfo");
    },
    setOpenSidebar: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
    },
  },
});

export const { setCredentials, logout, setOpenSidebar } = authSlice.actions;

export default authSlice.reducer;
