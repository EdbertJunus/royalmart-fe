import axios from "axios";
import { setupInterceptor } from "./interceptor";

let instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

instance = setupInterceptor(instance);

export default instance;
