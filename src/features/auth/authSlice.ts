import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../../model/User.type";
import { getAuth } from "firebase/auth";
import AuthService from "../../services/authService";

const auth = getAuth();

type Response = {
  email: string;
  accessToken: string | null;
}

export const register = createAsyncThunk(
  "auth/register",
  async (user: User, { rejectWithValue }) => {
    const response = await AuthService.register(
      auth,
      user.email,
      user.password
    );
    if (response.code) {
      return rejectWithValue(response.code);
    }
    return response;
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (user: User, { rejectWithValue }) => {
    const response = await AuthService.login(
        auth,
        user.email,
        user.password
      );
      if (response.code) {
        return rejectWithValue(response.code);
      }
      return response;
  }
);

interface AuthState {
  email: string;
  accessToken: string | null;
  isLoading: boolean;
  error: string;
}

const initialState = {
  email: "",
  accessToken: "",
  isLoading: false,
  error: "",
} as AuthState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.email = "";
      state.isLoading = false;
      state.accessToken = "";
      state.error = "";
      AuthService.logout();
    },
    refreshState: (state) => {
      state.email = "";
      state.isLoading = false;
      state.accessToken = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    // Start login request
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });

    // Request successful
    builder.addCase(login.fulfilled, (state, action: PayloadAction<Response>) => {
      state.isLoading = false;
      state.accessToken = action.payload.accessToken;
      state.email = action.payload.email;
    });

    // Request error
    builder.addCase(login.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Start register request
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });

    // Request successful
    builder.addCase(register.fulfilled, (state, action: PayloadAction<Response>) => {
      state.isLoading = false;
      state.accessToken = action.payload.accessToken;
      state.email = action.payload.email;
    });

    // Request error
    builder.addCase(register.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});
//export const selectUserAuth = (state: RootState) => state.auth;
export const { logout, refreshState } = authSlice.actions;
export default authSlice.reducer;
