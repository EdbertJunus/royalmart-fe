import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/app/_constants";
import { getCookie } from "@/app/_utils";

import reduxStore from "@/app/_redux/store";
import {
  refreshToken,
  setAccessToken,
  setRefreshToken,
} from "../_redux/slices/authSlice";
import axiosInstance from "@/app/_api";

const onRequest = (config) => {
  const accessToken = getCookie(ACCESS_TOKEN);
  config.headers.Authorization = `Bearer ${accessToken}`;

  // console.info(`[request] [${JSON.stringify(config)}]`);
  return config;
};

const onRequestError = (error) => {
  return Promise.reject(error);
};

const onResponse = (response) => {
  return response;
};

const onResponseError = async (error) => {
  const res = error.response;
  const unauthorizedError = res.data.code === "token_not_valid";
  const originalConfig = error.config;

  if (unauthorizedError && !originalConfig._retry) {
    // console.log("masuk unauthorized error");
    originalConfig._retry = true;
    const oldRefresh = localStorage.getItem(REFRESH_TOKEN);
    const { dispatch } = reduxStore;

    // console.log("oldRefresh: ", oldRefresh);

    try {
      const res = await dispatch(refreshToken({ refresh: oldRefresh }));

      return axiosInstance(originalConfig);
    } catch (error) {
      // dispatch(logout());
      // console.error(error);
      return Promise.reject(error);
    }
  }
  // console.error(error);

  return Promise.reject(error);
};

export const setupInterceptor = (axiosInstance) => {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
};
