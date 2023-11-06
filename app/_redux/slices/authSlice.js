import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/app/_api";

const initialState = {
  refresh: null,
  access: null,
  status: 404,
  username: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRefreshToken(state, action) {
      state.refresh = action.payload;
    },
    setAccessToken(state, action) {
      state.access = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setUsername(state, action) {
      state.username = action.payload;
    },
    logout: () => {
      document.cookie = `royal_accessToken=`;
      localStorage.removeItem("royal_refreshToken");
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addDefaultCase((state, action) => {
      return state;
    });
  },
});

export const {
  setRefreshToken,
  setAccessToken,
  setStatus,
  setUsername,
  logout,
} = authSlice.actions;

export const login = createAsyncThunk(
  "auth/login",
  async (value, { dispatch }) => {
    try {
      const response = await api.post("login", value);
      if (response.status == 200) {
        dispatch(setAccessToken(response.data.access));
        dispatch(setRefreshToken(response.data.refresh));

        document.cookie = `royal_accessToken=${response.data.access}`;
        localStorage.setItem("royal_refreshToken", response.data.refresh);
      }
      dispatch(setStatus(response.status));
    } catch (error) {
      dispatch(setStatus(401));
      // console.error(error);
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refresh",
  async (value, { dispatch }) => {
    const response = await api.post("login/refresh", value);
    dispatch(setAccessToken(response.data.access));
    dispatch(setRefreshToken(response.data.refresh));
    document.cookie = `royal_accessToken=${response.data.access}`;
    localStorage.setItem("royal_refreshToken", response.data.refresh);
  }
);

export const getUsername = createAsyncThunk(
  "auth/username",
  async (value, { dispatch }) => {
    const response = await api.get("user");
    dispatch(setUsername(response.data.username));
  }
);

export const getAuthStatus = (state) => state.auth.status;

export default authSlice.reducer;
