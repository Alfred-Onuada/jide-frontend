const isLive = true;
const API_URL = isLive
  ? "https://jide-backend.onrender.com/"
  : "localhost:3000";

export const API = {
  REGISTER_USER: API_URL + "/register/user",
  REGISTER_DOCTOR: API_URL + "/register/user",
  LOGIN: API_URL + "/login",
  ROOMS: API_URL + "/rooms",
  SEARCH: API_URL + "/search",
};