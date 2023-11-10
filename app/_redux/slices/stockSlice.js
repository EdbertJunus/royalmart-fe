import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/app/_api";

const initialState = {
  status: 400,
  data: "empty",
};

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
    setStockStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { setData, setStockStatus } = stockSlice.actions;

export const postStock = createAsyncThunk(
  "stock/upload",
  async (value, { dispatch }) => {
    try {
      const response = await api.post("stock", value);
      dispatch(setStockStatus(200));
      // dispatch(setData(response.data));
    } catch (error) {
      dispatch(setStockStatus(404));
      // console.error(error);
    }
  }
);

export const checkStock = createAsyncThunk(
  "stock/get",
  async (value, { dispatch }) => {
    try {
      const response = await api.get("stock");
      if (response.data.data.length > 0) {
        dispatch(setData("exist"));
      }
    } catch (error) {
      dispatch(setStockStatus(400));
    }
  }
);

export default stockSlice.reducer;
