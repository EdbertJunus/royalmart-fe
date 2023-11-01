import { combineReducers, configureStore } from "@reduxjs/toolkit";
import salesReducer from "./slices/salesSlice";
import authReducer from "./slices/authSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  sales: salesReducer,
});

export default configureStore({
  reducer: rootReducer,
});
