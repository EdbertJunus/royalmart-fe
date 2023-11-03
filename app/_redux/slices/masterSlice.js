import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/app/_api";

const initialState = {
  data: {},
  status: 400,
};

const masterSlice = createSlice({
  name: "master",
  initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
    setMasterStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { setData, setMasterStatus } = masterSlice.actions;

export const getMaster = createAsyncThunk(
  "master/get",
  async (value, { dispatch }) => {
    try {
      const response = await api.post("master", value);
      const data = response.data;
      dispatch(setData(data.result));
      dispatch(setMasterStatus(200));
    } catch (error) {
      dispatch(setMasterStatus(404));
      // console.error(error);
    }
  }
);

export default masterSlice.reducer;
