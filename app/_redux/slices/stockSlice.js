import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/app/_api";

const initialState = {
  data: [],
  status: 400,
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
      dispatch(setData(response.data));
      console.log("response upload", response.data);
    } catch (error) {
      dispatch(setStockStatus(404));
      // console.error(error);
    }
  }
);

export default stockSlice.reducer;
