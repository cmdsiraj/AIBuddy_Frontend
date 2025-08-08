import { apiPostProtected } from "./baseApi.js";
import { getConfig } from "../utils/configLoader.js";

const AI_URL = "/ai";
const URL = `${getConfig("API_BASE_URL")}${AI_URL}`;

export async function chat(message) {
  const response = apiPostProtected(`${URL}/chat`, { message: message });
  return response;
}
