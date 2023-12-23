import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/app/_api";

const initialState = {
  data: [],
  status: 400,
  message: null,
};

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
    setSalesStatus(state, action) {
      state.status = action.payload;
    },
    setMessage(state, action) {
      state.message = action.payload;
    },
  },
});

export const { setData, setSalesStatus, setMessage } = salesSlice.actions;

export const getSalesList = createAsyncThunk(
  "sales/list",
  async (value, { dispatch }) => {
    try {
      const response = await api.get("sales");
      dispatch(setData(response.data));
    } catch (error) {
      dispatch(setSalesStatus(404));
      // console.error(error);
    }
  }
);

export const postSales = createAsyncThunk(
  "sales/post",
  async (value, { dispatch }) => {
    try {
      const response = await api.post("sales", value);

      dispatch(setSalesStatus(response.status));
      dispatch(getSalesList());
    } catch (error) {
      dispatch(setSalesStatus(404));
    }
  }
);

export const deleteSales = createAsyncThunk(
  "sales/delete",
  async (value, { dispatch }) => {
    try {
      const response = await api.delete("sales", { data: value });

      dispatch(setSalesStatus(response.status));
      dispatch(getSalesList());
    } catch (error) {
      dispatch(setSalesStatus(404));
    }
  }
);

export default salesSlice.reducer;
