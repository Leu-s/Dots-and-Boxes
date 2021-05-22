import axios from "axios";

const API_URL = 'http://localhost:5000/api/reg'

export default class AuthService {
    static login(username, password) {
        return axios
            .post(API_URL, {"username": username, "password": password})
            .then((response) => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data))
                }})
    };

    static logout() {
        localStorage.removeItem("user")
    }
    static register (username, password) {
        return axios.post(API_URL, {"username": username, "password": password})
            .then((res) => {
                console.log("DATA",res.data)
            })
    }

}














