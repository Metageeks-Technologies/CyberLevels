import axios from "axios";

const instance = axios.create({
    // development
    baseURL: "http://localhost:8000/api/v1",

    // production
    // baseURL: "/api/v1",
});

export default instance;