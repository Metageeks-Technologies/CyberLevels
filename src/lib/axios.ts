import axios from "axios";

const instance = axios.create({
    // development
    baseURL: process.env.NEXT_PUBLIC_SERVER_ENDPOINT

});

export default instance;