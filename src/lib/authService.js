let backendToken = localStorage.getItem("token") || null;

export function setToken(token) {
  backendToken = token;
  localStorage.setItem("token", token);
}

export function getToken() {
  return backendToken;
}

export function clearToken() {
  backendToken = null;
  localStorage.removeItem("token");
}