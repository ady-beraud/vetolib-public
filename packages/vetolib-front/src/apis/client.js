import axios from "axios";

const REACT_APP_VETOLIB_BACKEND_URL = process.env.REACT_APP_VETOLIB_BACKEND_URL;

export default axios.create({
  baseURL: `${REACT_APP_VETOLIB_BACKEND_URL}/api/`,
  withCredentials: true,
});
