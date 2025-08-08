import { getToken } from "../utils/localstorage.js";
import { showLoader, hideLoader } from "../utils/loading.js";

export async function apiFetch(method, url, data = null, headers = {}) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  //   alert(options.method + " " + url);

  if (data) {
    options.body = JSON.stringify(data);
  }
  //   alert(data);
  showLoader();
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      let message = `Error ${response.status}`;

      try {
        const errorData = await response.json();
        if (errorData?.detail) message = errorData.detail;
      } catch (_) {
        // fallback to status text or generic message
        message = response.statusText || message;
      }

      throw new Error(message);
    } else {
      return await response.json();
    }
  } catch (error) {
    throw error;
  } finally {
    hideLoader();
  }
}

export const apiGet = (url, headers = {}) =>
  apiFetch("GET", url, null, headers);

export const apiPost = (url, data, headers = {}) =>
  apiFetch("POST", url, data, headers);

export const apiGetProtected = (url, headers = {}) => {
  const token = getToken();
  headers = {
    Authorization: `Bearer ${token}`,
    ...headers,
  };

  return apiGet(url, headers);
};

export const apiPostProtected = (url, data, headers = {}) => {
  const token = getToken();

  headers = {
    "Content-Type": "application/json", // ✅ Always include this
    Authorization: `Bearer ${token}`,
    ...headers,
  };

  return apiPost(url, data, headers);
};
