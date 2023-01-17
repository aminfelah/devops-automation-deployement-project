import axios from "axios";
import authHeader from "./auth-header";
require("dotenv").config();
const API_URL = `http://20.23.81.52/login/api/test/` || `${process.env.BACKEND_URL}/login/api/test/`;
class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + "mod", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }
}

export default new UserService();
