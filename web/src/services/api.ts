import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3333",
    //baseURL: 'https://3333-da7aa499-9f4d-437f-a7f0-e03a98a03334.ws-us02.gitpod.io'
});

export default api;
