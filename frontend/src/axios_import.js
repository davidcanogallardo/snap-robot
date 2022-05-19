import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://127.0.0.1:1111/api/";
export default axios;