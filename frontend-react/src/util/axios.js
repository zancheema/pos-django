import axios from "axios";

export default axios.create({
    baseURL: 'http://localhost:8000/api/',
    timeout: 5 * 60 * 1000, // 5 minutes
    headers: { "Authorization": `Bearer ${localStorage.getItem("access")}` }
});