import axios from "axios"

const BASE_URL = "http://localhost:5000/api";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTU3OWJjM2VhYzVlM2Q5NmZjYTE4OCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3OTgyNDk3OSwiZXhwIjoxNjgwMDg0MTc5fQ.It89GzedDzQ92QEbfl5jfZPv7j4LPjlOHuzxhzMt0dY";

export const publicRequest = axios.create({
    baseURL: BASE_URL
})

export const privateRequest = axios.create({
    baseURL: BASE_URL,
    header:{token:`Bearer: ${TOKEN}`}
})
