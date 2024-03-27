import axios from "axios";

const customFetch = axios.create({
  baseURL: "https://smartkiu-backend.onrender.com/api/v1/smartkiu",
  withCredentials: true,
  credentials: "include",
});

export default customFetch;
