import axios from "axios";

export const apiClient = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

const baseURL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3333/api";

export const apiServer = axios.create({
  baseURL,
  timeout: 10000,
});
