import {
  applyMiddleware,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import salesReducer from "./slices/salesSlice";
import authReducer from "./slices/authSlice";
import stockReducer from "./slices/stockSlice";
import masterReducer from "./slices/masterSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  sales: salesReducer,
  stock: stockReducer,
  master: masterReducer,
});

export default configureStore({
  reducer: rootReducer,
});
