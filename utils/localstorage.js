const USER_KEY = "user";
const TOKEN_KEY = "token";

export function saveToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function saveUser(userObj) {
  localStorage.setItem(USER_KEY, JSON.stringify(userObj));
}

export function getUser() {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
}

export function clearStorage() {
  localStorage.clear();
}
