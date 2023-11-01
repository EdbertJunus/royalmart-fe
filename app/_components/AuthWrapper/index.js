import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/app/_constants";
import { getUsername, logout } from "@/app/_redux/slices/authSlice";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCookie } from "@/app/_utils";

const AuthWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const { push } = useRouter();

  useEffect(() => {
    const refresh = localStorage.getItem(REFRESH_TOKEN);
    const access = getCookie(ACCESS_TOKEN);
    console.log("access and refresh", access, refresh);
    if (!access && !refresh) {
      console.log(" ke login ");
      push("/login");
      dispatch(logout());
    } else {
      push("/");
    }
  }, [push]);

  return children;
};

export default AuthWrapper;
