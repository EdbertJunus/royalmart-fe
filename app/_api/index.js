import axios from "axios";
import { setupInterceptor } from "./interceptor";

let instance = axios.create({
  baseURL: `http://127.0.0.1:8000/api/`,
});

instance = setupInterceptor(instance);

export default instance;
