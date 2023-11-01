import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  status: 404,
  message: null,
};

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {},
});

export default salesSlice.reducer;
