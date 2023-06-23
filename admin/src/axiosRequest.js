import axios from "axios"

const BASE_URL = "http://localhost:5000/api";
const appState = localStorage.getItem("persist:root");
const TOKEN = JSON.parse(JSON.parse(appState).user).currentUser?.accessToken;
// console.log(TOKEN);

export const publicRequest = axios.create({
    baseURL: BASE_URL
})

export const privateRequest = axios.create({
    baseURL: BASE_URL,
    headers:{token:`Bearer: ${TOKEN}`}
})
