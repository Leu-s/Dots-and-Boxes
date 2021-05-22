import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/api/"

class UserService {
    getRooms() {
        return axios.get(API_URL + "rooms", {headers: authHeader()})
    }
}

export default new UserService();

