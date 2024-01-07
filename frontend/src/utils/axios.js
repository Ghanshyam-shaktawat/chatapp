import axios from "axios";

const apiInstance = axios.create({
  baseURL: "http://localhost:8000/api/",
  timeout: 5000,
  headers: {
    "content-Type": "application/json",
    accept: "application/json",
  },
});

export default apiInstance;
