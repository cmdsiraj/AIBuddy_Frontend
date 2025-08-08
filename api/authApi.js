import { apiPost } from "./baseApi.js";
import { saveToken } from "../utils/localstorage.js";
import { getConfig } from "../utils/configLoader.js";

const AUTH_URL = "/auth";
const URL = `${getConfig("API_BASE_URL")}${AUTH_URL}`;

export async function login({ username, password }) {
  const user = {
    username,
    password,
  };

  const response = await apiPost(`${URL}/login`, user);
  saveToken(response.access_token);
}

export async function signup({ username, password }) {
  const user = {
    username,
    password,
  };

  const response = await apiPost(`${URL}/signup`, user);
  return response;
}
