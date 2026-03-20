import { getToken, clearToken } from "@/lib/authService";

export const fetchWithAuth = async (url, options = {}) => {
  const token = getToken();

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  });

  if (response.status === 401) {
    clearToken();
    window.dispatchEvent(new Event("logout"));
    return null;
  }

  return response;
};